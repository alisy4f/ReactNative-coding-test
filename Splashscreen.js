import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation, route}) => {

  const checkDataUser = async () => {
    const user = await AsyncStorage.getItem('dataUser')
    console.log('cek data user', user); //data mentah
    console.log('cek data user obj', JSON.parse(user)); //data sudah dirubah jadi object dan bisa digunakan
    // menghapus stack dan mengarahkan user ke halaman tertentu berdasarkan kondisi 
    if (user) {
      navigation.reset({ index: 0, routes: [{ name: 'Book' }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  }

  // menjalankan checkDataUser() saat aplikasi pertama kali dijalankan
  useEffect(() => { 
    // memanggil checkDataUser() setelah 1,5 detik   
    setTimeout(() => {
      checkDataUser();
    }, 1500);
  },[])

  // untuk menampilkan splashscreen
  return (
    <View>
      <Text> Splashscreen </Text>
    </View>
  );
}

export default SplashScreen
