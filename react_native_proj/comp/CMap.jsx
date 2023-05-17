import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

export default function CMap(props) {
    const [marker, setMarker] = useState(null);
    const [address, setAddress] = useState(null);
    let fromLat = props.coords.latitude || 32.157154;
    let FromLon = props.coords.longitude || 34.843893;

    useEffect(() => {
        getAddressFromCoords();
    }, [marker]);

    const getAddressFromCoords = async () => {
        if (!marker) {
            return;
        }

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('אין גישה למיקום');
            // props.setModalVisible(false);
            return;
        }
       
        const addressArray = await Location.reverseGeocodeAsync({
            latitude: marker.latitude,
            longitude: marker.longitude,
        });
        if (addressArray) {
            const formattedAddress = `${addressArray[0].street}, ${addressArray[0].city}, ${addressArray[0].region}, ${addressArray[0].postalCode}, ${addressArray[0].country}`;
            setAddress(formattedAddress);
            props.changeToLocation(formattedAddress)
        }
    };

    const handlePress = (event) => {
        setMarker(event.nativeEvent.coordinate);
        console.log("marker", marker);
    };

    return (
        <MapView
            onPress={handlePress}
            style={{ flex: 0.7, width: Dimensions.get('window').width - 30 }}
            region={{
                latitude: fromLat,
                longitude: FromLon,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0521,
            }}
        >
            <Marker
                coordinate={{
                    latitude: fromLat,
                    longitude: FromLon,
                }}
                title='התחלה'
                description='מיקום התחלתי'
            //image={require('../assets/icon.png')}
            />
            {marker && <Marker coordinate={marker}></Marker>}
        </MapView>
    );
}