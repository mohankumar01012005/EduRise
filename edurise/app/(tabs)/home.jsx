import { View, Text,Platform } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Colours from "./../../constants/Colours"
import NoCourse from '../../components/Home/NoCourse'

export default function Home() {
  return (
    <View  style={{
        padding:30,
        paddingTop:Platform.OS=='ios' && 45,
        flex:1,
        backgroundColor:Colours.WHITE
  }}>
      <Header></Header>
      <NoCourse/>


    </View>
  )
}