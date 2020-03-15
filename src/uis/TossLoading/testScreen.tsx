import React from 'react'
import { View, StyleSheet, Easing } from 'react-native'
import TossLoading from '.'

const testScreen = () => {
    return (
        <>
            <View style={styles.container} >
                <TossLoading />
            </View>
            <View style={styles.container} >
                <TossLoading
                    spac={3}
                    number={30}
                    size={1}
                    delay={200}
                    translateY={20}
                    color='#000'
                    totalDuration={6000}
                    itemDuration={2000} //itemDuration must lessthen totalDuration
                    translateYSpring={4}
                    easing={Easing.out(Easing.bounce)}
                />
            </View>
        </>
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
