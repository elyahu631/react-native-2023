import React, { useContext } from 'react';
import {  Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import PAddDriveOrRequest from './PAddDriveOrRequest';
import PCamera from './PCamera';
import PGallery from './PGallery';
import { userContext } from '../context/userContext';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();



export default function Home() {
  const { setIsLoggedIn } = useContext(userContext);

  return (
    <NavigationContainer>

      <Drawer.Navigator
        screenOptions={{
          // headerShown: false, // hide header title
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
              {/* <Text style={styles.text}> */}
              <Ionicons size={32} name="log-out-outline"></Ionicons>
              {/* </Text> */}
            </TouchableOpacity>
          ),
        }}

      >
        <Drawer.Screen name="הוסף טרמפ" component={PAddDriveOrRequest} />
        <Drawer.Screen name="צלם תמונה" component={PCamera} />
        <Drawer.Screen name="גלרייה" component={PGallery} />
        {/* <Drawer.Screen name="ScreenTwo" component={ScreenTwo} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
