import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native'
import Accordion from '.'
import { MaterialIcons } from '@expo/vector-icons'

const LIST_ITEM_HEIGHT = 50

const testScreen = () => {

    const [value, setValue] = useState(false)

    return (
        <View style={styles.container} >
            <Accordion
                style={styles.accordion}
                value={value}
                listHeight={LIST_ITEM_HEIGHT * 5}
                parentComponent={(animation) => {
                    const rotate = animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, Math.PI]
                    })
                    return (
                        <View style={styles.parentContainer} >
                            <Text>Accordion</Text>
                            <Animated.View style={{ transform: [{ rotate }] }} >
                                <TouchableWithoutFeedback onPress={() => {
                                    setValue(!value)
                                }} >
                                    <MaterialIcons name='arrow-drop-down' size={24} />
                                </TouchableWithoutFeedback>
                            </Animated.View>
                        </View>
                    )
                }
                }
                listComponent={() =>
                    <View style={styles.listContainer} >
                        {'its very easy to use'.split(' ').map((item, index) =>
                            <View style={styles.listItem} key={index} >
                                <Text>{item}</Text>
                            </View>
                        )}
                    </View>
                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    accordion: {
        width: '80%',
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 3
    },
    parentContainer: {
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    listContainer: {
        width: '100%',
        backgroundColor: '#eee',
    },
    listItem: {
        width: '100%',
        height: LIST_ITEM_HEIGHT,
        paddingHorizontal: 20,
        justifyContent: 'center'
    }
})


export default testScreen
