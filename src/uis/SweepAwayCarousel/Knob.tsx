import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { State } from 'react-native-gesture-handler'


const {
    eq
} = Animated

interface KnobProps {
    state: Animated.Node<State>
}

const Knob: React.FC<KnobProps> = ({ state }) => {
    const opacity = eq(state, State.ACTIVE)
    return (
        <View style={styles.container} >
            <Animated.View style={[{ width: 50, height: 50, backgroundColor: 'red' }, { opacity: 1 }]} />
        </View>
    )
}

export default Knob

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined
    }
})
