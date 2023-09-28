import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { globalStateContext, useGlobalState } from './Context';
import SocketClient from './SocketClient';

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const [state, dispatch] = useGlobalState();
  const [host, setHost] = useState<string>(state.socketClient.getHost());
  const [port, setPort] = useState<number>(state.socketClient.getPort());

  const saveSettings = () => {
    var newClient = new SocketClient(host, port, (data) => {
      var map = new Map<string, string>();
      for(var key in data) {
        map.set(key, data[key]);
      }
      dispatch({validationData: map});
    });
    dispatch({socketClient: newClient})
  };

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Server URL:</Text>
    <TextInput
        style={styles.input}
        value={host}
        onChangeText={text => setHost(text)}
        placeholder="Enter Server URL"
    />
    <Text style={styles.label}>Port:</Text>
    <TextInput
        style={styles.input}
        value={port.toString() == "NaN" ? "" : port.toString()}
        onChangeText={text => setPort(Number.parseInt(text.replace(/[^0-9]/g, '')))}
        placeholder="Enter Port"
    />
    <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={styles.buttonText}>Save</Text>
    </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#888',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SettingsScreen;
