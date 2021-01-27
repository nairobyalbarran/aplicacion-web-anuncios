var express = require('express');
var router = express.Router();

//Cliente de Mongo
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/anuncio', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/anuncios',
        function (err, db) {
            console.log("Conectado al servidor")

            var collection = db.collection('anuncios');
            collection.find().toArray(function (err, result) {
                res.status(200);
                res.json(result);

                // Cerrar el cliente
                db.close();
            });

        });
})

router.delete('/anuncio/:id', function (req, res) {
    var IDanuncio = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://localhost:27017/anuncios',
            function (err, db) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje: "Error de la base de datos",
                        insertado: false
                    });
                } else {
                    console.log("Conectado al servidor")
                    var collection = db.collection('anuncios');
                    collection.remove({_id: IDanuncio}, function (err, result) {

                        if (err) {
                            res.status(500);
                            res.json({
                                mensaje: "Error al borrar anuncio",
                                insertado: false
                            });
                        } else {
                            res.status(200);
                            res.json({
                                mensaje: "borrado con éxito"

                            });
                        }
                        // Cerrar el cliente
                        db.close();
                    });

                }

        });
})

router.get('/anuncio/:id', function (req, res) {
    var IDanuncio = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://localhost:27017/anuncios',
        function (err, db) {
            console.log("Conectado al servidor")

            var collection = db.collection('anuncios');
            collection.find({_id: IDanuncio}).toArray(function (err, result) {
                res.status(200);
                res.json(result);

                // Cerrar el cliente
                db.close();
            });
        });
})

router.post('/anuncio', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/anuncios',
        function (err, db) {
            console.log("Conectado al servidor")

            var a1 = {
                descripcion: req.body.descripcion,
                precio: req.body.precio
            }

            var collection = db.collection('anuncios');
            collection.insert(a1, function (err, result) {
                res.status(201);
                res.json({
                    insertado: true
                });
                // Cerrar el cliente
                db.close();
            });
        });
})


module.exports = router;
