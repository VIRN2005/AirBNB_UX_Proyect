import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import LoginScreenStyles from '../styles/LoginScreenStyles';
//import api from '../../api';
import axios from 'axios';
import firebase from 'firebase/compat/app';

interface LoginScreenProps {
  navigation: NavigationProp<any, any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // await firebase.auth().signInWithEmailAndPassword(email, password);
      let url = "https://1b3b-2803-4600-1113-2a7-e0d7-8c90-ab14-7b98.ngrok-free.app/auth/logIn"; 
      console.log("SENDING TO BACKEND",url)
  
      const body = {
        email:email,
        password: password,
      }
  
      const config = {
        headers: {
          'Content-Type': ' application/x-www-form-urlencoded',
      }
    }
    axios.post(url,body,config).then((res)=>{ 
        console.log("La respuesta del backend ",res.data)
        navigation.navigate('Home');
      })
      .catch((error)=>{
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response error:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
      } else if (error.request) {
          // The request was made but no response was received
          console.error('No response:', error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
      }
      console.error('Config:', error.config);
  
      } )
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={LoginScreenStyles.container}>
      <Image source={require('../imgs/Airbnb-Logo-White.png')} style={LoginScreenStyles.logo} />
      <View style={LoginScreenStyles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={LoginScreenStyles.input}
          mode="flat"
          outlineColor="#EBEBEB"
          activeOutlineColor="#FF5A5F"
          selectionColor="#FF5A5F"
          theme={{ colors: { primary: '#FF5A5F' } }}
        />
      </View>
      <View style={LoginScreenStyles.inputContainer}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={LoginScreenStyles.input}
          mode="flat"
          outlineColor="#EBEBEB"
          activeOutlineColor="#FF5A5F"
          selectionColor="#FF5A5F"
          theme={{ colors: { primary: '#FF5A5F' } }}
        />
      </View>
      {error ? <Text style={LoginScreenStyles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin} style={LoginScreenStyles.button}>
        <Text style={LoginScreenStyles.buttonText}>LOG IN</Text>
      </Button>
      <View style={LoginScreenStyles.footer}>
        <Text style={LoginScreenStyles.footerText}>Don't have an account?</Text>
        <Text style={LoginScreenStyles.footerLink} onPress={() => navigation.navigate('Signup')}>Sign up</Text>
      </View>
    </View>
  );
};

export default LoginScreen;