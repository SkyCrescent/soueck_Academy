
"use client"
import  rs from "../../../../public/logo/Sans titre.png"
import Image from "next/image";
import rr3 from "../../../../public/logo/Sans titre 2.png";
import rr4 from "../../../../public/logo/nouvelle.jpg"

export default function MyImage() {

   return(
      <>
         {/*<div className=" h-screen   z-10 border border-orange-700  ">*/}
            <div className={"h-[100%] w-[100%] mx-auto  absolute opacity-60 duration-100 border border-yellow-600" }>

                     <Image
                        src={rr4.src}
                        alt={`Logo `}
                        width="600"
                        height="600"
                        className="mx-auto object-center h-[100%] w-[100%]   "
                     />
                  </div>
         {/*</div>*/}
            {/*<div className="flex  justify-between h-screen w-[100%]  ml-1 ">*/}

            {/*   <div className={"h-[20%] w-[10%] top-[3%] left-6  absolute opacity-10 duration-75 " }>*/}

            {/*      <Image*/}
            {/*         src={rs.src}*/}
            {/*         alt={`Logo `}*/}
            {/*         width="600"*/}
            {/*         height="600"*/}
            {/*         className="object-contain object-center w-full h-full rotate-45  "*/}
            {/*      />*/}
            {/*   </div>*/}
            {/*   <div className= {  "h-[10%] w-[15%] absolute  top-[30%] opacity-10 duration-100  "  } >*/}
            {/*      <Image*/}
            {/*         src={rr3.src}*/}
            {/*         alt={`Logo `}*/}
            {/*         width="600"*/}
            {/*         height="600"*/}
            {/*         className="object-contain object-center w-full h-full rotate-45  "*/}
            {/*      />*/}
            {/*   </div>*/}
            {/*   <div className= {  "h-[30%] w-[16%] flex justify-center absolute top-[45%]   opacity-10 duration-100 "  }      >*/}
            {/*      <Image*/}
            {/*         src={rs.src}*/}
            {/*         alt={`Logo `}*/}
            {/*         width="300"*/}
            {/*         height="300"*/}
            {/*         className="object-contain object-center w-full h-full rotate-45  "*/}
            {/*      />*/}
            {/*   </div>*/}
            {/*   <div className= {  "h-[10%] w-[20%]  absolute bottom-1 left-0  opacity-10 duration-200 "  } >*/}
            {/*      <Image*/}
            {/*         src={rr3.src}*/}
            {/*         alt={`Logo `}*/}
            {/*         width="600"*/}
            {/*         height="600"*/}
            {/*         className="object-contain object-center w-full h-full  "*/}
            {/*      />*/}
            {/*   </div>*/}
            {/*   <div className= { "absolute h-[14%] w-[10%]   right-1 top-1 opacity-10 duration-200 "  } >*/}
            {/*      <Image*/}
            {/*         src={rs.src}*/}
            {/*         alt={`Logo `}*/}
            {/*         width="600"*/}
            {/*         height="600"*/}
            {/*         className="object-contain object-center w-full h-full  "*/}
            {/*      />*/}
            {/*   </div>*/}
            {/*   <div className= { "h-[20%] w-[16%]  fixed top-[20%]  opacity-10 right-1 duration-200 "  }  >*/}
            {/*      <Image*/}
            {/*         src={rr3.src}*/}
            {/*         alt={`Logo `}*/}
            {/*         width="600"*/}
            {/*         height="600"*/}
            {/*         className="object-contain object-center w-full h-full rotate-45  "*/}
            {/*      />*/}
            {/*   </div>*/}
            {/*   <div className= {  "h-[15%] w-[16%] top-[50%] absolute  right-1 opacity-10 duration-200 "  }  >*/}
            {/*      <Image*/}
            {/*         src={rs.src}*/}
            {/*         alt={`Logo `}*/}
            {/*         width="600"*/}
            {/*         height="600"*/}
            {/*         className="object-contain object-center w-full h-full rotate-45  "*/}
            {/*      />*/}
            {/*   </div>*/}
            {/*   <div className= {  "h-[20%] w-[20%] absolute  bottom-1 right-1 opacity-10 duration-200 "  } >*/}
            {/*      <Image*/}
            {/*         src={rs.src}*/}
            {/*         alt={`Logo `}*/}
            {/*         width="300"*/}
            {/*         height="300"*/}
            {/*         className="object-contain object-center w-full h-full  "*/}
            {/*      />*/}
            {/*   </div>*/}
            {/*</div>*/}


      </>
   )

}