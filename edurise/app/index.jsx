import {Image, Text, TouchableOpacity, View } from "react-native";
import Colours from "../constants/Colours"
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {onAuthStateChanged} from "firebase/auth"

import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext } from "react";
import { auth } from "./../config/firebaseConfig";
import { db } from "./../config/firebaseConfig";

export default function Index() {
const { userDetail, setUserDetail } = useContext(UserDetailContext)

  const router = useRouter();

  onAuthStateChanged(auth,async(user)=>{
    if (user){
      console.log(user)
      const result = await getDoc(doc(db,'users',user?.email))
      setUserDetail(result.data())
      router.replace('/(tabs)/home')
      
    }
  })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:Colours.WHITE,
     
      }}
    >
      <Image  source={require('./../assets/images/landing.png')} 
      style={{
        width:'100%',
        height:400,
        marginTop:70
      }
      }
      ></Image>
    <View style={{
      padding:25,
      backgroundColor:Colours.PRIMARY,
      height:'100%',
      borderTopLeftRadius:35,
      borderTopRightRadius:35

    }}>
      <Text style=
      {{
        fontSize:30,
        fontFamily:'outfit-bold',
        textAlign:'center',
        color:Colours.WHITE,


      }}> Welcome to 
      
      <Text style={{color:'orange',paddingLeft:'20px'}}>EduRise</Text> </Text>

      <Text style={{
        fontSize:20,
        textAlign:'center',
        marginTop:20,
        color:Colours.WHITE,
        fontFamily:'outfit'

      }}> Transform your ideas in to engaging educational content, effortlessly with AI 📚🤖 </Text>
      <TouchableOpacity
      onPress={()=>router.push('./auth/signUp')}
      style={styles.button}>
        <Text style={[styles.buttonText,{color:Colours.PRIMARY}]}>Get Started </Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>router.push('./auth/signIn')}
      style={[styles.button,{
        backgroundColor:Colours.PRIMARY,
        borderWidth:1,
        borderColor:Colours.WHITE,

      }]}>
        <Text style={[styles.buttonText,{
          color:Colours.WHITE
        }]}>Already Have an account ? </Text>
      </TouchableOpacity>
    </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
 button:{
    padding:15,
    backgroundColor:Colours.WHITE,
    marginTop:20,
    borderRadius:15,
  },
  buttonText:{
    textAlign:'center',
    fontSize:20,
    fontFamily:'outfit',

  }
})
