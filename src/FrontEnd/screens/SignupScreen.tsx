import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import SignupScreenStyles from '../styles/SignupScreenStyles';
import api from '../../api';
import axios from 'axios';

interface SignupScreenProps {
  navigation: NavigationProp<any, any>;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    
    let url = "https://9a01-2803-4600-1113-2a7-8c49-2b68-9bfa-71c2.ngrok-free.app/auth/createUser"; 
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
      navigation.navigate('Login');
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
    try {

      const response = await api.post('/auth/createUser', { email, password });
      if (response.status === 200) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
      setError('No se pudo crear el usuario');
    }
  };

  return (
    <View style={SignupScreenStyles.container}>
      <Image source={require('../imgs/Airbnb-Logo-White.png')} style={SignupScreenStyles.logo} />
      <View style={SignupScreenStyles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={SignupScreenStyles.input}
          mode="flat"
          outlineColor="#EBEBEB"
          activeOutlineColor="#FF5A5F"
          selectionColor="#FF5A5F"
          theme={{ colors: { primary: '#FF5A5F' } }}
        />
      </View>
      <View style={SignupScreenStyles.inputContainer}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={SignupScreenStyles.input}
          mode="flat"
          outlineColor="#EBEBEB"
          activeOutlineColor="#FF5A5F"
          selectionColor="#FF5A5F"
          theme={{ colors: { primary: '#FF5A5F' } }}
        />
      </View>
      {error ? <Text style={SignupScreenStyles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleSignup} style={SignupScreenStyles.button}>
        <Text style={SignupScreenStyles.buttonText}>SIGNUP</Text>
      </Button>
      <View style={SignupScreenStyles.footer}>
        <Text style={SignupScreenStyles.footerText}>Welcome to this Amazing Experience!</Text>
      </View>
    </View>
  );
};

export default SignupScreen;