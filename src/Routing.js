import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Book from './Book';
import Detail from './Detail';
import Login from './Login';
import SplashScreen from '../Splashscreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
   const [navigationReady, setNavigationReady] = React.useState(false);		

   return(
      <NavigationContainer
      onReady={() => {
         setNavigationReady(true);
      }}
      >
         <Stack.Navigator
            screenOptions={{
               headerShown: false
            }}
         >
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Book' component={Book} />
            <Stack.Screen name='Detail' component={Detail} />
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default RootNavigation;
