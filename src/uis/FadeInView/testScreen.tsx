import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FadeInView from '.'


const testScreen = () => {

    return (
        <View style={styles.container} >
            {'HELLO WORLD'.split('').map((item, index) =>
                <FadeInView key={index} delay={index * 200} >
                    <Text>{item}</Text>
                </FadeInView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})

export default testScreen
