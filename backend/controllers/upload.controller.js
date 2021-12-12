const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
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

  //On donne au nom de fichier le nom du pseudo suivi automatiquement de jpg. Le pseudo est unique donc :
  // - pas de doublons possibles avec le nom d'une autre image 
  // - écrasement de l'ancienne image donc pas besoin de supprimer la précédente 
  const fileName = req.body.name + ".jpg";

  //Chemin du fichier dans notre éditeur
  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      // `${__dirname}/../client/public/uploads/profil/${fileName}`
      `${__dirname}/../../frontend/public/uploads/profil/${fileName}`
    )
  );
  // /Users/davy.mac/Desktop/revisionNode/frontend/src/uploads/imagesFrontend/erase.svg

  //Chemin du fichier dans MongoDb
  try {
    UserModel.findByIdAndUpdate(
      req.body.userId,
      { picture: "./uploads/profil/" + fileName},
    )
      .then(()=>res.status(200).json({message: 'picture modifiée'}))
      .catch(err=> res.status(400).json({ err }))
  } catch (err) {
    return res.status(501).send({ message: err });
  }
}

