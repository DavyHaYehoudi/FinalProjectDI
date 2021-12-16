const mongoose = require('mongoose');
require('dotenv').config({path:'./config/.env'});


mongoose.
    connect("mongodb+srv://"+ process.env.DB_USER_PASS + "@cluster0.wn6wq.mongodb.net/nodeJsDI",
            { 
              useNewUrlParser: true,
              useUnifiedTopology: true, 
     })
            .then(() => console.log('Connexion à MongoDB réussie !'))
            .catch((err) => console.log('Connexion à MongoDB échouée...',err)
)
