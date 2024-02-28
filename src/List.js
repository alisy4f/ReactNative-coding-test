import React, {useState} from 'react'
import {
   View,
   Image,
   Text,
   FlatList,
   StyleSheet,
   TouchableOpacity
} from 'react-native'
import Card from './Card'

const List = ({navigation, route}) => {

   const [data, setData] = useState([
      {
         img: require('./asset/images/Image_1.png'),
         totalLike: 0,
         title: 'item A'
      },
      {
         img: require('./asset/images/Image_2.png'),
         totalLike: 0,
         title: 'item B'
      },
      {
         img: require('./asset/images/Image_3.png'),
         totalLike: 0,
         title: 'item C'
      }
   ])

   const increaseLike =  (index) => {      
      let arr = [...data];
      arr.map((val, i) => {
         if(index === i) {
            val.totalLike += 1;
         }
      })
      setData(arr);
  }

  const decreaseLike =  (index) => {
      let arr = [...data];
      arr.map((val, i) => {
         if(index === i) {
            if(val.totalLike > 0) {
               val.totalLike -= 1;
            }                
         }
      })
      setData(arr);
   }

   const renderOptionItem = (option) => {        
      return (
         <Card
            title={option.item.title}
            totalLike={option.item.totalLike}
            img={option.item.img}
            decreaseLike={() => decreaseLike(option.index)}
            increaseLike={() => increaseLike(option.index)}

         />
      );
   }

   console.log('state data', data);
   return(
      <View style={{flex: 1}}>
         <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderOptionItem}
         />
      </View>
   )
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

export default List;