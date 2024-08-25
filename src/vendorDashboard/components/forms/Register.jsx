import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';


export const Register = ({showLoginHandler}) => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] =useState("");
  const [loading,setLoading] = useState(true);


  const handleSubmit = async(e) => {
    e.preventDefault();
     try{
       const  response = await fetch(`${API_URL}/vendor/register`,{method : 'POST',headers: {
        'Content-Type': "application/json"
       },
      body: JSON.stringify({username,email,password})
      })

      const data = await response.json();
      if(response.ok){
        console.log(data);
        alert("vendor registered done!");
        setEmail("");
        setPassword("");
        setUsername("");
        showLoginHandler();
      }
     }catch(e){
      console.log(e);
      alert("error occured");
     }
  }


  return (
  <div className="registerSection">
          <form className='authForm'>
      <h3>Vendor Register</h3>
      <label>
          Username
        </label><br/>
        <input  name="username" type='text' placeholder='Enter Your Name' value={username}  onChange={(e) => setUsername(e.target.value)}/><br/>
        <label>
          Email
        </label><br/>
        <input value={email} name='email' type='text' placeholder='Enter Your Email'
         onChange={(e) =>setEmail(e.target.value)}
        /><br/>
        <label>Password</label><br/>
        <input name='password' type='text' placeholder='Enter Your Password'
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        /><br/>
      <div className="btnSubmit">
      <button onClick={handleSubmit} type='submit'>
        Submit
        </button>
      </div>
      </form>
  </div>
  )
}
