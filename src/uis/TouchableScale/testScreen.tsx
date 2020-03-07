import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TouchableScale from '.'
import { MaterialIcons } from '@expo/vector-icons';

const testScreen = () => {
    const [count, setCount] = useState(0)

    return (
        <View style={styles.container} >
            {/* <Text style={styles.count} >{count}</Text> */}
            <TouchableScale
                onPress={() => setCount(count + 1)}
            >
                <View style={styles.button} >
                    <MaterialIcons name='call' size={28} color='#fff' />
                </View>
            </TouchableScale>
        </View>
    )
}

export default testScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: '#ff0000',
        borderRadius: 30,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    count: {
        marginBottom: 40
    }
})
