import React from 'react';
import { 
    View, 
    Text, 
    Image
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Message = ({ id, type, data, userImg, myself}) => {
    return(
        <View style={[styles.container,myself === true && {alignSelf: 'flex-end'} ]} >
            {myself === false && (
                <Image source={userImg} style={styles.userImg} />
            )}
            <View style={[styles.contentView,myself === true && styles.myContainerView]} >
                {type === 'text' ? (
                    <Text style={styles.titleText} >{data.content}</Text>
                ) : (
                    <Image source={data.url} style={{width: 200,height: 200, borderRadius: 7}} />
                )}
            </View>
        </View>
    )
};

const styles = EStyleSheet.create({
    container: {
        width: 'auto',
        flex : 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 13
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
    userImg: {
        width: 30,
        height: 30,
        margin: 5,
        marginBottom: 0,
        borderRadius: 15
    },
    contentView: {
        maxWidth: '90%',
        padding: 7,
        paddingLeft: 9,
        paddingRight: 9,
        backgroundColor: '#e8e8f1',
        borderColor: '#e8e8f1',
        borderWidth: 1,
        borderRadius: 9,
        borderBottomLeftRadius: 0
    },
    myContainerView: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 0,
        marginRight: 10
    }
});


export default Message;
