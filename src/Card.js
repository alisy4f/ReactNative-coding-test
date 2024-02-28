import React, {memo} from 'react'
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

const Card = ({
   title,
   totalLike,
   img,
   increaseLike,
   decreaseLike
}) => {
   console.log('item yang berubah :', title);
   return (
      <View style={[styles.cardItem]}>
         <Image
            source={img}
            style={styles.img}
         />
         <View style={styles.viewButton}>
            <View 
               style={styles.viewTxt}>
               <Text>{`${totalLike} Like`}</Text>
            </View>
            <View style={styles.viewRowBtn}>
               <TouchableOpacity
                     activeOpacity={0.8}
                     style={[styles.viewTxt, {backgroundColor: 'blue'}]}
                     onPress={increaseLike}
               >
                  <Text style={{color: '#fff'}}>LIKE</Text>
               </TouchableOpacity>
               <TouchableOpacity
                     activeOpacity={0.8}
                     style={[styles.viewTxt, {backgroundColor: 'red', marginLeft: 8}]}
                     onPress={decreaseLike}
               >
                  <Text style={{color: '#fff'}}>DISLIKE</Text>
               </TouchableOpacity>
            </View>
         </View>
   </View>
   )
}

const areEqual=(prevProps,nextProps)=>{
   return prevProps.totalLike===nextProps.totalLike
}

const styles = StyleSheet.create({
   viewRowBtn: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'flex-end'
   },
   viewTxt: {
       flexDirection: 'row',
       alignItems: 'center',
       borderRadius: 6,
       borderColor: 'grey',
       borderWidth: 1,
       paddingVertical: 5,
       paddingHorizontal: 10
   },
   viewButton: {
       width: '90%',
       alignSelf: 'center',
       marginTop: 15,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between'
   },
   img: {
       width: '100%',
       height: 200,
       borderTopLeftRadius: 8,
       borderTopRightRadius: 8,
       resizeMode: 'cover'
   },
   cardItem: {
       width: '100%',
       borderRadius: 8,
       paddingBottom: 10,
       backgroundColor: '#fff',
       marginTop: 20
   },
   container: {
       flex: 1, 
       backgroundColor: 'grey',
       padding: 10
   }
})

export default memo(Card, areEqual)