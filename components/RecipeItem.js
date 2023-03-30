import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const RecipeItem = props => {

    return (
        <TouchableOpacity onPress={props.InputOnPressLink}>
            <View>
                <View>
                    <Image 
                        style={styles.tinyLogo}
                        source={{
                          uri: props.InputThumbnail,
                        }}
                
                    />
                </View>
                <View>
                    <Text>{props.InputTitle}</Text>
                    <Text>{props.InputIngredients}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    girdItem: {
        flex: 1,
        borderColor: '#0f0',
        borderWidth: 1,
        position: 'relative',
        display: 'flex',
        padding: 10,
    
    },
})
export default RecipeItem;