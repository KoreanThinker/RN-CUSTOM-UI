import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native'
import MenuIcon from '.'

const testScreen = () => {

    const [menu, setMenu] = useState(false)

    return (
        <View style={styles.container} >
            <MenuIcon
                onPress={() => setMenu(!menu)}
                value={menu}
                size={48}
                thickness={2.5}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default testScreen
