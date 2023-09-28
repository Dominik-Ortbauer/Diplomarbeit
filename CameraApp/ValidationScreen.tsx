import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useGlobalState } from "./Context";
import React from "react";

export const ValidationScreen = ({ navigation }: { navigation: any }) => {
    const [state, dispatch] = useGlobalState();
    
    if(state.validationData === undefined) 
    {
        return <Text>No Validation Data</Text>;
    }

    function validationFinished() {
        state.socketClient.sendValidatedData(state.validationData);
        dispatch({validationData: undefined});
    }

    return <View style={styles.container}>
        {Array.from(state.validationData.entries()).map(([key, value]) => 
            <View key={key} style={styles.row}>
                <Text style={styles.label}>{key}: </Text>
                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={key}
                    onChangeText={(text) => dispatch({validationData: new Map(state.validationData).set(key, text)})}
                />
            </View>
        )}
        <TouchableOpacity style={styles.button} onPress={() => validationFinished()}>
            <Text style={styles.text}>Finish</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    label: {
      flex: 1,
      fontSize: 16,
      marginRight: 8,
    },
    button: {
        backgroundColor: '#888',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
        alignItems: 'center',
      },
    input: {
      flex: 2,
      borderWidth: 1,
      borderColor: 'gray',
      padding: 8,
      borderRadius: 4,
    },
    text: {
        color: '#fff',
        fontSize: 18,
      },
  });