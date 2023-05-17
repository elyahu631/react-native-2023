import React, { useContext, useState } from "react";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import Modal from "react-native-modal";
import CMap from "../comp/CMap";
import { rideContext } from "../context/RidesContext";
import { userContext } from "../context/UserContext";
const windowHeight = Dimensions.get("window").height;
// const windowWidth = Dimensions.get('window').width;

export default function PAddDriveOrRequest() {
  const [fromLocationCords, setFromLocationCords] = useState(null);
  const [seats, setSeats] = useState("");
  const [note, setNote] = useState("");

  const [showDetails, setShowDetails] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { rides, addRide } = useContext(rideContext);
  const { userLoggedInId } = useContext(userContext);

  const [fromCountryAndCity, setFromCountryAndCity] = useState("");
  const [toCountryAndCity, setToCountryAndCity] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const changeToLocation = (address) => {
    setToCountryAndCity(address);
  };

  const getLocationPermissionAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setShowDetails("הרשאות מיקום נדחו");
      setSnackbarVisible(true);
      return -1;
    }
    return 1;
  };
  const getLocationAsync = async () => {
    try {
      let getUserGpsPermiussion = await getLocationPermissionAsync();
      if (getUserGpsPermiussion != 1) {
        return;
      }

      let locationCoords = await Location.getCurrentPositionAsync({});
      setFromLocationCords(locationCoords.coords);
      //  locationCoords.coords.latitude = 55.4873593
      let addresses = await Location.reverseGeocodeAsync({
        latitude: locationCoords.coords.latitude,
        longitude: locationCoords.coords.longitude,
      });
      if (addresses && addresses.length > 0) {
        let locationInfo =
          isLocationInfoExist(addresses[0].country) +
          isLocationInfoExist(addresses[0].city) +
          isLocationInfoExist(addresses[0].region) +
          isLocationInfoExist(addresses[0].street) +
          isLocationInfoExist(addresses[0].streetNumber);
        console.log(
          `lat:${locationCoords.coords.latitude} lon:${locationCoords.coords.longitude}`
        );
        if (locationInfo[locationInfo.length - 1] === ",") {
          locationInfo = locationInfo.substring(0, locationInfo.length - 1);
        }
        setFromCountryAndCity(locationInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isLocationInfoExist = (info) => {
    if (info) {
      return info + ",";
    }
    return "";
  };
  const handleTextChangeFrom = (newText) => {
    setFromCountryAndCity(newText);
  };
  const handleTextChangeSeats = (newText) => {
    setSeats(newText);
  };

  const handleTextChangeTo = (newText) => {
    setToCountryAndCity(newText);
  };
  const handleTextChangeNote = (newText) => {
    setNote(newText);
  };
  const handelSubmit = () => {
    if (!seats) {
      setShowDetails("הכנס מספר מקומות פנויים");
      setSnackbarVisible(true);
      return;
    }
    if (fromCountryAndCity == "" || toCountryAndCity == "") {
      setShowDetails("מוצא או יעד ריקים");
      setSnackbarVisible(true);
      return;
    }
    addRide(userLoggedInId, seats, fromCountryAndCity, toCountryAndCity, note);
    setShowDetails("נסיעה הוספה");
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הוסף טרמפ</Text>
      <TextInput
        maxLength={2}
        keyboardType="numeric"
        onChangeText={handleTextChangeSeats}
        value={seats}
        style={styles.input}
        label="מספר מקומות"
        mode="outlined"
      />
      <View style={styles.buttonContainer}>
        <Button
          icon="crosshairs-gps"
          mode="contained"
          style={styles.button}
          onPress={getLocationAsync}
          color="#FFF"
        >
          מיקום נוכחי
        </Button>
      </View>
      <TextInput
        style={styles.input}
        value={fromCountryAndCity}
        label="מוצא"
        onChangeText={handleTextChangeFrom}
        mode="outlined"
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="map-marker"
          style={styles.button}
          onPress={async () => {
            setModalVisible(true);
          }}
          color="#FFF"
        >
          בחר יעד
        </Button>
      </View>
      <TextInput
        style={styles.input}
        value={toCountryAndCity}
        label="יעד"
        onChangeText={handleTextChangeTo}
        mode="outlined"
      />
      <TextInput
        onChangeText={handleTextChangeNote}
        value={note}
        style={styles.input}
        label="הערה"
        mode="outlined"
      />
      <Button style={styles.submitButton} onPress={handelSubmit} color="#FFF">
        Add
      </Button>
      <Modal isVisible={isModalVisible}>
        <Button
          style={styles.modalButton}
          onPress={() => setModalVisible(false)}
          color="#FFF"
        >
          X
        </Button>
        {
          <CMap
            coords={fromLocationCords || ""}
            changeToLocation={changeToLocation}
          />
        }
      </Modal>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          onPress: () => {
            // Handle undo action
          },
        }}
        style={styles.snackbar}
      >
        {showDetails}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 15,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#444",
  },
  modalButton: {
    zIndex: 2,
    position: "absolute",
    top: 50,
    left: 0,
    backgroundColor: "#FFA500", // bright orange
    borderRadius: 5,
    padding: 5,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFA500",
  },
  submitButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#2196F3",
    marginTop: 20,
  },
  modalButton: {
    zIndex: 2,
    position: "absolute",
    top: 50,
    left: 0,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 5,
    width: 200,
  },
  snackbar: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "red",
  },
});
