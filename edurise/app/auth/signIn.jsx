import { View, Text, Image, TextInput, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import Colours from "./../../constants/Colours"
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from '../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';
export default function SignIn() {
    const [email , SetEmail]=useState();
    const [password , SetPassword]=useState();
    const router = useRouter()
   const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const [loading,SetLoading] = useState(false)

    
    const onSignInClick=()=>{
        SetLoading(true);
        signInWithEmailAndPassword(auth,email,password)
        .then(async(resp)=>{
            const user=resp.user
            console.log(user)
           await getUserDetail()
           SetLoading(false);
           router.replace('/(tabs)/home')
        }).catch(e=>{
            console.log(e)
            SetLoading(false);
            ToastAndroid.show('Incorrect Email & Password ',ToastAndroid.BOTTOM)
        })
    }

    const getUserDetail= async()=>{
        const result = await getDoc(doc(db,'users',email));
        console.log(result.data())
        setUserDetail(result.data())
    }

  return (
     <View style={{
            display:'flex',
            alignItems:'center',
            paddingTop:20,
            flex:1,
            backgroundColor:Colours.WHITE,
            padding:25
    
        
    
        }}>
        <Image 
         source={require('./../../assets/images/logo.png')}
         style={{
            width:200,
            height:200,
            marginTop:100
        }}
         ></Image>
         <Text style={{
            fontSize:30,
            fontFamily:'outfit-bold',
            color:Colours.PRIMARY
         }}>Welcome Back </Text>
    
         <TextInput 
         onChangeText={(value)=>SetEmail(value)}
         style={styles.textInput}
         keyboardType='email-address'
         placeholder='Email' ></TextInput>
         <TextInput 
         onChangeText={(value)=>SetPassword(value)}
         style={styles.textInput}
         secureTextEntry={true}
         placeholder='Password' ></TextInput>
    
         <TouchableOpacity
        onPress={onSignInClick}
        disabled={loading}
        style={{
            padding:15,
            backgroundColor:Colours.PRIMARY,
            width:'100%',
            marginTop:25,
            borderRadius:10,
    
         }}> 

           {!loading ? <Text style={{
                fontFamily:'outfit',
                fontSize:20,
                color:Colours.WHITE,
                textAlign:'center'
            }}>Sign In</Text>:
            <ActivityIndicator size={'large'} color={Colours.WHITE}/>
}
         </TouchableOpacity>
    
           <View style={{
            display:'flex',
            flexDirection:'row',gap:5,
            marginTop:40,
           }}>
             <Text style={{
                fontFamily:'outfit',
            fontSize:17
    
             }}>Dont have an Account ?  </Text>
                <Pressable onPress={()=>router.push('/auth/signUp')}>
                    <Text style={{
                        color:Colours.PRIMARY,
                        fontFamily:'outfit-bold',
                        fontSize:17
    
                    }}>Create new Here </Text>
                </Pressable>
           </View>
        </View>
  )
} 

const styles = StyleSheet.create({
  textInput:{
    borderWidth:1,
    width:'100%',
    padding:15,
    fontSize:18,
    marginTop:20,
    borderRadius:8,

  }
})