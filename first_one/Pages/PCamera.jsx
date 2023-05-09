import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Snackbar } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PCamera({ navigation }) {
  const [camera, setCamera] = useState("");
  const [type, setType] = useState(CameraType.back);
  const [imgSrc, setImgSrc] = useState('');
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [loaded, setLoaded] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [message, setMessage] = useState("")
  const [messageColor, setMessageColor] = useState("red")

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setLoaded(true);
    });
    const blurListener = navigation.addListener('blur', () => {
      setLoaded(false);
      setImgSrc('');
    });

    return () => {
      blurListener();
    }
  }, []);


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>אנחנו צריכים את רשותכם כדי להראות את המצלמה</Text>
        <Button onPress={requestPermission}  >תן גישה</Button>
      </View>
    );
  }


  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePicture = async () => {
    try {
      if (camera) {
        await camera.takePictureAsync({ onPictureSaved: onPictureSaved });
      }

    } catch (error) {
      console.log(error);
    }
  };
  const AddToGallery = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    console.log(status);
    if (status === 'granted') {
      try {
        const asset = await MediaLibrary.createAssetAsync(imgSrc);
        // await MediaLibrary.createAlbumAsync('TrempsGallery', asset, false);
        await setMessageColor('green');
        setMessage("תמונה נשמרה בהצלחה")
        setSnackbarVisible(true);
      } catch (e) {
        console.log('שגיאה בזמן ניסיון הוספת התמונה ,נסה שנית.');
      }
    } else {
      setMessageColor('red');
      await setMessage("לא ניתן להוסיף לגלייה ללא אישור הרשאות")
      setSnackbarVisible(true);
    }
  }
  const onPictureSaved = photo => {

    setImgSrc(photo.uri);
  }

  return (
    <View style={styles.container}>
      {loaded && !imgSrc && (
        <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              {/* <Text style={styles.text}> */}
              <Ionicons size={32} style={styles.cameraBtns} name="camera-reverse-outline"></Ionicons>
              {/* </Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Ionicons size={32} style={styles.cameraBtns} name="camera-outline"></Ionicons>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      {imgSrc &&
        <View>
          <Image source={{ uri: imgSrc }}
            style={{
              width: windowWidth - 70, height: (windowWidth / windowHeight) * windowWidth, borderWidth: 1, borderColor: 'black', margin: 20
            }} />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button style={styles.btns} onPress={() => setImgSrc('')}>צלם תמונה חדשה</Button>
            <Button style={styles.btns} onPress={AddToGallery}>הוסף לגלרייה</Button>
          </View>

        </View>}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{

          onPress: () => {
            // Handle undo action
          },
        }}
        style={{
          backgroundColor: messageColor,
          borderRadius: 20,
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center', marginTop: 30, marginStart: 10, marginEnd: 10
  },
  drawer: {
    alignSelf: 'flex-start'
  },
  camera: {
    width: windowWidth - 70,
    height: (windowWidth / windowHeight) * windowWidth,
    justifyContent: 'flex-end',


  },
  buttonContainer: {
    display: "flex",
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 25,
  },
  flip: {
    fontSize: 24,
  },
  cameraBtns: {
    fontSize: 24,
    color: 'white',
    fontWeight: "bold"
  },
  btns: {
    borderWidth: 1, borderColor: 'black'
  }
});
