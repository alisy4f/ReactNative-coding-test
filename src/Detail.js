import React, {useState, useEffect} from 'react'
import {
   View,
   Text,
   Dimensions,
   ScrollView,
   Image,
   Modal,
   Alert
} from 'react-native'

const Detail = ({navigation, route}) => {
   console.log('cek route detail', route);

   const [dataBook, setDataBook] = useState({})
   const [showModal, setShowModal] = useState(false)

   useEffect(() => {
      if (route.params) {
         if (route.params.data) {
            setDataBook(route.params.data)
            setTimeout(() => {
               setShowModal(true)
            }, 2000);
            // alert('Data sudah disimpan')
         }
      }
   },[])

   return(
      <View style={{flex: 1, backgroundColor: '#fff'}}>
         <ScrollView>
            <Image
               source={{uri: dataBook.image_url}}
               style={{
                  width: Dimensions.get('window').width,
                  height: 300,
                  resizeMode: 'contain'
               }}
            />
            <Text 
               style={{
                  fontSize: 25, 
                  color: '#000',
                  marginTop: 20
               }}>
               {dataBook.title}
            </Text>
            <Text style={{
               fontSize: 25, 
               color: '#000',
               marginTop: 10
            }}>
               Author by: {dataBook?.author?.name}
            </Text>
            <Text style={{
               fontSize: 25, 
               color: '#000',
               marginTop: 10
            }}>
               Kategori: {dataBook.length > 0 ? dataBook?.categories[0].name : '-'}
            </Text>
            <Text style={{
               fontSize: 25, 
               color: '#000',
               marginTop: 10
            }}>
               Rating: {dataBook.rating}
            </Text>
            <Text style={{
               fontSize: 25, 
               color: '#000',
               marginTop: 30
            }}>
               Sinopsis: {dataBook.synopsis}
            </Text>
         </ScrollView>
         {ModalExample()}
      </View>
   )

   function ModalExample() {
      return (
         <Modal
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
            transparent
         >
            <View style={{
               flex: 1,
               justifyContent: 'flex-end',
               backgroundColor: 'rgba(0,0,0,0.4)'
            }}>
               <View style={{
                  flex: 0.7,
                  backgroundColor: '#fff',
               }}>
                  <Text style={{
                     fontSize: 25,
                     color: '#000'
                  }}>Ini Modal React native</Text>
               </View>
            </View>
         </Modal>
      )
   }

}

export default Detail;