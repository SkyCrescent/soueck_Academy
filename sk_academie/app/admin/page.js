"use client"
import Image from 'next/image';
import React, { useState , useEffect} from "react";
import axios from  'axios'
import {useRouter} from "next/navigation";
import f from "../../public/Sans.jpg"
import process from "process";


export default function page() {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const [isSubmit,SetIsSubmit] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [ incorrect, SetIncorrect ] = useState(0)
   const router = useRouter();
   const [icon, setIcon] = useState({
      4: "blind",
      5: "blind"
   });
   const [Errors,SetErrors] = useState({})
   const [values, setValues] = useState({
      password:"",
   });
   const input = [
      { id: 4, name: "password",type: icon[4] === "blind" ? "password" : "text",value: values.password  , placeholder: "password", label: "Entrez le mot de Passe", className: "text-large relative w-[100%] text-gray-700 border rounded-[10px] border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500",
         error:values.password ?  /[^\w\d]+/.test(values.password) ? 'Ce champ ne doit pas contenir de caractères spéciaux' :  values.password !== filteredData ? 'Mot de Passe Incorrect' :null :'Saisissez votre Mot de Passe ', img: `/icons/${icon[4] || "blind"}.png` }
   ]
   const showChar = (id) => {
      setIcon(prevState => ({
         ...prevState,
         [id]: prevState[id] === "blind" ? "Eye" : "blind",

      }));
   };

   const handleChange = (e) => {
      const { name, value } = e.target ;
      let cleanedAddress = '';
      cleanedAddress = value.replace(/[^\w\s]/gi, '');
      //cleanedAddress = cleanedAddress.replace(/\b\w/g, char => char.toUpperCase());

      setValues({...values, [name] : cleanedAddress})
      console.log(values)
      // faire ca avec label
   };
   const handleSummit = () => {
      SetIsSubmit(true);
      console.log(values);
      console.log(filteredData)
      const hasErrors = Object.values(Errors).some((error) => error);
      // if (!hasErrors) {
      //    // S'il n'y a pas d'erreur, vérifiez si le mot de passe est correct
      //    if (values.password === filteredData) {
      //       // Si le mot de passe est correct, redirigez vers "/admin/home"
      //       router.push(`/admin/home`);
      //    } else {
      //       // Si le mot de passe est incorrect, ne rien faire
      //       // console.log("Mot de passe incorrect");
      //      // SetIncorrect(true)
      //    }
      // }
      if (!values.password){
         SetIncorrect(1)
      }else if (values.password !== filteredData ){
         SetIncorrect(2)
      }else {
         SetIncorrect(0)
         router.push(`/admin/home`);
      }

   };

   const getData = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/get_mdp.php`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu[0].contenu)
            setFilteredData(response.data.recu[0].contenu)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };
   useEffect(() => {
      getData()
   }, []);
   useEffect(() => {
      console.log(values)
   }, [handleChange]);
   return(
      <>
         <section className=" z-20 bg-no-repeat   bg-cover bg-[url('../public/Sans.jpg')] opacity-100 relative  h-screen w-screen">
            <div className="bg-gradient-to-t from-black/100 via-sky-950 to-sky-600 z-40 h-screen opacity-75 " ></div>

            <div className="absolute top-20 md:mx-4   md:w-[98%]  flex flex-col md:flex-row z-10 justify-center gap-10">

               <div  className="bg-white mx-3 flex-1 h-full w-96 md:max-w-2xl rounded-xl shadow-lg py-16 mt-12 md:mt-64 lg:mt-12  ">
                  <div className="flex flex-col lg:flex-row items-center relative h-full">
                     <div className="relative w-[100%]  h-[100%] px-6 md:px-8 lg:px-12  " >
                        <h2 className="text-center  col-span-12 text-black text-[20px] uppercase font-semibold mb-4">Connecter vous pour acceder a l'administration de Soueck Academy</h2>

                        {input.map((inputs) => (
                           <div className="rounded-md h-12 mx-auto" key={inputs.id}>
                              <label className="text-[12px] font-semibold h-1 text-black ">{inputs.label}</label>
                              <div className="relative">
                                 <input
                                    placeholder={inputs.placeholder}
                                    type={inputs.type}
                                    name={inputs.name}
                                    className={inputs.className}
                                    onChange={(e) => handleChange(e)}
                                    value={inputs.value}
                                    defaultValue = {inputs.defaultValue}
                                 />
                                 {inputs.img ? (
                                    <img src={inputs.img} alt="" className="absolute right-3 top-[22%] cursor-pointer" width={20} height={20} onClick={() => showChar(inputs.id)} />
                                 ) : null}
                              </div>
                              <div>
                                 {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                 { isSubmit && incorrect === 1  ? (
                                    <div className="text-[70%] text-red-600">Saisissez votre Mot de Passe</div>
                                 ) :   isSubmit && incorrect === 2  ? (
                                    <div className="text-[70%] text-red-600">Mot de Passe Incorrect</div> )  :  null}
                                 {/*{ isSubmit && inputs.error ? (*/}
                                 {/*   <div className="text-[70%] text-red-600">{inputs.error}</div>*/}
                                 {/*) : null}*/}
                              </div>

                           </div>

                        ))}
                        <div className="w-full px-6 lg:px-0 flex items-center justify-center mt-12">
                           <button className="w-full lg:w-fit bg-green-600 hover:bg-green-800 text-white transition duration-300 transform hover:scale-105 px-28 py-4 rounded-md font-semibold"

                                   onClick={()=>{handleSummit()}}>Connexion</button>
                        </div>

                     </div>

                  </div>

               </div>

            </div>

         </section>

      </>
   )

}