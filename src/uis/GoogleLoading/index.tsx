import React, { useState, useEffect } from 'react'
import { View, Text, Animated, EasingFunction, Easing, StyleSheet } from 'react-native'

interface GoogleLoadingProps {
    colors: string[];
    easing: EasingFunction;
    duration: number;
    ballSize: number
}

const GoogleLoading: React.FC<GoogleLoadingProps> = (props) => {

    const [animation] = useState(new Animated.Value(0))

    const runAnimation = () => {
        animation.setValue(0)
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1,
                duration: props.duration,
                easing: props.easing
            })
        ]).start(() => runAnimation())
    }



    useEffect(() => {
        runAnimation()
    }, [])

    return (
        <View>
            {props.colors.map((color, index) => {
                const translate = animation.interpolate({
                    inputRange: [],
                    outputRange: []
                })
                return <Animated.View key={index} style={{
                    position: 'absolute',
                    width: props.ballSize,
                    height: props.ballSize,
                    borderRadius: props.ballSize / 2,
                    backgroundColor: color,
                    translateX: 8,
                    translateY: 8,

                }} />
            })}

        </View>
    )
}


const styles = StyleSheet.create({
    test: {
    }
})


GoogleLoading.defaultProps = {
    colors: ['#4285F5', '#EA4436', '#FBBD06', '#34A952'],
    duration: 4000,
    easing: Easing.linear,
    ballSize: 8
}

export default GoogleLoading
