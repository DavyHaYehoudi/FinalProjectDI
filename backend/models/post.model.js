const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },

        message: {
            type: String,
            trim: true,
            maxlength: 500
        },

        picture: {
            type: String,
        },

        video: {
            type: String
        },

        likers: {
            type: [String],
            required: true
        },

        comments: {
            type: [
                {
                    //En création de commentaire : commenterId => id du user qui commente
                    //En modification de commentaire :commentId(et non commenterId)=>id du commentaire généré par Mongo 
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number
                }
            ],
            required:true
        },    
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('post', PostSchema)