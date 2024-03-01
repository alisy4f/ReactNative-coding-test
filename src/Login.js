import React, {useState, useEffect} from 'react'
import {
   View,
   Text,
   TextInput,
   TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation, route}) => {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const baseUrl = 'https://bookapi.cm.hmw.lol/'

   const onLogin = async () => {
      const rawResponse = await fetch(`${baseUrl}api/auth`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            email: email, 
            password: password
         })
      });
      const content = await rawResponse.json();
      console.log('response login',content);
      if (content) {
         if (content.token) {
            getDataUser(content.token)
            navigation.navigate('Book');
         }
      }
   }

   const getDataUser = async (token) => {
      try {
            const response = await fetch(`${baseUrl}api/me`, {
               method: 'GET',
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               },
            });
          // console.log('response api', response);
            const jsonData = await response.json();
            console.log('data json api', jsonData);
            if (jsonData) {
               const user = {
                  userData: jsonData,
                  token: token
               }
               console.log('data user', user);
               await AsyncStorage.setItem('dataUser', JSON.stringify(user))
            }
      } catch (error) {
            console.error('Error fetching data:', error);
      }
   }

   const checkDataUser = async () => {
      const user = await AsyncStorage.getItem('dataUser')
      console.log('cek data user', user); //data mentah
      console.log('cek data user obj', JSON.parse(user)); //data sudah dirubah jadi object dan bisa digunakan
   }

   useEffect(() => {
      checkDataUser();
   },[])

   return(
      <View style={{
         flex: 1,
         backgroundColor: '#fff',
         justifyContent: 'center',
         alignItems: 'center'
      }}>
         <Text style={{
            fontSize: 30,
            fontWeight: '500',
            color: '#000'
         }}>
            Login Screen
         </Text>
         <TextInput
            placeholder='Masukkan email'
            style={{
               width: '90%',
               padding: 10,
               borderColor: 'grey',
               borderWidth: 1,
               borderRadius: 4,
               marginTop: 15
            }}
            onChangeText={(text) => setEmail(text)}
         />
         <TextInput
            placeholder='Masukkan password'
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            style={{
               width: '90%',
               padding: 10,
               borderColor: 'grey',
               borderWidth: 1,
               borderRadius: 4,
               marginTop: 15
            }}
         />
         <TouchableOpacity
            style={{
               width: 200,
               paddingVertical: 15,
               backgroundColor: 'green',
               borderRadius: 6,
               marginTop: 20
            }}
            onPress={onLogin}
         >
            <Text style={{
               fontSize: 18,
               fontWeight: '500',
               color: '#fff',
               alignSelf: 'center'
            }}>
               Login
            </Text>
         </TouchableOpacity>
      </View>
   )
}

export default Login;