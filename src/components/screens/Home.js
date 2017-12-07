import React,{ Component } from 'react';
import { 
    View, 
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
//import my components
import Database from '../../storage';
import { SearchBar, Iconm } from '../commons';
import ChatCard from '../elements/ChatCard';

class Home extends Component {
    constructor(props){
        super(props);

        this.database = Database;
        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            message: [],
            pinnedItem: [],
            loading: true
        }
    }

    onNavigatorEvent(event) {
        switch(event.id) {
            case 'didAppear':
            //get messages from storage
                this.database.getChats().then(res => {
                    if(res !== 'No'){
                        res.sort(function(a, b){ return b.date-a.date });
                        this.setState({
                            message: res,
                            loading: false
                        })
                    } else {
                        this.setState({
                            loading: false
                        })
                    }
                });
                break;
            default: 
                break;
        }
    }

    //press chat and push to chat page
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

    //pin chat
    onPinChat(id){
        this.database.pinChat(id);
        const { pinnedItem } = this.state;
        let checkIndex = pinnedItem.indexOf(id);
        //check for add or remove pin id
        let newItems = checkIndex !== -1 ? pinnedItem.splice(checkIndex, 1) : [...pinnedItem,id];
        this.setState(() => {
            return {pinnedItem: newItems};
        });
  
    }

    //push to select user page and make new chat
    newChatHandler = () => {
        this.props.navigator.push({
            screen: 'Home.SelectUser',
            title: "کاربر موردنظر را انتخاب نمایید"
        });
    };

    //list footer compoennt
    renderFooter = () => {
        if(this.state.loading){
            return <ActivityIndicator style={{marginTop: 20}} animating size="large" color="#56B239" />
        }
        else {
            //no message
            if(this.state.message.length < 1){
                return (
                    <View style={styles.listFooter}>
                        <Image source={require('../../images/chat.png')} style={{width: 70, height: 70}} />
                        <Text style={styles.smallText} >هیچ پیامی وجود ندارد</Text>
                    </View>
                )
            }
        }
        return null;
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleText}>پیغوم</Text>
                </View>
                <FlatList
                    style={{flex: 1}}
                    data={this.state.message}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item}) => (
                        <ChatCard
                            id={item.id}
                            user={item.user}
                            content={item.content}
                            date={item.date}
                            pined={this.state.pinnedItem.includes(item.id) ? !item.pin : item.pin}
                            readStatus={false}
                            onPin={() => this.onPinChat(item.id)}
                            onPress={() => this.onPressChat(item.id,item.user.name,item.user.img)}
                        />)
                    }
                />
                <View style={styles.fabView}>
                    <TouchableOpacity activeOpacity={0.7} onPress={this.newChatHandler}>
                        <View style={styles.fabIcon}>
                            <Iconm name={"conversation-speech-bubbles"} size={25} color={"#fff"} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '$secondBg'
    },
    header:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 1
    },
    titleText: {
        fontFamily: '$thirdFont',
        color: '$mainBg',
        fontSize: 20
    },
    smallText: {
        fontFamily: '$firstFont',
        color: '$firstColor',
        fontSize: 15
    },
    fabView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 10
    },
    fabIcon: {
        backgroundColor: '$mainBg',
        width: 60,
        height: 60,
        margin: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listFooter: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 20
    }
});


export default Home;
