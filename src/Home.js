import React from 'react';
import {
   View,
   Text,
   Dimensions
} from 'react-native'

const Home = () => {
   return(
      <View
         style={{
            // flex: 0.5,
            // width: Dimensions.get('window').width * 0.4,
            // height: Dimensions.get('window').height * 0.5,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            margin: 20,
            marginTop,
            marginBottom
         }}
      >
         <Text style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black'
         }}>
            CODE MASTER REACT NATIVE
         </Text>
         <View style={{
            width: '80%',
            backgroundColor: 'blue',
            flexDirection: 'row',
            height: 100
         }}>
            <View style={{
               width: '50%',
               backgroundColor: 'green',
               height: 70
            }}/>
            <View style={{
               width: '50%',
               backgroundColor: 'yellow',
               height: 70
            }}/>
         </View>
      </View>
   )
}

export default Home;