"use client"
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import picture from "../../../public/logo/picture.png";
import MyImage from "@/component/Img/MyImage";
import axios from "axios";
import Style from "../../../styles/Page.modules.css"
import Link from "next/link";
//import SeeSchool from "@/SeeSchool";
import process from "process";
export default function School({id}) {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const [loading , SetLoading ] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [Tosearch , Setsearch] = useState("")
   const [MyId , SetId] = useState(0)
   const [options , SetOptions] = useState(null)
   const [ formPost , SetPost ] = useState(false)
   const [formSchool , SetSchool] = useState(false)
   const [formDelete , SetDelete] = useState(false)


   const getData = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/School/get_byId2.php?id_evenement=${id}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("la jointure",response.data.recu)
            setFilteredData(response.data.recu)
            console.log(response.data.recu[0].id)
            SetId(response.data.recu[0].id)
            SetLoading(true)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   const getData2 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/Study/get_byIdEcole.php?id_ecole=${MyId}`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici",response.data.recu)
            setFilteredData2(response.data.recu)
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
    //  console.log("ddd",MyId)
   }, []);

   const GoToUpdate = (id) =>{
      SetSchool(true)
      SetId(id)
   }
   const comeBack =() =>{
     // SetClean(false)
      SetSchool(false)

   }
   const deletData = async (MyId) => {
     // console.log(MyId)
      try {
         const formData = new FormData();
         // Effectuez la requête HTTP en utilisant Axios
         const response = await axios.post(`${baseUrl}/School/delete_school.php?id=${MyId}`, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });

         //console.log("Truc ajouté avec succès ", response);

         const response2 = await axios.post(`${baseUrl}/Study/deleteBySchool.php?id=${MyId}`, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         SetDelete(false)
         getData()
        // console.log("Truc ajouté avec succès ", response2);

      } catch (error) {
         console.error(error);
      }
   };

   return(

      <>
         <div className="relative w-[100%] h-[100%]">
               {/*<MyImage/>*/}

            <div className="overflow-y-auto scrollbar-hidden relative h-[100%]  w-[100%]   ">
               <div className="relative top-3 h-auto content-container overflow-hidden ">
                  <div className="w-full shadow-lg ">
                     <div className="grid grid-cols-10 text-xs p-2 md:p-4  bg-blue-500 md:uppercase">
                        <h2 className="text-white font-[Poppins] col-span-2">Photo de L'ecole</h2>
                        <h2 className="text-white font-[Poppins] col-span-2 ">Nom de L'ecole</h2>
                        <h2 className="text-white font-[Poppins] col-span-2">Adresse</h2>
                        <h2 className="text-white font-[Poppins] col-span-2">Contact</h2>

                     </div>
                     {
                        loading
                           ? (
                              filteredData.map((subItem, subIndex) => (
                                 <div  className={subIndex % 2 === 0 ? 'bg-transparent border-b border-blue-400  cursor-pointer font-medium text-black hover:bg-gray-100 '  : 'bg-transparent text-black border-b border-blue-400 font-medium cursor-pointer hover:bg-gray-100'}>
                                    <li key={subIndex}
                                        className={`border-b border-blue-400 py-3 px-2 md:px-10  grid grid-cols-10 
                                  ${subIndex % 2 === 0 ? "bg-transparent" : "bg-transparent"} text-black  md:font-[Poppins] cursor-pointer items-center hover:bg-gray-200 `
                                        }
                                        onMouseEnter={() => SetOptions(subIndex)}
                                        onMouseLeave={() => SetOptions(null)}
                                    >
                                       <a className="relative col-span-2 h-16 md:h-20 " >   <img src={`/${subItem.photo}`} alt={`Media ${subItem.id}`} className="relative h-[100%] w-[80%] md:w-[40%] rounded-full   " />
                                       </a>
                                       <a className="col-span-2 md:h-8"  >{subItem.nom}</a>
                                       <a className="col-span-2 mx-1 md:h-8 " >{subItem.adresse}</a>
                                       <a className="col-span-2 md:mx-4 h-8" >{subItem.phone}</a>
                                       <a>{options === subIndex ? (
                                          <div className="flex flex-col gap-2 md:flex-row md:gap-1  lg:gap-5 w-20 md:w-52  md:h-8">
                                             <button className="bg-blue-500 text-white rounded md:w-60 h-full hover:bg-black" onClick={()=> GoToUpdate( `${subItem.id}`)} > Eleves</button>
                                             <button className="bg-red-500 text-white rounded md:w-60 h-full hover:bg-black" onClick={()=>{
                                                SetId(`${subItem.id}`)
                                                SetDelete(true)
                                             }}> Supprimer</button>
                                          </div>
                                       ): null
                                       }</a>
                                    </li>

                                    {/* Ajoutez d'autres informations ici si nécessaire */}
                                 </div>
                              ))
                           )
                           : (
                              <div className="flex items-center justify-center p-12 bg-transparent text-xl">
                                 <div className="w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                              </div>
                           )
                     }
                  </div>

               </div>
            </div>


         </div>


         {
            formSchool ? (
              <SeeSchool modal={formSchool} SetModal={SetSchool} id={MyId} />
            ) : null
         }

         {
            formDelete ? (
               <div className="fixed top-0 left-0 z-50 bg-black/70 w-screen h-screen overflow-y-auto">
                  <div className="w-full flex justify-center my-52 md:my-96 lg:my-52">
                     <div className={`flex relative w-[80%] flex items-center justify-center md:w-[90%] lg:w-[30%] bg-sky-100 shadow rounded-lg p-6 `}>
                        <div className="flex flex-col items-center justify-center mx-10  space-y-6">
                           <div className="flex flex-col items-center justify-center">
                              <h2 className={`w-[124%] text-center`}>Vous allez supprimer cette ecole </h2>
                              <h2>en ete vous sure </h2>
                           </div>
                           <button className={`bg-red-500 text-white rounded w-64 h-10 hover:bg-red-400`} onClick={()=>{deletData(MyId)}}>Supprimer</button>
                           <button className={`bg-blue-500 text-white rounded w-64 h-10 hover:bg-blue-400`} onClick={()=>{SetDelete(false)}} >Annuler</button>
                        </div>
                     </div>
                  </div>
               </div>
            ) : null
         }
      </>
   )

}