import React from 'react'
import { View, Text } from 'react-native'
import SweepAwayCarousel from '.'
import TestUI from './TestUI'

const testScreen = () => {
    return (
        <View style={{ flex: 1 }} >
            <SweepAwayCarousel
                data={[
                    'https://pbs.twimg.com/media/DgD6lPRWkAIu2Q0.jpg',
                    'https://media-cdn.tripadvisor.com/media/photo-s/13/56/bb/62/stone-circles-created.jpg',
                    'https://static.toiimg.com/photo/72975551.cms',
                    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
                ]}
            />
            <TestUI />
        </View>
    )
}

export default testScreen
