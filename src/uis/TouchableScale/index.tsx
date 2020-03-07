import React, { ReactNode, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ViewProps, StyleProp, ViewStyle } from 'react-native'
import { TapGestureHandler, State, } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import { onGestureEvent, timing } from 'react-native-redash'
import { useMemoOne } from 'use-memo-one'

const {
    eq,
    Value,
    useCode,
    cond,
    call,
    onChange,
    block,
    set,
    or,
    Clock,
    interpolate,
    and,
    startClock,
    neq,
    stopClock
} = Animated

type TouchableScaleProps = {
    onPress?: () => void;
    inDuration?: number;
    outDuration?: number;
    inEasing?: Animated.EasingFunction;
    outEasing?: Animated.EasingFunction;
    targetScale?: number;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}


const TouchableScale: React.FC<TouchableScaleProps> = (props) => {
    const { animation, shouldScale, state } = useMemoOne(() => ({
        animation: new Value(0),
        shouldScale: new Value(0),
        state: new Value(State.UNDETERMINED)
    }), [])

    const scale = interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [1, props.targetScale]
    })



    useCode(() => block([
        onChange(state, cond(and(eq(state, State.BEGAN), eq(animation, 0)), [
            set(shouldScale, 1),
        ]
        )),
        cond(
            and(eq(shouldScale, 1), neq(animation, 1)),
            set(
                animation,
                timing({
                    duration: props.inDuration,
                    easing: props.inEasing,
                    from: 0,
                    to: 1,
                })
            ),
        ),
        cond(eq(animation, 1), set(shouldScale, 0)),
        cond(
            and(eq(shouldScale, 0), neq(animation, 0)),
            set(
                animation,
                timing({
                    duration: props.outDuration,
                    easing: props.outEasing,
                    from: 1,
                    to: 0
                })
            ),
        )
    ]), []);

    return (
        <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state == State.END) {
                    props.onPress()
                }
                state.setValue(nativeEvent.state)
            }}
        >
            <Animated.View
                style={[
                    props.style,
                    { transform: [{ scale }] }
                ]}
            >
                {props.children}
            </Animated.View>
        </TapGestureHandler>

    )
}
TouchableScale.defaultProps = {
    targetScale: 0.6,
    onPress: () => { },
    inEasing: Easing.inOut(Easing.ease),
    outEasing: Easing.inOut(Easing.ease),
    inDuration: 66,
    outDuration: 133
}

export default TouchableScale

const styles = StyleSheet.create({})
