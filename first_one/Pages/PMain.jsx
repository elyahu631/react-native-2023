import PLogin from './PLogin';
import PSign_up from './PSign_up';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import Home from './Home';
import { userContext } from '../context/userContext';

const Stack = createNativeStackNavigator();

export default function PMain() {
  const { isLoggedIn } = useContext(userContext);
  let context = !isLoggedIn ? (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="PLogin"
            component={PLogin}
          />
          <Stack.Screen name="PSign_up" component={PSign_up} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  ) : (
    <Home />
  );

  return context;
}
