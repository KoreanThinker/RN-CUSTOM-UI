import React, { ReactNode } from 'react'
import { StyleSheet, Text, View, ViewProps, StyleProp, ViewStyle } from 'react-native'
import { TapGestureHandler, State, } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import { onGestureEvent, timing } from 'react-native-redash'

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
    and
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
    const animation = new Value(0)
    const scale = interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [1, props.targetScale]
    })
    const state = new Value(State.UNDETERMINED);
    const shouldScale = new Value(0);
    const gestureHandler = onGestureEvent({ state })

    useCode(() =>
        block([
            // onChange(state, cond(eq(state, State.END), call([], () => props.onPress()))),
            onChange(state, cond(eq(state, State.BEGAN), set(shouldScale, 1))),
            cond(
                eq(shouldScale, 1),
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
                eq(shouldScale, 0),
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
        ]),
        []
    );

    return (
        <TapGestureHandler
            {...gestureHandler}
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
