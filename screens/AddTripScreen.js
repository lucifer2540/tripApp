import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../themes'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading';
import {addDoc} from 'firebase/firestore';
import {tripRef} from '../config/firebase';
import { useSelector } from 'react-redux';

export default function AddTripScreen() {
    const [place,setPlace]=useState("");
    const [country,setCountry]=useState("");
    const [loading,setLoading]=useState(false);
    const {user} = useSelector(state=>state.user);

    const navigation = useNavigation();

    const handleAddTrip = async () => {
        if(place && country){
            //good to go
            // navigation.navigate('Home');
            setLoading(true);
            let doc = await addDoc(tripRef,{
                place,
                country,
                userId: user.uid
            });
            setLoading(false);
            if(doc && doc.id){
                navigation.goBack();
            }
        }else{
            //show error
            Alert.alert('Alert Title', 'My Alert Msg', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }
    }
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
        <View className="relative mt-5">
                <View className="absolute top-0 left-0 z-10">
                    <BackButton />
                </View>   
                <Text className={`${colors.heading} text-4xl font-bold text-center`}>Add Trip</Text>
            </View>
            <View className="flex-row justify-center my-3 mt-5">
                <Image className="h-72 w-72" source={require('../assets/images/4.png')}/>
            </View>
            <View className="space-y-2 mx-2">
                <Text className={`${colors.heading} text-xl font-bold`}>Where On Earth?</Text>
                <TextInput value={place} onChangeText={value=>setPlace(value)} className="p-4 bg-white rounded-full mb-3" placeholder="Enter your place"/>
                <Text className={`${colors.heading} text-xl font-bold`}>Which Country?</Text>
                <TextInput value={country} onChangeText={value=>setCountry(value)} className="p-4 bg-white rounded-full mb-3" placeholder="Enter your country"/>
            </View>
        </View>

        <View>
            {
                loading?(
                    <Loading/>
                ):(
                 <TouchableOpacity onPress={handleAddTrip} style={{backgroundColor:colors.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
                   <Text className="text-center text-white text-xl font-bold">Add Trip</Text>
                 </TouchableOpacity>
                )
            }
            
        </View>
     </View>
    </ScreenWrapper>
  )
}