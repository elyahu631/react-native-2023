import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PGallery({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const clearImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.imageContainer, { width: windowWidth * 0.8, height: windowWidth * 0.8 }]} onPress={pickImage}>
        {image ? (
          <View style={styles.image}>
            <Button style={styles.clearButton} onPress={clearImage}>
              X
            </Button>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
        ) : (
          <>
            <Ionicons name="add" size={40} color="gray" />
            <Text style={styles.imageText}>בחר תמונה</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  clearButton: {
    position: 'absolute',
    zIndex:3,
    top: 10,
    left: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 5,
  },
});
