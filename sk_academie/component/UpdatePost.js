import React from "react";
import { useState, useEffect } from "react";

import Image from "next/image";
import picture from "@/public/logo/picture.png";
import axios from 'axios';
import process from "process";

export default function UpdatePost({modal,SetModal,id}){
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const [isSubmit,SetIsSubmit] = useState(false)
   const [selectedFile, setSelectedFile] = useState(null);
   const [recu,setrecu] = useState([])
   const [Errors,SetErrors] = useState({})
   const [Myid , SetId] = useState(0)
   const [Choice , SetChoice] = useState(false)

   const [values, setValues] = useState({
      username: "",
      visible : "",
      media :null,
      dat:"",
      typeMedia:"",
      modif: ""
   });
   const VerifUrl = async () =>{
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response =  await axios.get(`${baseUrl}/Poste/get_byId.php?id=${id}`);
         console.log("cc",response.data.recu)
         setrecu (response.data.recu)
         //SetId(response.data.recu.id)
         // Mettre à jour setVide à true si newPasswordValue est vide
              // console.log(response.data.recu.contenu)
         // Mise à jour de l'état selectedFile si l'image existe
         if (response.data.recu[0].media) {
            const file = new File([response.data.recu[0].media], response.data.recu[0].media);
            setSelectedFile(file);
            setValues(prevValues => ({
               ...prevValues,
               media: file,
            }));
         }

         SetId(id)
         setValues({
            username: response.data.recu[0].contenu ,
            visible: response.data.recu[0].visible , // Assurez-vous que le champ 'visible' est correctement mis à jour
            media: response.data.recu[0].media , // Assurez-vous que le champ 'media' est correctement mis à jour
            dat: response.data.recu[0].dat ,
            typeMedia:response.data.recu[0].typeMedia
         });
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }
   useEffect(() => {
      console.log(values);
   }, [values]);
   useEffect(() => {
   }, [values]);

   const handleFileChange = (event) => {
      const fileInput = event.target;
      const selectedFile = fileInput.files[0];

      if (selectedFile) {
         setSelectedFile(selectedFile);
         setValues((prevValues) => ({
            ...prevValues,
            media: selectedFile, // Set the file object, not its content
         }));
         SetChoice(true)
         // Other code...
      } else {
         setSelectedFile(null);
         setValues((prevValues) => ({
            ...prevValues,
            media: null,
         }));
         // Other code...
      }
   };


   const handleChange = (e) => {
      const { name, value } = e.target ;
      let cleanedAddress = '';
      cleanedAddress = value.replace(/[^\w\s]/gi, '');
      setValues({...values, [name] : cleanedAddress})
      // met a jour pour les texte
      // faire ca avec label
   };
   const handleChange2 = (e) => {
      const { value } = e.target;
      // Mise à jour de la valeur dans l'état global values directement
      setValues({
         ...values,
         visible: value,
      });
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
      { id: 1, name: "username", type: "textarae", placeholder: "Contenu",value: values.username   ,label: "Contenu du poste", className: " text-lg w-[90%] h-[100%] text-gray-50 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-52 focus:outline-none focus:border-blue-500",
         error:  !values.username?  'Veuillez signifier le contenu du post' : null
      },
      {id : 4 , type :"select" ,label:"Visiblite du Media",value: values.visible , className : " px-2 my-3 right-6  w-[60%] h-[50%] text-lg text-gray-400 focus:outline-none border rounded-[6px] border-sky-600 bg-transparent focus:border-blue-500  cursor-pointer  " ,option : [
            // {value: 0 ,text: },
            {value: 0 ,text: "Pour tous"},
            {value: 1 ,text: "Caché"},

         ], error:  !values.visible? 'Veuillez signifier la visibilité de ce poste': null }
   ]

   useEffect(() => {
      VerifUrl();
   }, []);
      const updateData = async (id) => {
         try {
            // Vérifiez que tous les champs requis sont remplis
            if (values.username && values.media && values.visible ) {
                  console.log("id",Myid)
               const formData = new FormData();
               formData.append('media', values.media);
               formData.append('id', Myid);

               formData.append('dat', values.dat);
               formData.append('contenu', values.username);
               formData.append('visible', values.visible);
               formData.append('modif', Choice);
               console.log("FormData content:");
               const response = await axios.post(`${baseUrl}/Poste/updatePoste.php?id=${Myid}`, formData, {
                  headers: {
                     'Content-Type': 'multipart/form-data',
                  },
               });
               console.log("Truc ajouté avec succès ", response);
            }
            SetModal(false)
            setValues({
               username: '',
               visible: "",
               media: null,
               dat: "",
               typeMedia:""
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
                     <div className="flex-col  items-center justify-center relative w-[100%] h-[30%] md:h-[50%] lg:h-[100%] top-9 md:top-3 lg:top-0  ">
                        {selectedFile  && (
                           values.typeMedia.includes('image') ? (
                              <img
                                 src={`/${values.media}`}
                                 alt={`Media ${values.id}`}
                                 className="relative h-[100%] border border-red-500 top-1 w-[100%] mx-auto"
                              />
                           ) : values.typeMedia.includes('video') ? (
                              <video
                                 src={`/${values.media}`}
                                 controls
                                 onMouseEnter={(event) => { event.target.play(); }}
                                 onMouseLeave={(event) => { event.target.pause(); }}
                                 alt={`Video ${values.id}`}
                                 className="relative h-[60%] top-6 w-[100%] mx-auto "
                              ></video>
                           ) : null

                        )}
                        {/*{ isSubmit && !values.media ? (*/}
                        {/*   <div className="text-[70%] text-red-600 text-center">Veuillez sélectionner un fichier pour ce poste</div>*/}
                        {/*) : null}*/}
                     </div>

                  </div>
                  <div className="flex-row  w-[70%]  h-[70%] mt-8 md:mt-16 lg:mt-0  items-center mx-auto  ">
                     {input1.map((item) => (
                        <div key={item.id} className="items-center w-full relative h-[50%]    ">
                           {/*<div className=" flex justify-center items-center  w-full bg-green-400   ">*/}
                           {item.type === 'select' ? (
                              <div className="absolute h-[55%] w-[100%] mx-auto left-2 space-x-2 bottom-2 ">
                                 <label className="text-md text-[20px] font-[poppins] font-medium text-white  ">{item.label}</label>
                                 <select
                                    key={item.id}
                                    className={item.className}
                                    onChange={handleChange2}
                                    value={values.visible || ''}
                                 >
                                    {item.option.map((option) => (
                                       <option key={option.value} value={option.text}>
                                          {option.text}
                                       </option>
                                    ))}
                                 </select>

                                 <div>
                                    {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                    { isSubmit && item.error ? (
                                       <div className="text-[70%] text-red-600 ">{item.error}</div>
                                    ) : null}
                                 </div>
                              </div>
                           ) : (
                              <div className="rounded-md h-[100%] w-[100%] mx-auto relative left-2  " key={item.id}>
                                 <label className="text-md text-[20px] font-[poppins] font-medium text-white">{item.label}</label>
                                 <div className="relative w-[100%] h-[100%] pt-2 ">
                                             <textarea
                                                placeholder={item.placeholder}
                                                name={item.name}
                                                className={item.className}
                                                value={item.value}
                                                rows = "4"
                                                cols = "30"
                                                onChange={(e) => handleChange(e)}
                                             />

                                 </div>
                                 <div>
                                    {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                    { isSubmit && item.error ? (
                                       <div className="text-[70%] text-red-600">{item.error}</div>
                                    ) : null}
                                 </div>

                              </div>
                           )}
                           {/*</div>*/}
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