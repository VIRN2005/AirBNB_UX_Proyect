const { initializeApp } = require('firebase/app');

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

const app = initializeApp(firebaseConfig);

const registerUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      res.status(200).send({
        msg: 'Usuario creado exitosamente',
        data: userCredential,
      });
    })
    .catch(error => {
      res.status(500).send({
        msg: 'No se pudo crear el usuario',
        data: error.message,
      });
    });
};

const loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      res.status(200).send({
        msg: 'Usuario inició sesión exitosamente',
        data: {
          uid: user.uid,
          email: user.email,
          token1: user.stsTokenManager.refreshToken,
          token2: user.stsTokenManager.accessToken,
        },
      });
    })
    .catch(error => {
      res.status(500).send({
        msg: 'Credenciales incorrectas',
        data: error.message,
      });
    });
};
const logoutUser = (req, res) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      res.status(200).send({
        msg: 'Usuario cerró sesión exitosamente',
      });
    })
    .catch(error => {
      res.status(500).send({
        msg: 'Error Log out',
        data: error.message,
      });
    });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
