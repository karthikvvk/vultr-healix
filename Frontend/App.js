import React, { useRef, useState, useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import WelcomeScreen from './screens/welcome';
import HomeScreen from './screens/home';
import SignInPage from './screens/signup';
import Add from './screens/add';
import Mail from './screens/mail';
import Profile from './screens/profile';
import Viewlist from './screens/viewlist';
import CustomBottomNav from './screens/CustomBottomNav';
import CalendarScreen from './screens/calendar';
import Coin from './screens/coin';
import Maps from './screens/Map';

const Stack = createStackNavigator();

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const [currentRouteName, setCurrentRouteName] = useState();

  useEffect(() => {
    const onReady = () => {
      setCurrentRouteName(navigationRef.getCurrentRoute().name);
    };

    const onStateChange = () => {
      setCurrentRouteName(navigationRef.getCurrentRoute().name);
    };

    if (navigationRef.isReady()) {
      onReady();
    }

    navigationRef.addListener('state', onStateChange);

    return () => navigationRef.removeListener('state', onStateChange);
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator currentRouteName={currentRouteName} />
    </NavigationContainer>
  );
};

const MainNavigator = ({ currentRouteName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Viewlist" component={Viewlist} />
          <Stack.Screen name="Coin" component={Coin} />
          <Stack.Screen name="Maps" component={Maps} />
          <Stack.Screen name="Calendars" component={CalendarScreen} />
          <Stack.Screen name="Add" component={Add} />
          <Stack.Screen name="Mail" component={Mail} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SignIn" component={SignInPage} options={{ title: 'Sign In', headerShown: false }} />
        </Stack.Navigator>
      </View>
      
      {/* Conditionally render CustomBottomNav */}
      <CustomBottomNavVisibility currentRouteName={currentRouteName} />
    </View>
  );
};

// This component checks the route name and controls the visibility of the bottom nav
const CustomBottomNavVisibility = ({ currentRouteName }) => {
  const hideBottomNavScreens = ['Welcome', 'SignIn'];
  const isBottomNavVisible = !hideBottomNavScreens.includes(currentRouteName);

  return isBottomNavVisible ? <CustomBottomNav /> : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;
