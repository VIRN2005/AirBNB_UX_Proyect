const express = require('express')

const bodyParser = require('body-parser')
var urlEncodeParser = bodyParser.urlencoded({ extended: true })

const { initializeApp } = require('firebase/app')
const {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut} = require('firebase/auth')

const firebaseConfig = {
    apiKey: "AIzaSyANUMj7P9UNGtAdZfkEH9v1nNBgeQphSxg",
    authDomain: "proyectoux-952da.firebaseapp.com",
    projectId: "proyectoux-952da",
    storageBucket: "proyectoux-952da.appspot.com",
    messagingSenderId: "154532564991",
    appId: "1:154532564991:web:1528f4500e1c78d4a5a1ca",
    measurementId: "G-EXS26MTW06"
  };

const cors = require('cors')

const app = express()
app.use(urlEncodeParser)
app.use(cors())
app.options('*', cors())

const firebaseApp = initializeApp(firebaseConfig);

let port = 3001;

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto', port)
});

app.get('/saludar', (req, res) => {
    res.status(200).send("Hola wey!")
});

app.post('/signUpFirebase',async (req,res)=>{
   const auth = getAuth(firebaseApp);
   const email = req.body.correo;
   const password = req.body.contrasena;
   try{
         const userCredential = await createUserWithEmailAndPassword(auth,email,password);
         res.status(200).send({
            descripcion: 'usuario creado con exito',
            resultado: userCredential
        });
   }catch(error){
       console.error('Hubo un error al crear el usuario',error)
       res.status(500).send({
        descripcion: 'No se pudo crear el usuario en firebase',
        resultado: error
    });
   }
});

app.post('/logInFirebase',async (req,res)=>{
    const auth = getAuth(firebaseApp);
    const email = req.body.correo;
    const password = req.body.contrasena;

    try {
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        res.status(200).send({
            descripcion: 'Sesion iniciada con exito',
            resultado: userCredential
        });
    }catch(error){
        res.status(500).send({
            descripcion: 'No se pudo inicar sesion',
            resultado: error
        });
    }

});


app.post('/logOutFirebase',async (req,res)=>{
    const auth = getAuth(firebaseApp);
    try{
        await signOut(auth);
        res.status(200).send({
            descripcion: 'Sesion cerrada con exito',
        });
    }catch(error){
        res.status(500).send({
            descripcion: 'No se pudo cerrar sesion',
            resultado: error
        });
    }

})




// app.post('/logIn', (req, res) => {
//     console.log("body-parseado",req.body)
//     res.status(200).send("Info recibida!")
// });

// app.post('/signUp', (req, res) => {
//     res.status(200).send({
//         mensaje: 'Usuario creado con exito' 
//     });
// });

// app.put('/update', (req, res) => {
//     res.status(200).send({
//         mensaje: 'Usuario actualizado con exito' 
//     });
// });

// app.delete('/delete', (req, res) => {
//     res.status(200).send({
//         mensaje: 'Usuario eliminado con exito' 
//     });
// });