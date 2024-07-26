'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import School from "@/component/admin/school/School";
import Ecole from "@/component/ecole/Ecole";
import {usePathname} from "next/navigation";
export default function EvenForScholl(){
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [ id , SetId ] = useState(0)
   const [ nom , Setnom ] = useState("")

   const [loading , SetLoading ] = useState(false)
   const pathname = usePathname();


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
      // getData4()
      // console.log("la date",myDate)
   }, []);


   function formatDate(apiDate) {
      // Séparer la date en année, mois et jour
      const [year, month, day] = apiDate.split('-').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate;
   }


   return(



      <>

         <div className=" h-[100%]  lg:h-screen  ">



            {

               id === 0 ? (
                     <div className="overflow-y-auto scrollbar-hidden  relative w-full h-[100%] md:h-[98%] ">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-20 gap-2 p-4 mb-1  ">
                           {loading ? (
                              filteredData.map((item, index) => (
                                 <div
                                    key={index}
                                    className="relative p-1 rounded-md h-96 cursor-pointer"
                                    onClick={()=>{
                                       SetId(`${item.id}`)
                                       Setnom(`${item.nom}`)
                                    }}
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
                                          {/*<div className="relative h-20 md:w-[100%] flex justify-between">*/}
                                          {/*   <button*/}
                                          {/*      className="bg-green-600 hover:bg-green-800 transition duration-300 transform hover:scale-105 text-[14px] text-white h-10 w-52 m-4 rounded"*/}
                                          {/*      onClick={() => GoToUpdate(`${item.id}`)}*/}
                                          {/*   >*/}
                                          {/*      Modifier*/}
                                          {/*   </button>*/}
                                          {/*   <button*/}
                                          {/*      className="bg-red-500 hover:bg-red-800 transition duration-300 transform hover:scale-105 text-[14px] text-white h-10 w-52 m-4 rounded"*/}
                                          {/*      onClick={() => {*/}
                                          {/*         SetModalSup(true);*/}
                                          {/*         SetId(`${item.id}`);*/}
                                          {/*      }}*/}
                                          {/*   >*/}
                                          {/*      Supprimer*/}
                                          {/*   </button>*/}
                                          {/*</div>*/}
                                       </div>
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <div className="text-center">Chargement en cours...</div>
                           )}
                        </div>
                     </div>

                  ) :
                  (
                        pathname.includes('admin') ? <School id={id}/> : <Ecole id2={id} nom={nom} />
                  )

            }



         </div>
      </>
   )
}