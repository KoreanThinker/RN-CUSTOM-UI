import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
// import SeepAwayCarouselScreen from '../uis/SweepAwayCarousel/testScreen';
import TouchableScale from '../uis/TouchableScale/testScreen';
import RotateIndicator from '../uis/RotateIndicator/testScreen';
import FadeInView from '../uis/FadeInView/testScreen';
import Accordion from '../uis/Accordion/testScreen';
import MenuIcon from '../uis/MenuIcon/testScreen';
import TossLoading from '../uis/TossLoading/testScreen';
import GoogleLoading from '../uis/GoogleLoading/testScreen';

const Stack = createStackNavigator();

const AppContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
            // screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Home' component={HomeScreen} />
                {/* <Stack.Screen name="SweepAwayCarousel" component={SeepAwayCarouselScreen} /> */}
                <Stack.Screen name="TouchableScale" component={TouchableScale} />
                <Stack.Screen name="RotateIndicator" component={RotateIndicator} />
                <Stack.Screen name="FadeInView" component={FadeInView} />
                <Stack.Screen name="Accordion" component={Accordion} />
                <Stack.Screen name="MenuIcon" component={MenuIcon} />
                <Stack.Screen name="TossLoading" component={TossLoading} />
                <Stack.Screen name="GoogleLoading" component={GoogleLoading} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer;