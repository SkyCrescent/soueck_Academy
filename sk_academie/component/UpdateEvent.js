import React from "react";
import { useState, useEffect } from "react";

import Image from "next/image";
import picture from "@/public/logo/picture.png";
import axios from 'axios';
import process from "process";
// import {console} from "next/dist/compiled/@edge-runtime/primitives";

export default function UpdateEvent({modal,SetModal,id}){
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const [isSubmit,SetIsSubmit] = useState(false)
   const [selectedFile, setSelectedFile] = useState(null);
   const [recu,setrecu] = useState([])
   const [Errors,SetErrors] = useState({})
   const [Myid , SetId] = useState(0)
   const [Choice , SetChoice] = useState(false)

   const [values, setValues] = useState({
      username: "",
      media :"",
      dateD:"",
      dateF:""
   });
   const VerifUrl = async () =>{
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response =  await axios.get(`${baseUrl}/evenements/get_byId.php?id=${id}`);
         console.log("cc",response.data.recu)
         setrecu (response.data.recu)
         SetId(id)
         setValues({
            username: response.data.recu[0].nom ,
            dateD: response.data.recu[0].date_debut , // Assurez-vous que le champ 'visible' est correctement mis à jour
            dateF: response.data.recu[0].date_fin , // Assurez-vous que le champ 'media' est correctement mis à jour
            media: response.data.recu[0].photo ,
            //typeMedia:response.data.recu[0].typeMedia
         });
         console.log(values)
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }
   useEffect(() => {
      console.log(values);
   }, [values]);
   useEffect(() => {
   }, [values]);


   const handleChange = (e) => {
      const { name, value } = e.target ;
      // met a jour pour les texte
      // faire ca avec label
      if (name === 'username') {
         let cleanedAddress = '';
         cleanedAddress = value.replace(/[^\w\s]/gi, '');
         setValues({
            ...values,
            username: cleanedAddress,
         });
      } else {
         setValues({...values, [name] : value})
      }
      // met a jour pour les texte
      // faire ca avec label
   };

   const currentDate = new Date();
   const formattedDate = currentDate.toLocaleDateString(); //obtiens la date systeme

   const handleSummit = () => {
      SetIsSubmit(true);

      const valuesNotEmpty = Object.values(values).every(value => value !== "");

      if (valuesNotEmpty) {
         updateData();
      } else {
         console.log("Veuillez remplir tous les champs avant de soumettre le formulaire.");
         // Ajoutez ici la logique pour afficher un message d'erreur ou une notification à l'utilisateur.
      }
   };

   const input1 = [
      { id: 1, name: "username", type: "text", placeholder: "Nom",value: values.username   ,label: "Nom de l'evenement", className: " text-lg w-[98%] h-[100%] text-gray-50 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-52 focus:outline-none focus:border-blue-500",
         error:  !values.username?  'Veuillez signifier le contenu du post' : null
      },

      { id: 2, name: "dateD",type: "date",minDate : "2024-02-10",value: values.dateD  ,maxDate : "2028-12-10", placeholder: "Debut de l'evenement", label: "Debut de l'evenement", className: "text-lg w-[90%] h-[100%] text-gray-50 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-52 focus:outline-none focus:border-blue-500",
         error: values.dateD ? null : 'Quel jour votre evenement commence?' , img: `` },

      { id: 2, name: "dateF",type: "date",minDate : "2024-02-10",value: values.dateF  ,maxDate : "2028-12-10", placeholder: "birthday", label: "Fin de l'evenement", className: "text-lg w-[90%] h-[100%] text-gray-50 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-52 focus:outline-none focus:border-blue-500",
         error: values.dateF ? null : 'Quel jour votre evenelent se termine?' , img: `` }
   ]

   useEffect(() => {
      VerifUrl();
   }, []);
      const updateData = async (id) => {
         try {
            // Vérifiez que tous les champs requis sont remplis
            if (values.username && values.dateD && values.media && values.dateF ) {
                  console.log("id",Myid)
               const formData = new FormData();
               formData.append('id', Myid);

               formData.append('nom', values.username);
               formData.append('date_debut',values.dateD);
               formData.append('date_fin',values.dateF);
               formData.append('photo',values.media);
               console.log("FormData content:");
               const response = await axios.post(`${baseUrl}/evenements/updateEvent.php?id=${Myid}`, formData, {
                  headers: {
                     'Content-Type': 'multipart/form-data',
                  },
               });
               console.log("Truc ajouté avec succès ", response);
            }
            SetModal(false)
            setValues({
               username: "",
               media :"",
               dateD:"",
               dateF:""
            });
         } catch (error) {
            console.error(error);
            // setLoading(false);
         }
      };


   return(
      <>

         <div className="fixed top-0 left-0 z-50 bg-black/70 w-screen h-screen overflow-y-auto">
            <div className="w-full relative flex justify-center mt-12  h-[70%]">
               <div className={`flex justify-between  relative w-[95%]  lg:w-[80%]  bg-gray-900 border border-green-300  shadow rounded-lg p-2 `}>
                  <div className="relative w-[30%] h-[100%] mt-8 md:mt-16 lg:mt-0  ">
                     <div
                        className="flex-col  items-center justify-center relative w-[100%] h-[30%] md:h-[50%] lg:h-[100%] top-9 md:top-3 lg:top-0  ">


                        <img
                           src={`/${values.media}`}
                           alt={`Media ${values.id}`}
                           className="relative h-[100%]   w-[100%] mx-auto"
                        />
                     </div>

                  </div>
                  <div className="flex-row  w-[60%]  h-[70%] mt-8 md:mt-16 lg:mt-0  items-center mx-auto  ">
                     {input1.map((item) => (
                        <div key={item.id} className="items-center w-full relative h-[30%]     ">
                           {/*<div className=" flex justify-center items-center  w-full bg-green-400   ">*/}
                           { item.type === 'text' ? (
                              <div className="rounded-md h-[50%] w-[100%] mx-auto relative    "
                                   key={item.id}>
                                 <label
                                    className="text-md text-[20px] font-[poppins] font-medium text-white">{item.label}</label>
                                 <div className="relative w-[100%] h-[100%]  ">
                                    <input
                                       placeholder={item.placeholder}
                                       name={item.name}
                                       className={item.className}
                                       // rows="4"
                                       // cols="30"
                                       value={item.value}
                                       onChange={(e) => handleChange(e)}
                                    />

                                 </div>
                                 <div>
                                    {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                    {isSubmit && item.error ? (
                                       <div className="text-[70%] text-red-600">{item.error}</div>
                                    ) : null}
                                 </div>

                              </div>
                           ) : (
                              <div className="rounded-md h-[90%] mx-auto     " key={item.id}>

                                 <label
                                    className="text-md text-[20px] font-[poppins] font-medium text-white">{item.label}</label>
                                 <div className="relative h-[60%]   pt-2">
                                    <input
                                       placeholder={item.placeholder}
                                       type={item.type}
                                       min={item.minDate}
                                       max={item.maxDate}
                                       name={item.name}
                                       className={item.className}
                                       onChange={(e) => handleChange(e)}
                                       value={item.value}
                                       defaultValue={item.defaultValue}
                                    />
                                    {item.img ? (
                                       <img src={item.img} alt=""
                                            className="absolute right-3 top-[22%] cursor-pointer"
                                            width={40} height={40} onClick={() => showChar(item.id)}/>
                                    ) : null}
                                 </div>
                                 <div>
                                    {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                    {isSubmit && item.error ? (
                                       <div className="text-[70%] text-red-600">{item.error}</div>
                                    ) : null}
                                 </div>


                              </div>

                           )

                           }
                        </div>
                     ))}
                     <div className="absolute flex items-center  bottom-3 -mx-28 md:-mx-16 lg:mx-0 ">
                        <button className="bg-green-300 text-black h-10 w-40 m-4 rounded hover:border border-green-300 hover:bg-green-700 hover:text-white transition duration-300 transform hover:scale-105 "  onClick={handleSummit}>
                           Valider
                        </button>
                        <button className="bg-red-300 text-black h-10 w-40 m-4 rounded hover:border border-red-300 hover:bg-red-600 hover:text-white transition duration-300 transform hover:scale-105 " onClick={()=>{ SetModal(false)}}>
                           Annuler
                        </button>


                     </div>
                  </div>

               </div>
            </div>
         </div>
      </>
   )
}