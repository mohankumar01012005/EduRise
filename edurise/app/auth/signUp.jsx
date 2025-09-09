import { View, Text, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { use, useContext, useState } from 'react'
import Colours from "./../../constants/Colours"
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { db } from '../../config/firebaseConfig';
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';
export default function SignUp() {

    const router = useRouter()

    const [fullName,setFullName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const {userDetail,SetUserDetail} = useContext(UserDetailContext);

    const createNewAccount=()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(async(resp)=>{
            const user = resp.user;
            console.log(user);
            await SaveUser(user);


            // save user to Database  
        })
        .catch(e=>{
            console.log(e.message)
        })

    }

    const SaveUser = async(user)=>{
        const data = {
            name:fullName,
            email:email,
            member:false,
            uid:user?.uid

        }
        await setDoc(doc(db, 'users',email),data)

        SetUserDetail(data)

        // Navigate to new screen 
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
     }}>Create New Account </Text>

     <TextInput 
     onChangeText={(value)=>setFullName(value)}
     style={styles.textInput}
     placeholder='Full Name' ></TextInput>
     <TextInput 
     onChangeText={(value)=>setEmail(value)}
     style={styles.textInput}
     keyboardType='email-address'
     placeholder='Email' ></TextInput>
     <TextInput 
     onChangeText={(value)=>setPassword(value)}
     style={styles.textInput}
     secureTextEntry={true}
     placeholder='Password' ></TextInput>

     <TouchableOpacity
     onPress={createNewAccount}
     style={{
        padding:15,
        backgroundColor:Colours.PRIMARY,
        width:'100%',
        marginTop:25,
        borderRadius:10,

     }}> 
        <Text style={{
            fontFamily:'outfit',
            fontSize:20,
            color:Colours.WHITE,
            textAlign:'center'
        }}>Create Account</Text>
     </TouchableOpacity>

       <View style={{
        display:'flex',
        flexDirection:'row',gap:5,
        marginTop:40,
       }}>
         <Text style={{
            fontFamily:'outfit',
        fontSize:17

         }}>Already have an Account ?  </Text>
            <Pressable onPress={()=>router.push('/auth/signIn')}>
                <Text style={{
                    color:Colours.PRIMARY,
                    fontFamily:'outfit-bold',
                    fontSize:17

                }}>Sign In Here </Text>
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
