import { View, Text, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SimpleLineIcons } from '@expo/vector-icons'
import Colours from '../../constants/Colours'
import Button from '../../components/Shared/Button'

export default function ModuleDetail() {
  const { course } = useLocalSearchParams()
  const router = useRouter()
  const parsedCourse = JSON.parse(course)
  const [expandedModule, setExpandedModule] = useState(null)

  const toggleExpandModule = (moduleIndex) => {
    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex)
  }

  const openLink = async (url) => {
    try {
      await Linking.openURL(url)
    } catch (error) {
      console.error("Failed to open URL:", error)
    }
  }

  return (
    <View style={{
      padding: 30,
      paddingTop: Platform.OS == 'ios' && 45,
      flex: 1,
      backgroundColor: Colours.WHITE
    }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <SimpleLineIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
          marginLeft: 15
        }}>{parsedCourse.title}</Text>
      </View>
      
      {/* Course Description */}
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 16,
        marginBottom: 20,
        color: '#6b7280'
      }}>
        {parsedCourse.description}
      </Text>
      
      {/* Modules List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 18,
          marginBottom: 15
        }}>Modules</Text>
        
        {parsedCourse.modules && parsedCourse.modules.map((module, index) => (
          <View key={index} style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#e9ecef'
          }}>
            <TouchableOpacity onPress={() => toggleExpandModule(index)}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontFamily: 'outfit-bold',
                  fontSize: 16,
                  flex: 1
                }}>{module.title}</Text>
                
                <SimpleLineIcons 
                  name={expandedModule === index ? "arrow-up" : "arrow-down"} 
                  size={16} 
                  color="black" 
                />
              </View>
            </TouchableOpacity>
            
            {expandedModule === index && (
              <View style={{ marginTop: 16 }}>
                <Text style={{
                  fontFamily: 'outfit',
                  fontSize: 14,
                  marginBottom: 12
                }}>{module.description}</Text>
                
                <Text style={{
                  fontFamily: 'outfit-bold',
                  fontSize: 14,
                  marginBottom: 8
                }}>Example:</Text>
                <Text style={{
                  fontFamily: 'outfit',
                  fontSize: 14,
                  marginBottom: 12
                }}>{module.example}</Text>
                
                {module.formulas && module.formulas.length > 0 && (
                  <>
                    <Text style={{
                      fontFamily: 'outfit-bold',
                      fontSize: 14,
                      marginBottom: 8
                    }}>Formulas:</Text>
                    {module.formulas.map((formula, i) => (
                      <Text key={i} style={{
                        fontFamily: 'outfit',
                        fontSize: 14,
                        marginBottom: 4
                      }}>• {formula}</Text>
                    ))}
                  </>
                )}
                
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                  {module.youtubeLink && (
                    <TouchableOpacity 
                      style={{
                        backgroundColor: Colours.PRIMARY,
                        padding: 8,
                        borderRadius: 8,
                        marginRight: 12
                      }}
                      onPress={() => openLink(module.youtubeLink)}
                    >
                      <Text style={{
                        color: 'white',
                        fontFamily: 'outfit',
                        fontSize: 12
                      }}>YouTube</Text>
                    </TouchableOpacity>
                  )}
                  
                  {module.resourceLink && (
                    <TouchableOpacity 
                      style={{
                        backgroundColor: Colours.PRIMARY,
                        padding: 8,
                        borderRadius: 8
                      }}
                      onPress={() => openLink(module.resourceLink)}
                    >
                      <Text style={{
                        color: 'white',
                        fontFamily: 'outfit',
                        fontSize: 12
                      }}>Resources</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      
      {/* Back Button */}
      <Button 
        text="Back to Home" 
        onPress={() => router.back()}
        style={{ marginTop: 20 }}
      />
    </View>
  )
}