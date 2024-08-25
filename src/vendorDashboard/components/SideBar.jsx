import React from 'react'

export const SideBar = ({showFirmHandler,showProductHandler,handleShowAllProducts,showFirmTitle}) => {
  return (
    <div className='sideBarSection'>
      <ul>
        
        {
          showFirmTitle ? ( <li onClick={showFirmHandler}>Add Firm</li>):""
        }
         <li onClick={showProductHandler}>Add Product</li>
         <li onClick={handleShowAllProducts}>All Products</li>
         <li>User Details</li>
      </ul>
    </div>
  )
}
