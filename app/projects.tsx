// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { getProjects, getParticipantsByProjectId } from '../app/api';
// import {useRouter} from 'expo-router';

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   is_published: boolean;
//   number_participants: number;
// }

// export default function Projects() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();
//   const router = useRouter();

//   // Fetch Projects and Participant Count
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const projectsData = await getProjects();
//         const publishedProjects = projectsData.filter((project: Project) => project.is_published);

//         const projectsWithParticipants = await Promise.all(
//           publishedProjects.map(async (project) => {
//             try {
//               const participantsData = await getParticipantsByProjectId(project.id);
//               return {
//                 ...project,
//                 number_participants: participantsData || 0,
//               };
//             } catch (error) {
//               console.error("Error fetching participants:", error);
//               return { ...project, number_participants: 0 };
//             }
//           })
//         );

//         setProjects(projectsWithParticipants);
//       } catch (error) {
//         Alert.alert('Error', 'Failed to load projects.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   // Render Each Project
//   const renderProject = ({ item }: { item: Project }) => (
//     <View style={styles.projectBox}>
//       <View style={styles.projectContent}>
//         <Text style={styles.projectTitle}>{item.title}</Text>
//         <View style={styles.participantsContainer}>
//           <Text style={styles.projectParticipants}>Participants: {item.number_participants}</Text>
//         </View>
//       </View>
//       <TouchableOpacity onPress={() => router.push({ pathname: './(tabs)/ProjectHome', params: { project: item } })}>
//         <Ionicons name="arrow-forward-circle-outline" size={24} color="#008148" />
//       </TouchableOpacity>
//     </View>
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" color="#008148" style={styles.loader} />;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.screenTitle}>Projects</Text>
//       <FlatList
//         data={projects}
//         renderItem={renderProject}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: '#F5F5F5',
//   },
//   loader: {
//     marginTop: 50,
//   },
//   screenTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   addProjectText: {
//     fontSize: 18,
//     color: '#008148',
//     marginVertical: 10,
//   },
//   projectBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     marginBottom: 15,
//     borderRadius: 10,
//     backgroundColor: '#ffffff',
//     borderColor: '#ddd',
//     borderWidth: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   projectContent: {
//     flex: 1,
//   },
//   projectTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   projectDescription: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 10,
//   },
//   participantsContainer: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 20,
//     backgroundColor: '#E8F5E9',
//   },
//   projectParticipants: {
//     fontSize: 16,
//     color: '#666',
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionText: {
//     fontSize: 16,
//     color: '#007bff',
//     marginHorizontal: 10,
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getProjects, getParticipantsByProjectId } from '../app/api';
import { useRouter } from 'expo-router';

interface Project {
  id: number;
  title: string;
  description: string;
  is_published: boolean;
  number_participants: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        const publishedProjects = projectsData.filter((project: Project) => project.is_published);

        const projectsWithParticipants = await Promise.all(
          publishedProjects.map(async (project) => {
            try {
              const participantsData = await getParticipantsByProjectId(project.id);
              return {
                ...project,
                number_participants: participantsData || 0,
              };
            } catch (error) {
              console.error("Error fetching participants:", error);
              return { ...project, number_participants: 0 };
            }
          })
        );

        setProjects(projectsWithParticipants);
      } catch (error) {
        Alert.alert('Error', 'Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const renderProject = ({ item }: { item: Project }) => (
    <View style={styles.projectBox}>
      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <View style={styles.participantsContainer}>
          <Text style={styles.projectParticipants}>Participants: {item.number_participants}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push(`./(tabs)/${item.id}`)}>
        <Ionicons name="arrow-forward-circle-outline" size={24} color="#008148" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#008148" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Projects</Text>
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  loader: {
    marginTop: 50,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  projectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  projectContent: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  participantsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
  },
  projectParticipants: {
    fontSize: 16,
    color: '#666',
  },
});
