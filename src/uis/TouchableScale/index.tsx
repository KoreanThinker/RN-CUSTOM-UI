import React from 'react'
import { StyleSheet, Text, View, ViewProps } from 'react-native'
import { TapGestureHandler, State, } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import { onGestureEvent, bInterpolate } from 'react-native-redash'

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
    timing,
    interpolate
} = Animated

type TouchableScaleProps = {
    onPress: () => void;
} & ViewProps


const TouchableScale: React.FC<TouchableScaleProps> = (props) => {
    const animation = new Value(0)
    const scale = interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [1, 0.5]
    })
    console.log(scale)
    const clock = new Clock()
    const state = new Value(State.UNDETERMINED);
    const shouldScale = new Value(-1);
    const gestureHandler = onGestureEvent({ state })


    useCode(() =>
        block([
            cond(eq(state, State.BEGAN), set(shouldScale, 1)),
            cond(
                or(eq(state, State.FAILED), eq(state, State.CANCELLED)),
                set(shouldScale, 0)
            ),
            onChange(state, cond(eq(state, State.END), call([], props.onPress))),
            cond(
                eq(shouldScale, 1),
                set(
                    animation,
                    timing(
                        clock,
                        {
                            finished: new Value(0),
                            position: new Value(0),
                            time: new Value(0),
                            frameTime: new Value(0)
                        },
                        {
                            toValue: 1,
                            duration: 250,
                            easing: Easing.linear,
                        }
                    )
                )
            ),
            cond(
                eq(shouldScale, 0),
                set(
                    animation,
                    timing(
                        clock,
                        {
                            finished: new Value(1),
                            position: new Value(1),
                            time: new Value(1),
                            frameTime: new Value(1)
                        },
                        {
                            toValue: 0,
                            duration: 250,
                            easing: Easing.linear,
                        }
                    )
                )
            )
        ]),
        []
    );

    return (
        <TapGestureHandler
            {...gestureHandler}
        >
            <Animated.View
                {...props}
                style={[
                    props.style,
                    { transform: [{ scale }] }
                ]}
            />
        </TapGestureHandler>

    )
}

export default TouchableScale

const styles = StyleSheet.create({})
