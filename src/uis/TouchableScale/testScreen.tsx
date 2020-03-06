import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TouchableScale from '.'
import { MaterialIcons } from '@expo/vector-icons';

const testScreen = () => {
    const [val, setVal] = useState(true)

    const onClick = () => {
        console.log(4)
        setVal(!val)
    }

    return (
        <View style={styles.container} >
            <TouchableScale
                onPress={() => onClick()}
            >
                <View style={styles.button} >
                    {val ?
                        <MaterialIcons name='call' size={28} color='#fff' />
                        :
                        <MaterialIcons name='translate' size={28} color='#fff' />
                    }
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
    }
})
