import React, {Component} from 'react';
import {
    Image,
    Text,
    TouchableNativeFeedback,
    View,
    Easing,
    Animated
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
//import my components
import { AppManager } from '../../stores';

class Loading extends Component {
    constructor(props){
        super(props);

        this.appManager = AppManager;
        this.userList = [
            {
                id: 1,
                img: require('../../images/profiles/user1.jpg'),
                name: 'Hossein Sh'
            },{
                id: 2,
                img: require('../../images/profiles/user2.jpg'),
                name: 'Ali zarei'
            },{
                id: 3,
                img: require('../../images/profiles/user3.jpg'),
                name: 'Mahnaz'
            },{
                id: 4,
                img: require('../../images/profiles/user4.jpg'),
                name: 'Sara'
            }
        ];
        this.state= {
            positionOpener: {
                x: 0,
                y: 0
            },
            scale: new Animated.Value(0),
            logoShow: new Animated.Value(0),
            bottomShow: new Animated.Value(0)
        }
    }

    componentDidMount(){
        //animation creator
        const createAnimation = function (value, duration, easing, delay = 0) {
            return Animated.timing(
                value,
                {
                    toValue: 1,
                    duration,
                    easing,
                    delay
                }
            )
        };
        Animated.parallel([
            createAnimation(this.state.logoShow, 900, Easing.easeInOut, 500),
            createAnimation(this.state.bottomShow, 1000, Easing.easeInOut, 1000)
        ]).start();
    }

    //click and select user
    handleClick = (evt) => {
        let { pageX, pageY} = evt.nativeEvent;
        this.setState({
            positionOpener: {x: pageX-100, y: pageY-100}
        });
        //animate scale var
        Animated.timing(
            this.state.scale,
            {
                toValue: 6,
                duration: 400
            }
        ).start(() => {
            this.appManager.homePage()
        });
    };

    render(){
        let { x,y } = this.state.positionOpener;
        const translateTop = this.state.logoShow.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0]
        });
        const scaleTop = this.state.logoShow.interpolate({
            inputRange: [0, 1],
            outputRange: [1.2, 1]
        });
        const translateBottom = this.state.bottomShow.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0]
        });

        return(
            <View style={styles.container}>
                <Animated.View style={[styles.topView,{
                    transform: [ {translateY: translateTop}, { scale: scaleTop } ]
                }]}>
                    <Image source={require('../../images/logo.png')} style={styles.logo} />
                    <Animated.Text style={[styles.bigText,{ opacity: this.state.logoShow }]}>پیغوم</Animated.Text>
                </Animated.View>
                <Animated.View style={[styles.selectUserView,{
                    transform: [ {translateY: translateBottom} ],
                    opacity: this.state.bottomShow
                }]}>
                    <Text style={[styles.titleText,{marginBottom: 15, textAlign: 'center'}]} >کاربر مورد نظر را انتخاب کنید</Text>
                    <View style={styles.selectUserBot}>
                        {this.userList.map((item,index) => {
                            return(
                                <TouchableNativeFeedback  key={item.id} onPress={this.handleClick}>
                                    <View style={EStyleSheet.child(styles, 'userView', index, this.userList.length)}>
                                        <Image source={item.img} style={styles.userImg} />
                                        <Text style={styles.smallText}>{item.name}</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            )
                        })}
                    </View>
                </Animated.View>
                <Animated.View style={[styles.absoluteOpener,{
                    transform: [{translateX: x}, {translateY: y}, {scale: this.state.scale}],
                    opacity: this.state.scale.interpolate({
                        inputRange: [0, 3],
                        outputRange: [0, 1]
                    }),
                    zIndex: this.state.scale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-1, 10]
                    })
                }]} />
            </View>

        )
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '$secondBg',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    titleText: {
        fontFamily: '$firstFont',
        color: '$firstColor',
        fontSize: 16
    },
    smallText: {
        fontFamily: '$secondFont',
        color: '$firstColor',
        fontSize: 13
    },
    bigText: {
        fontFamily: '$thirdFont',
        color: '$firstColor',
        fontSize: 25
    },
    logo: {
        width: 75,
        height: 75,
        opacity: 0.8
    },
    topView: {
        paddingTop: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectUserView: {
        position: 'absolute',
        bottom: 0,
        flexDirection:'column',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    selectUserBot: {
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    userView: {
        width: '50% - 2',
        justifyContent: 'center',
        alignItems:'center',
        padding: 14,
        borderColor: '$secondColor',
        borderWidth: 1,
        borderBottomWidth: 0,
    },
    'userView:nth-child-even': {
        borderRightWidth: 0
    },
    userImg: {
        width: 70,
        height: 70,
        marginBottom: 5,
        borderColor: '$mainBg',
        borderWidth: 2,
        borderRadius: 35
    },
    absoluteOpener: {
        width: 200,
        height: 200,
        backgroundColor: '$mainBg',
        position: 'absolute',
        borderRadius: 200/2
    }
});


export default Loading;
