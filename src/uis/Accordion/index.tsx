import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { View, StyleProp, ViewStyle, Animated, Easing, EasingFunction } from 'react-native'


interface AccordionProps {
    value: boolean;
    listHeight: number;
    duration?: number;
    easing?: EasingFunction;
    style?: StyleProp<ViewStyle>;
    parentComponent: (animation: Animated.Value) => ReactNode;
    listComponent: (animation: Animated.Value) => ReactNode;
}


const Accordion: React.FC<AccordionProps> = (props) => {

    const animation = useRef(new Animated.Value(0)).current

    const height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, props.listHeight],
        easing: props.easing
    })


    useEffect(() => {
        Animated.timing(animation, {
            toValue: props.value ? 1 : 0,
            duration: props.duration,
            useNativeDriver: false,
        }).start()
    }, [props.value])



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
