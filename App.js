/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Splashscreen from './Splashscreen';
import Home from './src/Home'

import UserInfo from './src/UserInfo';
import Book from './src/Book';
import BookList from './src/BookList';

import RootNavigation from './src/Routing';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function onLogin() {
    console.log('email', email);
    console.log('password', password);
    setShowInfo(true);
  }

  function aa() {
    
  }

  return (
    <RootNavigation />
    // <BookList />
    // <Book />
    // <View style={{
    //   flex: 1,
    //   backgroundColor: 'blue',
    //   justifyContent: 'flex-end'
    // }}>
    //   <View
    //     style={{
    //       flex: 0.8,
    //       justifyContent: 'space-between',
    //       paddingVertical: 10,
    //       alignItems: 'center'
    //     }}
    //   >
    //     <View>
    //       <Text style={{
    //         fontSize: 40,
    //         color: 'white'
    //       }}>
    //         FACEBOOK
    //       </Text>
    //       {
    //         showInfo ?
    //           <UserInfo 
    //             email={email}
    //             password={password}
    //           />
    //         : null
    //       }
    //     </View>
    //     <View style={{
    //       width: '90%'
    //     }}>
    //       <TextInput
    //         placeholder='Masukkan Email'
    //         placeholderTextColor='red'
    //         style={{
    //           width: '100%',
    //           paddingHorizontal: 15,
    //           paddingVertical: 10,
    //           backgroundColor: 'white'
    //         }}
    //         value={email}
    //         onChangeText={(text) => setEmail(text)}
    //       />
    //       <TextInput
    //         placeholder='Masukkan Password'
    //         style={{
    //           width: '100%',
    //           paddingVertical: 10,
    //           paddingHorizontal: 15,
    //           backgroundColor: 'white',
    //           marginTop: 15
    //         }}
    //         value={password}
    //         onChangeText={(text) => setPassword(text)}
    //         secureTextEntry={true}
    //       />
    //       <TouchableOpacity
    //         style={{
    //           width: '100%',
    //           paddingVertical: 10,
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           marginTop: 20,
    //           backgroundColor: 'indigo'
    //         }}
    //         onPress={onLogin}
    //       >
    //         <Text style={{fontSize: 18, color: 'white'}}>Login</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <View style={{
    //       width: '100%',
    //       justifyContent: 'center',
    //       alignItems: 'center'
    //     }}>
    //       <Text style={{
    //         color: 'white',
    //         fontWeight: '500'
    //       }}>Sign Up for Facebook</Text>
    //     </View>
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
