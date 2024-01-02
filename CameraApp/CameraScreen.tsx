import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType, requestCameraPermissionsAsync } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { globalStateContext, useGlobalState } from './Context';
import { Socket, io } from 'socket.io-client';

let socket: Socket;

export const CameraScreen = ({ navigation }: { navigation: any }) => {
  const [state, dispatch] = useGlobalState();
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = React.useState<Camera | null>(null);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();

      dispatch({pictures: [photo, ...state.pictures]});
    }
  };

  const sendToProcessing = async () => {
    if(state.socketClient !== null) {
      state.socketClient.sendProcessingData(state.pictures);
    }
  };

  if (hasPermission === null || !isFocused) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        ref={ref => setCameraRef(ref)}
      />
      <View style={styles.horizontalContainer}>
        {
          state.pictures.length > 0 ?
          <View style={styles.thumbnailContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
              <Image style={styles.thumbnail} source={state.pictures[0]}></Image>
            </TouchableOpacity>
          </View>
          :
          <View></View>
        }
        
        
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Photo</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={sendToProcessing}>
        <Text style={styles.buttonText}>Abschicken</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gallery: {
    borderRadius: 10,
    height: 10,
    width: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  camera: {
    width: '100%',
    height: '70%',
  },
  button: {
    backgroundColor: '#888',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: -10,
    left: 50,
    width: 60,
    height: 60,
    borderRadius: 30, // Make it a circle
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 28, // Make the image inside the circle
  },
});
