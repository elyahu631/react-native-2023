import React, { useContext, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar, Button, Text } from 'react-native-paper';


export default function PSign_up(props) {
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const storeData = async (value) => {
    try {
      const jsonAsString = JSON.stringify(value)
      // await  AsyncStorage.removeItem('personObj');
      await AsyncStorage.setItem('personObj', jsonAsString);
    } catch (e) {
      console.log("error: " + e);
    }
  }

  const signUpAction = async () => {
    // Implement sign-up logic here


    if (email === "" || password === "" || confirmPassword === "" || userName === "") {
      await setErrorMessage("אנא מלא את כל הפרטים")
      await setSnackbarVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      await setErrorMessage("אימות סיסמא לא תואם")
      await setSnackbarVisible(true);
      return;
    }
    try {//upload to database
      await storeData({ email, password, userName })
      const result = await AsyncStorage.getItem('personObj')
      const asJson = JSON.parse(result);
      props.navigation.navigate('PLogin')
    }
    catch {
    }

  }





  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">הרשמה</Text>

      <TextInput
        placeholder='הזן מייל'
        style={styles.input}
        onChangeText={(value) => { setEmail(value) }}
        value={email}
      />
      <TextInput
        placeholder='הזן שם משתמש'
        style={styles.input}
        onChangeText={(value) => { setUserName(value) }}
        value={userName}
      />

      <TextInput
        placeholder='הזן סיסמא'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value) => { setPassword(value) }}
        value={password}
      />
      <TextInput
        placeholder='אמת סיסמא'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value) => { setConfirmPassword(value) }}
        value={confirmPassword}
      />

      <Button
        mode="contained"
        color="#6200EE"
        onPress={() => signUpAction()}
        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
        style={{ marginTop: 10 }}
      >
        הירשם

      </Button>


      <Button onPress={() => {
        props.navigation.navigate('PLogin')
      }}>

        אם אתה רשום  -{'>'} התחבר
      </Button>

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
          backgroundColor: 'red',
          borderRadius: 20,
        }}
      >
        {errorMessage}
      </Snackbar>

    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f2f2f2",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "right",
    textTransform: "capitalize",
    letterSpacing: 1.2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

});
