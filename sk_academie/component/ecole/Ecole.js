"use client"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import who from "../../public/logo/who_127px.png";
import actu from "../../public/logo/new_127px.png";
import picture from "../../public/logo/picture.png";
import sans from "../../public/logo/Sans titre.png"
import {useRouter} from "next/navigation";
import f from "../../public/school/3-objectifs-referencement-NEW-1.jpg"
 import Style from "../../styles/Page.modules.css";
import MyImage from "@/component/Img/MyImage";
import axios from "axios";
//import SeeSchool from "@/SeeSchool";
import process from "process";
export default function Ecole({id2,nom}) {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const router = useRouter();
   const [isSubmit,SetIsSubmit] = useState(false)
   const [Errors,SetErrors] = useState({})
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [selectedFile, setSelectedFile] = useState(null);
   const [selectedFile2, setSelectedFile2] = useState(null);
   const [selectedFile3, setSelectedFile3] = useState(null);
   const [selectedFile4, setSelectedFile4] = useState(null);
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [options , SetOptions] = useState(null)
   const [selectedImage1 , SetselectedImage1] = useState(false)
   const [selectedImage2 , SetselectedImage2] = useState(false)
   const [selectedImage3 , SetselectedImage3] = useState(false)
   const [selectedImage4 , SetselectedImage4] = useState(false)
   const [loading2 , SetLoading2 ] = useState(false)
   const [id , SetId] = useState(0)
   const [myId , SetMyId] = useState(0)
   const [number , SetNumber] = useState(0)
   const [loading , SetLoading ] = useState(false)
   const [ formSchool , SetSchool ] = useState(false)
   const [ formSchool2 , SetSchool2 ] = useState(false)
   const [imageURL, setImageURL] = useState('');


   const [hoveredItem, setHoveredItem] = useState(null);


   const [values, setValues] = useState({
      nameSchool: "",
      adresse : "",
      phone:"",
      media:"",

   });
   const [study1, setstudy1] = useState({
      name: "",
      prenom : "",
      age:"",
      classe:"",
      media:"",

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
      { id: 1, name: "nameSchool", type: "text", placeholder: "Nom de L'ecole",value:values.nameSchool   ,label: "Nom de L'Ecole", className: "text-[9px] md:text-xs relative h-[100%] w-[90%] text-gray-300 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-8 focus:outline-none focus:border-blue-500",
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

   const handleFileChange = (event) => {
      const fileInput = event.target;
      const selectedFile = fileInput.files[0];

      if (selectedFile) {
         setSelectedFile(selectedFile);
         setValues((prevValues) => ({
            ...prevValues,
            media: selectedFile,
         }));
         SetselectedImage1(true)
         console.log(fileInput.files[0])
         console.log("fichier sélectionné frr", selectedFile.name);
         // Vous pouvez effectuer d'autres opérations avec le fichier si nécessaire
      } else {
         setSelectedFile(null);
         setValues((prevValues) => ({
            ...prevValues,
            media: "", // Réinitialise la valeur media s'il n'y a pas de fichier sélectionné
         }));
         SetselectedImage1(false)
         console.log("Aucun fichier sélectionné");
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


   const getData2 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/School/get_allSchool.php?id_evenement=${id2}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("la jointure",response.data.recu)
           // setFilteredData(response.data.recu)
             console.log(response.data.recu[0].NumberEcole)
            SetNumber(response.data.recu[0].NumberEcole)

            SetLoading(true)


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
         const response = await axios.get(`${baseUrl}/School/get_byId2.php?id_evenement=${id2}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("la jointure",response.data.recu)
            setFilteredData(response.data.recu)
            // console.log(response.data.recu[0].id)
            // SetId(response.data.recu[0].id)
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
      getData2()
      console.log("l'id de l'ecole",id2)
   }, []);
   const commeBack=() =>{
      setstudy1({
         name: "",
         prenom : "",
         age:"",
         classe:"",
         media:"",
      });
      Setstudy2({
         name: "",
         prenom : "",
         age:"",
         classe:"",
         media:"",
      });
      Setstudy3({
         name: "",
         prenom : "",
         age:"",
         classe:"",
         media:"",
      });
      SetLoading2(false)
   }

   const GoToUpdate = async (id) => {
      SetLoading2(true)
      SetId(id)
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/Study/get_byIdEcole.php?id_ecole=${myId}`)
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
      SetLoading2(true)
   }

   const handleItemHover = (item) => {
      setHoveredItem(item);
   };


   const comeBack2= () =>{
      setstudy1({
         name: "",
         prenom : "",
         age:"",
         classe:"",
         media:"",
      });
      Setstudy2({
         name: "",
         prenom : "",
         age:"",
         classe:"",
         media:"",
      });
      Setstudy3({
         name: "",
         prenom : "",
         age:"",
         classe:"",
         media:"",
      });
      SetLoading2(false)
   }


   const GoToAdd = async (id) => {
      const encryptedData = btoa(id);
     // const encryptedData2 = btoa(nom);

//      router.push(`../../admin/home/handle?utytrcd=${encodeURIComponent(encryptedData)}&utyy=${encodeURIComponent(encryptedData2)}`);
      router.push(`../../page/school?utytrcd=${encodeURIComponent(encryptedData)}`)
   }

   return(
      <>

               <div className="relative w-[100%] h-[100%]  ">
                  <div className="relative w-[100%] h-[30%] md:h-[20%] ">
                     <div className=" relative w-[100%] h-[30%] items-center text-black md:text-[#072c42]  text-center font-[Gotham] font-semibold  uppercase text-xl md:text-2xl  ">
                        Vous avez ici les Ecoles inscrites a {nom} organisé par Soueke Academy
                     </div>

                     <div className=" relative w-[90%] h-[70%] mx-auto flex  justify-between items-center  ">
                        <span className="text-white text-xs md:text-[15px]  font-[Gotham] "> {number} Ecoles sont en ce moment enregistrée a cette Compétition <br/> <br/> Qu'attendez vous ????</span>
                        <img src={sans.src} alt="" className="absolute z-50 left-40 top-6 cursor-pointer w-[20%] md:w-[30%] lg:w-[10%] h-[50%] md:h-[80%] lg:h-[60%] rotate-12 "  />
                        <button className="w-[60%] h-[40%]  lg:w-[20%] lg:h-[60%] bg-blue-600 hover:bg-green-500 text-white text-xs lg:text-lg transition duration-300 transform hover:scale-105 px-2 py-2 rounded-md font-semibold"
                                onClick={() => GoToAdd(id2)}
                        >
                           Nouvelle Inscription
                        </button>
                     </div>
                  </div>
                  <div className="relative w-full  h-[70%] md:h-[80%]   ">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-20 gap-4 p-4 mb-3">

                        {loading ? (
                           filteredData.map((item, index) => (
                              <div
                                 key={index}
                                 className="relative  p-1 rounded-md h-96 cursor-pointer"
                                 onMouseEnter={() => handleItemHover(item)}
                                 onMouseLeave={() => {
                                    handleItemHover(null);
                                    comeBack2();
                                 }}

                              >
                                 <img
                                    src={`/${item.photo}`}
                                    alt={`Media ${item.id}`}
                                    className="relative w-full h-[70%]" />

                                 {/*<div className="text-sm mt-2">{item.nom}</div>*/}
                                 <div className="h-[28%] w-[100%] space-y-1 border border-white overflow-hidden">
                                    <div className="h-[40%] w-[100%] items-center justify-center overflow-hidden ">
                                       <div className="font-[Gotham] ml-1 text-2xl text-green-400 overflow-hidden">{item.nom}</div>
                                    </div>
                                    <div className="h-[50%] w-[100%] overflow-hidden">
                                       <div className="font-normal text-[13px] ml-1 text-white overflow-hidden">Se trouve à l'adresse : <span className="font-[gotham] overflow-hidden">{item.adresse}</span></div>
                                       <div className="font-normal text-[13px] ml-1 text-white overflow-hidden">Contact : <span className="font-[gotham] text-[#04f32c] overflow-hidden">{item.phone}</span></div>
                                    </div>
                                 </div>
                                 {hoveredItem && hoveredItem.id === item.id && (

                                    loading2 ? (
                                       <div className={loading2? " absolute border border-red-300 bg-black/50 block text-white w-[98%] h-[97%] bg-opacity-75 top-0 items-center justify-center z-30": "hidden"}
                                            onClick={commeBack}>

                                          <div className="text-white  font-[poppins] w-[100%]  h-[100%] border border-yellow-300 items-center justify-center">
                                             <div className=" flex w-[100%]  h-[100%] border-yellow-300  items-center justify-center">
                                                <div className="flex-row   w-[100%]  h-[80%] space-y-3 p-2" >
                                                   <div className="flex items-center justify-center text-[14px] font-[poppins]  mx-auto h-[30%]  space-x-2 ">
                                                      <div className="relative  w-[30%]  h-[100%] ">
                                                         <img src={`/${study1.media}`} alt={`Media ${item.id}`}  className=" relative   w-[100%]  h-[100%]  rounded-full  " />
                                                      </div>
                                                      <div className="relative  w-[70%]  h-[100%] flex items-center justify-center mx-auto ">
                                                         Notre 1er Candidat se nomme {study1.name},en classe de {study1.classe} et age de {study1.age} ans
                                                      </div>

                                                   </div>
                                                   <div className="flex items-center justify-center text-[14px]   mx-auto h-[30%] space-x-2 ">
                                                      <div className="relative  w-[30%]  h-[100%]">
                                                         <img src={`/${study2.media}`} alt={`Media ${item.id}`}  className=" relative  w-[100%]  h-[100%]  rounded-full  " />
                                                      </div>
                                                      <div className="relative  w-[70%]  h-[100%] flex items-center justify-center mx-auto ">
                                                         Notre 1er Candidat se nomme {study2.name},en classe de {study2.classe} et age de {study2.age} ans
                                                      </div>

                                                   </div>
                                                   <div className="flex items-center justify-center text-[14px]   mx-auto h-[30%]  space-x-2 ">
                                                      <div className="relative  w-[30%]  h-[100%]">
                                                         <img src={`/${study3.media}`} alt={`Media ${item.id}`}  className=" relative  w-[100%]  h-[100%]  rounded-full  " />

                                                      </div>
                                                      <div className="relative  w-[70%]  h-[100%] flex items-center justify-center mx-auto ">
                                                         Notre 1er Candidat se nomme {study3.name},en classe de {study3.classe} et age de {study3.age} ans
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>

                                       </div>
                                    ) :(
                                       <div className={loading2 ? "hidden" : " absolute w-[98%]  h-[97%] block  bg-black/50 bg-opacity-75 mx-auto top-0 items-center justify-center z-50"}
                                            onMouseDown={()=>{SetMyId(item.id)}}
                                            onClick={()=>{ GoToUpdate(myId)}} >

                                          <div className="text-white  w-[100%]  h-[100%] border border-yellow-300 flex items-center justify-center"  onClick={()=>{ GoToUpdate(myId)}}>
                                             <div className=" flex items-center justify-center w-[100%]  h-[100%]"
                                                  onClick={()=>{ GoToUpdate(myId)}}>
                                                <p className="relative w-[100%]  h-[50%]  text-center items-center font-[Gotham] text-lg uppercase"
                                                   onClick={()=>{ GoToUpdate(myId)}}>Pour Connaitre les eleves representant  :<br/><span className="text-green-500 text-xl">{item.nom}</span>  Cliquez ici</p>
                                                {/*<p className="w-[100%]  h-[50%]"></p>*/}
                                             </div>
                                             {/* Ajoutez d'autres informations que vous souhaitez afficher */}
                                          </div>
                                       </div>
                                    ))}
                              </div>
                           ))
                        ) : (
                           <div className="text-center">Chargement en cours...</div>
                        )}
                     </div>
                  </div>
               </div>



         {
            formSchool ? (
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
                                          className={ isSubmit && selectedImage1 ?
                                              "relative w-[100%] h-[98%]  rounded-full  bg-transparent border border-red-600 flex items-center justify-center cursor-pointer group"
                                              : "relative w-[100%] h-[98%]  rounded-full  bg-transparent border border-green-300 flex items-center justify-center cursor-pointer group"}
                                       >
                                          <input
                                             type="file"
                                             id="imageInput"
                                             name="file"
                                             accept=".jpg, .jpeg, .png"
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
                                          </div>
                                          {selectedFile  && (
                                             <img
                                                src={URL.createObjectURL(selectedFile)}
                                                alt="Image sélectionnée"
                                                className="relative h-[100%]  w-[100%] rounded-full  z-40"
                                             />
                                          )}
                                       </label>

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
                                                      src={URL.createObjectURL(selectedFile2)}
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
                                                  src={URL.createObjectURL(selectedFile3)}
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
                                                  src={URL.createObjectURL(selectedFile4)}
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

                           <div className="absolute bottom-3 h-[10%] w-[95%] mx-auto  rounded">
                                                <div className="relative mx-auto h-[100%] w-[60%] md:w-[40%]  flex justify-evenly items-center ">
                                                   <button className="bg-green-500 text-black  h-[60%] w-[40%]  rounded hover:border border-green-300 hover:bg-green-400 hover:text-black" onClick={handleSummit}>Valider</button>
                                                   <button className="bg-red-300 text-black  h-[60%] w-[40%] rounded  hover:bg-red-400 hover:text-black" onClick={()=>{comeBack()}}>Annuler</button>
                                                </div>
                                 </div>
                        </div>
                        </div>
                  </div>
               </div>
            ) : null
         }


         {
            formSchool2 ? (
                <SeeSchool modal={formSchool2} SetModal={SetSchool2} id={id} />
            ) : null
         }

      </>
   )

}