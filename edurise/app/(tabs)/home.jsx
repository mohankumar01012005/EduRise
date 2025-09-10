import { View, Text, Platform, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Header from '../../components/Home/Header'
import Colours from "./../../constants/Colours"
import NoCourse from '../../components/Home/NoCourse'
import { UserDetailContext } from '../../context/UserDetailContext'
import { db } from '../../config/firebaseConfig'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { SimpleLineIcons } from '@expo/vector-icons'


export default function Home() {
  const { userDetail } = useContext(UserDetailContext)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedCourse, setExpandedCourse] = useState(null)

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

  const toggleExpand = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
  }

  const openLink = async (url) => {
    try {
      await Linking.openURL(url)
    } catch (error) {
      console.error("Failed to open URL:", error)
    }
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
        {/* <Text>Loading your courses...</Text> */}
        <NoCourse></NoCourse>
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
      
      {courses.length === 0 ? (
        <NoCourse />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            marginBottom: 20,
            marginTop: 20
          }}>Your Courses</Text>
          
          {courses.map((course) => (
            <TouchableOpacity 
              key={course.id} 
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: '#e9ecef'
              }}
              onPress={() => toggleExpand(course.id)}
            >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontFamily: 'outfit-bold',
                  fontSize: 18,
                  flex: 1
                }}>{course.title}</Text>
                
                <SimpleLineIcons 
                  name={expandedCourse === course.id ? "arrow-up" : "arrow-down"} 
                  size={16} 
                  color="black" 
                />
              </View>
              
              {expandedCourse === course.id && (
                <View style={{ marginTop: 16 }}>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 16,
                    marginBottom: 12
                  }}>{course.description}</Text>
                  
                  <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 16,
                    marginBottom: 8
                  }}>Example:</Text>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 16,
                    marginBottom: 12
                  }}>{course.example}</Text>
                  
                  {course.formulas && course.formulas.length > 0 && (
                    <>
                      <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 16,
                        marginBottom: 8
                      }}>Formulas:</Text>
                      {course.formulas.map((formula, index) => (
                        <Text key={index} style={{
                          fontFamily: 'outfit',
                          fontSize: 16,
                          marginBottom: 4
                        }}>• {formula}</Text>
                      ))}
                    </>
                  )}
                  
                  <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    {course.youtubeLink && (
                      <TouchableOpacity 
                        style={{
                          backgroundColor: Colours.PRIMARY,
                          padding: 8,
                          borderRadius: 8,
                          marginRight: 12
                        }}
                        onPress={() => openLink(course.youtubeLink)}
                      >
                        <Text style={{
                          color: 'white',
                          fontFamily: 'outfit'
                        }}>YouTube</Text>
                      </TouchableOpacity>
                    )}
                    
                    {course.resourceLink && (
                      <TouchableOpacity 
                        style={{
                          backgroundColor: Colours.PRIMARY,
                          padding: 8,
                          borderRadius: 8
                        }}
                        onPress={() => openLink(course.resourceLink)}
                      >
                        <Text style={{
                          color: 'white',
                          fontFamily: 'outfit'
                        }}>Resources</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  )
}