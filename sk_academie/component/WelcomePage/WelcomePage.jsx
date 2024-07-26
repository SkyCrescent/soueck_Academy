"use client"
import React from 'react';
import {useState,useEffect} from "react";
import rr from "../../public/logo/SAC Logo (Empty).png";
import Image from "next/image";
import Acceuil from "@/component/acceuil/Acceuil";
import Ecole from "@/component/ecole/Ecole";
import Info from "@/component/information/Info";
import Contact from "@/component/contact/Contact";
import contact2 from '@/public/icons/info_127px.png'
import Style from "../../styles/Page.modules.css"
import EvenForScholl from "@/component/admin/school/EvenForScholl";
import adresse from "../../public/logo/home_address_127px.png";
import phone from "../../public/icons/call_127px.png";
import mail from "../../public/logo/mail_127px.png";
export default function WellcomePage(){
   const [etat , SetEtat ] = useState(3)
   const [notif , setNotif] = useState(false)

   const [ showAdresse ,setShowAdresse  ] = useState(false)
   const [ showPhone ,setShowPhone  ] = useState(false)
   const [ showMail ,setShowMail  ] = useState(false)


   useEffect(() => {
      // Cleanup function to clear the timeout when the component unmounts
      // return () => clearTimeout(timeoutId);
      console.log(notif)
   }, []);
   const ActiveInfo =() =>{
      setShowAdresse(true)
      setShowPhone(true);
      setShowMail(true);

   }


   const verif =()=>{
      notif ? (
         ActiveInfo()
      ) : () =>{
         setShowAdresse(false)
         setShowPhone(false);
         setShowMail(false)
      }
   }



   return(
      <>
         <div className=" flex-row h-screen w-screen">
            <div className=" h-[10%] shadow-2xl w-[98%]  mx-auto flex justify-between ">
               <div className=" h-[100%] w-[18%] items-start">
                  <Image
                     src={rr.src}
                     alt={`Logo `}
                     width="700"
                     height="700"
                     className="object-contain object-center w-[100%] h-full opacity-100 "
                  />
               </div>
               <div
                  className="border-l-0 border-t-0 border-r-0 border-b-1 border-[#303132] h-[100%] w-[40%] md:w-[30%] lg:w-[20%] flex items-center justify-between cursor-pointer font-[Gotham]  uppercase text-[12px] md:text-base    ">
                  {/*<div onClick={()=> SetEtat(1)} className="hover:font-bold transition duration-1000"  > <span className={ etat === 1 ?  "text-white font-bold" :"text-[#072c42] " }>Acceuil</span></div>*/}
                  <div onClick={() => SetEtat(3)} className="hover:font-bold transition duration-1000"><span
                     className={etat === 3 ? "text-white font-bold" : "text-[#072c42] "}>Acceuil</span></div>

                  <div onClick={() => SetEtat(1)} className="hover:font-bold transition duration-1000"><span
                     className={etat === 1 ? "text-white font-bold" : "text-[#072c42] "}>Publications</span></div>
                  {/*<div onClick={() => SetEtat(2)} className="hover:font-bold transition duration-1000"><span*/}
                  {/*   className={etat === 2 ? "text-white font-bold" : "text-[#072c42] "}>Ecoles en Compétition</span>*/}
                  {/*</div>*/}
                  {/*<div onClick={() => SetEtat(4)} className="hover:font-bold transition duration-1000"><span*/}
                  {/*   className={etat === 4 ? "text-white font-bold" : "text-[#072c42] "}>Contact</span></div>*/}

               </div>
            </div>

            <div className=" h-[90%] w-screen content-container overflow-hidden">
               <div className=" flex flex-col  h-[98.0%] w-[100%]  overflow-y-auto scrollbar-hidden  ">
                  {
                     etat === 1 ? <Acceuil/> : etat === 2 ? <EvenForScholl/> : etat === 3 ? <Info/> : etat === 4 ?
                        <Contact/> : <Acceuil/>
                  }
               </div>
            </div>





            <div
               className={`${notif ? 'transition duration-1000 opacity-100 translate-x-0' : '-translate-x-2 opacity-0'} w-auto -mx-20 h-auto absolute bottom-48 right-28  flex justify-between  space-x-3 `}>

                  <span
                     className="ffont-light text-[8px] md:text-xs  font-[Poppins] text-white md:text-[#00A0FF] mt-2 break-words">60 Avenue Dennis Sassou Nguesso centre ville de Brazzaville</span>
               <img src={adresse.src} alt={`Logo `} width="30" height="30"
                    className="relative w-8 h-8 opacity-100"/>
            </div>


            <div
               className={`${notif ? 'transition duration-1000 opacity-100 translate-x-0' : '-translate-x-2 opacity-0'} w-auto -mx-20 h-auto absolute bottom-36 right-28  flex justify-between  space-x-3 `}>
               <span className="font-light text-[8px] md:text-xs font-[Poppins] text-[#00A0FF] mt-2 break-words">+242 06 732 63 77 /+242  05 512 25 79</span>
               <img src={phone.src} alt={`Logo `} width="30" height="30"
                    className="relative w-8 h-8 opacity-100"/>

            </div>


            <div
               className={`${notif ? 'block transition duration-1000 opacity-100 translate-x-0' : ' hidden -translate-x-2 opacity-0'}  w-auto -mx-20 h-auto absolute bottom-24 right-28  flex justify-between  space-x-3 `}>
               <p className="font-light text-[8px] md:text-xs font-[Poppins] text-white md:text-[#00A0FF] mt-2 whitespace-nowrap">Souekeacademy@gmail.com</p>
               <img src={mail.src} alt={`Logo `} width="600" height="600"
                    className="relative w-8 h-8 opacity-100"/>

            </div>


            <div className="absolute bottom-6 right-4 w-14 z-50">

               {/* Contenu de la bulle */}
               <div className="bg-white/10 cursor-pointer text-white p-3 rounded-full shadow-lg"
                    onClick={() => {
                       setNotif(!notif)
                       // console.log(notif)
                       // verif()
                    }}>
                  <img
                     src={contact2.src}
                     title="Contact"
                     alt={`Logo `}
                     width="500"
                     height="500"
                     onClick={() => {
                        setNotif(!notif)
                        // console.log(notif)
                        // verif()
                     }}
                     className=" object-center  relative w-full h-full  "
                  />
               </div>
            </div>


         </div>
      </>
   )
}