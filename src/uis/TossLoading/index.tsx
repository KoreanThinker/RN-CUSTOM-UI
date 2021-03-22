import React, { useEffect, useState } from 'react'
import { StyleSheet, Animated, View, StyleProp, ViewStyle, Easing, EasingFunction } from 'react-native'

// bad codes

interface TossLoadingProps {
    size?: number,
    spac?: number,
    style?: StyleProp<ViewStyle>,
    number?: number,
    color?: string,
    totalDuration?: number,
    delay?: number,
    translateY?: number,
    itemDuration?: number,
    translateYSpring?: number,
    easing?: EasingFunction
}

const TossLoading: React.FC<TossLoadingProps> = (props) => {

    const [animation] = useState(new Animated.Value(0))

    const data = []
    for (let i = 0; i < props.number; i++) {
        data.push(0)
    }

    const runAnimation = () => {
        animation.setValue(0)
        Animated.sequence([
            Animated.delay(props.delay),
            Animated.timing(animation, {
                toValue: 1,
                duration: props.totalDuration,
                easing: props.easing,
                useNativeDriver: false,
            })
        ]).start(() => runAnimation())
    }

    useEffect(() => {
        runAnimation()
    }, [])

    const Ball = (index: number) => {

        const start = (props.totalDuration - props.itemDuration) / (props.number - 1) * index
        const inputRange = [start / props.totalDuration]
        for (let i = 1; i < 9; i++) {
            inputRange.push((props.itemDuration * i / 8 + start) / props.totalDuration)
        }
        return <Animated.View key={index} style={{
            width: props.size,
            height: props.size,
            backgroundColor: props.color,
            borderRadius: props.size / 2,
            marginLeft: index == 0 ? 0 : props.spac,
            translateY: animation.interpolate({
                inputRange,
                outputRange: [0, 0, -props.translateY, 0, props.translateY, 0, props.translateYSpring, 0, 0],
            })
        }}
        />
    }


    return (
        <View style={[styles.container, props.style]} >
            {data.map((item, index) => {
                return Ball(index)
            })}
        </View>
    )
}

TossLoading.defaultProps = {
    size: 5,
    spac: 6,
    number: 4,
    color: '#0050FF',
    totalDuration: 2000,
    delay: 200,
    translateY: 7,
    itemDuration: 1600,
    translateYSpring: 2,
    easing: Easing.linear
}

export default TossLoading

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
