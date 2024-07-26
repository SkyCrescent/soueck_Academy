"use client"
import Image from "next/image";
import React, {useState , useEffect} from "react";
import picture from "../../public/logo/picture.png";
import axios from "axios";
import rr from "../../public/logo/SAC Logo F2 - X.png";
import adresse from "../../public/logo/home_address_127px.png";
import Comment from "@/component/comment/Comment";
import sans from "../../public/logo/Sans titre.png"
import comments from  "../../public/logo/topic_127px.png"
import process from "process"
export default function Acceuil() {
   //const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const [loading , SetLoading ] = useState(false)
   const [id , SetId] = useState(0)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [comment, setcomment] = useState(false); // Initialize with all data

   const getData = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/Poste/get_allPoste2.php`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData(response.data.recu)
            SetLoading(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };
   useEffect(() => {
      getData()
      console.log(baseUrl)
   }, []);


   function formatDate(apiDate) {
      // Séparer la date en jour, mois et année
      const [day, month, year] = apiDate.split('/').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate;
   }

   function GoToComment(){

   }
  return (
    <>

       <div className="overflow-y-auto scrollbar-hidden relative z-20 h-[100%]  w-[100%] mx-auto   top-3 md:top-0   ">
          <div className="relative top-6 h-auto content-container overflow-hidden  w-[100%] ">
             {
                loading ? (
                      <ul>
                         {filteredData.map((mook) => (
                            <li key={mook.id}>

                               <div className=" relative h-[100%] w-[100%] md:w-[90%] lg:w-[80%] mx-auto  ">
                                  <div className="border-2 mx-auto border-green-400 rounded m-4 relative w-[90%] md:w-[100%] lg:w-[55%]  h-[50%]">
                                     <div className="relative h-[10%] w-[95%]  flex justify-between m-2 items-center mx-auto ">
                                        <img src={sans.src} alt="" className="absolute z-50 left-3 top-9 cursor-pointer w-[20%] h-[200%] rotate-12 "  />

                                        <div className="text-[16px] md:text-[32px] lg:text-[25px] font-[gotham] font-bold text-[#072c42] cursor-default">Soueke Academy</div>
                                        <div className="text-[13px] md:text-[18px] lg:text-[13px] font-medium  text-[#072c42] cursor-default "> <span className=" font-[poppins] font-bold italic text-white">{formatDate(mook.dat)}</span></div>
                                     </div>



                                     <div className="relative mx-auto h-[10%] w-[80%] ">
                                        {/*<img src={`data:image/png;base64,${mook.media}`} alt={`Media ${mook.id}`} className="relative h-[30%] w-[90%] mx-auto  " />*/}
                                        {mook.typeMedia.includes('image') ? (
                                           <img
                                              src={`/${mook.media}`}
                                              alt={`Media ${mook.id}`}
                                              className="relative h-[40%] w-[100%] mx-auto"
                                           />
                                        ) : mook.typeMedia.includes('video') ? (
                                           <video
                                              src={`/${mook.media}`}
                                              controls
                                              onMouseEnter={(event) => { event.target.play(); }}
                                              onMouseLeave={(event) => { event.target.pause(); }}
                                              alt={`Video ${mook.id}`}
                                              className="relative h-[20%] w-[100%] mx-auto"
                                           ></video>
                                        ) : null}
                                     </div>
                                     <div className="relative h-auto w-[90%] mx-auto md:w-[100%] text-left md:mx-auto mt-4  text-center">
                                        <p className="text-xs text-white  md:text-[13px] font-[poppins] relative p-3 h-[100%] w-[90%] md:w-[100%] cursor-default" style={{ wordWrap: 'break-word' }}>{mook.contenu}</p>
                                     </div>

                                     <div className="relative h-[90%] md:h-[100%] lg:h-[60%] w-[100%]  md:w-[80%] mx-auto text-center flex items-center justify-between ">

                                                 <button className=" flex items-center justify-evenly rounded relative bg-sky-500 text-[16px] font-[Poppins] text-black h-[100%] w-[70%] m-4 mx-auto  hover:bg-sky-200  transition duration-300 transform hover:scale-105   "
                                                         onClick={ ()=>{ setcomment(true)
                                                         SetId(mook.id)}}>
                                                   Ajouter un commentaires
                                                 </button>

                                     </div>
                                  </div>

                               </div>
                               {/* Vous pouvez ajuster la balise img en fonction du format de votre media */}
                            </li>
                         ))}
                      </ul>)
                   : (
                      <div className="flex items-center justify-center p-12 bg-transparent text-xl">
                         <div className="w-24 h-24 border-t-4 mt-32 border-red-500 border-solid rounded-full animate-spin mx-auto"></div>
                      </div>
                   )
             }


          </div>
       </div>



       {
          comment ? <Comment   modal={comment} SetModal={setcomment} id={id}/> :null
       }

    </>
  );
}



