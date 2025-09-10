import { View, Text, Platform, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Header from '../../components/Home/Header'
import Colours from "./../../constants/Colours"
import NoCourse from '../../components/Home/NoCourse'
import { UserDetailContext } from '../../context/UserDetailContext'
import { db } from '../../config/firebaseConfig'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { useRouter } from 'expo-router'
import Button from '../../components/Shared/Button'

const { width } = Dimensions.get('window');
const CARD_SIZE = width * 0.4; // 40% of screen width

export default function Home() {
  const { userDetail } = useContext(UserDetailContext)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!userDetail?.uid) return

    const q = query(
      collection(db, "users", userDetail.uid, "courses"),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const coursesData = []
      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() })
      })
      setCourses(coursesData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [userDetail?.uid])

  const navigateToModuleDetail = (course) => {
    router.push({
      pathname: '/moduleDetail',
      params: { course: JSON.stringify(course) }
    })
  }

  if (loading) {
    return (
      <View style={{
        padding: 30,
        paddingTop: Platform.OS == 'ios' && 45,
        flex: 1,
        backgroundColor: Colours.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Loading your courses...</Text>
      </View>
    )
  }

  return (
    <View style={{
      padding: 30,
      paddingTop: Platform.OS == 'ios' && 45,
      flex: 1,
      backgroundColor: Colours.WHITE
    }}>
      <Header />
      
      {/* Top Section (Empty for now) */}
      <View style={{ height: '40%', marginBottom: 20 }}>
        {/* This space is reserved for future content */}
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 20,
          color: Colours.PRIMARY
        }}>Your Learning Dashboard</Text>
        
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#e9ecef',
          borderRadius: 12,
          marginTop: 20
        }}>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: '#6b7280',
            textAlign: 'center'
          }}>Future content will appear here</Text>
        </View>
      </View>
      
      {/* Modules Section */}
      <View style={{ flex: 1 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
          marginBottom: 15
        }}>Your Modules</Text>
        
        {courses.length === 0 ? (
          <NoCourse />
        ) : (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            {courses.map((course) => (
              <TouchableOpacity 
                key={course.id}
                onPress={() => navigateToModuleDetail(course)}
                style={{
                  width: CARD_SIZE,
                  height: CARD_SIZE,
                  backgroundColor: '#f8f9fa',
                  borderRadius: 12,
                  padding: 16,
                  marginRight: 16,
                  borderWidth: 1,
                  borderColor: '#e9ecef',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text 
                  style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 16,
                    textAlign: 'center',
                    marginBottom: 8
                  }}
                  numberOfLines={2}
                >
                  {course.title}
                </Text>
                
                <Text 
                  style={{
                    fontFamily: 'outfit',
                    fontSize: 12,
                    color: '#6b7280',
                    textAlign: 'center'
                  }}
                  numberOfLines={3}
                >
                  {course.description}
                </Text>
                
                {course.modules && (
                  <Text 
                    style={{
                      fontFamily: 'outfit',
                      fontSize: 12,
                      color: Colours.PRIMARY,
                      marginTop: 8
                    }}
                  >
                    {course.modules.length} module{course.modules.length !== 1 ? 's' : ''}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      
      {/* Fixed Create Course Button at Bottom */}
      <View style={{
        position: 'absolute',
        bottom: 20,
        left: 30,
        right: 30
      }}>
        <Button 
          text="Create Course" 
          onPress={() => router.push('/addCourse')}
        />
      </View>
    </View>
  )
}