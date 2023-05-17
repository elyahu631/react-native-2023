import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import PAddDriveOrRequest from './PAddDriveOrRequest';
import PCamera from './PCamera';
import PGallery from './PGallery';
import { userContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import PCarousel from './PCarousel';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function Home() {
  const { setIsLoggedIn } = useContext(userContext);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 ,backgroundColor:'red'}}>
      {/* Overlay */}
      <View style={styles.overlay}>
        <DrawerToggleButton tintColor="white" />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('הוסף טרמפ')}
        >
          <Ionicons name="add-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('צלם תמונה')}
        >
          <Ionicons name="camera-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => setIsLoggedIn(false)}>
          <Ionicons name="log-out-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Drawer Navigator */}
      <View style={styles.drawerContainer}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            headerTitle: '',
          }}
        >
          <Drawer.Screen name="קרוסלה" component={PCarousel} />
          <Drawer.Screen name="גלרייה" component={PGallery} />
          <Drawer.Screen
            name="הוסף טרמפ"
            component={PAddDriveOrRequest}
            options={{ drawerItemStyle: { height: 0 } }}
          />
          <Drawer.Screen
            name="צלם תמונה"
            component={PCamera}
            options={{ drawerItemStyle: { height: 0 } }}
          />
        </Drawer.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    alignItems: 'center',
    zIndex: 1000,
  },
  iconContainer: {
    color: 'white',
  },
  drawerContainer: {
    flex: 1,
    zIndex: 999,
  },
});
