import React, { useState } from 'react';
import LeftNav from '../LeftNav';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils';


const UpdateProfil = () => {
    
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateform] = useState(false);
    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateform(false);
    }

    return (
       <div className='profil-container'>
           <LeftNav />
           <h1> { userData.pseudo }</h1>
           <div className='update-container'>
               <div className='left-part'>
                   <h3>Profile photo</h3>
                   <img src= { userData.picture } alt='user-pic'/>
                   <br/>
                   <UploadImg />
               </div>
               <div className='right-part'>
                   <div className='bio-update'>
                       <h3>Bio</h3>
                       { updateForm === false && (
                           <>
                           <p onClick= { () => setUpdateform(!updateForm) }>{ userData.bio }</p>
                           <button onClick= { () => setUpdateform(!updateForm)}>Edit bio</button>
                           </>
                       )}
                       { updateForm && (
                           <>
                            <textarea type='text' defaultValue= { userData.bio } onChange= { e => setBio(e.target.value) }></textarea>
                            <button  onClick={ handleUpdate }>Validate the modifications</button>
                           </>
                       )}
                   </div>
                   <h4>Member since :  </h4>
                   <br/>
                   {dateParser (userData.createdAt) }
               </div>
           </div>
       </div>
    );
};

export default UpdateProfil;