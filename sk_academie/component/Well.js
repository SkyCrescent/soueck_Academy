"use client"
import React from 'react';
import {useState} from "react";
import Image from "next/image";
import school from "../../../../public/logo/school_127px.png";
import info from "../../../../public/logo/info_127px.png";
import house from "../../../../public/logo/home_127px.png"

import house2 from "../../../../public/logo/home_grren.png"
import school2 from "../../../../public/logo/school2.png"
import info2 from "../../../../public/logo/info.png"
import  adresse from "../../../../public/logo/home_address_127px.png"
import  mail from "../../../../public/logo/mail_127px.png"
import phone from "../../../../public/logo/phone_127px.png"
import rr from "../../../../public/logo/SAC Logo F2 - X.png";
import rr3 from "../../../../public/logo/Sans titre3.png";
import MyImage from "@/app/component/Img/MyImage";
import MyImage2 from "@/app/component/Img/MyImage";

import Acceuil from "@/app/component/acceuil/Acceuil";
import Ecole from "@/app/component/ecole/Ecole";
import Info from "@/app/component/information/Info";

import Style from "../../../../styles/Page.modules.css"
export default  function WelcomePage(){
   const [etat , SetEtat ] = useState(1)
   console.log("modif " ,etat)

   return(
      <>
         <div className=" bg-gradient-to-t from-gray-300 via-green-200 to-green-400  relative z-10   w-[100%] flex justify-between ">

            {/*<div className="bg-no-repeat  h-screen w-[100%]  flex justify-between">*/}

            <MyImage2/>
            <div className="hidden mx-auto md:block md:relative md:z-10  md:w-[18%]   md:h-screen md:flex-row md:justify-between  ">
               <div className="md:absolute z-30 w-[100%]  h-[45%]   ">
                  <Image
                     src={rr3.src}
                     alt={`Logo `}
                     width="800"
                     height="800"
                     className="object-contain object-center w-full h-full  "
                  />
               </div>


               {/*le mettre en bas*/}
            </div>
            <div className=" w-[100%] md:w-[65%]  h-screen space-y-1  ">

               <div className="bg-transparent relative top-1 w-[100%] h-[4%] md:h-[8%]  flex flex-row items-center   ">
                  <div className=" mx-auto  relative flex justify-between   w-[50%]  h-[100%]  ">
                     <div className=  {  etat === 1 ? " relative  h-[100%] items-center " : "relative  h-[100%] items-center "  } >
                        <button onClick={()=> SetEtat(1)}  className="relative mx-auto   h-[100%] w-[100%]  " >
                           <img src={  etat === 1 ? house2.src :  house.src   } className="relative mx-auto   h-full w-full  "/>
                        </button>
                     </div>
                     <div className={  etat === 2 ? " items-center" : " items-center"  }>
                        <button  onClick={ ()=> SetEtat(2)  } className="relative mx-auto   h-[100%] w-[100%]  " >
                           <img src={  etat === 2 ? school2.src :school.src } className=" relative mx-auto   h-full w-full   "/>
                        </button>
                     </div>
                     <div className={  etat === 3 ? " items-center" : " items-center"  }>
                        <button onClick={()=> SetEtat(3)}className="relative mx-auto   h-[100%] w-[100%]  "  >
                           <img src={  etat === 3 ? info2.src : info.src} className=" relative mx-auto   h-full w-full  "/>
                        </button>
                     </div>
                  </div>
               </div>
               <div className="relative w-[100%] h-[90.5%]   content-container overflow-hidden ">
                  <div className=" flex flex-col  h-[98.0%] w-[100%]  overflow-y-auto scrollbar-hidden  ">
                     {
                        etat === 1 ? <Acceuil/> : etat === 2 ? <Ecole/> : etat === 3 ? <Info/> : <Acceuil/>
                     }
                  </div>
               </div>


            </div>
            {/*fin du cadran au milieu et debut de la barre à droite*/}
            <div className="relative w-[10%] hidden md:w-[20%] md:h-screen md:block ">
               <div className=" w-[90%] h-auto  relative top-[30%] ">
                  <div className="m-2 space-y-2 ">
                     <div className=" flex justify-between items-center relative h-[40%] w-[100%]  ">
                        <div className="h-8 w-[32%] -ml-1">
                           <Image
                              src={adresse.src}
                              alt={`Logo `}
                              width="600"
                              height="600"
                              className="object-contain object-center w-full h-full  "
                           />
                        </div>
                        <div className="relative  w-[100%] text-[12px] font-[poppins] text-black font-semibold text-center ">60 Avenue Boulevard Dennis Sassou Nguesso centre ville de Brazzaville</div>
                     </div>
                     <div className=" flex justify-between items-center relative h-auto w-[100%]  ">
                        <div className="h-6 w-[20%]">
                           <Image
                              src={phone.src}
                              alt={`Logo `}
                              width="600"
                              height="600"
                              className="object-contain object-center w-full h-full  "
                           />
                        </div>
                        <div className="flex-row w-[80%] mx-auto items-center justify-center ">
                           <div className="relative  w-[100%] text-[12px] font-[poppins] text-black font-semibold text-center ">06 732 63 77 / 05 512 25 79</div>
                        </div>
                     </div>
                     <div className=" flex justify-between items-center relative h-auto w-[100%] opacity-100  ">
                        <div className="h-8 w-[20%]">
                           <Image
                              src={mail.src}
                              alt={`Logo `}
                              width="600"
                              height="600"
                              className="object-contain object-center w-full h-full  "
                           />
                        </div>
                        <span className="relative  h-6 w-[80%] text-[12px] font-[poppins] pt-1  text-black font-semibold ">Souekeacademy@gmail.com</span>
                     </div>

                  </div>
               </div>
            </div>
         </div>


         {/*fin du cadran à gauche et debut de la barre au milieu*/}

      </>
   )
}

