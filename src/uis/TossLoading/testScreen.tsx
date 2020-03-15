import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TossLoading from '.'

const testScreen = () => {
    return (
        <View style={styles.container} >
            <TossLoading />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default testScreen
