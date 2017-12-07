import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableNativeFeedback 
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const UserCard = ({id,img,name,onPress}) => {
    return(
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.container}>
                <Image style={styles.userImg} source={img} />
                <Text style={styles.titleText} >{name}</Text>
            </View>
        </TouchableNativeFeedback>
    )
};

const styles = EStyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '$secondBg',
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor : '#e8e8f1',
        borderBottomWidth: 1
    },
    titleText: {
        fontFamily: '$firstFont',
        color: '$firstColor',
        fontSize: 14
    },
    userImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    }
});


export default UserCard;
