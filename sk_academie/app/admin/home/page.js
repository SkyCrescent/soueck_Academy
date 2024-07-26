   "use client"
import React from 'react';
import {useState} from "react";
import Image from "next/image";
import rr from "@/public/logo/SAC Logo (Empty).png";

import poste from "@/public/icons/magazine_127px.png"
import schol from "@/public/icons/school_127px.png"
import events from '@/public/icons/event_127px.png'

import Poste from "@/component/admin/poste/Poste";
import School from "@/component/admin/school/School";
import Event from "@/component/admin/Event"
   import EvenForScholl from "@/component/admin/school/EvenForScholl";
export default function page(){
   const [etat , SetEtat ] = useState(3)

   return(
      <>
         <div className="z-30 bg-no-repeat   md:bg-cover   bg-[url('../public/Sans.jpg')] opacity-100 relative  h-screen w-screen">
            <div className="bg-gradient-to-t from-black/100 via-sky-950 to-sky-600 z-40 h-screen opacity-75 " ></div>

            <div className="absolute top-0 flex  flex-col md:flex-col  lg:flex-row h-[100%]  w-[100%]">

               <div className=" z-20 space-y-2 border-1 border-black  bg-transparent rounded-xl w-[100%] md:w-[100%] lg:w-[18%] h-screen mr-2">
                  <div className="relative h-[40%] w-[90%] mt-2 mx-auto ">
                     <Image
                        className="object-contain"
                        src={rr.src}
                        fill
                        alt="Nfc"
                     />
                  </div>
                  <div className=" flex justify-between items-center p-2 md:p-1 md:flex-col  relative h-[20%] md:h-[40%] lg:h-[50%] w-[100%] md:space-y-3 ">

                     <div
                        className=" flex justify-between items-center hover:shadow-xl relative mx-auto h-[30%] w-[45%] lg:w-[90%]  lg:h-[16%] p-4  py-2 rounded-xl border-2 border-transparent hover:text-white  hover:border-black text-white transition duration-300 transform hover:scale-105 cursor-pointer"
                        onClick={() => {
                           SetEtat(3)
                        }}
                     >
                        <div className=" h-[100%] w-[25%] lg:h-[120%] lg:w-[25%]"
                             onClick={() => {
                                SetEtat(3)
                             }}>
                           <Image
                              src={events.src}
                              alt={`Logo `}
                              width="600"
                              height="600"
                              className="object-contain object-center w-full h-full  hidden md:block "
                              onClick={() => {
                                 SetEtat(3)
                              }}
                           />
                        </div>
                        <span
                           className={etat === 3 ? "relative  h-6 w-[75%] text-[16px] font-[poppins] font-normal underline text-center text-green-500" : "relative  h-6 w-[75%] text-[16px] font-[poppins] font-semibold text-center text-green-500"}
                           onClick={() => {
                              SetEtat(3)
                           }}>Evenements </span>
                     </div>


                     <div
                        className=" flex justify-between items-center hover:shadow-xl relative mx-auto  w-[45%] lg:w-[85%] h-[30%] lg:h-[16%] p-4  py-2 rounded-xl border-2 border-transparent hover:text-white  hover:border-black text-white transition duration-300 transform hover:scale-105 cursor-pointer"
                        onClick={() => {
                           SetEtat(1)
                        }}
                     >
                        <div className="  h-[100%] w-[25%] lg:h-[120%] lg:w-[25%]"
                             onClick={() => {
                                SetEtat(1)
                             }}>
                           <Image
                              src={schol.src}
                              alt={`Logo `}
                              width="600"
                              height="600"
                              className="object-contain object-center w-full h-full  "
                              onClick={() => {
                                 SetEtat(1)
                              }}
                           />
                        </div>
                        <span
                           className={etat === 1 ? "relative  h-6 w-[75%] text-[16px] font-[poppins] font-normal underline text-center text-green-500" : "relative  h-6 w-[75%] text-[16px] font-[poppins] font-semibold text-center text-green-500"}
                           onClick={() => {
                              SetEtat(1)
                           }}>Publication</span>
                     </div>

                     <div
                        className=" flex justify-between items-center relative mx-auto hover:shadow-xl w-[45%] lg:w-[85%] h-[30%] lg:h-[16%] p-4  py-2 rounded-xl border-2 border-transparent hover:text-white  hover:border-black text-white transition duration-300 transform hover:scale-105 cursor-pointer"
                        onClick={() => {
                           SetEtat(2)
                        }}>
                        <div className="  h-[100%] w-[25%] lg:h-[120%] lg:w-[25%]"
                             onClick={() => {
                           SetEtat(2)
                        }}>
                           <Image
                              src={poste.src}
                              alt={`Logo `}
                              width="600"
                              height="600"
                              className="object-contain object-center w-full h-full  "
                              onClick={() => {
                                 SetEtat(2)
                              }}
                           />
                        </div>
                        <span
                           className={etat === 2 ? "relative  h-6 w-[75%] text-[16px] font-[poppins] font-normal underline text-center text-green-500" : "relative  h-6 w-[75%] text-[16px] font-[poppins] font-semibold text-center text-green-500"}
                           onClick={() => {
                              SetEtat(2)
                           }}>Ecole</span>
                     </div>


                  </div>


               </div>
               <div className=" w-[100%] lg:w-[80%]  rounded-xl h-screen  ">
                  {
                     etat === 1 ? <Poste/> : etat === 2 ? <EvenForScholl/> : etat === 3 ? <Event/> : <Event/>
                  }
               </div>
            </div>

         </div>
      </>
   )
}