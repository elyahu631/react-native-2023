import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

export default function PAddDriveOrRequest({ navigation }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [location, setLocation] = useState(null);
    // const [city, setCity] = useState(null);
    // const [country, setCountry] = useState(null);
    const [countryAndCity, setCountryAndCity] = useState("");


    const getLocationAsync = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            let locationCoords = await Location.getCurrentPositionAsync({});
            setLocation(locationCoords);
            //  locationCoords.coords.latitude = 55.4873593
            let addresses = await Location.reverseGeocodeAsync({
                latitude: locationCoords.coords.latitude,
                longitude: locationCoords.coords.longitude,
            });
            if (addresses && addresses.length > 0) {
                setErrorMessage(null)
                let locationInfo = isLocationInfoExist(addresses[0].country)  + isLocationInfoExist(addresses[0].city) + isLocationInfoExist(addresses[0].region) + isLocationInfoExist(addresses[0].street) + isLocationInfoExist(addresses[0].streetNumber);
                console.log(`lat:${locationCoords.coords.latitude} lon:${locationCoords.coords.longitude}`)
                if (locationInfo[locationInfo.length-1] === ',') {
                    locationInfo=locationInfo.substring(0,locationInfo.length-1)
                }
                setCountryAndCity(locationInfo)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }

    };
    const isLocationInfoExist =(info)=>{
        if (info){
            return info + ','
        }
        return ""
    }
    const handleTextChange = (newText) => {
        setCountryAndCity(newText);
    };
    return (
        <View style={{ alignItems: 'flex-start', marginTop: 30, marginStart: 10, marginEnd: 10 , }}>
            <Text>הוסף טרמפ</Text>
            {/* <TouchableOpacity onPress={() => setShowDateTimePicker(true)}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                    בחר תאריך ושעה</Text>
            </TouchableOpacity> */}
            <TextInput style={{ width: "100%" }} label='מקומות פנויים'></TextInput>
            <View>
                <Button icon="crosshairs-gps"
                    mode="contained"
                    style={{
                        width: "100%",
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    onPress={getLocationAsync}>הכנס מיקום נוכחי</Button>
                {/* {location && (
                    <Text>
                        Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
                    </Text>)} */}


                {errorMessage && (
                    <Text>
                        {errorMessage}
                    </Text>)}
            </View>
            <TextInput style={{ width: "100%" }} value={countryAndCity} label='מיקום' onChangeText={handleTextChange}></TextInput>
            <TextInput style={{ width: "100%" }} label='יעד'></TextInput>
            <TextInput style={{ width: "100%" }} label='הערה'></TextInput>
            <Button style={{ width: "100%" }}>הוסף</Button>

        </View>
    )
}
