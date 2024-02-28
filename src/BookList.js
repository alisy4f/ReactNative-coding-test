import React, {useState, useEffect} from 'react'
import {
   View,
   Text,
   Image,
   TouchableOpacity,
   FlatList
} from 'react-native'

const BookList = () => {

   const [dataBook, setDataBook] = useState([]);

   const getData = async () => {
      try {
         // Make an HTTP GET request to fetch data
         const response = await fetch('https://bookapi.cm.hmw.lol/api/books');
         console.log('response api', response);
         const jsonData = await response.json();
         console.log('data json api', jsonData);
         // Update state with fetched data
         setDataBook(jsonData.data);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   }

   const Item = ({title, author, imageUrl, kategori, rating, sinopsis}) => {
      return(
         <TouchableOpacity
            style={{
               width: '100%',
               borderColor: 'black',
               borderWidth: 1,
               paddingBottom: 10,
               flexDirection: 'row',
               marginBottom: 10
            }}
         >
            <Image
               source={{uri: imageUrl}}
               style={{
                  width: '40%',
                  height: 150,
                  resizeMode: 'stretch'
               }}
            />
            <View style={{
               width: '60%',
               paddingHorizontal: 10
            }}>
               <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%'}}>
                     <Text>Nama Buku</Text>
                  </View>
                  <View style={{width: '50%'}}>
                     <Text>{title}</Text>
                  </View>
               </View>
               <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%'}}>
                     <Text>Nama Penerbit</Text>
                  </View>
                  <View style={{width: '50%'}}>
                     <Text>{author}</Text>
                  </View>
               </View>
               <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%'}}>
                     <Text>Kategori</Text>
                  </View>
                  <View style={{width: '50%'}}>
                     <Text>{kategori}</Text>
                  </View>
               </View>
               <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%'}}>
                     <Text>Rating</Text>
                  </View>
                  <View style={{width: '50%'}}>
                     <Text>{rating}</Text>
                  </View>
               </View>
               <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%'}}>
                     <Text>Sinopsis</Text>
                  </View>
                  <View style={{width: '50%'}}>
                     <Text
                        numberOfLines={5}
                     >
                        {sinopsis}
                     </Text>
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      )
   }

   useEffect(() => {
      getData();
   },[])
console.log('cek data book', dataBook);
   return(
      <View
         style={{flex: 1, backgroundColor: '#fff', padding: 10}}
      >
         <FlatList
            data={dataBook}
            
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => 
               <Item 
                  title={item.title} 
                  author={item.author.name} 
                  kategori={item.categories[0].name}
                  rating={item.rating}
                  sinopsis={item.synopsis}
                  imageUrl={item.image_url}
               />
            }
         />
      </View>
   )
}

export default BookList;