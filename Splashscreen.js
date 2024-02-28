import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation, route}) => {

  const checkDataUser = async () => {
    const user = await AsyncStorage.getItem('dataUser')
    console.log('cek data user', user); //data mentah
    console.log('cek data user obj', JSON.parse(user)); //data sudah dirubah jadi object dan bisa digunakan
    if (user) {
      navigation.reset({ index: 0, routes: [{ name: 'Book' }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  }

  useEffect(() => {    
    setTimeout(() => {
      checkDataUser();
    }, 1500);
  },[])

  return (
    <View>
      <Text> Splashscreen </Text>
    </View>
  );
}

export default SplashScreen
