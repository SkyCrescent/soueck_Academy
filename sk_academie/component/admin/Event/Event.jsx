"use client"
import { useState, useEffect } from "react";
import React from "react";
import Infos from "@/components/Admin/Infos";
import Concerned from "@/components/Admin/Interessed/Concerned";
import axios from "axios";
import style from '@/styles/Page.css'
//import Pied2 from '@/component/'
import { usePathname, useRouter ,useSearchParams } from "next/navigation";
import process from "process";

export default function Event({id}){
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

   const [loading , SetLoading ] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all dat
   const [filteredData1, setFilteredData1] = useState([]); // Initialize with all dat

   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all dat

   const [modalEvent ,SetEvent ] = useState(false)
   const [options , SetOptions] = useState(null)
   const [formDelete , SetDelete] = useState(false)
   const [Concerned , SetConcerned ] = useState(false)

   const [MyId , SetId] = useState(0)

let couleur2 = ""
   const [Nom ,SetNom] = useState("")
   const [date_deb ,Setdate_deb] = useState("")
   const [date_fin ,Setdate_fin] = useState("")
   const [concept ,SetConcept] = useState("")
   const [etat ,SetEtat] = useState('')
   const [couleur ,Setcouleur] = useState('')
   const [photo ,setPhoto] =useState('')
      let nom = ""
   const pathname = usePathname();


   const getData1 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/partners/get_byId.php?id=${id}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("la jointure",response.data.recu)
            setFilteredData1(response.data.recu)
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
         const response = await axios.get(`${baseUrl}/infos/get_byId.php?id_evenement=${id}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("la jointure2",response.data.recu)
             setFilteredData2(response.data.recu)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   const getData = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/evenements/get_byId.php?id=${id}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("la jointure",response.data.recu)
            setFilteredData(response.data.recu)
            SetNom(response.data.recu[0].nom)
            Setdate_fin(response.data.recu[0].date_fin)
            Setdate_deb(response.data.recu[0].date_debut)
            SetConcept(response.data.recu[0].concept_devellope)
            SetEtat(response.data.recu[0].etat)
            couleur2 === response.data.recu[0].couleur
            Setcouleur(response.data.recu[0].couleur)
            setPhoto(response.data.recu[0].photo)
            console.log(response.data.recu[0].couleur)
            SetLoading(true)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   // function formatDate(apiDate) {
   //    const options = { day: 'numeric', month: 'long', year: 'numeric' };
   //    const formattedDate = new Date(apiDate).toLocaleDateString('fr-FR', options);
   //    return formattedDate;
   // }
   //fonction pour mettre les datese
   useEffect(() => {
      getData()
      getData2()
      getData1()
       //console.log("ddd",SetNom)
   }, []);
   const deletData = async (MyId) => {
      // console.log(MyId)
      try {
         const formData = new FormData();
         // Effectuez la requête HTTP en utilisant Axios
         const response = await axios.post(`${baseUrl}/infos/delete_Info.php?id_evenement=${id}`, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         SetDelete(false)
         getData()
         console.log("Truc ajouté avec succès ", response);
      } catch (error) {
         console.error(error);
      }

   };

   return(
      <>
         {/*<div className="h-screen w-screen">*/}
         <div className={pathname.includes('seeEvents') ? 'hidden' : 'relative w-[100%] h-[15%] top-3 '}>

            {/*<div className="relative w-[100%] h-[15%] top-0 ">*/}
            <div className=" relative left-[50%] justify-center w-[50%]  flex items-center    h-[50%]">
               <button
                  className="w-[20%] h-10 lg:w-fit bg-blue-500 hover:bg-green-800 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-normal"
                  onClick={() => {
                     SetEvent(true)
                  }}>Nouvelle Informations
               </button>

            </div>
         </div>

         <div className=" relative w-[100%] h-[100%]     overflow-y-auto scrollbar-hidden">
            <div
               className="relative w-[80%] h-auto mx-auto  space-y-3 items-center justify-center">
               <div
                  className="relative w-[60%] h-10  mx-auto bg-red-700 font-black text-white text-2xl flex items-center justify-center mt-9">
                  Photo de Couverture de {Nom}
               </div>
               <div
                  className="relative w-[60%]   h-auto  mx-auto  font-black text-white text-2xl flex items-center justify-center ">
                  <img
                     src={`/${photo}`}
                     alt={`Media `}
                     className="relative h-[70%] w-[90%] mx-auto"
                  />
               </div>

            </div>


            <div
               className="relative w-[96%] h-auto mx-auto  space-y-6 items-center justify-center">


               {filteredData2.map((mook) => (
                  <div key={mook.id}>

                     <div className=" relative space-y-6 h-[100%]  w-[100%] md:w-[100%] mx-auto mb-9">

                        <div className="bg-red-900 h-10 w-[50%] mx-2 rounded-tr-full justify-center">

                           <h1
                              className="text-xl py-4 px-4 text-white bg-clip-text  font-semibold my-9 leading-4 uppercase"
                              style={{wordWrap: 'break-word'}}>
                              {mook.paragraphe}</h1>
                        </div>
                        <div
                           className="relative w-[100%] text-sm mt-24  leading-tight  text-justify font-[Poppins]  mx-auto h-auto flex justify-between items-center  flex-row">
                           <div className=" relative w-[100%]  h-[20%] ">
                              <div className="relative h-[50%]  w-[80%] mx-8 ">
                                 <span className="relative h-[100%] w-[70%] text-lg  font-[Poppins] "
                                       style={{wordWrap: 'break-word'}}>
                                    {mook.contenu}.</span>
                              </div>
                           </div>
                        </div>

                        <div
                           className={pathname.includes('seeEvents') ? 'hidden' : 'relative h-[50%] w-[100%] md:w-[60%] mx-auto text-center flex justify-between'}>

                           {/*<button*/}
                           {/*   className="bg-green-500 text-[14px] text-black h-10 w-48 m-4 rounded hover:bg-green-300   "*/}
                           {/*   onClick={() => GoToUpdate(`${mook.id}`)}>*/}
                           {/*   Modifer*/}
                           {/*</button>*/}
                           <button
                              className="bg-red-500 text-[14px] text-black h-10 w-52  m-4 rounded hover:bg-red-400"
                              onClick={() => {
                                 SetDelete(true)
                                 SetId(`${mook.id}`)
                              }}>
                              Supprimer la Publication
                           </button>
                        </div>
                     </div>
                     {/* Vous pouvez ajuster la balise img en fonction du format de votre media */}
                  </div>
               ))}

            </div>


            <div
               className="relative w-[60%] mt-6  h-10  mx-auto bg-red-700 font-black text-white text-2xl flex items-center justify-center mt-9">
               Liste des Partenaires de {Nom}
            </div>

            <div
               className="relative w-[90%]  mt-6  h-auto mx-auto  space-y-6 items-center justify-center">


               <div className="grid grid-cols-3  relative w-[100%] h-[100%] mt-3   z-50 ">

                  {
                     loading
                        ? (
                           filteredData1.map((subItem, subIndex) => (

                              <div key={subItem.key} className={` w-[50%] h-[90%]   mx-auto`}
                                   onMouseEnter={() => SetOptions(subIndex)}
                                   onMouseLeave={() => SetOptions(null)}>

                                 <div className=" h-[75%] w-[100%]  ">
                                    <img src={`/${subItem.photo}`} alt={`Media ${subItem.id}`}
                                         className="relative h-[100%] w-[100%]    "/>
                                 </div>

                                 <div className=" h-[25%] w-[100%]  ">
                                    <div className=" h-[70%] w-[100%]  ">
                                       <div className="font-semibold "><span
                                          className="font-bold font-[gotham] text-xl">{subItem.Nom}</span></div>
                                       <div className="font-semibold "> Se basant dans :<span
                                          className="font-bold font-[gotham] text-[12px]"  style={{wordWrap: 'break-word'}}>{subItem.domaine}</span></div>
                                    </div>
                                    <div className=" h-[30%] w-[100%] mt-2  ">
                                       <div className="font-normal text-[11px] text-gray-800">Contactable au Numéro <span
                                          className=" font-[gotham] ">{subItem.contact}</span></div>

                                    </div>
                                 </div>

                              </div>
                           ))
                        )
                        : (
                           <div
                              className="flex items-center justify-center  relative w-[100%] mx-96 bg-transparent text-xl">
                              <div
                                 className="w-32 h-32 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                           </div>
                        )
                  }


               </div>


            </div>
            {/*<div className="relative w-screen">*/}
            {/*   <Pied2/>*/}
            {/*</div>*/}
            <div className="relative w-[100%] ">
               <Pied2/>
            </div>
         </div>

         {/*</div>*/}

         {modalEvent ? <Infos modal={modalEvent} SetModal={SetEvent} id={id}/> : null}

         {
            formDelete ? (
               <div className="fixed top-0 left-0 z-50 bg-black/70 w-screen h-screen overflow-y-auto">
                  <div className="w-full flex justify-center my-52">
                     <div className={`flex relative w-[30%] bg-sky-100 shadow rounded-lg p-6 `}>
                        <div className="flex flex-col items-center justify-center mx-10  space-y-6">
                           <div className="flex flex-col items-center justify-center">
                              <h2 className={`w-[124%] `}>Vous allez supprimer cette enregistrement </h2>
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