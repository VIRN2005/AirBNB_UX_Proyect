import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import LoginScreenStyles from '../styles/LoginScreenStyles';
import api from '../../api';

interface LoginScreenProps {
  navigation: NavigationProp<any, any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/logIn', { email, password });
      if (response.status === 200) {
        // Guardar el token o cualquier dato necesario y navegar a la pantalla principal
        navigation.navigate('Home');
      }
    } catch (error) {
      setError('Credenciales incorrectas');
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
