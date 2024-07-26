"use client"
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import picture from "@/public/logo/picture.png";
//import MyImage from "@/component/Img/MyImage";
import axios from 'axios';
import Style from "@/styles/Page.modules.css"
import UpdatePost from "@/component/UpdatePost";
import sans from "@/public/logo/Sans titre.png";
import process from "process";
//import f from '../../../'
// import {console} from "next/dist/compiled/@edge-runtime/primitives";

export default function Poste() {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [isSubmit,SetIsSubmit] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data

   const [loading , SetLoading ] = useState(false)
    const [id , SetId] = useState(0)
   const [modalSup ,SetModalSup ] = useState(false)
   const [modalUpdate ,SetModalUpdate ] = useState(false)
   const [myDate , SetDate] = useState("")
   //
    const [Errors,SetErrors] = useState({})
    const [ formPost ,SetPost ] = useState(false)
    const [formSchool , SetSchool] = useState(false)
   const [values, setValues] = useState({
      username: "",
      visible : "",
      evenement:"",
      media :"",
      dat: "",
      typemedia:""
   });
   const input1 = [
      { id: 1, name: "username", type: "textarae", placeholder: "Contenu",value: values.username   ,label: "Contenu du poste", className: " text-lg w-[90%] h-[100%] text-gray-50 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-52 focus:outline-none focus:border-blue-500",
         error:  !values.username?  'Veuillez signifier le contenu du post' : null
      },
      {id : 4 , name: "visible", type :"select" ,label:"Visiblite du Media",value: values.visible , className : " px-2 my-3 right-6  w-[60%] h-[50%] text-lg text-gray-400 focus:outline-none border rounded-[6px] border-sky-600 bg-transparent focus:border-blue-500  cursor-pointer  " ,option : [
            // {value: 0 ,text: },
            {value: 0 ,text: "Pour tous"},
            {value: 1 ,text: "Caché"},

         ], error:  !values.visible? 'Veuillez signifier la visibilité de ce poste': null }
   ]

   const comeBack = () =>{
      SetIsSubmit(false)

      setValues({
         username: "",
         visible: "",
         media: "",
         dat:myDate,
         evenement:"",
         typemedia:""
      });
      setSelectedFile(null);
      SetPost(false)
   }

   // Fonction pour gérer le changement de la sélection
   const handleChange2 = async (e) => {
      const { name, value } = e.target;
      // Mise à jour de la valeur dans l'état global values directement

      if (name === 'visible') {
         setValues({
            ...values,
            visible: value,
         });
         console.log(values)
      } else if ( name === 'event') {


         try {
            // Remplacez l'URL par la bonne URL de votre API
            const response = await axios.get(`${baseUrl}/evenements/get_byId2.php?nom=${value}`);
            // console.log(response.data && response.data.recu && response.data.recu.length > 0)
            if (response.data && response.data.recu && response.data.recu.length > 0) {
               // Vérifiez que la réponse contient les données attendues
               console.log(response.data.recu)
              // setFilteredData2(response.data.recu)
               //SetLoading(true)
               setValues({
                  ...values,
                  evenement: response.data.recu[0].id,
               });

               console.log(values)

            } else {
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }

      }


   };

const getDate = () =>{
   const currentDate = new Date();
   const formattedDate = currentDate.toLocaleDateString(); //obtiens la date systeme
   console.log(formattedDate)
   SetDate(formattedDate)
   setValues((prevValues) => ({
      ...prevValues,
      dat: formattedDate,
   }));
   console.log(values)
}




   const addData = async () => {
      try {
         // Vérifiez que tous les champs requis sont remplis
         if (values.username && values.visible && values.media) {
            const formData = new FormData();
            formData.append('media', values.media);
            formData.append('dat', myDate);
            formData.append('contenu', values.username);
            formData.append('visible', values.visible);
            formData.append('typeMedia', values.typemedia);
            formData.append('id_evenement', values.evenement);
            const response = await axios.post(`${baseUrl}/Poste/add_Poste.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            SetIsSubmit(false)

            setValues({
               username: "",
               visible: "",
               media: "",
               typemedia:""
            });
            setSelectedFile(null);

            getData2()
            SetPost(false)
            console.log("Truc ajouté avec succès ", response);

         }
         // Reset form fields after successful submission

      } catch (error) {
         console.error(error);
         // setLoading(false);
      }
   };
   const getData2 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/Poste/get_allPoste.php`);
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

   const deletData = async (id) => {
      //console.log(id)
      try {
         const formData = new FormData();
         // Effectuez la requête HTTP en utilisant Axios
         const response = await axios.post(`${baseUrl}/Poste/delete_Poste.php?id=${id}`, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         SetModalSup(false)
         console.log("Truc ajouté avec succès ", response);
      } catch (error) {
         console.error(error);
      }
      getData2();
      // Utilisation de useEffect pour effectuer une action après la suppression

   };


   const handleSummit = () => {
     // console.log("la date",myDate)

      SetIsSubmit(true);

      const valuesNotEmpty = Object.values(values).every(value => value !== "");

      console.log(values)
      if (valuesNotEmpty) {
         addData();

      } else {
         console.log("Veuillez remplir tous les champs avant de soumettre le formulaire.");
         // Ajoutez ici la logique pour afficher un message d'erreur ou une notification à l'utilisateur.
      }
   };

   const handleFileChange = async (event) => {
      const fileInput = event.target;
      const selectedFile1 = fileInput.files[0];

      if (selectedFile1) {
         // Vérifier si le fichier est une image en vérifiant l'extension
         const allowedExtensions = ["jpg", "jpeg","mp4","mkv","3gp","MP4"];
         const fileNameParts = selectedFile1.name.split(".");
         const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

         if (allowedExtensions.includes(fileExtension)) {
            // Si c'est une image, mettre à jour les valeurs avec le fichier sélectionné
            setSelectedFile(selectedFile1);
            console.log("Fichier sélectionné :", selectedFile1.name);

            try {
               const formData = new FormData();
               formData.append('file', selectedFile1);
               // Envoi de la requête POST avec Axios vers le serveur
               const response = await axios.post('../../pages/api/poste', formData, {
                  headers: {
                     'Content-Type': 'multipart/form-data'
                  }
               });
               console.log('File uploaded successfully:', response.data);
               // Mise à jour de la valeur media avec le chemin du fichier
               setValues((prevValues) => ({
                  ...prevValues,
                  media: `publication/${selectedFile1.name}`,
                  typemedia: selectedFile1.type,
               }));
               setSelectedFile2(selectedFile1.type)
            } catch (error) {
               console.error('Error uploading file:', error);
            }
         } else {
            // Si ce n'est pas une image, ne rien faire
            console.log("Le fichier sélectionné n'est pas une image");
         }
      } else {
         // Si aucun fichier n'est sélectionné, réinitialiser les valeurs
         setSelectedFile(null);
         setValues((prevValues) => ({
            ...prevValues,
            media: "", // Réinitialise la valeur media s'il n'y a pas de fichier sélectionné
            typemedia:""
         }));
         console.log("Aucun fichier sélectionné");
      }
   };



   //
   const handleChange = (e) => {
      const { name, value } = e.target ;
      let cleanedAddress = '';
      cleanedAddress = value.replace(/[^\w\s]/gi, '');
      setValues({...values, [name] : cleanedAddress})
      // met a jour pour les texte
      // faire ca avec label
   };
   //
   const GoToUpdate = (id) =>{
      SetModalUpdate(true)
      // const encryptedData = btoa(id);
      // router.push(`../../poste?update=${encodeURIComponent(encryptedData)}`);
      SetId(id)
   }

   useEffect(() => {
      console.log(values);
   }, []);


   const getData4 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/evenements/get_allEvent.php`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData2(response.data.recu)
            //SetLoading(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };


   useEffect(() => {
      getData2()
      getDate()
      getData4()
      console.log("la date",myDate)
   }, []);


   useEffect(() => {
      console.log(values);
   }, [values]);



   function formatDate(apiDate) {
      // Séparer la date en jour, mois et année
      const [day, month, year] = apiDate.split('/').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate;
   }


   return(

      <>
         <div className=" h-[70%] lg:h-screen ">

            <div className="relative md:absolute top-0 md:top-48 lg:top-0 z-50">
               <button className="bg-green-300 text-black h-10 w-56 m-4 rounded hover:border border-green-300 hover:bg-black hover:text-white transition duration-300 transform hover:scale-105 " onClick={ ()=> SetPost(true)}>
                  Ajouter des publications
               </button>
            </div>
            <div className="overflow-y-auto scrollbar-hidden relative z-20 h-[100%]  w-[100%] mx-auto   top-3 md:top-0  ">
               <div className="relative top-6 h-auto content-container overflow-hidden  w-[100%] ">
                  {
                     loading ? (
                           <ul>
                              {filteredData.map((mook) => (
                                 <li key={mook.id}>

                                    <div className=" relative h-[100%] w-[100%] md:w-[95%] lg:w-[80%] mx-auto  ">
                                       <div className="border-2 mx-auto border-green-400 rounded m-4 relative w-[90%] md:w-[90%] lg:w-[65%]  h-[50%]">
                                          <div className="relative h-[10%] w-[95%]  flex justify-between m-2 items-center mx-auto ">
                                             <img src={sans.src} alt="" className="absolute z-50 left-9 top-9 cursor-pointer w-[20%] h-[200%] rotate-12 "  />

                                             <div className="text-[25px] font-[gotham] font-bold text-[#072c42]">Soueck Academy</div>
                                             <div className="text-[13px] font-medium  text-[#072c42] "> <span className=" font-[poppins] font-bold italic text-white">{formatDate(mook.dat)}</span></div>
                                          </div>



                                          <div className="relative mx-auto h-[10%] w-[80%] ">
                                             {/*<img src={`data:image/png;base64,${mook.media}`} alt={`Media ${mook.id}`} className="relative h-[30%] w-[90%] mx-auto  " />*/}

                                             {mook.typeMedia.includes("image/jpeg") ? (
                                                <img
                                                   src={`/${mook.media}`}
                                                   alt={`Media ${mook.id}`}
                                                   className="relative h-[40%] w-[100%] mx-auto"
                                                />
                                             ) : mook.typeMedia.includes("video/mp4") ? (
                                                <video
                                                   src={`/${mook.media}`}
                                                   controls
                                                   onMouseEnter={(event) => { event.target.play(); }}
                                                   onMouseLeave={(event) => { event.target.pause(); }}
                                                   alt={`Video ${mook.id}`}
                                                   className="relative h-[10%] w-[60%] mx-auto"
                                                ></video>
                                             ) : null}
                                          </div>
                                          <div
                                             className="relative  h-auto w-[90%] mx-auto md:w-[100%] text-left  md:mx-auto mt-4 text-center  ">
                                             <p className="text-xs text-white md:text-[13px] font-[poppins] relative p-2 h-[100%] w-[90%] md:w-[100%] "
                                                style={{wordWrap: 'break-word'}}> {mook.contenu}</p>
                                          </div>

                                          <div className="relative h-[50%] md:w-[100%]  flex justify-between">
                                          <button className="bg-green-600 hover:bg-green-800 transition duration-300 transform hover:scale-105 text-[14px] text-white h-10 w-52  m-4 rounded  "  onClick={ ()=> GoToUpdate( `${mook.id}`)}>
                                                   Modifer
                                                </button>
                                                <p className="text-lg top-3 font-bold font-[poppins] text-center w-80 h-20">Visibilite: {mook.visible}</p>
                                                <button className="bg-red-500 hover:bg-red-800 transition duration-300 transform hover:scale-105 text-[14px] text-white h-10 w-52  m-4 rounded  " onClick={()=> {
                                                   SetModalSup(true)
                                                   SetId(`${mook.id}`)
                                                }} >
                                                   Supprimer la Publication
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
                              <div className="w-24 h-24 border-t-4 mt-32 border-red-500 border-solid  animate-spin mx-auto"></div>
                           </div>
                        )
                  }


               </div>
            </div>

         </div>


         {modalUpdate ? <UpdatePost modal={modalUpdate} SetModal={SetModalUpdate} id={id}  /> : null}



         {
            formPost ? (
               <div className="fixed top-0 left-0 z-50 bg-black/70 w-screen h-screen overflow-y-auto">
                  <div className="w-full relative flex justify-center mt-28 lg:mt-12  h-[70%]">
                     <div className={`flex justify-between relative w-[95%] md:w-[95%] lg:w-[65%]   bg-gray-900 border border-green-300  shadow rounded-lg p-2 `}>
                                 <div className="relative w-[30%] h-[50%] lg:h-[100%] mt-10 lg:mt-0    ">
                                    <div className="flex-col  items-center justify-center relative w-[100%] h-[100%]  ">
                                       <label
                                          htmlFor="imageInput"
                                          className="relative w-[100%] h-[90%]   bg-transparent border border-green-300 flex items-center justify-center cursor-pointer group"

                                       >
                                          <input
                                             type="file"
                                             id="imageInput"
                                             name="file"
                                             accept=".jpg, .jpeg, .png ,video/*"
                                             className="sr-only"
                                             onChange={handleFileChange}
                                          />
                                          <div className={selectedFile ? "hidden" :"relative h-[100%] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>
                                             <Image
                                                src={picture.src}
                                                alt={`Logo `}
                                                width="600"
                                                height="600"
                                                className="object-contain object-center w-8 h-8 text-gray-600  "
                                             />
                                                <div className="text-white text-center opacity-100 z-10"> Importer le media </div>
                                          </div>
                                          {selectedFile  && (
                                                          selectedFile2 ===    "video/mp4"  ?
                                                               <video
                                                                  src={URL.createObjectURL(selectedFile)}
                                                                  controls
                                                                  onMouseEnter={(event) => { event.target.play(); }}
                                                                  onMouseLeave={(event) => { event.target.pause(); }}
                                                                  alt="Vidéo sélectionnée"
                                                                  className="relative h-[100%]  w-[100%]   z-40"
                                                               ></video>  :
                                                               <img
                                                                  src={URL.createObjectURL(selectedFile)}
                                                                  alt="Image sélectionnée"
                                                                  className="relative h-[100%]  w-[100%]  z-40"
                                                               />
                                          )}
                                       </label>
                                       { isSubmit && !values.media ? (
                                          <div className="text-[70%] text-red-600 text-center">Veuillez sélectionner un fichier pour ce poste</div>
                                       ) : null}
                                    </div>

                                 </div>
                        <div className="flex-row  w-[70%]  h-[80%]  items-center mx-auto  space-y-3 ">
                           {input1.map((item) => (
                              <div key={item.id} className="items-center w-full relative h-[35%]    ">
                                 {/*<div className=" flex justify-center items-center  w-full bg-green-400   ">*/}
                                 {item.type === 'select' ? (
                                    <div className="absolute h-[80%] w-[100%] mx-auto left-2 space-x-2 bottom-2 ">
                                       <label
                                          className="text-md text-[20px] font-[poppins] font-medium text-white  ">{item.label}</label>
                                       <select
                                          key={item.id}
                                          name={item.name}
                                          className={item.className}
                                          onChange={handleChange2}
                                          value={values.visible || ''}
                                       >
                                          <option value={0} key={0}>Selectionnez la visibilite</option>
                                          {item.option.map((option) => (
                                             <option key={option.value} value={option.text}>
                                                {option.text}
                                             </option>
                                          ))}
                                       </select>

                                       <div>
                                          {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                          {isSubmit && item.error ? (
                                             <div className="text-[70%] text-red-600 ">{item.error}</div>
                                          ) : null}
                                       </div>
                                    </div>
                                 ) : item.type === 'textarae' ? (
                                    <div className="rounded-md h-[100%] w-[100%] mx-auto relative left-2  "
                                         key={item.id}>
                                       <label
                                          className="text-md text-[20px] font-[poppins] font-medium text-white">{item.label}</label>
                                       <div className="relative w-[100%] h-[100%] pt-2 ">
                                             <textarea
                                                placeholder={item.placeholder}
                                                name={item.name}
                                                className={item.className}
                                                rows="4"
                                                cols="30"
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
                                 ) : null

                                 }
                              </div>
                           ))}


                           <div className=" items-center w-full relative h-[30%] -top-8 ">
                              <label
                                 className="relative  w-[50%]  text-md text-[20px]  font-[poppins] font-medium text-white  ">Selectionnez
                                 l'evenement </label>

                              <select
                                 name='event'
                                 className= "px-2 my-3 right-6  w-[50%] h-[50%] text-lg text-gray-400 focus:outline-none border rounded-[6px] border-sky-600 bg-transparent focus:border-blue-500  cursor-pointer  "

                                 onChange={handleChange2}
                                 // onChange={(e) => handleChange2(e)}
                                 value={values.evenement}
                              >
                                 <option value={0} key={0}>Selectionnez l'evenement associe</option>
                                 {filteredData2.map((option) => (
                                    <option key={option.id} value={option.nom}>
                                       {option.nom}
                                    </option>
                                 ))}
                              </select>


                              <div>
                                 {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                 {isSubmit && !values.evenement ? (
                                    <div className="px-6 text-[70%] text-red-600">A quelle evenement est il rapporter </div>
                                 ) : null}
                              </div>

                           </div>


                           <div className="absolute flex items-center  bottom-3  -mx-28 md:-mx-11 lg:mx-3 ">
                              <button
                                 className="bg-green-300 text-black h-10 w-40 m-4 rounded hover:border border-green-300 hover:bg-green-700 hover:text-white transition duration-300 transform hover:scale-105 "
                                 onClick={handleSummit}>
                              Valider
                              </button>
                              <button
                                 className="bg-red-300 text-black h-10 w-40 m-4 rounded hover:border border-red-300 hover:bg-red-600 hover:text-white transition duration-300 transform hover:scale-105 "
                                 onClick={comeBack}>
                                 Annuler
                              </button>

                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            ) : null
         }


         {modalSup ? (
            <div className="fixed top-0 left-0 z-50 bg-black/70 w-screen h-screen overflow-y-auto">
               <div className="w-full flex justify-center my-52">
                  <div className={`flex relative w-[30%] bg-sky-100 shadow rounded-lg p-6 `}>
                     <div className="flex flex-col items-center justify-center mx-10  space-y-6">
                        <div className="flex flex-col items-center justify-center">
                           <h2 className={`w-[124%] `}>Vous allez supprimer cette enregistrement </h2>
                           <h2>en ete vous sure </h2>
                        </div>
                        <button className={`bg-red-500 text-white rounded w-64 h-10 hover:bg-red-400`} onClick={() => {
                           deletData(id)
                        }}>Supprimer
                        </button>
                        <button className={`bg-blue-500 text-white rounded w-64 h-10 hover:bg-blue-400`}
                                onClick={() => {
                                   SetModalSup(false)
                                }}>Annuler
                        </button>

                     </div>
                  </div>
               </div>
            </div>
         ) : null}

      </>
   )

}