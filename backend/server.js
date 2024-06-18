const express = require('express')
const app = express()

let port = 3000;

app.listen(port,()=>{
    console.log('Servidor corriendo en el puerto',port)
})

app.get('/saludar',(req,res)=>{
    res.send("Hola wey!")
}
);