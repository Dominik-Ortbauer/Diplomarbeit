import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CameraScreen } from './CameraScreen';
import SettingsScreen from './SettingsScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { GalleryScreen } from './GalleryScreen';
import { GlobalStateProvider, globalState, globalStateContext, useGlobalState } from './Context';
import { ValidationScreen } from './ValidationScreen';
import SocketClientInitializer from './SocketClientInitializer';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <GlobalStateProvider>
      <SocketClientInitializer />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Camera"
            component={CameraScreen}
            options={{
              tabBarLabel: 'Camera',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="camera" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="settings" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Gallery"
            component={GalleryScreen}
            options={{
              tabBarLabel: 'Gallery',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="photo-library" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Validation"
            component={ValidationScreen}
            options={{
              tabBarLabel: 'Validation',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="check" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
}
