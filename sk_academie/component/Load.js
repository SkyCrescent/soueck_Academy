"use client"

import  rs from "../../../public/logo/Sans titre.png"
import Image from "next/image";
import rr from "../../../public/logo/SAC Logo (Empty).png";
import rr3 from "../../../public/logo/Sans titre 2.png";
import React, {useState , useEffect} from "react";
import house from "../../../public/logo/home_127px.png";
import school from "../../../public/logo/school_127px.png";
import info from "../../../public/logo/info_127px.png";
import WelcomePage from "../../app/component/WelcomePage/WelcomePage"
export default function animation() {
   const [loading , SetLoading] = useState(false )

   const [firstImage , SetFirtstImage] = useState(false )
   const [secondImage , SetSecondtImage] = useState(false )
   const [thirdImage , SetThirdImage] = useState(false )
   const [fourthImage , SetFourthImage] = useState(false )
   const [lastImage , SetLastImage] = useState(false )



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
   const [ comegreen , SetComegreen ] = useState(false)  // Le centre define enorme et vert





   useEffect(() => {
// automatisation des dellais d'affichage des iamges
      setTimeout(()=>{
         SetLoading(true)
      },1000)
      setTimeout(()=>{
         SetFirtstImage(true)
      },1500)
      setTimeout(()=>{
         SetSecondtImage(true)
      },2000)
      setTimeout(()=>{
         SetThirdImage(true)
      },2500)
      setTimeout(()=>{
         SetFourthImage(true)
      },3000)
      setTimeout(()=>{
         SetLastImage(true)
      },3500)
      // le reste
      setTimeout(()=>{
         SetshowCarre(true)
      },4000)
      setTimeout(()=>{
         SetshowCarre2(true)
      },5000)
      setTimeout(()=>{
         SetshowCarre(false)
         SetSepar(true)
      },6000)
      setTimeout(()=>{
         SetSepar(false)
         SetMoveright ( true)
         SetshowCarre2(false)
      },7000)
      setTimeout(()=>{
         SetMoveright ( false)
         SetMoveleft(true)
      },8000)
      setTimeout(()=>{
         SetMoveleft(false)
         SetMoveleft2(true)
      },9000)
      setTimeout(()=>{
         SetMoveleft2(false)
         SetMoveright2(true)
      },10000)
      setTimeout(()=>{
         SetMoveright2(false)
         SetMoveright3(true)
      },11000)
      setTimeout(()=>{
         SetMoveright3(false)
         SetLastMove(true)
      },12000)
      setTimeout(()=>{
         SetLastMove(false)
         SetAlldisplay(true)
      },13000)
      setTimeout(()=>{
         SetAlldisplay(false)
         SetLoading (false)
         SetFirtstImage(false)
         SetSecondtImage(false)
         SetThirdImage(false)
         SetFourthImage(false)
         SetLastImage(false)
         SetComegreen(true)
      },14000)
      setTimeout(()=>{
         SetAlldisplay(false)
         SetLoading (false)
      },14000)

   }, [])


   useEffect(() => {

   }, []);
   return(
      <>
         <div className="bg-transparent h-[100%] content-container overflow-hidden   ">
            <div className="flex  justify-between h-screen w-[100%]  ml-1 ">
               {/*border border-red-600*/}
               <div className= {  fourthImage ? "h-[19%] w-[16%]  flex justify-center absolute top-[18%] left-[25%]  opacity-100 duration-100 " : "h-[14%] w-[16%] opacity-0  absolute " }      >
                  <Image
                     src={rs.src}
                     alt={`Logo `}
                     width="300"
                     height="300"
                     className="object-contain object-center w-full h-full rotate-45  "
                  />{/*opacity-0 hover:opacity-40 duration-300*/}
               </div>
               {/*border border-sky-600*/}
               <div className= {  secondImage ? "h-[30%] w-[20%]  absolute bottom-[25%] left-[24%]  opacity-100 duration-200 " : "h-[20%] w-[10%] items-center absolute bottom-0 left-0 opacity-0 " } >
                  <Image
                     src={rr3.src}
                     alt={`Logo `}
                     width="600"
                     height="600"
                     className="object-contain object-center w-full h-full  "
                  />
               </div>
               {/*border border-pink-600*/}
               <div className= {  thirdImage ? "absolute h-[14%] w-[10%]   right-[26%] top-[26%] opacity-100 duration-200 " : "h-[14%] w-[100%] opacity-0 " } >
                  <Image
                     src={rs.src}
                     alt={`Logo `}
                     width="600"
                     height="600"
                     className="object-contain object-center w-full h-full  "
                  />{/*opacity-0 hover:opacity-40 duration-300*/}
               </div>
               {/*border border-yellow-600*/}
               <div className= {  lastImage ? "absolute h-[20%] w-[20%]  bottom-[24%] right-[24%] opacity-100 duration-200 " : "h-[14%] w-[20%] opacity-0 " }  >
                  <Image
                     src={rs.src}
                     alt={`Logo `}
                     width="600"
                     height="600"
                     className="object-contain object-center w-full h-full rotate-45  "
                  />{/*opacity-0 hover:opacity-40 duration-300*/}
               </div>

               <div className= { showCarre ?  "absolute  z-20 rounded-lg  bg-white h-10 w-10  opacity-10 left-[22%] md:left-[49%]  top-[55%]   md:top-[55%] " :
                  separ     ?  "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[22%] md:left-[40%]  top-[55.6%]  duration-1000 opacity-100   "
                     :moveright?  "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-10 w-10 left-[22%] md:left-[40%]  top-[55%]    duration-1000 opacity-100   "
                        :moveleft ?  "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[22%] md:left-[40%]  top-[55%]    duration-1000 opacity-100   "
                           :moveleft2?  "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[22%] md:left-[40%]  top-[55%]    duration-1000 opacity-100   "
                              :moveright2? "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[22%] md:left-[40%]  top-[55%]    duration-1000 opacity-100   "
                                 :moveright3? "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-10 w-10 left-[22%] md:left-[40%]  top-[55%]    duration-1000 opacity-100   "
                                    :lastmove ?  "absolute  z-20 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[22%] md:left-[40%]  top-[55%]    duration-1000 opacity-100   "
                                       : alldisplay?"absolute  z-20 rounded-lg  bg-white h-10 w-10  duration-1000 opacity-10 left-[22%] md:left-[49%]  top-[55%] "
                                          :comegreen ? ""
                                             : " absolute  z-50 bg-white h-0 w-0 opacity-0 rounded   "  } >
               </div>{/*celui qui à gauche*/}

               <div className= { showCarre ? "absolute z-50 rounded-lg  bg-white h-10 w-10  left-[70%] md:left-[49%]  top-[55%]    duration-1000 opacity-10" :
                  separ     ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[58%]  top-[55.6%]    duration-1000 opacity-100 "
                     :moveright ?"absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[58%]  top-[55.6%]    duration-1000 opacity-100 "
                        :moveleft ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[58%]  top-[55.6%]    duration-1000 opacity-100 "
                           :moveleft2 ?"absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-10 w-10  left-[70%] md:left-[58%]  top-[55%]    duration-1000 opacity-100 "
                              :moveright2?"absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[58%]  top-[55.6%]    duration-1000 opacity-100 "
                                 :moveright3?"absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[58%]  top-[55.6%]    duration-1000 opacity-100 "
                                    :lastmove ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600 h-8 w-8  left-[70%] md:left-[58%]  top-[55.6%]    duration-1000 opacity-100 "
                                       :alldisplay?"absolute  z-20 rounded-lg  bg-white h-10 w-10  duration-1000 opacity-10   left-[70%] md:left-[49%]  top-[55%] "
                                          :comegreen ? ""
                                             : "absolute z-50 rounded-lg  bg-white h-10 w-10  left-[70%] md:left-[49%]  top-[55%]    duration-1000 opacity-0"}>
               </div>{/*celui qui va à droite*/}


               <div className= { showCarre ? "absolute  z-30 bg-white h-10 w-10  transition duration-1000  opacity-10 rounded-lg left-[44%] md:left-[49%]  top-[55%] " :
                  separ    ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-10 w-10 left-[44%] md:left-[49%]  top-[55%]    duration-1000 opacity-100   "
                     : moveright ? "absolute z-20  bg-gray-800 border border-green-600 h-8 w-8 transition duration-1000 opacity-100 rounded-lg   left-[44%] md:left-[49.3%]  top-[55.6%] "
                        :moveleft ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-10 w-10 left-[44%] md:left-[49%]  top-[55%]    duration-1000 opacity-100   "
                           :moveleft2 ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-8 w-8 left-[44%] md:left-[49%]  top-[55%]    duration-1000 opacity-100   "
                              :moveright2 ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-10 w-10 left-[44%] md:left-[49%]  top-[55%]    duration-1000 opacity-100"
                                 :moveright3 ? "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-8 w-8 left-[44%] md:left-[49%]  top-[55.6%]    duration-1000 opacity-100   "
                                    :lastmove ?  "absolute  z-50 rounded-lg  bg-gray-800 border border-green-600  h-10 w-10 left-[44%] md:left-[49%]  top-[55%]    duration-1000 opacity-100"
                                       : alldisplay ? "absolute  z-20 rounded-lg  bg-white h-10 w-10  duration-1000 opacity-10  left-[44%] md:left-[49%]  top-[55%] "
                                          : " absolute  z-50 bg-white h-0 w-0 rounded left-[44%] md:left-[49%]  top-[56%]  scale-x-0 scale-y-0 opacity-100  "  } >
               </div>{/*celui qui doit rester o milieu*/}


               <div className= { showCarre2 ? "absolute z-20 bg-green-400 h-8 w-8 transition duration-1000 opacity-100 rounded-lg    left-[45%] md:left-[49.3%]  top-[55.6%] "
                  :moveright ? "absolute  z-50 rounded-lg  bg-green-400  h-8 w-8  left-[23%] md:left-[40.3%]  top-[55.6%]    duration-1000 opacity-100   "
                     :moveleft ? "absolute  z-50 bg-green-400 h-8 w-8 rounded-lg  left-[45%] md:left-[49.3%] top-[55.6%] duration-1000 opacity-100  "
                        :moveleft2 ? "absolute  z-50 bg-green-400 h-8 w-8 rounded-lg  left-[71%] md:left-[58.3%] top-[55.6%] duration-1000 opacity-100  "
                           :moveright2 ? "absolute  z-50 rounded-lg  bg-green-400  h-8 w-8  left-[45%] md:left-[49.3%]  top-[55.6%]    duration-1000 opacity-100"
                              :moveright3 ? "absolute  z-50 rounded-lg  bg-green-400  h-8 w-8  left-[23%] md:left-[40.3%]  top-[55.6%]    duration-1000 opacity-100   "
                                 :lastmove ? "absolute  z-50 rounded-lg  bg-green-400  h-8 w-8  left-[45%] md:left-[49.3%]  top-[55.6%]    duration-1000 opacity-100   "
                                    : alldisplay ? "absolute  z-50 bg-green-400 h-8 w-8 transition duration-1000 opacity-100 rounded  left-[45%] md:left-[49.3%] top-[55.6%]  scale-x-0 scale-y-0  "
                                       :comegreen ? ""
                                          : " absolute  z-20 bg-green-400 h-0 w-0 opacity-10 rounded  left-[72%] md:left-[49%] top-[55.8%]  scale-x-0 scale-y-0"  } >
               </div>


               <div className={  loading ? `  transition duration-1000 opacity-100  relative h-[70%] w-[80%] mx-auto    md:w-[95%]   border border-yellow-300  ` :comegreen ? "absolute transition duration-1000 opacity-100   h-0 w-0   " :" z-30 scale-x-50 scale-y-50 opacity-0  "}>
                  {/*top-[35%] md:left-[36%]  md:top-[30%]*/}
                  <Image
                     src={rr.src}
                     alt={`Logo `}
                     width="600"
                     height="600"
                     className="object-contain object-center w-full h-full opacity-100     "
                  />
               </div></div>
            <div className= {comegreen ?  " absolute  bg-transparent  h-full w-full  left-0  top-0 duration-1000 opacity-100  " :  " opacity-0 left-0  top-0"} >
               {/*<WelcomePage/>*/}
            </div>
         </div>

      </>
   )

}