import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { globalStateContext, useGlobalState } from "./Context";
import { MaterialIcons } from '@expo/vector-icons';

export const GalleryScreen = ({ navigation }: { navigation: any }) => {
    const [state, dispatch] = useGlobalState();
    const [index, setIndex] = React.useState<number>(0);

    function removePicture() {
        let pictures = state.pictures;
        pictures.splice(index, 1);
        dispatch({pictures: pictures});
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    return (
        <View style={styles.container}>
            {
                state.pictures.length > 0 ? 
                <ImageBackground resizeMode="contain" style={styles.image} source={state.pictures[index]}></ImageBackground> 
                :
                <Text>No Pictures taken</Text>
            }
            {
                index > 0 ? 
                <TouchableOpacity style={styles.navigationLeft} onPress={() => setIndex(index - 1)}>
                <MaterialIcons name='arrow-left' color={'#1976D2'} size={70} />
                </TouchableOpacity>
                :
                <View></View>
            }
            {
                index < state.pictures.length - 1 ?
                <TouchableOpacity style={styles.navigationRigth} onPress={() => setIndex(index + 1)}>
                <MaterialIcons name='arrow-right' color={'#1976D2'} size={70} />
                </TouchableOpacity>
                :
                <View></View>
            }
            {
                state.pictures.length > 0 ?
                <View style={styles.toolbarContainer}>
                    <TouchableOpacity onPress={() => removePicture()}>
                        <MaterialIcons name='delete' color={'#1976D2'} size={50}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {removePicture(); navigation.navigate('Camera')}}>
                        <MaterialIcons name='edit' color={'#1976D2'} size={50}/>
                    </TouchableOpacity>
                </View>
                :
                <View></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    toolbarContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    image: {
      height: '100%',
      width: '100%',
    },
    navigationRigth: {
        position: 'absolute',
        right: 5,
    },
    navigationLeft: {
        position: 'absolute',
        left: 5,
    }
  });