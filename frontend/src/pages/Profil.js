import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';
import imageConnection from "../imagesFrontend/cadena.svg"
import UpdateProfil from '../components/Profil/UpdateProfil';

const Profil = () => {

const uid = useContext(UidContext);

    return (
       <div className="profil-page">

           { uid ? (

               <h1><UpdateProfil /></h1>
           ) : (

           <div className="log-container">
               <Log  signin = { false } signup = { true }/>
               <div className="img-container">
                   <img src= { imageConnection } alt="img-log" />
               </div>
           </div>
           )}

        </div>
    );
};

export default Profil;