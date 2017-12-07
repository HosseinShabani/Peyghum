import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import { reaction } from 'mobx';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AppManager } from './stores';
//import screens
import { registerScreens } from './components';
registerScreens();

export default class App{
    constructor() {
        //react when change router from store
        reaction(() => AppManager.activeRoot, () => this.startApp(AppManager.activeRoot));
        //start app
        AppManager.appInitialized();
    }

    startApp(root){
        //loading screen navigation props
        const loadData = {
            screen: {
                screen: 'Loading',
                navigatorStyle: {
                    navBarHidden: true
                }
            },
            appStyle: {
                orientation: 'portrait'
            },
            animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
        };
        //home screen navigation props
        const homeData = {
            screen: {
                screen: 'Home',
                navigatorStyle: {
                    navBarHidden: true
                }
            },
            animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
            appStyle: {
                drawUnderNavBar: false,
                navBarTranslucent: false,
                navBarBackgroundColor: '#fff',
                navBarTextColor: EStyleSheet.value('$mainBg'),
                navBarNoBorder: true,
                topBarElevationShadowEnabled: false,
                navBarTextFontSize: 15,
                navBarTextFontFamily: EStyleSheet.value('$thirdFont'),
                navBarComponentAlignment: 'center',
                navBarButtonColor: EStyleSheet.value('$mainBg'),
            }
        };
        //switch between routes
        switch(root){
            case 'loading' :
                Navigation.startSingleScreenApp(loadData);
                return;
            case 'home':
                Navigation.startSingleScreenApp(homeData);
                return;
            default:
                Navigation.startSingleScreenApp(loadData);
        }
    }
}

//global styles
EStyleSheet.build({
    $mainBg: '#56B239',
    $secondBg: '#F5F7F9',
    $thirdBg : '#EC7875',
    $firstColor: '#333333',
    $secondColor: '#c5c5ce',
    $thirdColor: '#b6b6be',
    $firstFont : 'irsans_reg',
    $secondFont : 'irsans_light',
    $thirdFont : 'irsans_med'
});