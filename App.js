import {createAppContainer} from 'react-navigation';
import {createSwitchNavigator} from 'react-navigation';

import App1 from './pages/App1';
import LoginScreen from './pages/LoginScreen';
import AuthLoadingScreen from './pages/AuthLoadingScreen'
import Menu from './pages/Menu';

const AppStack= createSwitchNavigator({ App1: App1, Menu: Menu });
const AuthStack= createSwitchNavigator({ Login:LoginScreen });


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading:AuthLoadingScreen,
    App:AppStack,
    Auth:AuthStack, 
  },
  {
    initialRouteName:'AuthLoading',
  }
));

