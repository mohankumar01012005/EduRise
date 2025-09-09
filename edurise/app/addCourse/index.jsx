import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from "react-native";

// Mock function for demonstration - replace with your actual AI integration
const generateCourseTitles = async (input) => {
  // Replace this with your actual AI model integration
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        course_titles: [
          `Advanced ${input} Fundamentals`,
          `${input} for Beginners`,
          `Complete ${input} Masterclass`,
          `${input} Best Practices`,
          `Modern ${input} Techniques`
        ]
      });
    }, 2000);
  });
};

export default function CourseGenerator() {
  const [input, setInput] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError("Please enter a topic or description");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await generateCourseTitles(input);
      console.log("✅ API Response:", response);

      let normalizedCourses = [];

      if (Array.isArray(response)) {
        normalizedCourses = response;
      } else if (Array.isArray(response.course_titles) && response.course_titles.length > 0) {
        normalizedCourses = response.course_titles;
      } else if (typeof response.course_titles === "string" && response.course_titles.trim() !== "") {
        normalizedCourses = response.course_titles
          .split("\n")
          .map((c) => c.trim())
          .filter(Boolean);
      } else if (response.raw) {
        try {
          const parsedRaw = JSON.parse(response.raw);
          if (Array.isArray(parsedRaw)) {
            normalizedCourses = parsedRaw;
          }
        } catch (e) {
          console.warn("⚠️ Could not parse raw response:", response.raw);
        }
      }

      console.log("✅ Normalized Courses:", normalizedCourses);

      if (!normalizedCourses || normalizedCourses.length === 0) {
        setError("Please enter a valid input");
        setCourses([]);
      } else {
        setCourses(normalizedCourses);
        setSelectedCourses([]);
      }
    } catch (err) {
      console.error("❌ Error generating courses:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectCourse = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleCreateCourse = () => {
    if (selectedCourses.length === 0) {
      setError("Please select at least one course to create");
      return;
    }
    // Add your course creation logic here
    console.log("Creating courses:", selectedCourses);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <Text style={styles.headerIcon}>📚</Text>
            <Text style={styles.headerText}>Course Generator</Text>
          </View>
          <Text style={styles.subtitle}>
            Generate personalized course topics powered by AI
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Enter any topic that you want to learn
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Python, Java, 10th class maths, web development, data science..."
                  placeholderTextColor="#9ca3af"
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={() => !loading && handleGenerate()}
                />
                <Text style={styles.sparklesIcon}>✨</Text>
              </View>
              <Text style={styles.exampleText}>
                Examples: Python, Java, 10th class maths, React development
              </Text>
            </View>
            
            <TouchableOpacity
              style={[styles.button, (loading || !input.trim()) && styles.buttonDisabled]}
              onPress={handleGenerate}
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <View style={styles.buttonContent}>
                  <ActivityIndicator color="#fff" style={styles.loader} />
                  <Text style={styles.buttonText}>Generating Topics...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonIcon}>✨</Text>
                  <Text style={styles.buttonText}>Generate Topics</Text>
                </View>
              )}
            </TouchableOpacity>

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Course Topics */}
        {courses.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📚</Text>
                <Text style={styles.sectionTitle}>Generated Course Topics</Text>
              </View>
              <ScrollView style={styles.coursesContainer}>
                {courses.map((course, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.courseItem,
                      selectedCourses.includes(course) && styles.courseItemSelected
                    ]}
                    onPress={() => toggleSelectCourse(course)}
                  >
                    <View style={styles.courseContent}>
                      <Text style={[
                        styles.courseText,
                        selectedCourses.includes(course) && styles.courseTextSelected
                      ]}>
                        {course}
                      </Text>
                      {selectedCourses.includes(course) && (
                        <Text style={styles.checkIcon}>✅</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              {selectedCourses.length > 0 && (
                <View style={styles.selectedContainer}>
                  <View style={styles.selectedCount}>
                    <Text style={styles.selectedCountText}>
                      {selectedCourses.length} topic{selectedCourses.length > 1 ? 's' : ''} selected
                    </Text>
                  </View>
                  
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateCourse}
                  >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonIcon}>📚</Text>
                      <Text style={styles.buttonText}>
                        Create Course{selectedCourses.length > 1 ? 's' : ''}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    flex: 1,
    padding: 16,
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  headerIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    backgroundGradient: "to-r",
    gradientFrom: "#2563eb",
    gradientTo: "#60a5fa",
    color: "#2563eb",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
    overflow: "hidden",
  },
  cardContent: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    paddingRight: 40,
  },
  sparklesIcon: {
    position: "absolute",
    right: 12,
    top: 12,
    fontSize: 16,
  },
  exampleText: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loader: {
    marginRight: 8,
  },
  errorContainer: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  coursesContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  courseItem: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#eff6ff",
  },
  courseItemSelected: {
    borderColor: "#2563eb",
    backgroundColor: "#2563eb",
  },
  courseContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    flex: 1,
  },
  courseTextSelected: {
    color: "#fff",
  },
  checkIcon: {
    marginLeft: 8,
  },
  selectedContainer: {
    marginTop: 16,
  },
  selectedCount: {
    backgroundColor: "#dbeafe",
    borderWidth: 1,
    borderColor: "#93c5fd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  selectedCountText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "500",
  },
});