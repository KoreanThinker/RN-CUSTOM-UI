import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native'
import MenuIcon from '.'

const testScreen = () => {

    const [menu, setMenu] = useState(false)

    return (
        <View style={styles.container} >
            <TouchableWithoutFeedback onPress={() => setMenu(!menu)} >
                <View>
                    <MenuIcon
                        value={menu}
                        size={24}
                    />
                </View>
            </TouchableWithoutFeedback>

            <Text style={{ marginTop: 20 }} >{menu ? '1' : '2'}</Text>
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
