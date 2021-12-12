import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css"; 
import heart from '../../imagesFrontend/heart.svg';
import heartFill from '../../imagesFrontend/heartfill.svg';
import { useDispatch } from "react-redux";
import { likePost , unlikePost } from "../../actions/post.actions";

const LikeButton = ( { post }) => {

    const [liked,setLiked] = useState(false);
    const uid = useContext(UidContext)
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid))
        setLiked(true);
      };

      const unlike = () => {
        dispatch(unlikePost(post._id, uid))
        setLiked(false);
      };

useEffect(() => {
    if(post.likers.includes(uid)){
        setLiked(true)
    } else setLiked(false);
}, [ uid, post.likers, liked ])

    return (
        <div className='like-container'>
            { uid=== null  && (
                <Popup
                trigger={<img src= { heart } alt="like" />}
                position={["bottom center", "bottom right", "bottom left"]}
                closeOnDocumentClick
                >
                      <div>Login to like a post !</div>
                </Popup>
             )}
             {uid && liked === false && (
                <img src= { heart }  onClick={like} alt="like" />
            )}
            {uid && liked && (
                <img src= { heartFill } onClick={unlike} alt="unlike" />
            )}
            <span>{post.likers.length}</span>                                
        </div>
    );
};

export default LikeButton;