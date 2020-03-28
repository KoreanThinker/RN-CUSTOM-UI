import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GoogleLoading from '.'

const testScreen = () => {
    return (
        <View style={styles.container} >
            {/* default */}
            <View style={styles.container} >
                <GoogleLoading />
            </View>

            {/* custom */}
            <View style={styles.container} >

                <GoogleLoading
                    colors={['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000']}
                    duration={12000}
                    ballSize={4}
                    distance={50}
                    rotation={0}
                />
            </View>
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
