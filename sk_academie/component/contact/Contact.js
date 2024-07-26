import Image from "next/image";
import adresse from "../../public/logo/home_address_127px.png";
import phone from "../../public/logo/phone_127px.png";
import mail from "../../public/logo/mail_127px.png";
import React from "react";

export default function Contact(){




   return(
      <>
         <div className="relative  w-[90%] mx-auto h-[80%] md:h-[60%] lg:h-[80%] md:mx-auto md:w-[95%] lg:w-[80%] top-6 md:top-28 lg:top-6  rounded">
           <div className="relative w-[100%] h-[8%] flex justify-between items-center ">
              <div className="relative w-[50%] "></div>
              <div className="relative w-[100%] mx-auto md:w-[80%] lg:w-[50%] font-[Gotham] text-base uppercase md:text-4xl font-semibold text-right text-[#072c42] right-3 ">Voici Nos Contact</div>
           </div>

            <div className="relative w-[100%] h-[90%] flex  md:justify-between cursor-default ">

               <div className="relative w-[100%] h-[100%] flex flex-col text-xl font-[Gotham] text-gray-300   p-2 font-normal ">
                                    {/*<div className="relative w-[100%] h-[10%] flex-col ">*/}

                                    {/*</div>*/}

                  <div className="relative w-[100%] h-[15%] md:w-[80%] md:h-[30%] mx-auto flex  items-center">
                        <Image
                           src={adresse.src}
                           alt={`Logo `}
                           width="300"
                           height="300"
                           className="object-contain object-center w-auto h-full   "
                        />
                  <span className="relative  w-[200%] text-xs md:text-3xl lg:text-4xl  font-semibold font-[Gotham] text-black text-center ">60 Avenue Dennis Sassou Nguesso centre ville de Brazzaville</span>
               </div>



                  <div className="relative w-[100%] h-[15%] md:w-[80%] md:h-[30%] mx-auto flex  items-center">
                     <Image
                        src={phone.src}
                        alt={`Logo `}
                        width="300"
                        height="300"
                        className="object-contain object-center w-auto h-full   "
                     />
                     <span className="relative  w-[200%] text-xs md:text-3xl lg:text-4xl  font-semibold font-[Gotham] text-black text-center ">06 732 63 77 / 05 512 25 79</span>
                  </div>

                  <div className="relative w-[100%] h-[15%] md:w-[80%] md:h-[30%] mx-auto flex  items-center">
                     <Image
                        src={mail.src}
                        alt={`Logo `}
                        width="300"
                        height="300"
                        className="object-contain object-center w-auto h-full   "
                     />
                     <span className="relative  w-[200%] text-xs md:text-3xl lg:text-4xl  font-semibold font-[Gotham] text-black text-center">Souekeacademy@gmail.com</span>
                  </div>



               </div>



               {/*text-xl font-[Gotham] text-gray-300 space-y-9  p-4 font-normal*/}


            </div>
         </div>

      </>
   )
}