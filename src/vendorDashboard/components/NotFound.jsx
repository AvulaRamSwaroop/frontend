import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <>
  
    <div className='errorSection'>
      <h1>404</h1>
      <Link to={'/'} style={{textDecoration: "none",fontSize: "1.5rem",color: "darkblue"}}> 
      <p>Back to Home</p></Link>
      <div>Page Not Found</div>
    </div>
    </>
  )
}
