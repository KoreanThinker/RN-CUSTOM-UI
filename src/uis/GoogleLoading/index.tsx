import React, { useState, useEffect } from 'react'
import { View, Text, Animated, EasingFunction, Easing, StyleSheet } from 'react-native'

interface GoogleLoadingProps {
    colors?: string[];
    easing?: EasingFunction;
    duration?: number;
    ballSize?: number;
    distance?: number;
    rotation?: number;
}

const GoogleLoading: React.FC<GoogleLoadingProps> = (props) => {

    const [animation] = useState(new Animated.Value(0))

    const runAnimation = () => {
        animation.setValue(0)
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1,
                duration: props.duration,
                easing: props.easing,
                useNativeDriver: false
            })
        ]).start(() => runAnimation())
    }


    useEffect(() => {
        runAnimation()
    }, [])

    return (
        <View style={{
            transform: [{ rotate: props.rotation.toString() + 'rad' }]
        }} >
            {props.colors.map((color, index) => {
                const inputRange = []
                const outputRangeX = []
                const outputRangeY = []
                const rangeLength = props.colors.length * 2
                const colorLenght = props.colors.length

                for (let i = 0; i <= rangeLength; i++) {
                    inputRange.push(i / rangeLength)
                    const ratio = ((i - 1) / 2 + index) / colorLenght
                    outputRangeX.push(i % 2 == 0 ? 0 : props.distance * Math.cos(Math.PI * 2 * ratio))
                    outputRangeY.push(i % 2 == 0 ? 0 : props.distance * Math.sin(Math.PI * 2 * ratio))
                }
                const translateX = animation.interpolate({
                    inputRange,
                    outputRange: outputRangeX
                })
                const translateY = animation.interpolate({
                    inputRange,
                    outputRange: outputRangeY
                })
                return <Animated.View key={index} style={{
                    position: 'absolute',
                    width: props.ballSize,
                    height: props.ballSize,
                    borderRadius: props.ballSize / 2,
                    backgroundColor: color,
                    translateX,
                    translateY
                }} />
            })}
        </View>
    )
}



GoogleLoading.defaultProps = {
    colors: ['#4285F5', '#EA4436', '#FBBD06', '#34A952'],
    duration: 2800,
    easing: Easing.linear,
    ballSize: 8,
    distance: 16,
    rotation: Math.PI / 4
}

export default GoogleLoading
