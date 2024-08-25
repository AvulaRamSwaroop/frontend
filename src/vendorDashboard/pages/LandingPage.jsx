import React, { useEffect, useState } from 'react'
import { NavBar } from '../components/navBar'
import { SideBar } from '../components/SideBar'
import { Login } from '../components/forms/Login'
import { Register } from '../components/forms/Register'
import { Addfirm } from '../components/forms/AddFirm'
import { AddProduct } from '../components/forms/AddProduct'
import { Welcome } from '../components/Welcome'
import { AllProducts } from '../components/AllProducts'

export const LandingPage = () => {

  const [showLogin,setShowLogin] = useState(false);
  const [showRegister,setShowRegister] = useState(false);
  const [showFirm,setShowFirm] = useState(false);
  const [showProduct,setShowProduct] = useState(false);
const [ShowLogOut,setShowLogOut] = useState(false);

  const [showWel,setShowWel] =useState(false);
const [showFirmTitle,setShowFirmTitle] = useState(true);
  const [showAllProducts,setShowAllProducts] = useState(false);


  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWel(false);
    setShowAllProducts(false);
  }
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWel(false);
    setShowAllProducts(false);
  }

 const showFirmHandler= () => {
if(ShowLogOut){
  setShowFirm(true);
  setShowLogin(false);
  setShowRegister(false);
  setShowProduct(false);
  setShowWel(false);
  setShowAllProducts(false);
}else{
  alert("please login");
  setShowLogin(true);
}
 }

 const showProductHandler =() => {
if(ShowLogOut){
  setShowFirm(false);
  setShowLogin(false);
  setShowRegister(false);
  setShowProduct(true);
  setShowWel(false);
  setShowAllProducts(false);
}else{
  alert("please login");
  setShowLogin(true);
}
 }

 const showWelHandler =() => {
  setShowFirm(false);
  setShowLogin(false);
  setShowRegister(false);
  setShowProduct(false);
  setShowWel(true);
  setShowAllProducts(false);
 }

 const handleShowAllProducts = () => {
  if(ShowLogOut){
  setShowFirm(false);
  setShowLogin(false);
  setShowRegister(false);
  setShowProduct(false);
  setShowWel(false);
  setShowAllProducts(true);
 }else{
  alert("please login");
  setShowLogin(true);
 }
}

 useEffect(() => {
  const loginToken = localStorage.getItem('loginToken');
  if(loginToken){
    setShowLogOut(true);
  }
 },[localStorage]);

useEffect(() => {
  const firmName= localStorage.getItem('firmName');
  if(firmName){
   setShowFirmTitle(false);
  }
},[])

 const logOutHandler = () => {
   localStorage.removeItem('loginToken');
   localStorage.removeItem('firmId');
   localStorage.removeItem('firmName');
   setShowLogOut(false);
   setShowFirmTitle(true);
   window.location.reload();
 }

  return (
    <div>
      <section className='landingSection'>
      <NavBar showRegisterHandler = {showRegisterHandler} showLoginHandler = {showLoginHandler}
      showLogOut={ShowLogOut}
      logOutHandler = {
        logOutHandler
      }
      />
        <div className="collectionSection">
        <SideBar   showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} handleShowAllProducts={handleShowAllProducts}
        showFirmTitle={showFirmTitle}
        />
      {showLogin?  <Login showWelHandler={showWelHandler} />: ""}
        {showRegister &&<Register showLoginHandler={showLoginHandler}/>}
      {showFirm && ShowLogOut &&  <Addfirm/>}
      {showProduct && ShowLogOut&&  <AddProduct/>}
      {showWel && <Welcome/>}
       {showAllProducts && ShowLogOut &&  <AllProducts/>}
        </div>    
      </section>
    </div>
  )
}
