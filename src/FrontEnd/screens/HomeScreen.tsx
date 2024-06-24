import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, Text, TextInput, Alert } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp } from '@react-navigation/native';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import api from '../../api';

interface Listing {
  _id: string; // Asumiendo que el id es un string
  owner: string;
  nombre: string;
  categoria: string;
  ubicacion: string;
  url: string;
  precio: number;
  horario: string;
  rating: number;
  cantidadPersonas: number;
  fechaEntrada: string;
  fechaSalida: string;
}

interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await api.get('/listLugares');
      setListings(response.data.documentos);
    } catch (error) {
      console.error('Error fetching listings:', error);
      Alert.alert('Error', 'No se pudo obtener la lista de lugares');
    }
  };

  const filterListings = () => {
    if (search === '') {
      return listings; // Devolver todos los listings si no hay filtro
    } else {
      const lowerCaseSearch = search.toLowerCase();
      return listings.filter(listing =>
        listing.nombre.toLowerCase().includes(lowerCaseSearch) ||
        listing.ubicacion.toLowerCase().includes(lowerCaseSearch)
      );
    }
  };

  const renderItem = ({ item }: { item: Listing }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
      <Card style={HomeScreenStyles.card}>
        <Image source={{ uri: item.url }} style={HomeScreenStyles.image} />
        <Card.Content>
          <View style={HomeScreenStyles.textContainer}>
            <Text style={HomeScreenStyles.location}>{item.ubicacion}</Text>
            <Text style={HomeScreenStyles.host}>
              Stay with {item.owner} · {item.fechaEntrada} to {item.fechaSalida}
            </Text>
            <Text style={HomeScreenStyles.price}>{item.precio} total</Text>
            <View style={HomeScreenStyles.ratingContainer}>
              <MaterialIcons name="star" size={20} color="gold" />
              <Text style={HomeScreenStyles.rating}>{item.rating}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={HomeScreenStyles.container}>
      <View style={HomeScreenStyles.searchContainer}>
        <TextInput
          style={HomeScreenStyles.searchInput}
          placeholder="Buscar por nombre o ubicación"
          value={search}
          onChangeText={setSearch}
        />
        <MaterialIcons
          name="search"
          size={24}
          color="#000"
          style={HomeScreenStyles.filterIcon}
        />
      </View>
      <FlatList
        data={filterListings()}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ListFooterComponent={() => (
          <View style={HomeScreenStyles.footer}>
            <Text style={HomeScreenStyles.footerText}>
              Más lugares disponibles...
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
