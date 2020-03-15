import React, { useEffect, useState } from 'react'
import { StyleSheet, Animated, View, StyleProp, ViewStyle } from 'react-native'

interface TossLoadingProps {
    size?: number,
    spac?: number,
    style?: StyleProp<ViewStyle>,
    number?: number,
    color?: string,
    duration?: number,
    delay?: number,
}

const TossLoading: React.FC<TossLoadingProps> = (props) => {

    const [animation] = useState(new Animated.Value(0))

    const data = [1, 2, 3, 4]

    const runAnimation = () => {
        Animated.sequence([
            Animated.delay(props.delay),
            Animated.timing(animation, {
                toValue: 1,
                duration: props.duration
            })
        ]).start(() => runAnimation())
    }

    useEffect(() => {
        runAnimation()
    }, [])

    const Ball = (index: number) =>
        <View style={{
            width: props.size,
            height: props.size,
            backgroundColor: props.color,
            borderRadius: props.size / 2,
            marginLeft: index == 0 ? 0 : props.spac
        }}
        />

    return (
        <View style={[styles.container, props.style]} >
            {data.map((item, index) => {
                return Ball(index)
            })}
        </View>
    )
}

TossLoading.defaultProps = {
    size: 6,
    spac: 6,
    number: 4,
    color: '#0050FF',
    duration: 2000,
    delay: 300
}

export default TossLoading

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
