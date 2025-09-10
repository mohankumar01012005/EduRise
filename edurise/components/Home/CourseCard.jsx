import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons'
import Colours from '../../constants/Colours'

export default function CourseCard({ course }) {
  const [expanded, setExpanded] = useState(false)
  const [expandedModule, setExpandedModule] = useState(null)

  const toggleExpand = () => {
    setExpanded(!expanded)
    if (expanded) setExpandedModule(null)
  }

  const toggleExpandModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
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
      backgroundColor: '#f8f9fa',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#e9ecef'
    }}>
      <TouchableOpacity onPress={toggleExpand}>
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
            name={expanded ? "arrow-up" : "arrow-down"} 
            size={16} 
            color="black" 
          />
        </View>
      </TouchableOpacity>
      
      {expanded && (
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
          }}>Overview:</Text>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 16,
            marginBottom: 12
          }}>{course.overview}</Text>
          
          {course.formulas && course.formulas.length > 0 && (
            <>
              <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 16,
                marginBottom: 8
              }}>Key Formulas:</Text>
              {course.formulas.map((formula, index) => (
                <Text key={index} style={{
                  fontFamily: 'outfit',
                  fontSize: 16,
                  marginBottom: 4
                }}>• {formula}</Text>
              ))}
            </>
          )}
          
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 16,
            marginBottom: 12,
            marginTop: 16
          }}>Modules:</Text>
          
          {course.modules && course.modules.map((module, index) => (
            <View key={index} style={{
              backgroundColor: '#e9ecef',
              borderRadius: 8,
              padding: 12,
              marginBottom: 8
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
                    size={14} 
                    color="black" 
                  />
                </View>
              </TouchableOpacity>
              
              {expandedModule === index && (
                <View style={{ marginTop: 12 }}>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    marginBottom: 8
                  }}>{module.description}</Text>
                  
                  <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 14,
                    marginBottom: 4
                  }}>Example:</Text>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    marginBottom: 8
                  }}>{module.example}</Text>
                  
                  {module.formulas && module.formulas.length > 0 && (
                    <>
                      <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 14,
                        marginBottom: 4
                      }}>Formulas:</Text>
                      {module.formulas.map((formula, i) => (
                        <Text key={i} style={{
                          fontFamily: 'outfit',
                          fontSize: 14,
                          marginBottom: 2
                        }}>• {formula}</Text>
                      ))}
                    </>
                  )}
                  
                  <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    {module.youtubeLink && (
                      <TouchableOpacity 
                        style={{
                          backgroundColor: Colours.PRIMARY,
                          padding: 6,
                          borderRadius: 6,
                          marginRight: 8
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
                          padding: 6,
                          borderRadius: 6
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
                }}>Course YouTube</Text>
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
                }}>Course Resources</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  )
}