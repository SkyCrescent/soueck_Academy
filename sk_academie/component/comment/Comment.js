import Image from "next/image";
import picture from "../../public/logo/picture.png";
import send from "../../public/logo/email_send_127px.png"
import React, {useState ,useEffect} from "react";
import adresse from "../../public/logo/home_address_127px.png";
import axios from 'axios';
import Acceuil from "@/component/acceuil/Acceuil";
import Ecole from "@/component/ecole/Ecole";
import Info from "@/component/information/Info";
import Style from "../../styles/Page.modules.css"
import process from "process";


export default function Comment({modal, SetModal,id}){
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const [loading , SetLoading ] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [Errors,SetErrors] = useState({})
   const [Myid , SetId] = useState(0)
   const [isSubmit,SetIsSubmit] = useState(false)
   const [values, setValues] = useState({
      username: "",
   });
   const [recu ,Setrecu] = useState(false)
   const input1 = [
      { id: 1, name: "username", type: "text", placeholder: "Commentaires",value: values.username   , className: " text-[16px] w-[100%] text-gray-300 border rounded-[10px] border-sky-600 bg-transparent py-2 px-4 h-[100%] focus:outline-none focus:border-blue-500",
         error:  values.username? /[^\w\d]+/.test( values.username) ? 'Ce champ ne doit pas contenir de caractères spéciaux'
               : /[\d]+/.test( values.username)?"Ce champs ne doit pas contenir des chiffre "
                  : values.username.length < 8? 'Doit avoir au moins 8 caracteres': null
            : 'Veuillez signifier votre nom'
      },
   ]


   useEffect(() => {
        console.log("ddd",id)
      SetId(id)
   }, []);


   const handleChange = (e) => {
      const { name, value } = e.target ;
      let cleanedAddress = '';
      cleanedAddress = value.replace(/[^\w\s]/gi, '');
      setValues({...values, [name] : cleanedAddress})
      // met a jour pour les texte
      // faire ca avec label
   };

   const getData = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/Commentaire/get_byId.php?id=${id}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("la jointure",response.data.recu)
            Setrecu(true )
            setFilteredData(response.data.recu)
            SetLoading(true)
            //setFilteredData(response.data.recu)
            //SetLoading(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };
   useEffect(() => {
      getData();
      console.log(id)
      SetId(id)
   }, []);

   const addData = async () => {
      try {
         // Vérifiez que tous les champs requis sont remplis
         if (values.username) {
            const formData = new FormData();
            formData.append('commentaires', values.username);
            formData.append('id_poste', id);

            const response = await axios.post(`${baseUrl}/Commentaire/add_Commentaire.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });

            console.log("Truc ajouté avec succès ", response);

         }
         // Reset form fields after successful submission
         setValues({
            username: "",
         });
         SetIsSubmit(false)
         getData()
      } catch (error) {
         console.error(error);
         // setLoading(false);
      }
   };


   const handleSummit=()=>{
      SetIsSubmit(true)
      console.log(values)
      const hasErrors = Object.values(Errors).some((error) => error);
      if (!hasErrors) {
         // S'il n'y a pas d'erreur, appelez addData
         addData()
      }

   }


   const comeBack=()=>{
      setValues({
         username: "",
      });
      SetModal(false)
      SetIsSubmit(false)
   }

   return<>

      <div className="fixed top-0 left-0 z-50 bg-black/70 w-screen h-screen overflow-y-auto">
         <div className="w-full relative flex justify-center mt-6 md:mt-0 h-[90%] md:h-[90%] top-6">
            <div className={` relative w-[80%] md:w-[30%]   bg-gray-900   shadow rounded-lg p-2 `}>


               <div
                  className="relative h-[90%] w-[100%]    content-container overflow-hidden  border border-green-500 rounded ">
                  {/*<div className="relative h-[5%] w-[100%] items-center ">*/}
                  {/*   */}
                  {/*</div>*/}
                  <button className="absolute z-20 h-[8%]  right-3 items-center text-xl font-bold text-red-600 "
                          onClick={() => {
                             comeBack()
                          }}>X
                  </button>
                  <div className=" flex flex-col  h-[100%] w-[100%]  overflow-y-auto scrollbar-hidden  ">
                     {loading ? (
                           filteredData.map((subItem, subIndex) => (
                              <div key={subIndex}
                                   className={`bg-${subIndex % 2 === 0 ? 'green-200 text-white' : 'white text-black'}  m-2 relative w-auto border-b border-blue-400 font-medium text-base cursor-pointer  rounded-md`}>
                                 <div className="m-1" style={{wordWrap: 'break-word'}}>
                                    <span className=" relative w-[50%]"> {subItem.commentaires}</span>
                                 </div>
                                 {/* Ajoutez d'autres informations ici si nécessaire */}
                              </div>
                           )))
                        : (
                           <div
                              className="flex items-center justify-center p-12 relative h-[100%] w-[100%] bg-transparent font-[poppins] text-base text-white italic">
                              {/*<div className="w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>*/}
                              Aucun commentaire Pour cette Publication
                           </div>
                        )
                     }
                  </div>
               </div>

               <div className="relative h-[10%] w-[100%] flex justify-between  p-2">
                  <div className=" relative w-[80%] h-[100%]   ">
                     {input1.map((item) => (
                        <div key={item.id} className="items-center relative h-[100%] w-[100%]   ">
                                 {
                                    <div className="rounded-md  mx-auto relative h-[100%] w-[100%]" key={item.id}>
                                       <div className=" relative h-[100%] w-[100%]   ">
                                          <input
                                             placeholder={item.placeholder}
                                             name={item.name}
                                             className={ isSubmit && item.error ?
                                                "text-[16px] w-[90%] text-gray-300 border border-red-600 rounded-[10px] bg-transparent py-2 px-4 h-[100%] focus:outline-none focus:border-blue-500 "
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

                        <div className=" relative w-[20%] h-[100%]    ">
                           <button className="relative h-[100%] w-[100%]" onClick={handleSummit}>

                                 <Image
                                    src={send.src}
                                    alt={`Logo `}
                                    width="600"
                                    height="600"
                                    className="object-contain object-center w-full h-full  "
                                 />

                           </button>
                        </div>
                     </div>

            </div>
         </div>
      </div>
   </>
}