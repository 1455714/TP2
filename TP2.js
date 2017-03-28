const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
app.use(bodyParser.json());
const ObjectId = require('mongodb').ObjectID;
app.set('view engine', 'ejs'); // générateur de template «ejs»
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public

var db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/carnet', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})




//page de base
app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
   //récupère la bdd
    var cursor = db.collection('carnet').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // affiche le contenu de la BD
    res.render('index.ejs', {carnet: resultat})

    }) 
})


//lorsqu'on ajoute une adresse
app.post('/ajout',  (req, res) => {
  db.collection('carnet').save({'nom':req.body[0].value,
  "telephone":req.body[2].value,"prenom":req.body[1].value}, (err, result) => {
      if (err) return console.log(err)
      console.log('sauvegarder dans la BD')
      //console.log(result[3].value);
      console.log(result.ops[0]._id);
      res.send(result.ops[0]._id);
    })
})

//lorsqu'on delete une adresse
app.post('/delete',  function(req, res){
  //supprime l'adresse sélectionnée
db.collection('carnet').remove ({_id: ObjectId(req.body["_id"])}, (err, result) => {
  if (err) {return console.log(err)}
    //retourne à la page de base
      res.end()
    })
})


//lorsqu'on confirme l'update d'une adresse
app.post('/update',  function(req, res){
  //collecte les valeurs entrées pour changer l'adresse sélectionnée
db.collection('carnet').update ({_id: ObjectId(req.body["_id"])},{$set:{'nom':req.body["nom"],
  "telephone":req.body["telephone"],"prenom":req.body["prenom"]}}, (err, result) => {
  if (err) {return console.log(err)}
      console.log("reussi !");
      //retourne à la page de base
      //res.redirect('/') 
      res.end()
  })
})



