import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalStateProvider } from './Context'; // Import your GlobalStateProvider
import { useGlobalState } from './Context'; // Import useGlobalState
import { ValidationScreen } from './ValidationScreen';
import SocketClient from './SocketClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SocketClientInitializer() {
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    (async () => {
      const host = await AsyncStorage.getItem('host').then((value) => {
        if(value !== null) {
          return value;
        }
        return "localhost";
      });
      const port = await AsyncStorage.getItem('port').then((value) => { 
        if(value !== null) {
          return parseInt(value);
        }
        return 5000;
      });

      const sC = new SocketClient(host, port, (data) => {
        var map = new Map<string, string>();
        for(var key in data) {
          map.set(key, data[key]);
        }
        dispatch({ validationData: map });
      });

      dispatch({ socketClient: sC });
    })();
  }, []);

  return null;
}