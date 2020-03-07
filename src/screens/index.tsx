import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import SeepAwayCarouselScreen from '../uis/SweepAwayCarousel/testScreen';
import TouchableScale from '../uis/TouchableScale/testScreen';
import RhombusIndicator from '../uis/RhombusIndicator/testScreen';
import RotateIndicator from '../uis/RotateIndicator/testScreen'


const Stack = createStackNavigator();

const AppContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='RotateIndicator'
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name="SweepAwayCarousel" component={SeepAwayCarouselScreen} />
                <Stack.Screen name="TouchableScale" component={TouchableScale} />
                <Stack.Screen name="RhombusIndicator" component={RhombusIndicator} />
                <Stack.Screen name="RotateIndicator" component={RotateIndicator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer;