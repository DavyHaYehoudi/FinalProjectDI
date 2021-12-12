const PostModel = require('../models/post.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);


module.exports.readPost = (req,res)=>{
    PostModel.find().sort({ createdAt: -1 })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(404).json( err ))
}

module.exports.createPost = async (req,res)=>{
    let fileName;

    if (req.file !== null) {
        try {
          if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
          )
            throw Error("invalid file");
    
          if (req.file.size > 500000) throw Error("max size");
        } catch (err) {
          const errors = uploadErrors(err);
          return res.status(201).json({ errors });
        }
        fileName = req.body.posterId + Date.now() + ".jpg";
    
        await pipeline(
          req.file.stream,
          fs.createWriteStream(
            // `${__dirname}/../client/public/uploads/posts/${fileName}`
            `${__dirname}/../../frontend/public/uploads/posts/${fileName}`
          )
        );
      }

    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: [],
      });
    
      try {
        const post = await newPost.save();
        return res.status(201).json(post);
      } catch (err) {
        return res.status(400).send(err);
      }
}

module.exports.updatePost = (req,res)=>{
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    let postObject = { message: req.body.message }
    PostModel.updateOne({_id:req.params.id},{...postObject,_id: req.params.id})
      .then(()=>res.status(200).json({message: 'post modifié'}))
      .catch(err=> res.status(400).json({ err }))
}

module.exports.deletePost = (req,res)=>{
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    
    PostModel.deleteOne({_id:req.params.id})
        .then(()=>res.status(200).json({message: 'message supprimé'}))
        .catch(err=>res.status(400).json(err))
}

module.exports.likePost = (req,res)=>{
    PostModel.findOne({_id: req.params.id})
        .then(post => {

          if(post.likers.find(user => user === req.body.id)){
                PostModel.updateOne({_id:req.params.id}, 
                    {
                        $pull: { likers : req.body.id }
                    })
                    .then(() => { res.status(201).json({ message: 'Votre like/dislike a été pris en compte!' }); })
                    .catch((error) => { res.status(400).json({ error: error }); });
          } else  {
            console.log('il n y est pas');
            PostModel.updateOne({_id:req.params.id},
                    {
                        $push: { likers : req.body.id }
                    })
                    .then(() => { res.status(201).json({ message: 'Votre like a été pris en compte!' }); })
                    .catch((error) => { res.status(400).json({ error: error }); });
           }
         
        })  

        .catch(err=>res.status(404).json( err ))
}

module.exports.commentPost = (req,res)=>{
    PostModel.findByIdAndUpdate(req.params.id,
        {
            $push: { comments: 
                {
                    commenterId: req.body.commenterId,
                    commenterPseudo: req.body.commenterPseudo,
                    text: req.body.text,
                    timestamp: new Date().getTime()
                }
                    }
        })
        .then(() =>res.status(201).json({message: 'commentaire créé !'}))
        .catch(err => res.status(400).json(err))
        
}
module.exports.editCommentPost = (req,res)=>{
    try {
        return PostModel.findById(req.params.id, (err, docs) => {
          const theComment = docs.comments.find((comment) =>
            comment._id.equals(req.body.commentId)
          );
    
          if (!theComment) return res.status(404).send("Comment not found");
          theComment.text = req.body.text;
    
          return docs.save((err) => {
            if (!err) return res.status(200).send(docs);
            return res.status(500).send(err);
          });
        });
      } catch (err) {
        return res.status(400).send(err);
      }
}

module.exports.deleteCommentPost = (req,res)=>{
    PostModel.findByIdAndUpdate(req.params.id,
        {
            $pull: { comments: 
                {
                  _id: req.body.commentId
                }}
        }
    )   
    .then(()=>res.status(200).json({message: "commentaire supprimé !"}))
    .catch(err=>res.status(400).json(err))
}
