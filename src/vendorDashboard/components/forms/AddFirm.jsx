import React, { useState } from 'react'
  const API_URL = "http://localhost:4000";
export const Addfirm = () => {
 
  const [firmName,setFirmName] = useState("");
  const [area,setArea] = useState("");
  const [category,setCategory] =useState([]);
  const [region,setRegion] = useState([]); 
 const [offer,setOffer] = useState("");
 const [file,setFile] = useState(null);


 const handleImageUpload = (e) => {
  const selectedImage = e.target.files[0];
  setFile(selectedImage);
 }


 const handleCategoryChange = (e) => {
  const value= e.target.value;
  if(category.includes(value)){
    setCategory(category.filter((item) => item !== value));
  }else{
    setCategory([...category,value]);
  }
}


const handleRegionChange =(e) => {
  const value = e.target.value;
  if(region.includes(value)){
    setRegion(region.filter((it) => it !== value));
  }else{
    setRegion([...region,value]);
  }
}

 const handleFirmSubmit = async(e) => {
  e.preventDefault();
  try{
const loginToken  = localStorage.getItem('loginToken');
if(!loginToken){
  console.log("User Not logged");
}

const formData = new FormData();
formData.append('firmName',firmName);
formData.append('area',area);
formData.append('offer',offer);
formData.append('image',file);
category.forEach((v) => {
  formData.append('category',v);
});
region.forEach((v) => {
  formData.append('region',v);
})
 const response  = await fetch(`http://localhost:4000/firm/add-firm`,{
  method: "POST",
  headers: {
    'token' : `${loginToken}`
  },
  body: formData
 });
const data= await response.json();
if(response.ok){
  console.log(data);
  alert('Firm added done');
  setFirmName("");
  setArea("");
  setFile(null);
  setOffer("");
  setCategory([]);
  setRegion([]);}else if(data.message === "vendor can have only one firm"){
   alert("Firm Exists.Only 1 firm can be added");
  } else{
    alert("Failed to add firm");
  }
  
  localStorage.setItem('firmId',data.firmId);

  }catch(e){
    console.log(e);
    alert("Not done firm add");
  }
 }


  return (
     <div className="firmSection">
      <form className="tableForm">
        <h3>Add Firm</h3>
         <label>Firm name</label>
         <input onChange={(e) => setFirmName(e.target.value)} value={firmName} name='firmName' type='text' placeholder='Enter Firm Name'/>
         <label>Area</label> 
         <input onChange={(e) => setArea(e.target.value)} value={area} name="area" type='text'/> 
         <div className="checkInp">
          <label >
            Category
          </label> 
          <div className="inputsContainer">
          <div className="checkboxContainer">
            <label>
              Veg
            </label>
            <input checked={category.includes('veg')} type='checkbox' value="veg"  onChange={handleCategoryChange} />
          </div>
          <div   className="checkboxContainer">
            <label>
              Non-Veg
            </label>
            <input checked={category.includes('non-veg')} 
             onChange={handleCategoryChange}  type='checkbox' value="non-veg"  />
          </div>
          </div>
         </div>
         <label> Offer</label> 
         <input onChange={(e) => setOffer(e.target.value)} value={offer} name='offer' type='text'/> 
{/* */}

<div className="checkInp">
          <label >
            Region
          </label> 
          <div className="inputsContainer">
          <div className="regBoxContainer">
            <label>
              South Indian
            </label>
            <input checked={region.includes('south-indian')} type='checkbox' value="south-indian"  onChange={handleRegionChange} />
          </div>
          <div   className="regBoxContainer">
            <label>
            North Indian
            </label>
            <input onChange={handleRegionChange} checked={region.includes('north-indian')}  type='checkbox' value="north-indian"  />
          </div>
          <div   className="regBoxContainer">
            <label>
            Chinese
            </label>
            <input onChange={handleRegionChange}checked={region.includes('chinese')}  type='checkbox' value="chinese"  />
          </div>
          <div   className="regBoxContainer">
            <label>
            Bakery
            </label>
            <input onChange={handleRegionChange}checked={region.includes('bakery')}  type='checkbox' value="bakery"  />
          </div>
          </div>
         </div>


{/* */}

   
         <label>Firm Image</label> 
         <input onChange={handleImageUpload} type='file'/> 
         <div className="btnSubmit">
          <button type='submit' onClick={handleFirmSubmit}>
            Submit
          </button>
         </div>
      </form>
     </div>
  )
}
