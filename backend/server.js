const express = require('express')


const bodyParser = require('body-parser')
var urlEncodeParser = bodyParser.urlencoded({ extended: true })

const cors = require('cors')

const app = express()
app.use(urlEncodeParser)
app.use(cors())
app.options('*', cors())
let port = 3000;

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto', port)
});

app.get('/saludar', (req, res) => {
    res.status(200).send("Hola wey!")
});

app.post('/logIn', (req, res) => {
    console.log("body-parseado",req.body)
    res.status(200).send("Info recibida!")
});

app.post('/signUp', (req, res) => {
    res.status(200).send({
        mensaje: 'Usuario creado con exito' 
    });
});

app.put('/update', (req, res) => {
    res.status(200).send({
        mensaje: 'Usuario actualizado con exito' 
    });
});

app.delete('/delete', (req, res) => {
    res.status(200).send({
        mensaje: 'Usuario eliminado con exito' 
    });
});