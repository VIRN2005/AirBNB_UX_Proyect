import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp } from '@react-navigation/native';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import axios from 'axios';
import api from '../../api';

interface Listing {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  location: string;
  host: string;
  dateRange: string;
}

interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');
  const [selectedNavItem, setSelectedNavItem] = useState<number | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    filterListings();
  }, [search, listings]);

  const fetchListings = async () => {
    try {
      const response = await api.get('/listLugares');
      setListings(response.data.documentos);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const filterListings = () => {
    if (search === '') {
      setFilteredListings([]);
    } else {
      const filtered = listings.filter(listing =>
        listing.title.toLowerCase().includes(search.toLowerCase()) ||
        listing.location.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredListings(filtered);
    }
  };

  const handleNavItemPress = (index: number) => {
    setSelectedNavItem(index);
  };

  const handleNavItemHover = (index: number) => {
    setSelectedNavItem(index);
  };

  const clearNavItemHover = () => {
    setSelectedNavItem(null);
  };

  const handleCreateLugar = async () => {
    const newLugar = {
      owner: 'Victor Romero',
      nombre: 'Full Luxury Condo',
      categoria: 'Hotel',
      ubicacion: 'Tegucigalpa, Honduras',
      url:'https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440',
      precio: 1000,
      horario: '9 AM - 5 PM',
      rating: 4.9,
      cantidadPersonas: 10,
      fechaEntrada: '2024-06-25',
      fechaSalida: '2024-06-26',
    };

    try {
      const response = await api.post('/createLugar', newLugar);
      Alert.alert('Success', 'Lugar creado exitosamente');
      fetchListings();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el lugar');
      console.error('Error creating lugar:', error);
    }
  };

  const handleFavorites = async () => {
    const favoriteListings = listings.filter(listing => listing.rating >= 4);

    try {
      await Promise.all(
        favoriteListings.map(async listing => {
          const favoriteData = {
            userId: 'someUserId',
            lugarId: listing.id,
          };
          await api.post('/favoriteLugar', favoriteData);
        })
      );
      Alert.alert('Success', 'Favoritos actualizados');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar los favoritos');
      console.error('Error updating favorites:', error);
    }
  };

  const renderItem = ({ item }: { item: Listing }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
      <Card style={HomeScreenStyles.card}>
        <Image source={{ uri: item.image }} style={HomeScreenStyles.image} />
        <Card.Content>
          <View style={HomeScreenStyles.textContainer}>
            <View style={HomeScreenStyles.header}>
              <Text style={HomeScreenStyles.location}>{item.location}</Text>
              <View style={HomeScreenStyles.ratingContainer}>
                <MaterialIcons name="star" size={20} color="gold" />
                <Text style={HomeScreenStyles.rating}>{item.rating}</Text>
              </View>
            </View>
            <Text style={HomeScreenStyles.host}>
              Stay with {item.host} · {item.dateRange}
            </Text>
            <Text style={HomeScreenStyles.price}>{item.price} total</Text>
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
          placeholder="Where to?"
          value={search}
          onChangeText={setSearch}
        />
        <MaterialIcons
          name="tune"
          size={24}
          color="#000"
          style={HomeScreenStyles.filterIcon}
        />
      </View>
      <FlatList
        data={
          filteredListings.length > 0 ? filteredListings : listings.slice(0, 4)
        }
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListFooterComponent={() => (
          <View style={HomeScreenStyles.footer}>
            <Text style={HomeScreenStyles.footerText}>
              More listings available...
            </Text>
          </View>
        )}
      />
      <View style={HomeScreenStyles.navbarBottom}>
        {['home', 'favorite', 'flight-takeoff', 'mail', 'person'].map(
          (iconName, index) => (
            <TouchableOpacity
              key={iconName}
              style={[
                HomeScreenStyles.navItem,
                selectedNavItem === index + 5
                  ? HomeScreenStyles.navItemSelected
                  : null,
              ]}
              onPress={() => handleNavItemPress(index + 5)}
              onPressIn={() => handleNavItemHover(index + 5)}
              onPressOut={clearNavItemHover}>
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
                ]}>
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
          ),
        )}
      </View>
      <Button title="Create New Lugar" onPress={handleCreateLugar} />
      <Button title="Update Favorites" onPress={handleFavorites} />
    </View>
  );
};

export default HomeScreen;
