import React, { useState, useEffect } from 'react'
import { View, StyleProp, ViewStyle, Image, Dimensions } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { onGestureEvent, withOffset } from 'react-native-redash'

const {
    cond,
    event,
    eq,
    Value,
    useCode,
    add,
    set,
    diffClamp,
    multiply,
    lessThan,
    greaterThan,
    divide,
    Clock,
    diff,
    stopClock,
    startClock,
    abs
} = Animated



interface SweepAwayCarouselProps {
    data: string[];
    style?: StyleProp<ViewStyle>
}

const WIDTH = Dimensions.get('window').width;
const VELOCITY_THRESHOLD = 0.5;
const POSITION_THRESHOLD = 0.5;
const VELOCITY = 500;

function force(dt, position, velocity) {
    return set(
        velocity,
        cond(
            lessThan(position, -POSITION_THRESHOLD),
            VELOCITY,
            cond(greaterThan(position, POSITION_THRESHOLD), -VELOCITY, 0)
        )
    );
}

function interaction(gestureTranslation, gestureState) {
    const dragging = new Value(0);
    const start = new Value(0);
    const position = new Value(0);
    const velocity = new Value(0);

    const clock = new Clock();
    const dt = divide(diff(clock), 1000);

    return cond(
        eq(gestureState, State.ACTIVE),
        [
            cond(dragging, 0, [set(dragging, 1), set(start, position)]),
            stopClock(clock),
            dt,
            set(position, add(start, gestureTranslation)),
        ],
        [
            set(dragging, 0),
            startClock(clock),
            force(dt, position, velocity),
            cond(lessThan(abs(velocity), VELOCITY_THRESHOLD), stopClock(clock)),
            set(position, add(position, multiply(velocity, dt))),
        ]
    );
}

const SweepAwayCarousel: React.FC<SweepAwayCarouselProps> = (props) => {
    const state = new Value(State.UNDETERMINED);
    const translationX = new Value(0);
    const translationY = new Value(0);
    const gestureHandler = onGestureEvent({ state, translationX, translationY })

    const translateX = interaction(translationX, state)
    const translateY = interaction(translationY, state)


    return (
        <View style={[{ width: '100%', height: 300, backgroundColor: 'yellow' }, props.style]} >
            <PanGestureHandler {...gestureHandler}>
                <Animated.View
                    style={[
                        {
                            width: WIDTH,
                            height: 300,
                        },
                        {
                            transform: [{
                                translateX,
                                translateY
                            }]
                        }
                    ]}
                >
                    {/* <Image
                        style={{ flex: 1 }}
                        source={{ uri: props.data[0] }}
                        resizeMode='cover'
                    /> */}
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

export default SweepAwayCarousel
