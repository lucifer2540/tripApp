import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../themes/index'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from "@expo/vector-icons";


export default function BackButton() {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.goBack()} className="bg-white rounded-full h-9 w-9">
      <MaterialIcons name="arrow-back" size={35} color={colors.button}  />
    </TouchableOpacity>
  )
}