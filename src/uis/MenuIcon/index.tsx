import React, { useState, useEffect } from 'react'
import { View, Animated, StyleSheet, Easing, TouchableWithoutFeedback, EasingFunction } from 'react-native'



interface MenuIconProps {
    size?: number,
    value: boolean,
    thickness?: number,
    duration?: number,
    onPress?: () => void,
    easing?: EasingFunction
}


const MenuIcon: React.FC<MenuIconProps> = (props) => {

    const [animation] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(animation, {
            toValue: props.value ? 1 : 0,
            duration: props.duration,
            easing: props.easing
        }).start()
    }, [props.value])

    const opacity2 = animation.interpolate({
        inputRange: [0, 0.5, 0.501, 1],
        outputRange: [1, 1, 0, 0]
    })

    const pos1 = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-((props.size / 2) - (props.thickness / 2)), 0, 0],
    })
    const pos3 = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [((props.size / 2) - (props.thickness / 2)), 0, 0]
    })


    const rot1 = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '0deg', '45deg']
    })
    const rot3 = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '0deg', '-45deg']
    })

    return (
        <TouchableWithoutFeedback onPress={props.onPress} >
            <View style={{ width: props.size, height: props.size, alignItems: 'center', justifyContent: 'center' }} >
                <Animated.View style={{
                    backgroundColor: '#000',
                    width: props.size,
                    height: props.thickness,
                    position: 'absolute',
                    transform: [{ rotateZ: rot1 }, { translateY: pos1 }]
                }} />
                <Animated.View style={[
                    styles.line,
                    {
                        width: props.size,
                        height: props.thickness,
                        opacity: opacity2
                    }
                ]} />
                <Animated.View style={{
                    backgroundColor: '#000',
                    width: props.size,
                    height: props.thickness,
                    position: 'absolute',
                    transform: [{ rotateZ: rot3 }, { translateY: pos3 }]
                }} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    line: {
        backgroundColor: '#000',
    }
})


MenuIcon.defaultProps = {
    size: 24,
    thickness: 2,
    duration: 500,
    easing: Easing.inOut(Easing.ease)
}

export default MenuIcon
