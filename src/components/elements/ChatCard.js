import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableNativeFeedback,
    TouchableOpacity 
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swipeable from 'react-native-swipeable';
//import mu components
import { Iconm } from '../commons/index';

const ChatCard = ({id, user, content, date, time, pined, onPress, onPin}) => {
    return(
        <Swipeable rightButtons={[(
            <TouchableOpacity onPress={onPin}>
                <View style={styles.rightButtonsView}>
                    <Iconm name="like" size={25} color="#EC7875" />
                </View>
            </TouchableOpacity>
        )]}>
            <TouchableNativeFeedback onPress={onPress}>
                <View style={[styles.container, pined && {backgroundColor: '#fff'} ]}>
                    <View style={styles.imageView} >
                        <Image style={styles.userImg} source={user.img} />
                    </View>
                    <View style={styles.InfoView} >
                        <View style={styles.topInfoView} >
                            <View style={styles.topInfoView}>
                                <Text style={styles.titleText} >{user.name}</Text>
                                {pined && <View style={styles.unreadStatus} />}
                            </View>
                            <Text style={styles.xsText} >{timeConverter(date)}</Text>
                        </View>
                        <Text style={styles.smallText} >{content}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </Swipeable>
    )
};

const timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let month = months[a.getMonth()];
    let date = a.getDay();
    let time = date + ' ' + month ;
    return time;
};

const styles = EStyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'stretch',
        flexDirection: 'row',
        backgroundColor: '$secondBg',
        padding: 20,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor : '#e8e8f1',
        borderBottomWidth: 1
    },
    titleText: {
        fontFamily: '$firstFont',
        color: '$firstColor',
        fontSize: 14
    },
    smallText: {
        fontFamily: '$firstFont',
        color: '$thirdColor',
        fontSize: 13
    },
    xsText: {
        fontFamily: '$firstFont',
        color: '$secondColor',
        fontSize: 13
    },
    InfoView: {
        flex: 1,
        marginLeft: 15
    },
    topInfoView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    unreadStatus : {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 5,
        backgroundColor: '$thirdBg'
    },
    rightButtonsView: {
        width: 75,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
});


export default ChatCard;
