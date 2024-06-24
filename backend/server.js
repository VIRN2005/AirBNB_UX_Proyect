/*const express = require("express");
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.listen(port, () => console.log(Server started on ${port}));*/

const express = require('express');

const bodyParser = require('body-parser');
var urlEncodeParser = bodyParser.urlencoded({extended: true});

const {initializeApp} = require('firebase/app');
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require('firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyANUMj7P9UNGtAdZfkEH9v1nNBgeQphSxg',
  authDomain: 'proyectoux-952da.firebaseapp.com',
  projectId: 'proyectoux-952da',
  storageBucket: 'proyectoux-952da.appspot.com',
  messagingSenderId: '154532564991',
  appId: '1:154532564991:web:1528f4500e1c78d4a5a1ca',
  measurementId: 'G-EXS26MTW06',
};

const cors = require('cors');

const app = express();
app.use(urlEncodeParser);
app.use(cors());
app.options('*', cors());

const firebaseApp = initializeApp(firebaseConfig);

let port = 8000;

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto', port);
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.get('/saludar', (req, res) => {
  res.status(200).send('Hola wey!');
});

app.post('/signUpFirebase', async (req, res) => {
  const auth = getAuth(firebaseApp);
  const email = req.body.correo;
  const password = req.body.contrasena;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    res.status(200).send({
      descripcion: 'usuario creado con exito',
      resultado: userCredential,
    });
  } catch (error) {
    console.error('Hubo un error al crear el usuario', error);
    res.status(500).send({
      descripcion: 'No se pudo crear el usuario en firebase',
      resultado: error,
    });
  }
});

/*app.post('/logInFirebase', async (req, res) => {
  const auth = getAuth(firebaseApp);
  const {email, password} = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    res.status(200).send({
      descripcion: 'Sesion iniciada con exito',
      resultado: userCredential,
    });
  } catch (error) {
    res.status(500).send({
      descripcion: 'No se pudo inicar sesion',
      resultado: error,
    });
  }
});*/

app.post('/logInFirebase', async (req, res) => {
  const auth = getAuth(firebaseApp);
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    res.json({
      success: true,
      user: userCredential.user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid email or password',
    });
  }
});

app.post('/logOutFirebase', async (req, res) => {
  const auth = getAuth(firebaseApp);
  try {
    await signOut(auth);
    res.status(200).send({
      descripcion: 'Sesion cerrada con exito',
    });
  } catch (error) {
    res.status(500).send({
      descripcion: 'No se pudo cerrar sesion',
      resultado: error,
    });
  }
});

app.post('/logIn', (req, res) => {
  console.log('body-parseado', req.body);
  res.status(200).send('Info recibida!');
});

app.post('/signUp', (req, res) => {
  res.status(200).send({
    mensaje: 'Usuario creado con exito',
  });
});

app.put('/update', (req, res) => {
  res.status(200).send({
    mensaje: 'Usuario actualizado con exito',
  });
});

app.delete('/delete', (req, res) => {
  res.status(200).send({
    mensaje: 'Usuario eliminado con exito',
  });
});

//MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hamjosue33:HKSfcVZV49QgMNq1@proyectoux.qo7il74.mongodb.net/?retryWrites=true&w=majority&appName=proyectoUX";
const ObjectId = require('mongodb').ObjectId;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const database = client.db("proyectoUX");
const posts = database.collection("Lugares");

app.post('/createLugar', async (req, res)=>{
  await client.connect();
  const owner = req.body.owner
  const nombre =  req.body.nombre
  const categoria = req.body.categoria
  const ubicacion = req.body.ubicacion
  const url = req.body.url
  const precio = req.body.precio
  const horario = req.body.horario
  const rating = req.body.rating
  const cantidadPersonas = req.body.cantidadPersonas
  const fechaEntrada =  req.body.fechaEntrada
  const fechaSalida = req.body.fechaSalida
  const lugar = {owner, nombre, categoria,ubicacion,url, precio, horario, rating, cantidadPersonas, fechaEntrada, fechaSalida} 
  const result = await posts.insertOne(lugar);
  if (!result.insertedId) {
    res.status(500).send({
      msg: "No se pudo crear el lugar",
    });
  }
  res.status(200).send({
    msg: "Lugar creado exitosamente",
    data: result.insertedId,
  });
  await client.close();
})

app.get('/listLugares', async (req, res)=>{
  await client.connect();
  if ((await posts.countDocuments()) === 0) {
    res.status(200).send({
      msg: "No hay lugares guardados",
    });
  }
  const query = posts.find();
  let arrPosts = [];
  for await (const doc of query) {
    arrPosts.push(doc);
  }
  res.status(200).send({
    documentos: arrPosts,
  });
  await client.close();
})


app.delete('/deleteLugar', async (req, res)=>{
await client.connect();
  if ((await posts.countDocuments()) === 0) {
    res.status(200).send({
      msg: "No hay lugares guardados",
    });
  }

  if (await !posts.findOne({ _id: new ObjectId(req.params.id) })) {
    return res.status(500).send({
      msg: `No se encontró ningún lugar con id ${res.body.id}`,
    });
  }
  
  
  const filter = { _id: new ObjectId(req.params.id) };
  const result = await posts.deleteOne(filter);
  res.status(200).send("El lugar fue eliminado exitosamente");
  await client.close();
})


app.put('/editLugar', async (req, res)=>{
  await client.connect();
    if ((await posts.countDocuments()) === 0) {
      res.status(200).send({
        msg: "No hay lugares guardados",
      });
    }
    if (await !posts.findOne({ _id: new ObjectId(req.params.id) })) {
      return res.status(500).send({
        msg: `No se encontró ningún lugar con id ${res.body.id}`,
      });
    }

    const filter = { _id: new ObjectId(req.params.id) };
    const update = { $set: { owner: req.body.owner,
      nombre: req.body.nombre,
      categoria: req.body.categoria,
      ubicacion: req.body.ubicacion,
      precio: req.body.precio,
      horario: req.body.horario,
      rating: req.body.rating,
      cantidadPersonas: req.body.cantidadPersonas,
      fechaEntrada: req.body.fechaEntrada,
      fechaSalida: req.body.fechaSalida} };
    const options = { upsert: false };

    const result = await posts.updateOne(filter, update, options);

    res.status(200).send("El lugar fue editado exitosamente");
    await client.close();
})

const reservas = database.collection("reservas");

app.post('/createReserva', async (req, res)=>{
  await client.connect();
  const correoCliente = req.body.correoCliente
  const owner = req.body.owner
  const nombre =  req.body.nombre
  const categoria = req.body.categoria
  const ubicacion = req.body.ubicacion
  const precio = req.body.precio
  const fechaEntrada =  req.body.fechaEntrada
  const fechaSalida = req.body.fechaSalida
  
  const reserva = {correoCliente, owner, nombre, categoria, ubicacion, precio, fechaEntrada, fechaSalida}
  const result = await reservas.insertOne(reserva);
  if (!result.insertedId) {
    res.status(500).send({
      msg: "No se pudo crear la reserva",
    });
  }
  res.status(200).send({
    msg: "Reserva creada exitosamente",
    data: result.insertedId,
  });
  await client.close();
})


app.get('/listReservas', async (req, res)=>{
  await client.connect();
  if ((await reservas.countDocuments()) === 0) {
    res.status(200).send({
      msg: "No hay reservas guardadas",
    });
  }
  const query = reservas.find();
  let arrPosts = [];
  for await (const doc of query) {
    arrPosts.push(doc);
  }
  res.status(200).send({
    documentos: arrPosts,
  });
  await client.close();
})

app.delete('/deleteReserva', async (req, res)=>{
  await client.connect();
    if ((await reservas.countDocuments()) === 0) {
      res.status(200).send({
        msg: "No hay reservas guardadas",
      });
    }
  
    if (await !reservas.findOne({ _id: new ObjectId(req.params.id) })) {
      return res.status(500).send({
        msg: `No se encontró ninguna reserva con id ${res.body.id}`,
      });
    }
    
    
    const filter = { _id: new ObjectId(req.params.id) };
    const result = await reservas.deleteOne(filter);
    res.status(200).send("La reserva fue eliminada exitosamente");
    await client.close();
  })