const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer();

const postController = require('../controllers/post.controller')


router.get('/', postController.readPost);
router.post('/', upload.single("file"), postController.createPost);
router.put('/:id',postController.updatePost);
router.delete('/:id',postController.deletePost);


//likes
router.patch('/like-post/:id',postController.likePost);

//commentaires
//Les 3 id sont celui du post et non du commentaire
router.patch('/comment-post/:id',postController.commentPost);
router.patch('/edit-comment-post/:id',postController.editCommentPost);
//router.delete fonctionne aussi pour le Delete si besoin
router.patch('/delete-comment-post/:id',postController.deleteCommentPost);



module.exports = router;