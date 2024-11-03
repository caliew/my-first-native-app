// // ProjectHome.tsx
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useRoute } from '@react-navigation/native';

// interface ProjectData {
//   id: number;
//   title: string;
//   description: string;
//   initial_clue: string;
//   instructions: string;
//   homescreen_display: string;
// }

// export default function ProjectHome() {
//   const route = useRoute();
//   const { project } = route.params as { project: ProjectData };
//   console.log(project);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{project.title}</Text>
//       <Text style={styles.description}>{project.description}</Text>
//       <Text style={styles.initialClue}>Initial Clue: {project.initial_clue}</Text>
//       <Text style={styles.instructions}>Instructions: {project.instructions}</Text>
//       <Text style={styles.homescreenDisplay}>{project.homescreen_display}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F5F5F5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   initialClue: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   instructions: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   homescreenDisplay: {
//     fontSize: 16,
//     fontStyle: 'italic',
//   },
// });

import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getProject } from '../api.js';

export default function ProjectHome() {
  const { id } = useLocalSearchParams();
  const project = getProject(id);

  if (!project) {
    return (
      <SafeAreaView>
        <Text>Project not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{project.title}</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>{project.description}</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Participants: {project.number_participants}</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Initial Clue: {project.initial_clue}</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Instructions: {project.instructions}</Text>
    </SafeAreaView>
  );
}
