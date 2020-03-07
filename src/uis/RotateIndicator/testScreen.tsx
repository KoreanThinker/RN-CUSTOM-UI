import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Logo from './Logo'
import RotateIndicator from '.'

const testScreen = () => {
    return (
        <View style={styles.container} >
            <RotateIndicator>
                <Logo />
            </RotateIndicator>
        </View>
    )
}

export default testScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})
