import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { onGestureEvent, withOffset } from 'react-native-redash'
import Knob from './Knob';

const {
    cond,
    Value,
    diffClamp
} = Animated

const { width } = Dimensions.get('window')
const SLIDER_WIDTH = width - 100;
const SLIDER_HEIGHT = 50;

const TestUI = () => {
    const state = new Value(State.UNDETERMINED);
    const translationX = new Value(0);
    const gestureHandler = onGestureEvent({ state, translationX })
    const translateX = diffClamp(withOffset(translationX, state), 0, SLIDER_WIDTH)

    return (
        <View style={styles.container} >
            <View>
                <PanGestureHandler  {...gestureHandler} >
                    <Animated.View style={{ transform: [{ translateX: translateX }] }} >
                        <Knob {...{ state }} />
                    </Animated.View>
                </PanGestureHandler>

            </View>
        </View>
    )
}

export default TestUI

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center'
    }
})
