import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../themes'
import randomImage  from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth, tripRef } from '../config/firebase';
import { useSelector } from 'react-redux';
import {getDoc, getDocs, query, where} from 'firebase/firestore';


const items = [
  {
    id: "1",
    place: "Gujrat",
    country: "Pakistan",
  },
  {
    id: "2",
    place: "London Eye",
    country: "England",
  },
  {
    id: "3",
    place: "Washington dc",
    country: "America",
  },
  {
    id: "4",
    place: "New York",
    country: "America",
  },
  
];


export default function HomeScreen() {
  const navigation = useNavigation();

  const {user} = useSelector(state=>state.user);
  const [trip, setTrip] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      // console.log("documents",doc.data());
      data.push({...doc.data(),id:doc.id})
    })
    setTrip(data);
  }

  useEffect(()=>{
    if(isFocused)
       fetchTrips();
  },[isFocused])
   
   const handleLogout = async () => {
    await signOut(auth);
   }

  return (
    <ScreenWrapper style={{flex:1}}>
{/* //FIRST PART */}
      <View className="flex-row justify-between items-center p-4">
            <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Happyify</Text>
            <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                <Text className={`${colors.heading} font-bold`}>Logout</Text>
            </TouchableOpacity>
        </View>
{/* //SECOND PART */}
        <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
            <Image source={require('../assets/images/banner.png')} className="w-60 h-60" />
        </View>
{/* //THIRD PART */}

        <View className="px-4 space-y-3">
            <View className="flex-row justify-between items-center">
                <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('AddTrip')} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                    <Text className={`${colors.heading} font-bold`}>Add Trip</Text>
                </TouchableOpacity>
            </View>
            <View style={{height: 500}}>
                <FlatList 
                    data={trip}
                    numColumns={2}
                    ListEmptyComponent={<EmptyList message={"You haven't recorded any trips yet"} />}
                    keyExtractor={item=> item.id}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{
                        justifyContent: 'space-between'
                    }}
                    className="mx-1"
                    renderItem={({item})=>{
                        return (
                            <TouchableOpacity onPress={()=> navigation.navigate('TripExpenses', {...item})} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                                <View>
                                    <Image source={randomImage()} className="w-36 h-36 mb-2" />
                                    <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                                    <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>

    </ScreenWrapper>
  )
}