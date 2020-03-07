import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { loop, timing as redashTiming } from 'react-native-redash'
import { useMemoOne } from 'use-memo-one'

interface RotateIndicatorProps {
    onPress?: () => void;
    duration?: number;
    easing?: Animated.EasingFunction;
}

const {
    interpolate,
    Value,
    set,
    useCode,
    Clock,
    block,
    timing,
} = Animated


const runTiming = (clock: Animated.Clock, config: Animated.TimingConfig) => {

    const state: Animated.TimingState = {
        position: new Value(0),
        finished: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    }

    return timing(clock, state, config)
}

const RotateIndicator: React.FC<RotateIndicatorProps> = (props) => {

    const [expend, setExpend] = useState(true);
    const { animation, clock } = useMemoOne(
        () => ({
            animation: new Value(0),
            clock: new Clock()
        }),
        []
    );
    useCode(() =>
        set(
            animation,
            redashTiming({
                duration: props.duration,
                easing: props.easing,
                from: animation,
                to: expend ? 1 : 0,
            })
        ),
        [expend]
    );
    const rotate = interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [0, Math.PI * 10]
    })
    const scale = interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [0.4, 1]
    })

    return (
        <TouchableWithoutFeedback onPress={() => {
            console.log('h')
            setExpend(!expend)
        }} >
            <Animated.View style={{ transform: [{ rotate }, { scale }] }} >
                {props.children}
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

RotateIndicator.defaultProps = {
    onPress: () => { },
    duration: 2000,
    easing: Easing.inOut(Easing.ease)
}

export default RotateIndicator
