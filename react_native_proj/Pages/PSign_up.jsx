import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar, Button, Text } from 'react-native-paper';
import { userContext } from '../context/UserContext';

export default function PSign_up(props) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { addUser } = useContext(userContext);

  const storeData = async (value) => {
    try {
      const jsonAsString = JSON.stringify(value);
      await AsyncStorage.setItem('personObj', jsonAsString);
    } catch (e) {
      console.log("error: " + e);
    }
  }

  const signUpAction = async () => {
    if (email === "" || password === "" || confirmPassword === "" || userName === "") {
      await setErrorMessage("אנא מלא את כל הפרטים");
      await setSnackbarVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      await setErrorMessage("אימות סיסמא לא תואם");
      await setSnackbarVisible(true);
      return;
    }
    try {
      let isAdded = await addUser(email, userName, password);
      if (isAdded === -1) {
        await setErrorMessage("האימייל כבר קיים במערכת");
        await setSnackbarVisible(true);
        return;
      }
      props.navigation.navigate('PLogin');
    } catch {}

  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>הרשמה</Text>

      <TextInput
        placeholder='הזן מייל'
        style={styles.input}
        onChangeText={(value) => setEmail(value)}
        value={email}
      />

      <TextInput
        placeholder='הזן שם משתמש'
        style={styles.input}
        onChangeText={(value) => setUserName(value)}
        value={userName}
      />

      <TextInput
        placeholder='הזן סיסמא'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />

      <TextInput
        placeholder='אמת סיסמא'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value) => setConfirmPassword(value)}
        value={confirmPassword}      
      />

      <Button
        mode="contained"
        color="#6200EE"
        onPress={signUpAction}
        labelStyle={styles.buttonLabel}
        style={styles.button}
      >
        הירשם
      </Button>

      <Button style={styles.loginButton} onPress={() => props.navigation.navigate('PLogin')}>
        אם אתה רשום  -{'>'} התחבר
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{ onPress: () => {} }}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>
    </View>
  )
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
  loginButton: {
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: 'red',
    borderRadius: 20,
    margin: 16,
  },
});
