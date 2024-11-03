import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';

interface VisitedLocation {
  latitude: number;
  longitude: number;
  name: string;
}

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [visitedLocations, setVisitedLocations] = useState<VisitedLocation[]>([]); // Sample visited locations

  // Sample visited locations 
  const sampleVisitedLocations: VisitedLocation[] = [
    { latitude: -27.4975, longitude: 153.0137, name: 'Sir William Macgregor Building, UQ' },
    { latitude: -27.4987, longitude: 153.0135, name: 'Great Court, UQ' },
    { latitude: -27.4978, longitude: 153.0141, name: 'UQ Lakes, UQ' }
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      // Simulate fetching visited locations from API
      setVisitedLocations(sampleVisitedLocations);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E57373" />
        <Text>Loading your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>StoryPath Map</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {visitedLocations.length > 0 ? (
          visitedLocations.map((loc, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
              title={loc.name}
            >
              <View style={styles.markerCircle}>
                <View style={styles.innerCircle} />
              </View>
            </Marker>
          ))
        ) : (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
          />
        )}

        {/* Optionally add Circles to highlight areas */}
        {visitedLocations.map((loc, index) => (
          <Circle
            key={index}
            center={{ latitude: loc.latitude, longitude: loc.longitude }}
            radius={100} // You can adjust the radius
            strokeColor="rgba(230,115,115,0.5)"
            fillColor="rgba(230,115,115,0.3)"
          />
        ))}
      </MapView>

      {/* Display visited location details */}
      {visitedLocations.length > 0 && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>{visitedLocations[0].name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#E57373',
  },
  headerText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 150, // Adjust height as needed
  },
  markerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(230,115,115,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E57373',
  },
  locationInfo: {
    padding: 20,
    backgroundColor: '#000',
    width: '100%',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
