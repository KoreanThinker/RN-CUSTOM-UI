import React, { ReactNode, useState, useMemo } from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'

const {
    cond,
    set,
    timing,
    Clock,
    useCode,
    block,
    Value,
    eq,
    and,
    startClock,
    stopClock,
    neq,
    not,
    interpolate,
    clockRunning,
    Extrapolate
} = Animated

interface AccordionProps {
    value: boolean;
    listHeight: number;
    duration?: number;
    easing?: Animated.EasingFunction;
    style?: StyleProp<ViewStyle>;
    parentComponent: (animation: Animated.Value<number>) => ReactNode;
    listComponent: (animation: Animated.Value<number>) => ReactNode;
}

const runTiming = (clock: Animated.Clock, value: boolean, duration: number, easing: Animated.EasingFunction) => {

    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    }

    const config = {
        duration,
        easing,
        toValue: new Value(-1)
    }

    const open = new Value(value ? 1 : 0)

    return block([
        cond(and(neq(config.toValue, 1), eq(open, 1)), [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            set(config.toValue, 1),
            startClock(clock)
        ]),
        cond(and(neq(config.toValue, 0), eq(open, 0)), [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            set(config.toValue, 0),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, stopClock(clock)),
        interpolate(state.position, {
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP,
        }),
    ])
}

const Accordion: React.FC<AccordionProps> = (props) => {

    const animation = new Value(0);
    const clock = new Clock();

    const height = interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [0, props.listHeight]
    })


    useCode(() => block([
        set(animation, runTiming(clock, props.value, props.duration, props.easing))
    ]), [props.value])

    return (
        <View style={props.style} >
            {props.parentComponent(animation)}
            <Animated.View style={{ height }} >
                {props.listComponent(animation)}
            </Animated.View>
        </View>
    )
}

Accordion.defaultProps = {
    duration: 200,
    easing: Easing.inOut(Easing.linear),
    value: false,
}

export default Accordion
