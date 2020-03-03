import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import SeepAwayCarouselScreen from '../uis/SweepAwayCarousel/testScreen'


const Stack = createStackNavigator();

const AppContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='SweepAwayCarousel'
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name="SweepAwayCarousel" component={SeepAwayCarouselScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer;