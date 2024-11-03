import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useUserContext } from './UserContext';

export default function Profile() {
  const router = useRouter();
  const { username, setUsername } = useUserContext();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [usernameInput, setUsernameInput] = useState(username);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  };

  const handleSave = () => {
    if (usernameInput.trim() === '') {
      Alert.alert("Username required", "Please enter a username before saving.");
      return;
    }

    // Save the username to the context
    setUsername(usernameInput);
    Alert.alert("Profile Saved", `Username "${usernameInput}" has been saved.`);
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Your Profile</Text>
      <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.addPhotoText}>Tap to add photo</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Enter participant username"
        style={styles.inputBox}
        value={usernameInput}
        onChangeText={setUsernameInput}
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  addPhotoButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#C6E89C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addPhotoText: {
    fontSize: 12,
    color: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  inputBox: {
    width: '80%',
    padding: 10,
    borderColor: '#008148',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
});
