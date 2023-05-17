import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox, Snackbar, Button, Text } from 'react-native-paper';
import { userContext } from '../context/UserContext';

export default function PLogin(props) {
  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberLogin, setRememberLogin] = useState(true);
  const [showDetails, setShowDetails] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { setIsLoggedIn, users, setUserLoggedInId } = useContext(userContext);

  // Functions
  const storeData = async (value) => {
    try {
      const jsonAsString = JSON.stringify(value)
      await AsyncStorage.setItem('personObj', jsonAsString);
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const result = await AsyncStorage.getItem('personObj')
      const asJson = JSON.parse(result);
      if (asJson) {
        await setEmail(asJson.email);
        await setPassword(asJson.password);
      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    const focusListener = props.navigation.addListener('focus', () => {
      getData();
    });
    return () => { }
  }, []);

  const signUpAction = async () => {
    await getData();
    if (email === "" || email === null) {
      await setShowDetails("אנא מלא אימייל");
      setSnackbarVisible(true);
      return;
    }
    if (password === null || password === "") {
      await setShowDetails("אנא מלא סיסמא");
      setSnackbarVisible(true);
      return;
    }

    let isUserMatched = users.find(user => user.email === email.toLowerCase() && user.password === password)
    if (!isUserMatched) {
      setShowDetails("אין התאמה ,בדוק סיסמא או שם");
      setSnackbarVisible(true);
      return;
    }

    if (rememberLogin) {
      await storeData({ email, password })
    }
    else {
      await AsyncStorage.removeItem('personObj');
    }
    await setUserLoggedInId(isUserMatched.id)
    await setIsLoggedIn(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>התחברות</Text>

      <TextInput
        placeholder='הזן מייל'
        style={styles.input}
        onChangeText={(value) => { setEmail(value) }}
        value={email}
        keyboardType='email-address'
      />

      <TextInput
        placeholder='הזן סיסמא'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value) => { setPassword(value) }}
        value={password}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={rememberLogin ? 'checked' : 'unchecked'}
          onPress={() => setRememberLogin(prev => !prev)}
          color="#6200EE"
        />
        <Text style={styles.checkboxLabel}>זכור אותי</Text>
      </View>

      <Button
        mode="contained"
        color="#6200EE"
        onPress={signUpAction}
        labelStyle={styles.buttonLabel}
        style={styles.button}
      >
        התחבר
      </Button>

      <Button style={styles.signupButton} onPress={() => {
        props.navigation.navigate('PSign_up')
      }}>
        אם אתה לא רשום -{'>'} הירשם
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{ onPress: () => {} }}
        style={styles.snackbar}
        theme={{ colors: { text: '#fff' } }}
      >
        {showDetails}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#ff3d00',
    borderRadius: 8,
    margin: 16,
  },
});
