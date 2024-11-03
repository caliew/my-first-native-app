import { View, Text, Button } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function _layout() {
  return (
   <Tabs screenOptions={{headerLeft: () => <DrawerToggleButton tintColor='#000' />}}>
    <Tabs.Screen name='ProjectHome' options={{
      tabBarIcon: ({color}) => (
        <Feather name="list" size={24} color={color} />
      ),
      tabBarLabel: 'ProjectHome',
      headerTitle: 'ProjectHome'
    }} />
    <Tabs.Screen name='MapScreen' options={{
      tabBarIcon: ({color}) => (
        <Feather name="list" size={24} color={color} />
      ),
      tabBarLabel: 'MapScreen',
      headerTitle: 'MapScreen'
    }} />
    <Tabs.Screen name='QRCodeScannerScreen' options={{
      tabBarIcon: ({color}) => (
        <Feather name="list" size={24} color={color} />
      ),
      tabBarLabel: 'QRCodeScannerScreen',
      headerTitle: 'QRCodeScannerScreen'
    }} />
   </Tabs>
  )
}