import React,{ PureComponent } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
//import commons
import { Iconm } from '../commons';
import UserCard from '../elements/UserCard';
import { AppManager } from '../../stores';

class SelectUser extends PureComponent {
    constructor(props){
        super(props);

        this.appManager = AppManager;
    }

    //start chat with this user
    onPressChat(id,name,img){
        this.props.navigator.push({
            screen: 'Home.Chat',
            title: name,
            passProps: {
                userId: id,
                userImg: img
            }
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    style={{flex: 1}}
                    data={this.appManager.getUsers}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <UserCard
                            id={item.id}
                            name={item.name}
                            img={item.img}
                            onPress={() => this.onPressChat(item.id,item.name,item.img)}
                        />)
                    }
                />
            </View>

        )
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '$secondBg'
    }
});


export default SelectUser;
