import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox, Snackbar, Button, Text } from 'react-native-paper';
import { userContext } from '../context/userContext';


export default function PLogin(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [asyncEmail, setAsyncEmail] = useState("")
  const [asyncPassword, setAsyncPassword] = useState("")
  const [showDetails, setShowDetails] = useState("")
  const [rememberLogin, setRememberLogin] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { setIsLoggedIn } = useContext(userContext);

  // const myFunctionProp = route.params?.myFunctionProp;
  // const { setisLoggedIn } = props;
  const storeData = async (value) => {
    try {
      const jsonAsString = JSON.stringify(value)
      await AsyncStorage.setItem('personObj', jsonAsString);
    } catch (e) {
      // saving error
    }
  }

  //opt1 – with async-await
  const getData = async () => {
    try {
      const result = await AsyncStorage.getItem('personObj')
      const asJson = JSON.parse(result);//
      if (asJson) {
        await setAsyncEmail(asJson.email)
        await setAsyncPassword(asJson.password)
      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    //function that runs when navigation to the page.
    const focusListener = props.navigation.addListener('focus', () => {
      getData()
    });
    return () => {
    }
  }, []);






  const signUpAction = async () => {
    // Implement sign-up logic here
    await getData();
    if (email === "" || password === "" || email === null || password === null) {
      setShowDetails("");
      setSnackbarVisible(true);
      return;
    }
    if (rememberLogin) {
      // await storeData({ email, password })
    }
    else {
      await AsyncStorage.removeItem('personObj');
    }
    console.log("async : " + asyncEmail, asyncPassword);
    console.log("email pass : " + email, password);
    if (email === asyncEmail && password === asyncPassword) {
      setIsLoggedIn(true);
    }
    //props.setIsLoggedIn(true);

  }





  return (
    <View style={styles.container}>

      <Text variant="headlineLarge">התחברות</Text>

      <TextInput
        placeholder='הזן מייל'
        style={styles.input}
        onChangeText={(value) => { setEmail(value) }}
        value={email}
      />

      <TextInput
        placeholder='הזן סיסמא'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value) => { setPassword(value) }}
        value={password}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          status={rememberLogin ? 'checked' : 'unchecked'}
          onPress={() => setRememberLogin(prev => !prev)}
        >
        </Checkbox>

        <Text style={{ fontWeight: 'bold' }}>זכור אותי</Text>
      </View>


      <Button
        mode="contained"
        color="#6200EE"
        onPress={() => signUpAction()}
        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
        style={{ marginTop: 10 }}
      >
        התחבר
      </Button>

      <Text>{showDetails}</Text>

      <Button onPress={() => {
        props.navigation.navigate('PSign_up')
      }}>

        אם אתה לא רשום -{'>'} הירשם
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
          backgroundColor: '#ff3d00',
          borderRadius: 8,
          marginHorizontal: 24,
          marginBottom: 24,
        }}
        theme={{
          colors: {
            text: '#fff',
          },
        }}
      >
        {email === "" || email === null ? 'אנא הכנס מייל' : 'אנא הכנס סיסמא'}
      </Snackbar>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
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

