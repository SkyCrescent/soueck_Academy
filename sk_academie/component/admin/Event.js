'use client'
import sans from "@/public/logo/Sans titre.png";
import UpdateEvent from "@/component/UpdateEvent";
import Image from "next/image";
import picture from "@/public/logo/picture.png";
import axios from "axios";
import {useEffect, useState} from "react";
import process from "process";
//import f from '../../app/pages/api'
export default function Event(){
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
      media :"",
      dateD:"",
      dateF:""
   });
   const input1 = [
      { id: 1, name: "username", type: "text", placeholder: "Nom",value: values.username   ,label: "Nom de l'evenement", className: " text-lg w-[98%] h-[100%] text-gray-50 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-52 focus:outline-none focus:border-blue-500",
         error:  !values.username?  'Veuillez signifier le contenu du post' : null
      },

      { id: 2, name: "dateD",type: "date",minDate : "2024-02-10",value: values.dateD  ,maxDate : "2028-12-10", placeholder: "Debut de l'evenement", label: "Debut de l'evenement", className: "text-lg w-[90%] h-[100%] text-gray-50 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-52 focus:outline-none focus:border-blue-500",
         error: values.dateD ? null : 'Quel jour votre evenement commence?' , img: `` },

      { id: 2, name: "dateF",type: "date",minDate : "2024-02-10",value: values.dateF  ,maxDate : "2028-12-10", placeholder: "birthday", label: "Fin de l'evenement", className: "text-lg w-[90%] h-[100%] text-gray-50 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-52 focus:outline-none focus:border-blue-500",
         error: values.dateF ? null : 'Quel jour votre evenelent se termine?' , img: `` }
   ]

   const comeBack = () =>{
      SetIsSubmit(false)

      setValues({
         username: "",
         media: "",
         dateD:"",
         dateF:""
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




   const addData = async () => {
      try {
         // Vérifiez que tous les champs requis sont remplis
         if (values.username && values.dateD && values.media && values.dateF) {
            const formData = new FormData();
            // formData.append('media', values.media);
            // formData.append('dat', myDate);
            formData.append('nom',values.username);
            formData.append('date_debut',values.dateD);
            formData.append('date_fin',values.dateF);
            formData.append('photo',values.media);
            const response = await axios.post(`${baseUrl}/evenements/add_Event.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            SetIsSubmit(false)

            setValues({
               username: "",
               media: "",
               dateD:"",
               dateF:""
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

   const deletData = async (id) => {
      //console.log(id)
      try {
         const formData = new FormData();
         // Effectuez la requête HTTP en utilisant Axios
         const response = await axios.post(`${baseUrl}/evenements/delete_Event.php?id=${id}`, {
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
         const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
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
               const response = await axios.post('../../pages/api/evenement', formData, {
                  headers: {
                     'Content-Type': 'multipart/form-data'
                  }
               });
               console.log('File uploaded successfully:', response.data);
               // Mise à jour de la valeur media avec le chemin du fichier
               setValues((prevValues) => ({
                  ...prevValues,
                  media: `event/${selectedFile1.name}`,
                 // typemedia: selectedFile1.type,
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
          //  typemedia:""
         }));
         console.log("Aucun fichier sélectionné");
      }
   };


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
   };
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

   const getData2 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/evenements/get_allEvent.php`);
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
      getData2()
     // getDate()
      getData4()
      console.log("la date",myDate)
   }, []);


   useEffect(() => {
      console.log(values);
   }, [values]);

   // function formatDate(apiDate) {
   //    // Séparer la date en jour, mois et année
   //    const [day, month, year] = apiDate.split('/').map(Number);
   //
   //    // Utiliser new Date(year, monthIndex, day) pour construire une date
   //    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
   //
   //    return formattedDate;
   // }



   function formatDate(apiDate) {
      // Séparer la date en année, mois et jour
      const [year, month, day] = apiDate.split('-').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate;
   }

   return(


      <>


         <div className=" h-[70%] lg:h-screen ">

            <div className="relative  top-0 md:top-48 lg:top-0 z-50">
               <button
                  className="bg-green-300 text-black h-10 w-56 m-4 rounded hover:border border-green-300 hover:bg-black hover:text-white transition duration-300 transform hover:scale-105 "
                  onClick={() => SetPost(true)}>
                  Nouvelle evenements
               </button>
            </div>
            {/*<div className="overflow-y-auto scrollbar-hidden relative z-20 h-[100%]  w-[100%] mx-auto   top-3 md:top-0  ">*/}
            <div className="overflow-y-auto scrollbar-hidden  relative w-full h-[80%] md:h-[88%] ">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-20 gap-2 p-4 mb-1  ">
                  {loading ? (
                     filteredData.map((item, index) => (
                        <div
                           key={index}
                           className="relative p-1 rounded-md h-96 cursor-pointer"
                        >
                           <img
                              src={`/${item.photo}`}
                              alt={`Media ${item.id}`}
                              className="relative w-full h-[70%]"
                           />
                           <div className="h-28 w-[100%] border border-white overflow-hidden">
                              <div className="h-[30%] w-[100%] items-center justify-center overflow-hidden">
                                 <div
                                    className="font-[Gotham] ml-1 text-2xl text-green-400 overflow-hidden">{item.nom}</div>
                              </div>
                              <div className="h-[70%] w-[100%] overflow-hidden">
                                 <div className="text-[13px] font-medium text-[#072c42]">
                                       <span className="font-[poppins] font-bold text-white">
                                          Se deroule du {formatDate(item.date_debut)} au {formatDate(item.date_fin)}
                                       </span>
                                 </div>
                                 <div className="relative h-20 md:w-[100%] flex justify-between">
                                    <button
                                       className="bg-green-600 hover:bg-green-800 transition duration-300 transform hover:scale-105 text-[14px] text-white h-10 w-52 m-4 rounded"
                                       onClick={() => GoToUpdate(`${item.id}`)}
                                    >
                                       Modifier
                                    </button>
                                    <button
                                       className="bg-red-500 hover:bg-red-800 transition duration-300 transform hover:scale-105 text-[14px] text-white h-10 w-52 m-4 rounded"
                                       onClick={() => {
                                          SetModalSup(true);
                                          SetId(`${item.id}`);
                                       }}
                                    >
                                       Supprimer
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="text-center">Chargement en cours...</div>
                  )}
               </div>
            </div>


         </div>


         {modalUpdate ? <UpdateEvent modal={modalUpdate} SetModal={SetModalUpdate} id={id}/> : null}


         {
            formPost ? (
               <div className="fixed top-0 left-0 z-50 bg-black/70 w-screen h-screen overflow-y-auto">
                  <div className="w-full relative flex justify-center mt-28 lg:mt-12  h-[70%]">
                     <div
                        className={`flex justify-between relative w-[95%] md:w-[95%] lg:w-[65%]   bg-gray-900 border border-green-300  shadow rounded-lg p-2 `}>
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
                                    accept=".jpg, .jpeg, .png "
                                    className="sr-only"
                                    onChange={handleFileChange}
                                 />
                                 <div
                                    className={selectedFile ? "hidden" : "relative h-[100%] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>
                                    <Image
                                       src={picture.src}
                                       alt={`Logo `}
                                       width="600"
                                       height="600"
                                       className="object-contain object-center w-8 h-8 text-gray-600  "
                                    />
                                    <div className="text-white text-center opacity-100 z-10"> Importer le media</div>
                                 </div>
                                 {selectedFile && (
                                    selectedFile2 === "video/mp4" ?
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
                        <div className="flex-row  w-[65%]  h-[80%]   items-center justify-center mx-auto  -space-y-2 ">
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