import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, Text, TextInput, Alert ,ActivityIndicator} from 'react-native';
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
const categoryMap: { [key: string]: string } = {
  hotel: 'Hotel',
  'beach-access': 'Playa',
  terrain: 'Camping',
  'trending-up': 'Tendencias',
  whatshot: 'Condominio'
};
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');
  const [selectedNavItem, setSelectedNavItem] = useState<number | null>(null);
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
    
  };

  const handleNavItemPress = (index: number, category: string) => {
    setSelectedNavItem(index);
    setFilteredCategory(categoryMap[category] || null);
  };

  const filterListings = () => {
    let filtered = listings;
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      filtered = filtered.filter(listing =>
        listing.nombre.toLowerCase().includes(lowerCaseSearch) ||
        listing.ubicacion.toLowerCase().includes(lowerCaseSearch)
      );
    }
    if (filteredCategory) {
      filtered = filtered.filter(listing => listing.categoria === filteredCategory);
    }
    return filtered;
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
                {iconName === 'hotel'
                  ? 'Rooms'
                  : iconName === 'beach-access'
                  ? 'Beachfront'
                  : iconName === 'terrain'
                  ? 'Camping'
                  : iconName === 'trending-up'
                  ? 'Trending'
                  : 'OMG!'}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
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
      )}
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
          ),
        )}
      </View>
    </View>
    
  );
};

export default HomeScreen;
