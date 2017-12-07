import React,{ Component } from 'react';
import { 
    View,
    TextInput,
    Platform,
    FlatList,
    Text,
    UIManager,
    LayoutAnimation,
    TouchableOpacity,
    Animated,
    ActivityIndicator
 } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
//import my components
import Message from '../elements/Message';
import Database from '../../storage';
import { Iconm } from '../commons/index';
//global variables
const maxHeight = 100;
let timer;
const messages = [
    'Salam aziz',
    'mamnun , shoma khub hasti?',
    'az ashnaee ba shoma kheyli khoshbakhtam',
    'in app chetore be nazaret?',
    'Mituni hatta message hato pin koni :D',
    'appe khubi nist , arzeshe download kardan nadasht'
]

class Home extends Component {
    constructor(props){
        super(props);
        
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.database = Database;
        this.state = {
            messageInput: '',
            height: 40,
            positionOpener: {
                x: 0,
                y: 0
            },
            scale: new Animated.Value(0),
            loading: true,
            message: []
        }
    }

    onNavigatorEvent(event) {
        switch(event.id) {
            case 'didAppear':
                //load messages
                this.database.getMessages(this.props.userId).then(res => {
                    if(res != 'No'){
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

    //when change text input
    _changeText =  (messageInput) => {
        this.setState({messageInput});
        //check for animation bottom view icons
        if(messageInput.replace(/\s/g, '').length <= 1){
            var CustomLayoutSpring = {
                duration: 300,
                create: {
                  type: LayoutAnimation.Types.spring,
                  property: LayoutAnimation.Properties.scaleXY,
                  springDamping: 0
                },
                update: {
                  type: LayoutAnimation.Types.spring,
                  springDamping: 1
                },
            };
            LayoutAnimation.configureNext(CustomLayoutSpring);
        }
    };

    //send text message
    _sendMessage = () => {
        const messageText = this.state.messageInput;
        this.newMessage('text',{
            content: messageText
        });
        this.setState(() => {
            return { messageInput: '' };
        }, () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        });
        
    };

    //send image
    _getImage = () => {
        //upload image
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true
        }).then(image => {
            let nameFile = image.path.split('/').reverse()[0];
            let path = RNFS.DocumentDirectoryPath + '/' +  nameFile;
            //write the file
            RNFS.appendFile(path, image.data , 'base64').then(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                let source = { uri: "file://"+path };
                this.newMessage('image',{
                    url: source
                });
            }).catch(err => err);
        }).catch(err => err)
    };

    //new messgae inserts
    newMessage = (type,data) => {
        this.database.newMessage(this.props.userId,type,data,true).then(res => {
            this.setState({
                message : [res,...this.state.message]
            });
            //random user message
            timer = setTimeout(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                let messageNumb = Math.floor(Math.random() * messages.length);
                this.database.newMessage(this.props.userId,'text',{content: messages[messageNumb]},false).then(res => {
                    this.setState({
                        message : [res,...this.state.message]
                    });
                })
            },1600)
        })
    };

    componentWillUnmount() {
        clearTimeout(timer)
    }

    //lisst footer component
    renderFooter = () => {
        if(this.state.loading){
            return <ActivityIndicator style={{marginBottom: 50}} animating size="large" color="#56B239" />
        }
        return null;
    }

    render(){
        //margin bottom of flatlist if textbox height increase
        let marginBottom = this.state.height <= maxHeight ? this.state.height : maxHeight;
        return(
            <View style={styles.container}>
                <FlatList
                    inverted
                    style={{flex: 1, marginBottom: marginBottom}}
                    contentContainerStyle={{paddingBottom: 10}}
                    ListFooterComponent={this.renderFooter}
                    data={this.state.message}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Message
                            id={item.id}
                            data={item.data}
                            type={item.type}
                            userImg={this.props.userImg}
                            myself={item.myself}
                        />)
                    }
                />
                <View style={styles.bottomView}>
                    <View style={styles.textInputView}>
                        <InputScrollView >
                            <TextInput
                                returnKeyType = {"next"}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                autoCorrect={false}
                                multiline
                                blurOnSubmit={false}                                
                                placeholder={"Type your message"}
                                onChangeText={this._changeText}
                                value={this.state.messageInput}
                                onContentSizeChange={(event) => {
                                    this.setState({
                                        height: event.nativeEvent.contentSize.height
                                    })
                                }}
                                style={[styles.smallText,{height: this.state.height}]} />
                        </InputScrollView>
                    </View>
                    <View style={styles.iconSendView} >
                        {this.state.messageInput.replace(/\s/g, '').length >= 1 ? (
                            <TouchableOpacity activeOpacity={0.7} onPress={this._sendMessage} >
                                <Iconm size={23} name={'letter'} color={EStyleSheet.value('$mainBg')} style={{padding: 10, paddingLeft: 20}} />
                            </TouchableOpacity>
                        ) : (
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity activeOpacity={0.7} onPress={this._getImage}>
                                    <Iconm size={21} name={'picture'} color={EStyleSheet.value('$thirdColor')} style={{padding: 10}} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} >
                                    <Iconm size={21} name={'letter'} color={EStyleSheet.value('$thirdColor')} style={{padding: 10}} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '$secondBg',
        flexDirection: 'column'
    },
    titleText: {
        fontFamily: '$firstFont',
        color: '$firstColor',
        fontSize: 16
    },
    smallText: {
        fontFamily: '$firstFont',
        color: '$firstColor',
        fontSize: 15
    },
    bottomView: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        alignItems: 'stretch',
        flexDirection: 'row',
        elevation: 1,
        zIndex: 10,
        borderTopColor: '#e8e8f1',
        borderTopWidth: 1,
        overflow: 'hidden',
        maxHeight: maxHeight,
        backgroundColor: '#fff'
    },
    textInputView: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 10,
    },
    iconSendView :{
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    voiceRecordView: {
        width: 100,
        height: 100,
        zIndex: 990,
        backgroundColor: '$mainBg',
        position: 'absolute',
        borderRadius: 100/2
    }
});


export default Home;
