const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://hamjosue33:BpexblLPYeSj9lX9@examen2ux.mp3u7jm.mongodb.net/?retryWrites=true&w=majority&appName=Examen2UX";
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

const database = client.db("Examen2UX"); //CAMBIAR ESTO
const posts = database.collection("Post");
const Post = require("../models/postModel");
const { query } = require("express");

const createPost = async (req, res) => {
  await client.connect();
  const post = await new Post({
    titulo: req.body.titulo,
    texto: req.body.texto,
  });
  const result = await posts.insertOne(post);
  if (!result.insertedId) {
    res.status(500).send({
      msg: "No se pudo crear el post",
    });
  }
  res.status(200).send({
    msg: "Post creado exitosamente",
    data: result.insertedId,
  });
  await client.close();
};

const listPosts = async (req, res) => {
  await client.connect();
  if ((await posts.countDocuments()) === 0) {
    res.status(200).send({
      msg: "No hay posts guardados",
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
};


const editPost = async (req, res) => {
  await client.connect();
  if ((await posts.countDocuments()) === 0) {
    res.status(200).send({
      msg: "No hay posts guardados",
    });
  }
  if (await !posts.findOne({ _id: new ObjectId(req.params.id) })) {
    return res.status(500).send({
      msg: `No se encontró ningún post con id ${res.body.id}`,
    });
  }

  const filter = { _id: new ObjectId(req.params.id) };
  const update = { $set: { titulo: req.body.titulo, texto: req.body.texto } };
  const options = { upsert: false };

  const result = await posts.updateOne(filter, update, options);

  res.status(200).send("El post fue editado exitosamente");
  await client.close();
};


const deletePost = async (req, res) => {
  await client.connect();
  if ((await posts.countDocuments()) === 0) {
    res.status(200).send({
      msg: "No hay posts guardados",
    });
  }

  if (await !posts.findOne({ _id: new ObjectId(req.params.id) })) {
    return res.status(500).send({
      msg: `No se encontró ningún post con id ${res.body.id}`,
    });
  }
  
  
  const filter = { _id: new ObjectId(req.params.id) };
  const result = await posts.deleteOne(filter);
  res.status(200).send("El post fue eliminado exitosamente");
  await client.close();
};

module.exports = {
  listPosts,
  createPost,
  editPost,
  deletePost,
};