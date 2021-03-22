import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'

const LIST = [
    "TouchableScale",
    "RotateIndicator",
    "FadeInView",
    "Accordion",
    "MenuIcon",
    "TossLoading",
    "GoogleLoading"
]

const HomeScreen = () => {

    const { navigate } = useNavigation()

    return (
        <View style={{ flex: 1 }} >
            <FlatList
                data={LIST}
                keyExtractor={(item) => item}
                renderItem={({ item }) =>
                    <Pressable
                        onPress={() => navigate(item)}
                        style={{ width: '100%', height: 56, justifyContent: 'center', paddingLeft: 16 }}
                    >
                        <Text>{item}</Text>
                    </Pressable>
                }
            />
        </View>
    )
}

export default HomeScreen
