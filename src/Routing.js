import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import useFirebaseNotification from './utils/useNotification';

import Book from './Book';
import Detail from './Detail';
import Login from './Login';
import SplashScreen from '../Splashscreen';
import List from './List';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
   const { data } = useFirebaseNotification();
   const [dataNotif, setDataNotif] = React.useState({});
   const [navigationReady, setNavigationReady] = React.useState(false);

   React.useEffect(() => {
		const setNotification = () => {
         /**jika menambahkan button action pada notification, maka code dibawah ini akan dijalankan */
			if (data.click === 'Ya') {
				console.log('');
			} else {
				console.log('klik notif tidak');
			}

         /**jika tidak, code dibawah ini akan dijalankan, tinggal di proses sesuai flow aplikasi */
         // if(data) {
         //    //proses 'data' tersebut sesuai dengan flow aplikasi
         //    //'data' ini berisi object notifikasi sebelumnya

         // }
		};

		if (navigationReady) {
			setTimeout(() => setNotification(), 2100);
		}
	}, [data, navigationReady]);

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
            <Stack.Screen name='List' component={List} />
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Book' component={Book} />
            <Stack.Screen name='Detail' component={Detail} />
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default RootNavigation;
