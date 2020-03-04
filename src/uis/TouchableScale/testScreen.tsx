import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TouchableScale from '.'

const testScreen = () => {
    return (
        <View style={styles.container} >
            <TouchableScale
                onPress={() => console.log(2)}
                style={{ width: 50, height: 50, backgroundColor: 'red' }}
            >
                <Text>hi</Text>
            </TouchableScale>
        </View>
    )
}

export default testScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
