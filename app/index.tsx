import { Text, View, StyleSheet , TouchableOpacity , Button} from "react-native";
import {useRouter} from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to StoryPath</Text>
      <Text style={styles.subtitle}>Explore Unlimited Location-based Experiences</Text>
      
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
        With StoryPath, you can discover and create amazing location-based adventures. 
        From city tours to treasure hunts, the possibilities are endless!
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/profile')}>
        <Text style={styles.buttonText}>CREATE PROFILE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/projects')}>
        <Text style={styles.buttonText}>EXPLORE PROJECTS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  descriptionBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
