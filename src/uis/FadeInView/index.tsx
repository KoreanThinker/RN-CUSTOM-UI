import React, { Fragment } from 'react'
import { View, Text, StyleProp, ViewStyle } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import { useMemoOne } from 'use-memo-one';
import { bInterpolate, delay } from 'react-native-redash';

const {
    Value,
    cond,
    block,
    set,
    useCode,
    eq,
    Clock,
    stopClock,
    startClock,
    and,
    timing,
} = Animated


interface FadeInViewProps {
    style?: StyleProp<ViewStyle>;
    translateY?: number;
    Easing?: Animated.EasingFunction;
    duration?: number;
    delay?: number;
    startOpacity?: number;
}

const runTiming = (clock: Animated.Clock, easing: Animated.EasingFunction, duration: number, delay: number) => {

    const delaying = new Value(0)

    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    }

    const delayConfig = {
        duration: delay,
        toValue: new Value(0),
        easing: easing
    }
    const config = {
        duration,
        easing,
        toValue: new Value(1)
    }

    return block([
        cond(and(eq(state.position, 0), eq(delaying, 0)), startClock(clock)),
        cond(and(state.finished, eq(delaying, 0)), [
            set(delaying, 1),
            set(state.finished, 0),
            set(state.position, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
        ]),
        cond(eq(delaying, 1), timing(clock, state, config), timing(clock, state, delayConfig)),
        cond(and(state.finished, eq(delaying, 1)), stopClock(clock)),
        state.position
    ])
}


const FadeInView: React.FC<FadeInViewProps> = (props) => {

    const { animation, clock } = useMemoOne(
        () => ({
            animation: new Value(0),
            delay: new Value(0),
            clock: new Clock()
        }),
        []
    );
    const opacity = bInterpolate(animation, props.startOpacity, 1)
    const translateY = bInterpolate(animation, props.translateY, 0)



    useCode(() => block([
        set(animation, runTiming(clock, props.Easing, props.duration, props.delay))
    ]), [])

    return (
        <Animated.View
            style={[
                props.style,
                {
                    transform: [{ translateY }],
                    opacity
                }
            ]}
        >
            {props.children}
        </Animated.View>
    )
}

FadeInView.defaultProps = {
    Easing: Easing.inOut(Easing.ease),
    duration: 200,
    delay: 0,
    translateY: 100,
    startOpacity: 0
}

export default FadeInView
