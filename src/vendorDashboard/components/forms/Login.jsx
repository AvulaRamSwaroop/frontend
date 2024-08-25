import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';

export const Login = ({showWelHandler}) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] =useState("");
  const  loginHandler= async(e) => {
    e.preventDefault();
    try{
const response = await fetch(`${API_URL}/vendor/login`,{
  method: "POST",
  headers:{
    'Content-Type': "application/json",
  },
  body: JSON.stringify({email,password})
});
const data =await  response.json();
if(response.ok){
  alert("logged in");
  localStorage.setItem('loginToken',data.token);
  setEmail("");
  setPassword("");
  showWelHandler();
  // window.location.reload();
}
const vendorId = await data.vendorId;

const vendorResponse  = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)

const vendorData = await vendorResponse.json();
if(vendorResponse.ok){
   const vendorFirmId= vendorData.vendorFirmId;
   console.log(vendorFirmId);
    const vendorFirmName = vendorData.vendor.firm[0].firmName;
    console.log(vendorFirmName);
    localStorage.setItem('firmName',vendorFirmName);
   localStorage.setItem('firmId',vendorFirmId);
  window.location.reload();
}

    }catch(e){
      console.log(e);
       alert("Invalid details");
    }
  }

  return (
    <div className='loginSection'>

      <form className='authForm'>
      <h3>Vendor Login</h3>
        <label>
          Email
        </label><br/>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Enter Your Email'/><br/>
        <label>Password</label><br/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type='text' placeholder='Enter Your Password'/><br/>
      <div className="btnSubmit">
      <button type='submit' onClick={loginHandler}>
        Submit
        </button>
      </div>
      </form>
    </div>
  )
}
