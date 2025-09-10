import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import { UserDetailContext } from '../../context/UserDetailContext'
import { useRouter } from 'expo-router'
import Colours from '../../constants/Colours'

export default function Profile() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const router = useRouter()

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: async () => {
            try {
              await signOut(auth)
              setUserDetail(null)
              router.replace('/')  
            } catch (error) {
              console.error("Error signing out: ", error)
              Alert.alert("Error", "Failed to logout. Please try again.")
            }
          }
        }
      ]
    )
  }

  return (
    <View style={{ 
      flex: 1, 
      padding: 20,
      backgroundColor: Colours.WHITE
    }}>
      <Text style={{ 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20,
        fontFamily: 'outfit-bold'
      }}>Profile</Text>
      
      {userDetail && (
        <View style={{ 
          backgroundColor: '#f8f9fa',
          padding: 15,
          borderRadius: 10,
          marginBottom: 20
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontFamily: 'outfit-bold',
            marginBottom: 10
          }}>User Information</Text>
          <Text style={{ 
            fontSize: 16, 
            fontFamily: 'outfit',
            marginBottom: 5
          }}>Name: {userDetail.name}</Text>
          <Text style={{ 
            fontSize: 16, 
            fontFamily: 'outfit',
            marginBottom: 5
          }}>Email: {userDetail.email}</Text>
          <Text style={{ 
            fontSize: 16, 
            fontFamily: 'outfit'
          }}>Member: {userDetail.member ? 'Yes' : 'No'}</Text>
        </View>
      )}
      
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: Colours.PRIMARY,
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 20
        }}
      >
        <Text style={{
          color: Colours.WHITE,
          fontSize: 18,
          fontFamily: 'outfit-bold'
        }}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}