const express = require('express');
const router = express.Router();
//ajouter la version multer@2.0.0-rc.1 car la 1.4.3 ou autre ne fonctionne pas
const multer = require('multer');
const upload = multer();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller')

//auth
router.post('/register',authController.signUp);
router.post('/login',authController.signIn);
router.get('/logout',authController.logout);

//user Db
router.get('/',userController.getAllUsers);
router.get('/:id',userController.userInfo);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

//upload images
router.post('/upload',upload.single('file'),uploadController.uploadProfil)

module.exports = router;