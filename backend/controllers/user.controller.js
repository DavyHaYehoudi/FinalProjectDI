const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req,res) =>{
    const users = await UserModel.find().select('-password');
    res.status(200).json(users)
}

module.exports.userInfo = (req,res)=>{
    if(!(ObjectID.isValid(req.params.id)))
        return res.status(404).send("erreur d'identifiant : " + req.params.id)

    UserModel.findById(req.params.id, (err,docs) =>{
        if(!err)res.send(docs);
        else console.log("erreur d'identifiant : " + err);
    }).select('-password')
    
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      let userObject = { bio: req.body.bio }
    UserModel.updateOne({_id:req.params.id},{...userObject,_id: req.params.id})
      .then(()=>res.status(200).json({message: 'user modifié'}))
      .catch(err=> res.status(400).json({ err }))
  };

  module.exports.deleteUser = (req,res)=>{
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      UserModel.deleteOne({_id  : req.params.id })
        .then(()=>res.status(200).json({message: 'user supprimé'}))
        .catch(err => res.status(404).json({ err }))
  }