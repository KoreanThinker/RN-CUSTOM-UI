import React, { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Line from './Line'
import Animated, { Easing } from 'react-native-reanimated'
import { useMemoOne } from 'use-memo-one'

const {
    cond,
    useCode,
    set,
    block,
    Clock,
    Value,
    startClock,
    and,
    eq,
    stopClock,
    timing,
    neq,
    interpolate,
    Extrapolate,
    createAnimatedComponent
} = Animated


interface MenuIconProps {
    size?: number,
    value: boolean,
    thickness?: number,
}

const runTiming = (clock: Animated.Clock, value: boolean) => {

    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    }

    const config = {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        toValue: new Value(-1)
    }

    const open = new Value(value ? 1 : 0)

    console.log(value)

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

const MenuIcon: React.FC<MenuIconProps> = (props) => {

    const animation = new Value(0)
    const clock = new Clock()


    useCode(() => block([
        set(animation, runTiming(clock, !props.value))
    ]), [props.value])

    const opacity = interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [1, 0]
    })

    const pos1 = interpolate(animation, {
        inputRange: [0, 0.5, 1],
        outputRange: [-((props.size / 2) - (props.thickness / 2)), 0, 0]
    })
    const pos3 = interpolate(animation, {
        inputRange: [0, 0.5, 1],
        outputRange: [((props.size / 2) - (props.thickness / 2)), 0, 0]
    })

    return (
        <>
            <View style={{ width: props.size, height: props.size, alignItems: 'center', justifyContent: 'center' }} >
                <Animated.View style={[
                    {
                        backgroundColor: '#000',
                        width: props.size,
                        height: props.thickness,
                        position: 'absolute',
                    },
                    {
                        transform: [{ translateY: pos1 }]
                    }
                ]} />
                <Animated.View style={[
                    styles.line,
                    {
                        width: props.size,
                        height: props.thickness,
                        // transform: [{ translateY: -10 }]
                    }
                ]} />
                <Animated.View style={[
                    {
                        backgroundColor: '#000',
                        width: props.size,
                        height: props.thickness,
                        position: 'absolute',
                    },
                    {
                        transform: [{ translateY: pos3 }]
                    }
                ]} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    line: {
        backgroundColor: '#000',
    }
})


MenuIcon.defaultProps = {
    size: 24,
    thickness: 2
}

export default MenuIcon
