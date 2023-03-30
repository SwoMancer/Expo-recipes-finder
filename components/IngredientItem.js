import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const IngredientItem = props => {
    if(props.InputIsPlus){
        return (
            <TouchableOpacity onPress={props.InputOnPressHandler.bind(this, props.InputId)}>
                <View style={styles.girdItemPlus}>
                    <Text>{props.InputType}{props.InputData}</Text>
                </View>
            </TouchableOpacity>
        )
    } 
    else{
        return (
            <TouchableOpacity onPress={props.InputOnPressHandler.bind(this, props.InputId)}>
                <View style={styles.girdItemMinus}>
                    <Text>{props.InputType}{props.InputData}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    girdItemPlus: {
        flex: 1,
        borderColor: '#0f0',
        borderWidth: 1,
        position: 'relative',
        display: 'flex',
        padding: 10,
    
    },
    girdItemMinus: {
        flex: 1,
        borderColor: '#f00',
        borderWidth: 1,
        position: 'relative',
        display: 'flex',
        padding: 10,
    
    },
})
export default IngredientItem;