import React from 'react'
import {
   View,
   Text
} from 'react-native'

const UserInfo = (props) => {
   return(
      <View>
         <Text style={{color: '#fff', fontSize: 20}}>Email input: {props.email}</Text>
         <Text style={{color: '#fff', fontSize: 20}}>Password input: {props.password}</Text>
      </View>
   )
}

export default UserInfo;