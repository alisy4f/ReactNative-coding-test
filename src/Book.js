import React, {useState, useEffect} from 'react'
import {
   View,
   Text,
   Image,
   Dimensions,
   TouchableOpacity,
   ScrollView,
   FlatList
} from 'react-native'

const Book = ({navigation, route}) => {
   console.log('navigation book', navigation);
   console.log('route book', route);
   const [dataApi, setDataApi] = useState([]);

   const getData = async () => {
      try {
        // Make an HTTP GET request to fetch data
         const response = await fetch('https://bookapi.cm.hmw.lol/api/books');
         // console.log('response api', response);
         const jsonData = await response.json();
         // console.log('data json api', jsonData);
        // Update state with fetched data
         setDataApi(jsonData.data);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   useEffect(() => {
      getData();
   },[])
   // console.log('dataApi', dataApi);

   return(
      <View
         style={{flex: 1, padding: 10, backgroundColor: '#fff'}}
      >
         <ScrollView>
            {
               dataApi.map((book, index) => {
                  return (
                     <TouchableOpacity
                        key={index.toString()}
                        onPress={() => navigation.navigate('Detail', {
                           data: book
                        })}
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
                           source={{uri: book.image_url}}
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
                                 <Text>{book.title}</Text>
                              </View>
                           </View>
                           <View style={{flexDirection: 'row', width: '100%'}}>
                              <View style={{width: '50%'}}>
                                 <Text>Nama Penerbit</Text>
                              </View>
                              <View style={{width: '50%'}}>
                                 <Text>Ujang</Text>
                              </View>
                           </View>
                           <View style={{flexDirection: 'row', width: '100%'}}>
                              <View style={{width: '50%'}}>
                                 <Text>Kategori</Text>
                              </View>
                              <View style={{width: '50%'}}>
                                 <Text>Manga</Text>
                              </View>
                           </View>
                           <View style={{flexDirection: 'row', width: '100%'}}>
                              <View style={{width: '50%'}}>
                                 <Text>Rating</Text>
                              </View>
                              <View style={{width: '50%'}}>
                                 <Text>5.0</Text>
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
                                    Quae quis adipisci modi cupiditate a sit amet sequi. Natus dolores neque ipsum. Rerum repellendus eligendi magni in fugit. Esse quos aliquid quae est deserunt aspernatur quidem.
                                 </Text>
                              </View>
                           </View>
                        </View>
                     </TouchableOpacity>
                  )
               })
            }
         </ScrollView>         
      </View>
   )
}

export default Book;