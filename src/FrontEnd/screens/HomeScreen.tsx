import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, Text, TextInput, Alert, ActivityIndicator, Button } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import api from '../../api';
import axios from 'axios';

interface Listing {
  _id: string; // Assuming id is a string
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

interface Reservation {
  _id: string;
  correoCliente: string;
  owner: string;
  nombre: string;
  categoria: string;
  ubicacion: string;
  precio: number;
  fechaEntrada: string;
  fechaSalida: string;
}

interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const categoryMap: { [key: string]: string } = {
  hotel: 'Hotel',
  'beach-access': 'Playa',
  terrain: 'Camping',
  'trending-up': 'Tendencias',
  whatshot: 'Condominio',
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState('');
  const [selectedNavItem, setSelectedNavItem] = useState<number | null>(null);
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showReservations, setShowReservations] = useState<boolean>(false);

  useEffect(() => {
    fetchListings();
    loadFavorites();
    fetchUserEmail();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await api.get('/listLugares');
      setListings(response.data.documentos);
    } catch (error) {
      console.error('Error fetching listings:', error);
      Alert.alert('Error', 'No se pudo obtener la lista de lugares');
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (updatedFavorites: string[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = (id: string) => {
    const index = favorites.indexOf(id);
    if (index === -1) {
      const updatedFavorites = [...favorites, id];
      setFavorites(updatedFavorites);
      saveFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
      saveFavorites(updatedFavorites);
    }
  };

  const fetchUserEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email);
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  };

  const fetchUserReservations = async (email: string) => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email);
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  };

  const handleReserve = async (listing: Listing) => {
    if (!userEmail) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }
    try {
      // await firebase.auth().signInWithEmailAndPassword(email, password);
      let url = "https://1b3b-2803-4600-1113-2a7-e0d7-8c90-ab14-7b98.ngrok-free.app/createReserva"; 
      console.log("SENDING TO BACKEND",url)
  
      const body = {
        correoCliente: userEmail,
        owner: listing.owner,
        nombre: listing.nombre,
        categoria: listing.categoria,
        ubicacion: listing.ubicacion,
        precio: listing.precio,
        fechaEntrada: listing.fechaEntrada,
        fechaSalida: listing.fechaSalida,
      }
  
      const config = {
        headers: {
          'Content-Type': ' application/x-www-form-urlencoded',
      }
    }
    axios.post(url,body,config).then(async(res)=>{ 
        console.log("La respuesta del backend ",res.data)
        Alert.alert("Reserva realizada con éxito!","Disfrute su viaje")

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
      
    }    
  };

  const handleNavItemPress = async (index: number, category: string) => {
    setSelectedNavItem(index);
    setFilteredCategory(categoryMap[category] || null);

    if (index === 5) { // Índice 5 corresponde a 'favorite'
      setShowFavoritesOnly(true);
    } else if (index === 2) { // Índice 2 corresponde a 'trips'
      if (userEmail) {
        await fetchUserReservations(userEmail);
        setShowReservations(true);
      }
    } else {
      setShowFavoritesOnly(false);
      setShowReservations(false);
    }
  };

  const filterListings = () => {
    let filtered = listings;
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.nombre.toLowerCase().includes(lowerCaseSearch) ||
          listing.ubicacion.toLowerCase().includes(lowerCaseSearch)
      );
    }
    if (filteredCategory) {
      filtered = filtered.filter((listing) => listing.categoria === filteredCategory);
    }
    if (showFavoritesOnly) {
      filtered = filtered.filter((listing) => favorites.includes(listing._id));
    }
    return filtered;
  };

  const filterReservedListings = () => {
    if (reservations.length === 0) return [];
    return listings.filter((listing) => 
      reservations.some((reservation) => reservation.nombre === listing.nombre)
    );
  };

  const renderItem = ({ item }: { item: Listing }) => (
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
        <TouchableOpacity
          onPress={() => toggleFavorite(item._id)}
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          <MaterialIcons
            name={favorites.includes(item._id) ? 'favorite' : 'favorite-border'}
            size={24}
            color={favorites.includes(item._id) ? '#FF0000' : '#000000'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleReserve(item)}
          style={HomeScreenStyles.reserveButton}
        >
          <Text style={HomeScreenStyles.reserveButtonText}>Reservar</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
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
      <View style={HomeScreenStyles.navbarTop}>
        {['hotel', 'beach-access', 'terrain', 'trending-up', 'whatshot'].map(
          (iconName, index) => (
            <TouchableOpacity
              key={iconName}
              style={[
                HomeScreenStyles.navItem,
                selectedNavItem === index
                  ? HomeScreenStyles.navItemSelected
                  : null,
              ]}
              onPress={() => handleNavItemPress(index, iconName)}
            >
              <MaterialIcons name={iconName} size={30} />
              <Text
                style={[
                  HomeScreenStyles.navText,
                  selectedNavItem === index
                    ? HomeScreenStyles.navTextBold
                    : null,
                ]}
              >
                {categoryMap[iconName]}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={showReservations ? filterReservedListings() : filterListings()}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <View style={HomeScreenStyles.footer}>
              <Text style={HomeScreenStyles.footerText}>
                Más lugares disponibles...
              </Text>
            </View>
          )}
        />
      )}
      <View style={HomeScreenStyles.navbarBottom}>
        {['favorite', 'home', 'flight-takeoff', 'mail', 'person'].map(
          (iconName, index) => (
            <TouchableOpacity
              key={iconName}
              style={[
                HomeScreenStyles.navItem,
                selectedNavItem === index + 5
                  ? HomeScreenStyles.navItemSelected
                  : null,
              ]}
              onPress={() => handleNavItemPress(index + 5, '')}
            >
              <IconButton
                icon={() => <MaterialIcons name={iconName} size={24} />}
                onPress={() => {}}
              />
              <Text
                style={[
                  HomeScreenStyles.navText,
                  selectedNavItem === index + 5
                    ? HomeScreenStyles.navTextBold
                    : null,
                ]}
              >
                {iconName === 'home'
                  ? 'Explore'
                  : iconName === 'favorite'
                  ? 'Wishlist'
                  : iconName === 'flight-takeoff'
                  ? 'Trips'
                  : iconName === 'mail'
                  ? 'Inbox'
                  : 'Profile'}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

