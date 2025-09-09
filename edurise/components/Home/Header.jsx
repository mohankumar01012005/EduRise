import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import {UserDetailContext} from "./../../context/UserDetailContext"
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
export default function Header() {
    const {userDetail,setUserDetail} = useContext(UserDetailContext)
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }}>
  <View>
      <Text
      style={{
        fontSize:25,
        fontFamily:'outfit-bold',
          }}
      >Hello, {userDetail?.name}</Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:17
      }}>Let's Get Started !</Text>
      </View>
      <TouchableOpacity>
      <SimpleLineIcons name="settings" size={32} color="black" />
      </TouchableOpacity>
    </View>
  )
}