import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import SignupScreenStyles from '../styles/SignupScreenStyles';
import api from '../../api';

interface SignupScreenProps {
  navigation: NavigationProp<any, any>;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await api.post('/auth/createUser', { email, password });
      if (response.status === 200) {
        navigation.navigate('Login');
      }
    } catch (error) {
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
