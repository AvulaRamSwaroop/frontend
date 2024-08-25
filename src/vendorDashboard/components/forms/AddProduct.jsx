import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';
export const AddProduct = () => {

  const [productName,setProductName] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState([]);
  const [bestSeller,setBestSeller] = useState(false);
const [image,setImage] = useState(null);
const [description,setDescription] = useState("");



const handleImageUpload = (e) => {
  const selectedImage = e.target.files[0];
  setImage(selectedImage);
 }



const handleCategoryChange = (e) => {
  const value= e.target.value;
  if(category.includes(value)){
    setCategory(category.filter((item) => item !== value));
  }else{
    setCategory([...category,value]);
  }
}


const handleBestSeller = (e) => {
  const val = (e.target.value === 'true');
  setBestSeller(val);
}

 


const handleAddProduct = async(e) => {
  e.preventDefault();
 try{
const loginToken = localStorage.getItem('loginToken');
const firmId = localStorage.getItem('firmId');
if(!loginToken || !firmId){
  console.log("user not logged");
}
const formData = new FormData();
formData.append('productName',productName);
formData.append('price',price);
formData.append('image',image);
formData.append('bestSeller',bestSeller);
formData.append('description',description);
category.forEach((v) => {
   formData.append('category',v);
});
 
const response = await fetch(`http://localhost:4000/product/add-product/${firmId}`, {
  method:'POST',
  body: formData
})
const data = await response.json();
if(response.ok){
  console.log(data);
  alert("done product added");
  setProductName("")
            setPrice("");
            setCategory([])
            setBestSeller(false);
            setImage(null);
            setDescription("");
}
 }catch(e){
  console.log(e);
  alert("not done product addition");
 }
}



  return (
    <div className='addProductSection'>
          <form className="tableForm">
        <h3>Add Product</h3>
         <label>Product name</label>
         <input value={productName} name="productName"  onChange={(e) => setProductName(e.target.value)} type='text'  />
         <label>Price</label><br/>
         <input name="price" onChange={(e) => setPrice(e.target.value)} value={price} type='text'/> 
         <div className="checkInp"> 
         <label >
            Category
          </label> 
          <div className="inputsContainer">
          <div className="checkboxContainer">
            <label>
              Veg
            </label>
            <input checked={category.includes('veg')} onChange={handleCategoryChange}  type='checkbox' value="veg"  />
          </div>
          <div   className="checkboxContainer">
            <label>
              Non-Veg
            </label>
            <input  checked={category.includes('non-veg')} onChange={handleCategoryChange}  type='checkbox' value="non-veg" />
          </div>
          </div>
         </div> 
         <div className="checkInp"> 
         <label >
          BestSeller
          </label> 
          <div className="inputsContainer">
          <div className="checkboxContainer">
            <label>
              Yes
            </label>
            <input  checked={bestSeller === true} onChange={handleBestSeller} type='radio' value="true"  />
          </div>
          <div   className="checkboxContainer">
            <label>
              No
            </label>
            <input checked={bestSeller === false}  onChange={handleBestSeller}  type='radio'  value="false" />
          </div>
          </div>
         </div> 
         <label>Description</label><br/>
         <input name="description" value={description}  onChange={(e) => setDescription(e.target.value) }type='text'/> 
         <label>Firm Image</label><br/>
         <input name="image" onChange={handleImageUpload} type='file'/> 
         <div className="btnSubmit">
          <button onClick={handleAddProduct} type='submit'>
            Submit
          </button>
         </div>
      </form>
    </div>
  )
}
