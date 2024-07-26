"use client"
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import picture from "../../../public/logo/picture.png";
import axios from "axios";
import process from "process";

export default function UpdateSchool(){
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const [clean , SetClean] = useState(true)
   const [Errors,SetErrors] = useState({})
   const [isSubmit,SetIsSubmit] = useState(false)
   const [selectedFile, setSelectedFile] = useState(null);
   const [selectedFile2, setSelectedFile2] = useState(null);
   const [selectedFile3, setSelectedFile3] = useState(null);
   const [selectedFile4, setSelectedFile4] = useState(null);
   const [selectedImage1 , SetselectedImage1] = useState(false)
   const [selectedImage2 , SetselectedImage2] = useState(false)
   const [selectedImage3 , SetselectedImage3] = useState(false)
   const [selectedImage4 , SetselectedImage4] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data

   const [values, setValues] = useState({
      nameSchool: "",
      adresse : "",
      phone:"",
      media:null,

   });
   const [study1, setstudy1] = useState({
      name: "",
      prenom : "",
      age:"",
      classe:"",
      media:null,

   });
   const [study2, Setstudy2] = useState({
      name: "",
      prenom : "",
      age:"",
      classe:"",
      media:"",
   });
   const [study3, Setstudy3] = useState({
      name: "",
      prenom : "",
      age:"",
      classe:"",
      media:"",

   });

   const input1 = [
      { id: 1, name: "nameSchool", type: "text", placeholder: "Nom de L'ecole",value:  values.nameSchool   ,label: "Nom de L'Ecole", className: "text-[9px] md:text-xs relative h-[100%] w-[90%] text-gray-300 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-8 focus:outline-none focus:border-blue-500",
         error:  values.nameSchool? /[^\w\d]+/.test( values.nameSchool) ? 'Les caractères spéciaux ne sont pas autorise'
            : null : 'Veuillez signifier le nom de votre ecole'
      },
      { id: 2, name: "adresse", type: "text", placeholder: "Adresse de l'ecole",value: values.adresse    , label: "Adresse de l'ecole", className: "text-[9px] md:text-xs relative h-[100%] w-[90%] text-gray-300 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-8 focus:outline-none focus:border-blue-500",
         error: values.adresse? /[^\w\d]+/.test(values.adresse) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : /[\d]+/.test(values.email)?"Ce champs ne doit pas contenir des chiffre "
            :values.adresse.length < 8? 'Doit avoir au moins 8 caracteres': null  : 'Veuillez signifier l\'Adresse de votre ecole '
      },
      { id: 3, name: "phone",value:values.phone  ,type: "number", placeholder: "Numero de Telephone de l'ecole", label: "Numero de Telephone de l'ecole", className: "text-[9px] md:text-xs relative h-[100%] w-[90%] text-gray-300 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-8 focus:outline-none focus:border-blue-500",
         error:values.phone ? values.phone.length < 8? 'Doit avoir au moins 8 caracteres': /[^\w\d]+/.test(values.phone) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : null :'Veuillez renseigner votre numero de telephone ' }
   ]
   const input2 = [
      { id: 1, name: "name", type: "text", placeholder: "Nom",value:study1.name   ,label: "Nom de l'eleve", className:  "text-[9px] md:text-xs relative w-[95%] h-[100%] py-2 px-4  text-gray-300 border rounded-[10px] border-sky-600 bg-transparent   focus:outline-none focus:border-blue-500",
         error:  study1.name? /[^\w\d]+/.test( study1.name) ? 'Ce champ ne doit pas contenir de caractères spéciaux'
               : /[\d]+/.test( study1.name)?"Ce champs ne doit pas contenir des chiffre "
                  : study1.name.length < 8? 'Doit avoir au moins 8 caracteres': null
            : 'Veuillez signifier votre nom'
      },
      { id: 2, name: "prenom", type: "text", placeholder: "Prenom",value:study1.prenom    , label: "Prenom de l'eleve", className:  "text-[9px] md:text-xs relative w-[95%] h-[100%] py-2 px-4 text-gray-300 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-8 focus:outline-none focus:border-blue-500",
         error: study1.prenom? /[^\w\d]+/.test(study1.prenom) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : /[\d]+/.test(study1.prenom)?"Ce champs ne doit pas contenir des chiffre "
            :study1.prenom.length < 8? 'Doit avoir au moins 8 caracteres': null  : 'Veuillez signifier votre Prénom'
      },
      { id: 3, name: "age", type: "number", placeholder: "Age ",value:study1.age  , label: "Age de l'eleve", className:  "text-[6px] md:text-xs relative w-[100%] h-[100%] px-1 md:py-2 md:px-4 text-gray-300 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4  focus:outline-none focus:border-blue-500",
         error:study1.age ? study1.age.length < 8? 'Doit avoir au moins 8 caracteres': /[^\w\d]+/.test(study1.age) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : null :'Ce champ Password ne doit pas etre vide ' }
      ,
      { id: 4, name: "classe", type: "text", placeholder: "Classe",value:study1.classe    , label: "Classe de l'eleve", className:  "text-[6px] md:text-xs relative w-[100%] h-[100%] px-1 md:py-2 md:px-4 text-gray-300 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4  focus:outline-none focus:border-blue-500",
         error: study1.classe? /[^\w\d]+/.test(study1.classe) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : /[\d]+/.test(study1.classe)?"Ce champs ne doit pas contenir des chiffre "
            :study1.classe.length < 8? 'Doit avoir au moins 8 caracteres': null  : 'Veuillez signifier votre Prénom'
      }
   ]

   const input3 = [
      { id: 1, name: "name", type: "text", placeholder: "Nom",value: study2.name   ,label: "Nom de l'eleve", className:  "text-[9px] md:text-xs relative w-[95%] h-[100%] py-2 px-4 text-gray-300 border rounded-[10px] border-sky-600 bg-transparent  focus:outline-none focus:border-blue-500",
         error:  study2.name? /[^\w\d]+/.test( study2.name) ? 'Ce champ ne doit pas contenir de caractères spéciaux'
               : /[\d]+/.test( study2.name)?"Ce champs ne doit pas contenir des chiffre "
                  : study2.name.length < 8? 'Doit avoir au moins 8 caracteres': null
            : 'Veuillez signifier votre nom'
      },
      { id: 2, name: "prenom", type: "text", placeholder: "Prenom",value: study2.prenom    , label: "Prenom de l'eleve", className:  "text-[9px] md:text-xs w-[95%] h-[100%] text-gray-300 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500",
         error: study2.prenom? /[^\w\d]+/.test(study2.prenom) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : /[\d]+/.test(study2.prenom)?"Ce champs ne doit pas contenir des chiffre "
            :study2.prenom.length < 8? 'Doit avoir au moins 8 caracteres': null  : 'Veuillez signifier votre Prénom'
      },
      { id: 3, name: "age", type: "number", placeholder: "Age ",value: study2.age  , label: "Age de l'eleve", className:  "text-[6px] md:text-xs relative w-[100%] h-[100%] px-1 md:py-2 md:px-4 text-gray-300 border rounded-[10px] border-sky-600 bg-transparent  focus:outline-none focus:border-blue-500",
         error:study2.age ? study2.age.length < 8? 'Doit avoir au moins 8 caracteres': /[^\w\d]+/.test(study2.age) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : null :'Ce champ Password ne doit pas etre vide ' }
      ,
      { id: 4, name: "classe", type: "text", placeholder: "Classe",value: study2.classe    , label: "Classe de l'eleve", className:  "text-[6px] md:text-xs relative w-[100%] h-[100%] px-1 md:py-2 md:px-4 text-gray-300 border rounded-[10px] border-sky-600 bg-transparent focus:outline-none focus:border-blue-500",
         error: study2.classe? /[^\w\d]+/.test(study2.classe) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : /[\d]+/.test(study2.classe)?"Ce champs ne doit pas contenir des chiffre "
            :study2.classe.length < 8? 'Doit avoir au moins 8 caracteres': null  : 'Veuillez signifier votre Prénom'
      }
   ]
   const input4 = [
      { id: 1, name: "name", type: "text", placeholder: "Nom",value:study3.name   ,label: "Nom de l'eleve", className:  "text-[9px] md:text-xs relative w-[95%] h-[100%] py-2 px-4 text-gray-300 border rounded-[10px] border-sky-600 bg-transparent  focus:outline-none focus:border-blue-500",
         error:  study3.name? /[^\w\d]+/.test( study3.name) ? 'Ce champ ne doit pas contenir de caractères spéciaux'
               : /[\d]+/.test( study3.name)?"Ce champs ne doit pas contenir des chiffre "
                  : study3.name.length < 8? 'Doit avoir au moins 8 caracteres': null
            : 'Veuillez signifier votre nom'
      },
      { id: 2, name: "prenom", type: "text", placeholder: "Prenom",value:study3.prenom    , label: "Prenom de l'eleve", className:  "text-[9px] md:text-xs w-[95%] h-[100%] text-gray-300 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500",
         error: study3.prenom? /[^\w\d]+/.test(study3.prenom) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : /[\d]+/.test(study2.prenom)?"Ce champs ne doit pas contenir des chiffre "
            :study3.prenom.length < 8? 'Doit avoir au moins 8 caracteres': null  : 'Veuillez signifier votre Prénom'
      },
      { id: 3, name: "age", type: "number", placeholder: "Age ",value:study3.age  , label: "Age", className:  "text-[6px] md:text-xs relative w-[100%] h-[100%] px-1 md:py-2 md:px-4 text-gray-300 border rounded-[10px] border-sky-600 bg-transparent  focus:outline-none focus:border-blue-500",
         error:study3.age ? study3.age.length < 8? 'Doit avoir au moins 8 caracteres': /[^\w\d]+/.test(study3.age) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : null :'Ce champ Password ne doit pas etre vide ' }
      ,
      { id: 4, name: "classe", type: "text", placeholder: "Classe",value:study3.classe    , label: "Classe de l'eleve", className:  "text-[6px] md:text-xs relative w-[100%] h-[100%] px-1 md:py-2 md:px-4 text-gray-300 border rounded-[10px] border-sky-600 bg-transparent focus:outline-none focus:border-blue-500",
         error: study3.classe? /[^\w\d]+/.test(study3.classe) ? 'Ce champ ne doit pas contenir de caractères spéciaux' : /[\d]+/.test(study3.classe)?"Ce champs ne doit pas contenir des chiffre "
            :study3.classe.length < 8? 'Doit avoir au moins 8 caracteres': null  : 'Veuillez signifier votre Prénom'
      }
   ]
   const getData = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/School/get_byId.php?id=${id}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("la jointure",response.data.recu)
            setFilteredData(response.data.recu)
            console.log(response.data.recu[0].photo)
            //SetId(response.data.recu[0].id)
            if (response.data.recu[0].photo) {
               const file = new File([response.data.recu[0].photo], response.data.recu[0].photo);
               setSelectedFile(file);
               setValues(prevValues => ({
                  ...prevValues,
                  media: file,
               }));
            }

            //SetLoading(true)
            setValues({
               nameSchool: response.data.recu[0].nom,
               adresse : response.data.recu[0].adresse,
               phone:response.data.recu[0].phone,
               media:response.data.recu[0].photo,
            });


         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   const handleFileChange = (event) => {
      const fileInput = event.target;
      const selectedFile = fileInput.files[0];

      if (selectedFile) {
         setSelectedFile(selectedFile);
         setValues((prevValues) => ({
            ...prevValues,
            media: selectedFile, // Set the file object, not its content
         }));
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
   const handleFileChange2 = (event) => {
      const fileInput = event.target;
      const selectedFile2 = fileInput.files[0];

      if (selectedFile2) {
         setSelectedFile2(selectedFile2);
         setstudy1((prevValues) => ({
            ...prevValues,
            media: selectedFile2,
         }));
         SetselectedImage2(false)
         console.log(fileInput.files[0])
         console.log("fichier sélectionné frr", selectedFile2.name);
         // Vous pouvez effectuer d'autres opérations avec le fichier si nécessaire
      } else {
         setSelectedFile2(null);
         setstudy1((prevValues) => ({
            ...prevValues,
            media: "", // Réinitialise la valeur media s'il n'y a pas de fichier sélectionné
         }));
         SetselectedImage2(true)
         console.log("Aucun fichier sélectionné");
      }
   };

   const handleFileChange3 = (event) => {
      const fileInput = event.target;
      const selectedFile3 = fileInput.files[0];

      if (selectedFile3) {
         setSelectedFile3(selectedFile3);
         Setstudy2((prevValues) => ({
            ...prevValues,
            media: selectedFile3,
         }));
         console.log(fileInput.files[0])
         console.log("fichier sélectionné frr", selectedFile3.name);
         // Vous pouvez effectuer d'autres opérations avec le fichier si nécessaire
      } else {
         setSelectedFile3(null);
         Setstudy2((prevValues) => ({
            ...prevValues,
            media: "", // Réinitialise la valeur media s'il n'y a pas de fichier sélectionné
         }));
         console.log("Aucun fichier sélectionné");
      }
   };
   const handleFileChange4 = (event) => {
      const fileInput = event.target;
      const selectedFile4 = fileInput.files[0];

      if (selectedFile4) {
         setSelectedFile4(selectedFile4);
         Setstudy3((prevValues) => ({
            ...prevValues,
            media: selectedFile4,
         }));
         console.log(fileInput.files[0])
         console.log("fichier sélectionné frr", selectedFile4.name);
         // Vous pouvez effectuer d'autres opérations avec le fichier si nécessaire
      } else {
         setSelectedFile4(null);
         Setstudy3((prevValues) => ({
            ...prevValues,
            media: "", // Réinitialise la valeur media s'il n'y a pas de fichier sélectionné
         }));
         console.log("Aucun fichier sélectionné");
      }
   };


   const handleChange = (e) => {
      const { name, value } = e.target ;
      setValues({...values, [name] : value})
      // met a jour pour les texte
      // faire ca avec label
   };
   const handleChange2 = (e) => {
      const { name, value } = e.target ;
      setstudy1({...study1, [name] : value})
      // met a jour pour les texte
      // faire ca avec label
   };


   const handleChange3 = (e) => {
      const { name, value } = e.target ;
      Setstudy2({...study2, [name] : value})
      // met a jour pour les texte
      // faire ca avec label
   };
   const handleChange4 = (e) => {
      const { name, value } = e.target ;
      Setstudy3({...study3, [name] : value})
      // met a jour pour les texte
      // faire ca avec label
   };
   //


   const handleSummit=()=>{
      SetIsSubmit(true)
      console.log(values)
      const hasErrors = Object.values(Errors).some((error) => error);
      if (!hasErrors) {
         // S'il n'y a pas d'erreur, appelez addData
         // addData();
      }
   }




   const getData2 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/Study/get_byIdEcole.php?id_ecole=${id}`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici",response.data.recu)
            setFilteredData2(response.data.recu)
            if (response.data.recu[0].image) {
               const file = new File([response.data.recu[0].image], response.data.recu[0].image);
               setSelectedFile2(file);
               setstudy1(prevValues => ({
                  ...prevValues,
                  media: file,
               }));
            }


            if (response.data.recu[1].image) {
               const file = new File([response.data.recu[1].image], response.data.recu[1].image);
               setSelectedFile3(file);
               Setstudy2(prevValues => ({
                  ...prevValues,
                  media: file,
               }));
            }


            if (response.data.recu[2].image) {
               const file = new File([response.data.recu[2].image], response.data.recu[2].image);
               setSelectedFile4(file);
               Setstudy3(prevValues => ({
                  ...prevValues,
                  media: file,
               }));
            }
            //SetLoading(true)
            setstudy1({
               name: response.data.recu[0].name,
               prenom : response.data.recu[0].prenom,
               age:response.data.recu[0].age,
               classe:response.data.recu[0].classe,
               media:response.data.recu[0].image,
            });
            Setstudy2({
               name: response.data.recu[1].name,
               prenom : response.data.recu[1].prenom,
               age:response.data.recu[1].age,
               classe:response.data.recu[1].classe,
               media:response.data.recu[1].image,
            });
            Setstudy3({
               name: response.data.recu[2].name,
               prenom : response.data.recu[2].prenom,
               age:response.data.recu[2].age,
               classe:response.data.recu[2].classe,
               media:response.data.recu[2].image,
            });
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   useEffect(() => {
      getData()
      //console.log("ddd",MyId)
   }, []);
   useEffect(() => {
      getData2()
      //console.log("ddd",MyId)
   }, []);

   useEffect(() => {
      console.log(values);
   }, [values]);
   useEffect(() => {
   }, [values]);
   const comeBack =() =>{
      //SetClean(false)
      SetModal(false)

   }


   return(
      <>
         <div className="fixed top-2 left-0 z-50 bg-transparent w-screen h-screen overflow-y-auto">
            <div className="w-[100%]  md:w-[68%] flex justify-center mx-auto h-[96%]    ">
               <div className={`flex justify-between relative w-[90%] h-[100%]  bg-gray-900   shadow rounded-lg p-2 `}>
                  {/*<div className="absolute w-[20%] h-[20%] z-0 "><MyImage/></div>*/}

                  <div className="w-[98%] md:w-[100%] h-[98%] border-2 border-green-600 rounded-lg flex-col justify-evenly m-1 md:m-2   ">
                     <div className="h-[40%] w-[95%] mx-auto mt-2  p-2 space-x-2 rounded flex justify-between ">

                        <div className=" w-[30%] h-[100%]    ">
                           <div className="flex-col  items-center justify-center relative w-[100%] h-[98%]  ">
                              <label
                                 htmlFor="imageInput"
                                 className="relative w-[100%] h-[90%]  rounded-full  bg-transparent border border-green-300 flex items-center justify-center cursor-pointer group"

                              >
                                 <input
                                    type="file"
                                    id="imageInput"
                                    name="file"
                                    accept=".jpg, .jpeg, .png "
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
                                    <div className="text-gray-400 text-center opacity-100 z-10"> Importer le media </div>
                                 </div>
                                 {selectedFile  && (
                                    <img
                                       src={`data:image/png;base64,${values.media}`}
                                       // src={URL.createObjectURL(selectedFile)}
                                       alt="Image sélectionnée"
                                       className="relative h-[100%]  w-[100%] rounded-full  z-40"
                                    />

                                 )}
                              </label>
                              { isSubmit && !values.media ? (
                                 <div className="text-[70%] text-red-600 text-center">Veuillez sélectionner un fichier pour ce poste</div>
                              ) : null}
                           </div>

                        </div>

                        <div className=" w-[65%] h-[100%]   ">
                           {input1.map((item) => (
                              <div key={item.id} className="items-center relative h-[33%] w-[100%]   ">
                                 {
                                    <div className="rounded-md  mx-auto relative h-[90%] w-[100%]" key={item.id}>
                                       <label className="text-[9px] md:text-[12px] font-[poppins] font-medium text-white  relative h-[30%] w-[50%]">{item.label}</label>
                                       <div className=" relative h-[60%] w-[100%]   ">
                                          <input
                                             placeholder={item.placeholder}
                                             name={item.name}
                                             className={ isSubmit && item.error ?
                                                " md:text-xs w-[90%] text-gray-300  rounded-[10px]  bg-transparent py-2 px-4 h-8 focus:outline-none focus:border-blue-500 border border-red-600"
                                                : item.className}
                                             type={item.type}
                                             onChange={(e) => handleChange(e)}
                                             value={item.value}
                                             // defaultValue = {item.defaultValue}
                                          />

                                       </div>
                                       <div>
                                       </div>

                                    </div>
                                 }
                                 {/*</div>*/}
                              </div>
                           ))}

                        </div>



                     </div>

                     <div className="relative h-[40%] w-[100%] md:w-[95%]  md:mx-auto  rounded flex justify-between items-center ">
                        <div className="h-[90%] w-[34%] md:w-[30%] border border-green-400 rounded-lg m-1 md:m-4 flex-col justify-evenly">
                           <div className="  h-[40%] w-[100%] ">
                              <div className="relative w-[40%] h-[100%] mt-2 mx-auto items-center  ">

                                 <label
                                    htmlFor="imageInput2"
                                    className={ isSubmit && selectedImage2    ?
                                       "relative w-[95%] h-[100%] mx-auto  rounded-full  bg-transparent border border-red-300 flex items-center justify-center cursor-pointer group"
                                       : "relative w-[95%] h-[100%] mx-auto  rounded-full  bg-transparent border border-green-300 flex items-center justify-center cursor-pointer group"}
                                 >

                                    <input
                                       type="file"
                                       id="imageInput2"
                                       name="file"
                                       accept=".jpg, .jpeg, .png"
                                       className="sr-only"
                                       onChange={handleFileChange2}
                                    />
                                    <div className={selectedFile2 ? "hidden" :"relative h-[100%] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>
                                       <Image
                                          src={picture.src}
                                          alt={`Logo `}
                                          width="600"
                                          height="600"
                                          className="object-contain object-center w-8 h-8 text-gray-600  "
                                       />
                                    </div>
                                    {selectedFile2 && (
                                       <img
                                          src={`data:image/png;base64,${study1.media}`}
                                          //src={URL.createObjectURL(selectedFile2)}
                                          alt="Image sélectionnée"
                                          className="relative h-[100%]  w-[100%] rounded-full  z-40"
                                       />
                                    )}
                                 </label>

                              </div>
                           </div>
                           <div className=" h-[55%] md:h-[70%] w-[100%] flex-col justify-evenly m-auto   ">
                              {input2.slice(0,2).map((item) => (
                                 <div key={item.id} className="items-center relative h-[30%]  md:h-[20%] w-[100%] md:w-[100%]  mt-[2%]  ">
                                    {
                                       <div className="rounded-md relative h-[80%] md:h-[100%] w-[100%] mx-auto md:left-2  " key={item.id}>
                                          <div className="relative w-[100%] h-[100%]  ">
                                             <input
                                                placeholder={item.placeholder}
                                                name={item.name}
                                                className={ isSubmit && item.error ?
                                                   "text-xs relative  py-2 px-4 w-[95%] h-[100%] text-gray-300  rounded-[10px]  bg-transparent  focus:outline-none focus:border-blue-500 border border-red-600"
                                                   : item.className}
                                                type={item.type}
                                                onChange={(e) => handleChange2(e)}
                                                value={item.value}
                                                // defaultValue = {item.defaultValue}
                                             />
                                          </div>
                                          <div>
                                             {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}

                                          </div>

                                       </div>
                                    }
                                    {/*</div>*/}
                                 </div>
                              ))}
                              <div className="items-center relative   h-[20%] w-[100%] mx-auto md:mt-2 flex space-x-0 md:space-x-2 ">
                                 {input2.slice(2,4).map((item) => (
                                    <div key={item.id} className=" flex flex-col items-center relative w-[100%] h-[100%]  ">
                                       {
                                          <div className="rounded-md h-[100%] w-[100%] mx-auto relative left-1  " key={item.id}>
                                             <div className="relative w-[100%] h-[100%]  ">
                                                <input
                                                   placeholder={item.placeholder}
                                                   name={item.name}
                                                   className={ isSubmit && item.error ?
                                                      "text-xs relative w-[95%] h-[100%]  text-gray-300  rounded-[10px]  bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 border border-red-600"
                                                      : item.className}
                                                   type={item.type}
                                                   onChange={(e) => handleChange2(e)}
                                                   value={item.value}
                                                   // defaultValue = {item.defaultValue}
                                                />
                                             </div>
                                             <div>
                                                {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                             </div>

                                          </div>
                                       }
                                       {/*</div>*/}
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="h-[90%] w-[34%] md:w-[30%] border border-green-400 rounded-lg m-1 md:m-4 flex-col justify-evenly">
                           <div className="  h-[40%] w-[100%] ">
                              <div className="relative w-[40%] h-[100%] mt-2 mx-auto items-center  ">

                                 <label
                                    htmlFor="imageInput3"
                                    className={ isSubmit  ?
                                       "relative w-[95%] h-[100%] mx-auto  rounded-full  bg-transparent border border-red-300 flex items-center justify-center cursor-pointer group"
                                       : "relative w-[95%] h-[100%] mx-auto  rounded-full  bg-transparent border border-green-300 flex items-center justify-center cursor-pointer group"}
                                 >

                                    <input
                                       type="file"
                                       id="imageInput3"
                                       name="file"
                                       accept=".jpg, .jpeg, .png"
                                       className="sr-only"
                                       onChange={handleFileChange3}
                                    />
                                    <div className={selectedFile3 ? "hidden" :"relative h-[100%] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>
                                       <Image
                                          src={picture.src}
                                          alt={`Logo `}
                                          width="600"
                                          height="600"
                                          className="object-contain object-center w-8 h-8 text-gray-600  "
                                       />
                                    </div>
                                    {selectedFile3 && (
                                       <img
                                          // src={URL.createObjectURL(selectedFile3)}
                                          src={`data:image/png;base64,${study2.media}`}
                                          alt="Image sélectionnée"
                                          className="relative h-[100%]  w-[100%] rounded-full  z-40"
                                       />
                                    )}
                                 </label>

                              </div>
                           </div>
                           <div className=" h-[60%] w-[100%] flex-col justify-evenly m-auto  ">
                              {input3.slice(0,2).map((item) => (
                                 <div key={item.id} className="items-center relative h-[30%]  md:h-[20%] w-[100%] md:w-[100%]  mt-[2%]  ">
                                    {
                                       <div className="rounded-md relative h-[80%] md:h-[100%] w-[100%] mx-auto md:left-2  " key={item.id}>
                                          <div className="relative w-[100%] h-[100%]  ">
                                             <input
                                                placeholder={item.placeholder}
                                                name={item.name}
                                                className={ isSubmit && item.error ?
                                                   "text-xs relative  py-2 px-4 w-[95%] h-[100%] text-gray-300  rounded-[10px]  bg-transparent  focus:outline-none focus:border-blue-500 border border-red-600"
                                                   : item.className}
                                                type={item.type}
                                                onChange={(e) => handleChange3(e)}
                                                value={item.value}
                                                // defaultValue = {item.defaultValue}
                                             />
                                          </div>
                                          <div>
                                             {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}

                                          </div>

                                       </div>
                                    }
                                    {/*</div>*/}
                                 </div>
                              ))}
                              <div className="items-center relative   h-[20%] w-[100%] mx-auto md:mt-2 flex space-x-0 md:space-x-2 ">
                                 {input3.slice(2,4).map((item) => (
                                    <div key={item.id} className=" flex flex-col items-center relative w-[100%] h-[100%]  ">
                                       {
                                          <div className="rounded-md h-[100%] w-[100%] mx-auto relative left-1  " key={item.id}>
                                             <div className="relative w-[100%] h-[100%]  ">
                                                <input
                                                   placeholder={item.placeholder}
                                                   name={item.name}
                                                   className={ isSubmit && item.error ?
                                                      "text-xs relative w-[95%] h-[100%]  text-gray-300  rounded-[10px]  bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 border border-red-600"
                                                      : item.className}
                                                   type={item.type}
                                                   onChange={(e) => handleChange3(e)}
                                                   value={item.value}
                                                   // defaultValue = {item.defaultValue}
                                                />
                                             </div>
                                             <div>
                                                {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                             </div>

                                          </div>
                                       }
                                       {/*</div>*/}
                                    </div>
                                 ))}
                              </div>



                           </div>
                        </div>
                        <div className="h-[90%] w-[34%] md:w-[30%] border border-green-400 rounded-lg m-1 md:m-4 flex-col justify-evenly">
                           <div className="  h-[40%] w-[100%] ">
                              <div className="relative w-[40%] h-[100%] mt-2 mx-auto items-center  ">

                                 <label
                                    htmlFor="imageInput4"
                                    className={ isSubmit  ?
                                       "relative w-[95%] h-[100%] mx-auto  rounded-full  bg-transparent border border-red-300 flex items-center justify-center cursor-pointer group"
                                       : "relative w-[95%] h-[100%] mx-auto  rounded-full  bg-transparent border border-green-300 flex items-center justify-center cursor-pointer group"}
                                 >

                                    <input
                                       type="file"
                                       id="imageInput4"
                                       name="file"
                                       accept=".jpg, .jpeg, .png"
                                       className="sr-only"
                                       onChange={handleFileChange4}
                                    />
                                    <div className={selectedFile4 ? "hidden" :"relative h-[100%] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>
                                       <Image
                                          src={picture.src}
                                          alt={`Logo `}
                                          width="600"
                                          height="600"
                                          className="object-contain object-center w-8 h-8 text-gray-600  "
                                       />
                                    </div>
                                    {selectedFile4 && (
                                       <img
                                          // src={URL.createObjectURL(selectedFile4)}
                                          src={`data:image/png;base64,${study3.media}`}
                                          alt="Image sélectionnée"
                                          className="relative h-[100%]  w-[100%] rounded-full  z-40"
                                       />
                                    )}
                                 </label>

                              </div>
                           </div>
                           <div className=" h-[60%] w-[100%] flex-col justify-evenly m-auto   ">
                              {input4.slice(0,2).map((item) => (
                                 <div key={item.id} className="items-center relative h-[30%]  md:h-[20%] w-[100%] md:w-[100%]  mt-[2%]  ">
                                    {
                                       <div className="rounded-md relative h-[80%] md:h-[100%] w-[100%] mx-auto md:left-2  " key={item.id}>
                                          <div className="relative w-[100%] h-[100%]  ">
                                             <input
                                                placeholder={item.placeholder}
                                                name={item.name}
                                                className={ isSubmit && item.error ?
                                                   "text-xs relative  py-2 px-4 w-[95%] h-[100%] text-gray-300  rounded-[10px]  bg-transparent  focus:outline-none focus:border-blue-500 border border-red-600"
                                                   : item.className}
                                                type={item.type}
                                                onChange={(e) => handleChange4(e)}
                                                value={item.value}
                                                // defaultValue = {item.defaultValue}
                                             />
                                          </div>
                                          <div>
                                             {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}

                                          </div>

                                       </div>
                                    }
                                    {/*</div>*/}
                                 </div>
                              ))}
                              <div className="items-center relative   h-[20%] w-[100%] mx-auto md:mt-2 flex space-x-0 md:space-x-2 ">
                                 {input4.slice(2,4).map((item) => (
                                    <div key={item.id} className=" flex flex-col items-center relative w-[100%] h-[100%]  ">
                                       {
                                          <div className="rounded-md h-[100%] w-[100%] mx-auto relative left-1  " key={item.id}>
                                             <div className="relative w-[100%] h-[100%]  ">
                                                <input
                                                   placeholder={item.placeholder}
                                                   name={item.name}
                                                   className={ isSubmit && item.error ?
                                                      "text-xs relative w-[95%] h-[100%]  text-gray-300  rounded-[10px]  bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 border border-red-600"
                                                      : item.className}
                                                   type={item.type}
                                                   onChange={(e) => handleChange4(e)}
                                                   value={item.value}
                                                   // defaultValue = {item.defaultValue}
                                                />
                                             </div>
                                             <div>
                                                {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                             </div>

                                          </div>
                                       }
                                       {/*</div>*/}
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>

                     </div>

                     <div className="absolute bottom-5 h-[10%] w-[95%] mx-auto  rounded">
                        <div className="relative mx-auto h-[100%] w-[60%] md:w-[40%]  flex justify-evenly items-center ">

                           {/*<button className="bg-green-500 text-black  h-[60%] w-[40%]  rounded hover:border border-green-300 hover:bg-green-400 hover:text-black" onClick={handleSummit}>Valider</button>*/}

                           <button className="bg-green-500 text-black  h-[60%] w-[60%] rounded  hover:border border-green-300 hover:bg-green-400 hover:text-black" onClick={()=>{comeBack()}}>Retour</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

      </>
   )
}