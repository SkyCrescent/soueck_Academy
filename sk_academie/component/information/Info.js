'use cleint'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import rr from "../../public/logo/SAC Logo (Empty).png";
import soueck from "../../public/img/soueck.jpg"
import jofrick from "../../public/img/jofrick.jpg"
import dieudonne from "../../public/img/dieudonne.jpg"
import dorcel from "../../public/img/dorcel.jpg"
import marvel from "../../public/img/marvel.jpg"
import toussaint from "../../public/img/toussaint.jpg"
import dieuvie from "../../public/img/dieuvie.jpg"
import pierre from "../../public/img/piere.jpg"
import adresse from "../../public/logo/home_address_127px.png";
import phone from "../../public/logo/phone_127px.png";
import mail from "../../public/logo/mail_127px.png";
import '@/styles/animation.css'
import axios from "axios";
export default function Info() {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const [ formattedDate2 ,SetformattedDate] = useState('')
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [number , SetNumber] = useState(0)
   const [loading , SetLoading ] = useState(false)

   const team = [
      {  id :1 , nom: "Boukou Makaya Soueke Naomine" , role :"Fondatrice et Présidente de Soueke Academy" ,motSuite1 :"Boukou Makaya Soueke Naomine est la fondatrice et présidente de Soueke Academy, une initiative qui a pour but de promouvoir l'éducation et la culture congolaises",
         motSuite2:"En tant que fondatrice et présidente de Soueke Academy, Elle est responsable de la vision et de la direction de l'association. Elle est également responsable de la gestion des ressources de l'association et de la supervision de son personnel." , photo :soueck.src},
      {  id :2 , nom: "Mpialo Jofrick O'neil" , role :"Vice-président" ,motSuite1 :"Mpialo Jofrick O'neill est le vice-président de l’association Soueke Academy",
         motSuite2:"Il est responsable de la représentation de l'association auprès des partenaires et du public. Il est également chargé de soutenir la présidente dans ses fonctions." , photo :jofrick.src},
      {  id :3 , nom: "Massamba Dieu-Vie" , role :"Secrétaire chargé de la communication et aux relations publiques\n" ,motSuite1 :"Massamba Dieu-Vie est secrétaire chargé de la communication et aux relations publiques au sein d'une entreprise publique.",
         motSuite2:"  Il est responsable de la communication interne et externe de l’association , ainsi que des relations avec les médias." , photo :dieuvie.src},
      {  id :4 , nom: "Mvayi Mpess Dorce" , role :"Secrétaire général chargé de l’organisation et de la mobilisation" ,motSuite1 :"Il est responsable de l’organisation et de la mobilisation de l’association Soueke Academy",
         motSuite2:"Il est responsable de la coordination de toutes les activités de l’association, y compris les événements, les réunions et les campagnes. Il est également chargé de mobiliser les participants et les sponsors." , photo :dorcel.src},
      {  id :5 , nom: "Kounkou Maixant Marvel" , role :"Secrétaire général" ,motSuite1 :"Kounkou Maixant Marvel est le secrétaire général de l’association Soueke Academy.",
         motSuite2:"Il est responsable de la coordination de toutes les activités de l'association, y compris les événements, les réunions et les campagnes." , photo :marvel.src},
      {  id :6 , nom: "Mayala Kembi Toussaint" , role :"Secrétaire chargée au trésor" ,motSuite1 :"Mayala Kembi Toussaint est la secrétaire chargée au trésor de l’association Soueke Academy",
         motSuite2:"Elle est responsable de la gestion des finances de l'association, y compris les recettes, les dépenses et les investissements." , photo :toussaint.src},
      {  id :7 , nom: "Moukala-Moukoko Pierre-Corneille" , role :"conseiller juridique de Soueke Academy" ,motSuite1 :"Moukala-Moukoko Pierre-Corneille est responsable de fournir des conseils juridiques à Soueke Academy sur une variété de questions",
         motSuite2:"Il est également responsable de veiller à ce que Soueke Academy respecte les lois et règlements du Congo." , photo :pierre.src},
      {  id :8 , nom: "Mouandza Houessou Ange Dieudonné" , role :"Conseiller et Négociateur" ,motSuite1 :"Mouandza Ange Houessou Ange Dieudonné est conseiller et négociateur de l'association",
         motSuite2:"Il est responsable de la représentation de l'association auprès des autorités et des partenaires, ainsi que de la négociation des accords et contrats." , photo :dieudonne.src},

   ]

   const event =[
      {
         id: 26,
         nom: "Veyron 2",
         date_debut: "2024-06-14",
         date_fin: "2024-07-31",
         photo: "event/artworks-000197443510-a9cawy-t500x500.jpg"
      },
      {
         id: 28,
         nom: "Micro Trotoir",
         date_debut: "2024-04-27",
         date_fin: "2024-06-22",
         photo: "event/MICRO ASA OFFICIEL (1).png"
      },
      {
         id: 29,
         nom: "Micro Trotoir 2",
         date_debut: "2024-08-03",
         date_fin: "2024-10-10",
         photo: "event/WhatsApp Image 2024-05-15 à 22.10.25_094a0222.jpg"
      }
   ]

   const [scrollIndex, setScrollIndex] = useState(0);
   const itemWidth = 12; // Adjust this value based on your item width and gap

   useEffect(() => {
      const interval = setInterval(() => {
         setScrollIndex((prevIndex) => (prevIndex + 1) % team.length);
      }, 3000); // Change the delay to suit your needs
      // ca fait bouger les element avec un distance de 21 et une intervalle de 3000 donc 3 secondes
      //le styles fait bouge les image via animate scrool
      return () => clearInterval(interval);
   }, [team.length]);

   const getData2 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/evenements/get_allEvent.php`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData(response.data.recu)
            SetNumber(response.data.recu.length)
            SetLoading(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };
   const getDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();

      // Ajouter un zéro devant le mois et le jour si nécessaire pour obtenir le format "YYYY-MM-DD"
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      const formattedDate = `${year}-${month}-${day}`;
      SetformattedDate(formattedDate);
      console.log(formattedDate);
   };


   useEffect(() => {
      getData2()
      getDate()
   }, []);
   useEffect(() => {
      console.log(formattedDate2)
   }, [getDate]);


   function formatDate(apiDate) {
      // Séparer la date en année, mois et jour
      const [year, month, day] = apiDate.split('-').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate;
   }


   return (
    <>
      <div className="relative h-[25%] W-[100%] ">
         <div className="relative h-[100%] W-[100%] flex  justify-between items-center">
            <div className="relative w-[50%] left-2 h-[90%] ">
               <Image
                  src={rr.src}
                  alt={`Logo `}
                  width="900"
                  height="900"
                  className="object-contain object-center w-full h-full  "
               />
            </div>
            <div className="relative  w-[80%] md:text-4xl lg:text-4xl    font-[Gotham] font-normal  text-white text-right lg:right-32 uppercase ">Qui Sommes Nous ????</div>

         </div>
      </div>


       <div
          className="relative h-auto mx-auto w-[100%] md:w-[98%]  md:text-xl font-[Gotham] text-gray-300 space-y-7  p-4 font-normal">


          <div className="w-[100%]  md:p-6  ">Soueke Academy est une organisation congolaise
             à but non lucratif qui vise à promouvoir l'éducation au Congo en mettant les jeunes au centre de ses
             activités.
          </div>

          <div className="w-[100%] space-y-3    md:p-6 ">
             <div className="relative  text-[#36ff00] text-xl  md:text-left md:text-3xl uppercase ">Quel est notre
                Mission
             </div>
             <div className="  ">La mission de Soueke Academy est de fournir aux jeunes du Congo les opportunités dont
                ils ont besoin pour réussir dans la vie.
             </div>
          </div>


          <div className="w-[100%] h-auto md:p-6 space-y-3">
             <div className="relative  text-[#36ff00]  text-left text-3xl uppercase ">Nos Valeurs</div>
             <div className="w-[100%] text-[#0084ff] ">Les valeurs que nous representant sont :</div>
             <li className="w-[100%] text-gray-300 ">L'inclusion : Soueke Academy est une organisation inclusive. Elle
                s'engage à offrir ses programmes à tous les jeunes, quelle que soit leur origine, leur religion, leur
                sexe ou leur orientation sexuelle.
             </li>
             <li className="w-[100%] ">La qualité : Soueke Academy s'engage à fournir des programmes éducatifs de haute
                qualité. Ces programmes sont conçus pour répondre aux besoins des jeunes et pour leur donner les
                compétences et les connaissances dont ils ont besoin pour réussir.
             </li>
             <li className="w-[100%]  ">L'inspiration : Soueke Academy s'engage à inspirer les jeunes à poursuivre leurs
                études et à réaliser leurs rêves.
             </li>

          </div>


          <div className="  space-y-2 md:p-6">
             <div className="relative  text-[#36ff00]  text-left text-3xl uppercase ">Notre Objectifs</div>
             <div className="w-[100%]  ">L'objectif de Soueke Academy est de développer les compétences et les
                connaissances des jeunes du Congo, quelle que soit leur origine.
             </div>
          </div>


          <div className=" space-y-2 md:p-6">
             <span
                className="relative  text-[#36ff00]  text-left text-4xl md:text-5xl uppercase   ">Notre Programmes</span>
             <div className="w-auto ">Soueke Academy propose une variété de programmes éducatifs conçus pour atteindre
                ses objectifs. Ces programmes sont conçus pour être inclusifs, de haute qualité et motivants.
             </div>
             <li className="w-[100%] text-[#0084ff] ">Compétitions inter-écoles</li>
             <div className="w-auto  ">Les compétitions inter-écoles sont un élément central des programmes de Soueke
                Academy. Elles encouragent les jeunes à apprendre et à se défier les uns les autres. Les compétitions de
                Soueke Academy portent sur une variété de sujets, notamment la culture congolaise, la culture générale,
                l'hortographie, les débats et l'entrepreneuriat.
             </div>

             <li className="w-[100%] text-[#0084ff] ">Compétitions de culture congolaise</li>
             <div className="w-[100%]  ">Les compétitions de culture congolaise sont conçues pour encourager les jeunes
                à apprendre sur leur culture et leur histoire. Ces compétitions comprennent des questions sur la
                géographie, l'histoire, la littérature, la musique, l'art et la culture congolaise.
             </div>

             <li className="w-[100%] text-[#0084ff] ">Compétitions d'orthographe</li>
             <div className="w-[100%]  ">Les compétitions d'orthographe sont conçues pour améliorer les compétences en
                orthographe des jeunes. Ces compétitions comprennent des tests d'orthographe de mots et de phrases.
             </div>

          </div>

          <div className="relative h-auto md:h-auto lg:h-auto w-auto   overflow-x-hidden">

              <span
                 className="relative  text-[#36ff00]  text-left text-4xl md:text-5xl uppercase   ">Notre Equipes</span>
             <br></br>
             <div
                className="relative w-[90%]  md:w-auto mx-auto  flex flex-row  gap-2 p-4 mb-3 animate-scroll-step "
                style={{transform: `translateX(-${scrollIndex * itemWidth}rem)`}}

             >
                <div className="flex flex-row space-x-4">
                   {
                      team.map((item, index) => (
                         <div
                            key={index}
                            // className="relative  p-1 rounded-md h-96 cursor-default "
                            className="relative w-72 md:w-56  cursor-pointer bg-transparent hover:bg-gray-100/20 rounded-xl hover:shadow-2xl transition duration-300"
                         >
                            <div className="h-64 w-full">
                               <img src={`${item.photo}`} alt={`Media ${item.id}`}
                                    className="relative h-[99%] w-[100%] rounded-tr-xl "
                               />
                            </div>
                            <div className="p-2 text-center">
                               <div className="font-[Gotham] font-semibold text-sm text-blue-500">{item.nom}</div>
                               <div className="font-[Poppins] font-light text-sm text-white">{item.role}</div>
                            </div>
                         </div>
                      ))
                   }
                </div>
             </div>
          </div>


          <div className="relative h-auto md:h-auto lg:h-auto w-auto   overflow-x-hidden  ">
             <div className="relative h-auto mx-4 leading-4   ">


                <div className="  w-auto text-xs lg:text-lg gap-3 md:flex md:items-center md:justify-center">
                     <span className=" text-white"> <span
                        className=" text-green-500 font-semibold ">SOUECK Academy</span> compte
                     </span>
                   {/*<span className="text-xl md:text-3xl text-red-800 font-semibold"> {number}</span>*/}
                   <span className="text-xl md:text-3xl text-red-800 font-semibold"> {event.length}</span>
                   <span className="text-white"> évenements organisées
                     </span>
                </div>
             </div>
             {/*<div className="relative w-full  h-[70%] md:h-[100%]  mt-10  ">*/}

             {/*</div>*/}

             <br></br>
             <div className="relative h-auto md:h-auto lg:h-[53%]  w-full  overflow-x-hidden">


                <div
                   className="relative w-[90%]  md:w-auto mx-auto  flex flex-row  gap-4   animate-scroll-step "
                   style={{transform: `translateX(-${scrollIndex * itemWidth}rem)`}}

                >
                   {loading && (

                      <div className="flex flex-row space-x-4  relative h-full">
                         {event.map((item, index) => (
                            <div key={index}
                                 className="relative w-72 md:w-80 cursor-pointer bg-transparent hover:bg-gray-100/20 h-96 bg-gray-100  rounded-xl hover:shadow-2xl transition duration-300"
                            >
                               <div className="h-64 w-full">
                                  <img src={`${item.photo}`} alt={`Media ${item.id}`}
                                       className="relative h-[99%] w-[100%] rounded-tr-xl "

                                  />
                               </div>
                               <div className="p-2 space-y-3">
                                  <div className="font-[Gotham] font-semibold text-xl text-blue-500">{item.nom}</div>


                                  <span className="text-white">
                     {(() => {
                        const format = new Date(formattedDate2);
                        const date1 = new Date(item.date_debut);
                        const date2 = new Date(item.date_fin);

                        if (format.getTime() < date1.getTime()) {
                           return (

                              <div>
                                 <p>Evenement à venir,</p>
                              </div>


                           )

                        } else if (format.getTime() === date1.getTime()) {
                           return (

                              <div>
                                 <p>Evenement en cours,</p>
                              </div>


                           )

                        } else if (format.getTime() > date1.getTime() && format.getTime() < date2.getTime()) {
                           return (

                              <div>
                                 <p>Evenement en cours,</p>
                              </div>


                           )
                        } else if (format.getTime() === date2.getTime()) {
                           return (

                              <div>
                                 <p>Evenement en cours,</p>
                                 {/*<button*/}
                                 {/*   className="bg-black text-white rounded-md p-2 text-xs transition duration-300 transform hover:scale-105"*/}
                                 {/*   onClick={() => {*/}
                                 {/*      GotoAdd(item.id)*/}
                                 {/*   }}*/}
                                 {/*>Me*/}
                                 {/*   Reserver une place*/}
                                 {/*</button>*/}
                              </div>


                           )
                        } else if (format.getTime() > date2.getTime()) {
                           return "Evenement deja passe";
                        } else {
                           return null;
                        }

                     })()}
                  </span>
                                  <div className=" font-[Poppins] font-light text-sm text-white ">
                                     <span className="">{formatDate(item.date_debut)}</span> au <span
                                     className="">{formatDate(item.date_fin)}</span>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                   )}
                </div>

             </div>


          </div>








          <div className=" flex m-6 justify-center items-center hidden md:block ">
             <div
                className="relative w-[50%]  h-[55%] md:w-[80%]  md:h-[10%] lg:w-[50%]  lg:h-[55%] mx-auto  md:mt-8 lg:mt-0 ">
                <Image
                   src={rr.src}
                   alt={`Logo `}
                   width="600"
                   height="600"
                   className="object-contain object-center w-full h-full  "
                />
             </div>

          </div>

       </div>

    </>
   );
}
