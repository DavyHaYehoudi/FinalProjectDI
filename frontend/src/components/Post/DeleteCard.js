import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";
import erase from '../../imagesFrontend/erase.svg'

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Are you sure to delete ?")) {
          deleteQuote();
        }
      }}
    >
      <img src= { erase } alt="trash" />
    </div>
  );
};

export default DeleteCard;