// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Drawer } from 'expo-router/drawer';
// import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import { Feather } from '@expo/vector-icons';
// import { router, usePathname } from 'expo-router';


// const CustomDrawerContent = (props: object) => {
//   const pathname = usePathname();

//   useEffect(() => {
//     console.log("Current Path", pathname);
//   }, [pathname]);

//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.infoContainer}>
//         <View style={styles.infoDetailsContainer}>
//           <Text style={styles.appTitle}>StoryPath</Text>
//         </View>
//       </View>

//       <View style={styles.infoContainer}>
//         <Text style={styles.appTitle}>Current User: </Text>
//       </View>

//       <DrawerItem
//         icon={({ size }) => <Feather name="home" size={size} color={pathname === '/' ? '#fff' : '#000'} />}
//         label="Welcome"
//         labelStyle={[styles.navItemLabel, { color: pathname === '/' ? '#fff' : '#000' }]}
//         style={{ backgroundColor: pathname === '/' ? '#333' : '#fff' }}
//         onPress={() => {
//           router.push('/');
//         }}
//       />

//       <DrawerItem
//         icon={({ size }) => <Feather name="user" size={size} color={pathname === '/profile' ? '#fff' : '#000'} />}
//         label="Profile"
//         labelStyle={[styles.navItemLabel, { color: pathname === '/profile' ? '#fff' : '#000' }]}
//         style={{ backgroundColor: pathname === '/profile' ? '#333' : '#fff' }}
//         onPress={() => {
//           router.push('/profile');
//         }}
//       />

//       <DrawerItem
//         icon={({ size }) => <Feather name="list" size={size} color={pathname === '/projects' ? '#fff' : '#000'} />}
//         label="Projects"
//         labelStyle={[styles.navItemLabel, { color: pathname === '/projects' ? '#fff' : '#000' }]}
//         style={{ backgroundColor: pathname === '/projects' ? '#333' : '#fff' }}
//         onPress={() => {
//           router.push('/projects');
//         }}
//       />

//       <DrawerItem
//         icon={({ size }) => <Feather name="info" size={size} color={pathname === '/about' ? '#fff' : '#000'} />}
//         label="About"
//         labelStyle={[styles.navItemLabel, { color: pathname === '/about' ? '#fff' : '#000' }]}
//         style={{ backgroundColor: pathname === '/about' ? '#333' : '#fff' }}
//         onPress={() => {
//           router.push('/about');
//         }}
//       />
//     </DrawerContentScrollView>
//   );
// };

// export default function Layout() {
//   return (
//     <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
//       <Drawer.Screen name="index" options={{headerShown: true, headerTitle: "Welcome"}}  />
//       <Drawer.Screen name="projects" options={{headerShown: true, headerTitle: "Projects"}} />
//       <Drawer.Screen name="profile" options={{headerShown: true, headerTitle: "Profile"}} />
//       <Drawer.Screen name="about" options={{headerShown: true, headerTitle: "About"}} />
//     </Drawer>
//   );
// }

// const styles = StyleSheet.create({
//   navItemLabel: {
//     marginLeft: -20,
//     fontSize: 18,
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//     marginBottom: 10,
//   },
//   infoDetailsContainer: {
//     marginTop: 25,
//     marginLeft: 10,
//   },
//   appTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   username: {
//     fontSize: 16,
//     marginTop: 5,
//     color: '#333',
//   },
// });

// _layout.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { UserProvider, useUserContext } from './UserContext';

const CustomDrawerContent = (props: object) => {
  const pathname = usePathname();
  const { username } = useUserContext(); // Retrieve username from context

  useEffect(() => {
    console.log("Current Path", pathname);
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.infoContainer}>
        <View style={styles.infoDetailsContainer}>
          <Text style={styles.appTitle}>StoryPath</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.appTitle}>Current User: </Text>
        <Text style={styles.username}>{username || "Guest"}</Text>
      </View>

      <DrawerItem
        icon={({ size }) => <Feather name="home" size={size} color={pathname === '/' ? '#fff' : '#000'} />}
        label="Welcome"
        labelStyle={[styles.navItemLabel, { color: pathname === '/' ? '#fff' : '#000' }]}
        style={{ backgroundColor: pathname === '/' ? '#333' : '#fff' }}
        onPress={() => {
          router.push('/');
        }}
      />

      <DrawerItem
        icon={({ size }) => <Feather name="user" size={size} color={pathname === '/profile' ? '#fff' : '#000'} />}
        label="Profile"
        labelStyle={[styles.navItemLabel, { color: pathname === '/profile' ? '#fff' : '#000' }]}
        style={{ backgroundColor: pathname === '/profile' ? '#333' : '#fff' }}
        onPress={() => {
          router.push('/profile');
        }}
      />

      <DrawerItem
        icon={({ size }) => <Feather name="list" size={size} color={pathname === '/projects' ? '#fff' : '#000'} />}
        label="Projects"
        labelStyle={[styles.navItemLabel, { color: pathname === '/projects' ? '#fff' : '#000' }]}
        style={{ backgroundColor: pathname === '/projects' ? '#333' : '#fff' }}
        onPress={() => {
          router.push('/projects');
        }}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <UserProvider>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
        <Drawer.Screen name="index" options={{headerShown: true, headerTitle: "Welcome"}}  />
        <Drawer.Screen name="projects" options={{headerShown: true, headerTitle: "Projects"}} />
        <Drawer.Screen name="profile" options={{headerShown: true, headerTitle: "Profile"}} />
      </Drawer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  infoDetailsContainer: {
    marginTop: 25,
    marginLeft: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
});
