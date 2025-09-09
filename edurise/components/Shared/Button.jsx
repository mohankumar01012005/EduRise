import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Colours from '../../constants/Colours'

export default function Button({text,type='fill',onPress,loading}) {
  return (
    <TouchableOpacity onPress={onPress} style={{
        padding:15,
        width:'100%',
        borderRadius:15,
        marginTop:25,
        backgroundColor:type=='fill'?Colours.PRIMARY:Colours.WHITE,
        borderWidth:1,
        borderColor:Colours.PRIMARY
    }}
    disabled={loading}
    >
      {!loading?<Text style={{
        textAlign:'center',
        fontSize:18,
        color:type=='fill'?Colours.WHITE:Colours.PRIMARY
      }}>{text}</Text>:
      <ActivityIndicator size={'small'} color={type=='fill'?Colours.WHITE:Colours.PRIMARY}/>
    }
    </TouchableOpacity>
  )
}