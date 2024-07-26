"use client"
import Image from "next/image";
import rr from "../public/logo/SAC Logo (Empty).png";
import WellcomePage from "@/component/WelcomePage/WelcomePage";
import React, {useEffect, useState} from "react";

export default function page(){
  const [loading , SetLoading] = useState(false )
  const [ comegreen , SetComegreen ] = useState(false)  // Le centre define enorme et vert
  const [showCarre , SetshowCarre] = useState(false )  //le carré apparait
  const [showCarre2 , SetshowCarre2] = useState(false )  //le carré apparait
  const [ separ , SetSepar ] = useState(false)  // le carre va a gauche
  const [ moveright , SetMoveright ] = useState(false)  // le carre va encore a gauche
  const [ moveleft , SetMoveleft ] = useState(false)  // le carre va a droite
  const [ moveleft2 , SetMoveleft2 ] = useState(false)  // le carre va encore a droite
  const [ moveright2 , SetMoveright2 ] = useState(false)  // le carré revient à gauche
  const [ moveright3 , SetMoveright3 ] = useState(false)  // le carre va encore a gauche
  const [ lastmove , SetLastMove ] = useState(false)  // le carre revient o centre
  const [ alldisplay , SetAlldisplay ] = useState(false)  // Tous retourne au centre
  const [next  , SetNext] = useState(false) //il affiche le suivant



  useEffect(() => {
// automatisation des dellais d'affichage des iamges
    SetLoading(true)
    // le reste
    setTimeout(()=>{
      SetshowCarre(true)
    },800)
    setTimeout(()=>{
      SetshowCarre2(true)
    },900)
    setTimeout(()=>{
      SetshowCarre(false)
      SetSepar(true)
    },1000)
    setTimeout(()=>{
      SetSepar(false)
      SetMoveright ( true)
      SetshowCarre2(false)
    },2000)
    setTimeout(()=>{
      SetMoveright ( false)
      SetMoveleft(true)
    },3000)
    setTimeout(()=>{
      SetMoveleft(false)
      SetMoveleft2(true)
    },4000)
    setTimeout(()=>{
      SetMoveleft2(false)
      SetMoveright2(true)
    },5000)
    setTimeout(()=>{
      SetMoveright2(false)
      SetMoveright3(true)
    },6000)
    setTimeout(()=>{
      SetMoveright3(false)
      SetLastMove(true)
    },7000)
    setTimeout(()=>{
      SetLastMove(false)
      SetAlldisplay(true)
    },8000)
    setTimeout(()=>{
      SetAlldisplay(false)
      SetLoading (false)
      // SetFirtstImage(false)
      // SetSecondtImage(false)
      // SetThirdImage(false)
      // SetFourthImage(false)
      // SetLastImage(false)
      SetComegreen(true)
      SetNext(true)
    },9000)
    setTimeout(()=>{
      SetAlldisplay(false)
      SetLoading (false)

    },10000)

  }, [])


  return(
     <>
       {/*<div className=" bg-no-repeat   bg-cover  max-w-full h-screen ">*/}
       <div className=" z-30 bg-no-repeat bg-cover md:bg-cover    bg-[url('../public/Sans.jpg')] opacity-100 relative  h-screen w-screen">

         <div className="bg-gradient-to-t from-black/100 via-green-950 to-green-600 z-40 h-screen opacity-75 " ></div>
         <div className={ next ? "hidden" : "absolute  w-full md:h-[80%] h-[100%] md:top-10 top-0 flex justify-between   z-50 opacity-100  " }>
           {/*border border-white flex-row-reverse*/}
           <div className=" lg:relative md:absolute  h-[40%]  w-[100%] md:w-[80%] md:h-[40%]  md:mx-20 lg:mx-auto lg:-bottom-0 lg:w-[50%] lg:h-[100%] absolute bottom-3  flex-col  ">
             {/*<Load  border border-yellow-300/>*/}
             <div className={  loading ? `  transition duration-1000 opacity-100    h-[80%] w-[80%] mx-auto  md:w-[100%]    ` :comegreen ? "absolute transition duration-1000 opacity-100   h-0 w-0   " :" z-30 scale-x-50 scale-y-50 opacity-0  "}>
               {/*top-[35%] md:left-[36%]  md:top-[30%]    border border-yellow-300*/}
               <Image
                  src={rr.src}
                  alt={`Logo `}
                  width="600"
                  height="600"
                  className="object-contain object-center w-full h-full opacity-100     "
               />
             </div>
             <div className=" w-[100%] h-[18%] absolute bottom-12  md:bottom-10 lg:bottom-32 flex items-center justify-center ">
               {/*border border-red-600*/}

               <div className= { showCarre ?  "absolute  z-20 rounded-lg  bg-white h-12 w-12  opacity-10 left-[22%] md:left-[49%]  " :
                  separ     ?  "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[22%] md:left-[20%]    duration-1000 opacity-100   "
                     :moveright?  "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-12 w-12 left-[22%] md:left-[20%]    duration-1000 opacity-100   "
                        :moveleft ?  "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[22%] md:left-[20%]    duration-1000 opacity-100   "
                           :moveleft2?  "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[22%] md:left-[20%]    duration-1000 opacity-100   "
                              :moveright2? "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[22%] md:left-[20%]    duration-1000 opacity-100   "
                                 :moveright3? "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-12 w-12 left-[22%] md:left-[20%]    duration-1000 opacity-100   "
                                    :lastmove ?  "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[22%] md:left-[20%]    duration-1000 opacity-100   "
                                       : alldisplay?"absolute  z-20 rounded-lg  bg-white h-12 w-12  duration-1000 opacity-10 left-[22%] md:left-[49%] "
                                          :comegreen ? ""
                                             : " absolute  z-50 bg-white h-0 w-0 opacity-0 rounded   "  } >
               </div>{/*celui qui à gauche*/}

               <div className= { showCarre ? "absolute z-50 rounded-lg  bg-white h-12 w-12  left-[70%] md:left-[49%]    duration-1000 opacity-10" :
                  separ     ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[75%]      duration-1000 opacity-100 "
                     :moveright ?"absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[75%]      duration-1000 opacity-100 "
                        :moveleft ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[75%]      duration-1000 opacity-100 "
                           :moveleft2 ?"absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-12 w-12  left-[70%] md:left-[75%]    duration-1000 opacity-100 "
                              :moveright2?"absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[75%]      duration-1000 opacity-100 "
                                 :moveright3?"absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[75%]      duration-1000 opacity-100 "
                                    :lastmove ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[75%]      duration-1000 opacity-100 "
                                       :alldisplay?"absolute  z-20 rounded-lg  bg-white h-12 w-12  duration-1000 opacity-10   left-[70%] md:left-[49%] "
                                          :comegreen ? ""
                                             : "absolute z-50 rounded-lg  bg-white h-10 w-10  left-[70%] md:left-[49%]  top-[55%]    duration-1000 opacity-0"}>
               </div>{/*celui qui va à droite*/}


               <div className= { showCarre ? "absolute  z-30 bg-white h-12 w-12  transition duration-1000  opacity-10 rounded-lg left-[44%] md:left-[49%] " :
                  separ    ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-12 w-12 left-[44%] md:left-[49%]    duration-1000 opacity-100   "
                     : moveright ? "absolute z-20  bg-gray-800 border border-green-600 h-8 w-8 transition duration-1000 opacity-100 rounded-lg   left-[44%] md:left-[49.3%]   "
                        :moveleft ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-12 w-12 left-[44%] md:left-[49%]    duration-1000 opacity-100   "
                           :moveleft2 ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-8 w-8 left-[44%] md:left-[49%]    duration-1000 opacity-100   "
                              :moveright2 ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-12 w-12 left-[44%] md:left-[49%]    duration-1000 opacity-100"
                                 :moveright3 ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-8 w-8 left-[44%] md:left-[49%]      duration-1000 opacity-100   "
                                    :lastmove ?  "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-12 w-12 left-[44%] md:left-[49%]    duration-1000 opacity-100"
                                       : alldisplay ? "absolute  z-20 rounded-lg  bg-white h-10 w-10  duration-1000 opacity-10  left-[44%] md:left-[49%] "
                                          : " absolute  z-50 bg-white h-0 w-0 rounded left-[44%] md:left-[49%]  top-[56%]  scale-x-0 scale-y-0 opacity-100  "  } >
               </div>{/*celui qui doit rester o milieu*/}


               <div className= { showCarre2 ? "absolute z-20 bg-green-400 h-10 w-10 transition duration-1000 opacity-100 rounded-lg    left-[45%] md:left-[50%]   "
                  :moveright ? "absolute  z-50 rounded-lg  bg-green-400  h-8 w-8  left-[23%] md:left-[21%]      duration-1000 opacity-100   "
                     :moveleft ? "absolute  z-50 bg-green-400 h-8 w-8 rounded-lg  left-[45%] md:left-[50%]  duration-1000 opacity-100  "
                        :moveleft2 ? "absolute  z-50 bg-green-400 h-8 w-8 rounded-lg  left-[71%] md:left-[77%]  duration-1000 opacity-100  "
                           :moveright2 ? "absolute  z-50 rounded-lg  bg-green-400  h-8 w-8  left-[45%] md:left-[50%]      duration-1000 opacity-100"
                              :moveright3 ? "absolute  z-50 rounded-lg  bg-green-400  h-8 w-8  left-[23%] md:left-[21%]      duration-1000 opacity-100   "
                                 :lastmove ? "absolute  z-50 rounded-lg  bg-green-400  h-8 w-8  left-[45%] md:left-[50%]      duration-1000 opacity-100   "
                                    : alldisplay ? "absolute  z-50 bg-green-400 h-8 w-8 transition duration-1000 opacity-100 rounded  left-[45%] md:left-[50%]   scale-x-0 scale-y-0  "
                                       :comegreen ? ""
                                          : " absolute  z-20 bg-green-400 h-0 w-0 opacity-10 rounded  left-[72%] md:left-[50%]   scale-x-0 scale-y-0"  } >
               </div>
               {/*celui qui se deplace*/}

             </div>
           </div>
           <div className="top-2 flex items-center justify-center md:top-0  relative h-[55%]  p-2 w-[100%]  flex-col  md:h-[60%]  lg:w-[60%] lg:h-[88%] cursor-default  ">
             <div className="relative h-auto w-[90%] font-[Gotham] uppercase text-5xl md:text-8xl   opacity-100 text-white flex items-center justify-start">
               Bienvenu
             </div>
             <div className=" relative h-auto w-[90%] font-[Gotham] uppercase  text-7xl md:text-8xl   opacity-100 text-black flex items-center justify-start">
               a
               {/*border border-yellow-300*/}
             </div>

             <div className=" relative h-auto w-[90%] font-[Gotham] font-bold md:font-normal text-6xl md:text-9xl uppercase text-[#228434] ">
               <div className="h-auto w-[100%] flex items-center justify-start ">
                 Soueke
                 {/*border border-yellow-300  border border-white   border border-white*/}
               </div>
               <div className="h-auto w-[100%] flex items-center justify-start ">
                 Academy
               </div>
             </div>
           </div>

         </div>


         <div className={next ? "absolute top-0  h-screen w-screen  " : "hidden"}>
           <WellcomePage/>
         </div>




       </div>
     </>
  )
}