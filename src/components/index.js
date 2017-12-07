import { Navigation } from 'react-native-navigation';
//import screens
import Loading from './screens/Loading';
import Home from './screens/Home';
import Chat from './screens/Chat';
import SelectUser from './screens/SelectUser';

//register screens for navigator
export function registerScreens() {
    Navigation.registerComponent('Loading', () => Loading);
    Navigation.registerComponent('Home', () => Home);
    Navigation.registerComponent('Home.Chat', () => Chat);
    Navigation.registerComponent('Home.SelectUser', () => SelectUser);
}