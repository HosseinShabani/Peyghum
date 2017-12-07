import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import { AppManager } from './stores';

class Database {
    constructor(){
        this.appManager = AppManager;
        //set storage
        this.storage = new Storage({
            size: 1000,
            storageBackend: AsyncStorage,
            defaultExpires: null,
            enableCache: true
        });
        //get and make key id
        this.storage.load({
            key: 'idgetter'
        }).then(res => {
            this.id = res*1;
        }).catch(err => {
            this.storage.save({
                key: 'idgetter',
                data: 1
            });
            this.id = 1;
        });
    }

    //generate id for messages
    generateID(){
        this.id += 1;
        this.storage.save({
            key: 'idgetter',
            data: this.id
        });
        return this.id;
    }

    //get list of messages
    async getMessages(userId){
        let res = await this.storage.load({
            key: 'Chat',
            id: userId
        }).then(res => {
            return this.storage.getBatchDataWithIds({
                key: 'Message', 
                ids: res.messages
            }).then(data => data);
        }).catch(err => {
            return "No";
        });

        return res;
    }

    //new message and start chat
    async newMessage(userId,type,data,myself){
        const id = this.generateID();
        const messageData = {
            id: id,
            data: data,
            type: type,
            myself: myself
        };
        let showMessage = null;
        if(type === 'text'){
            showMessage = data.content;
        } else {
            showMessage = "Send a image";
        }
        //save message in storage
        await this.storage.save({
            key: 'Message',
            id: id,
            data: messageData
        });
        await this.storage.load({
            key: 'Chat',
            id: userId
        }).then(res => {
            //if this user have a message
            this.storage.save({
                key: 'Chat',
                id: userId,
                data: {
                    id: userId,
                    messages: [id,...res.messages],
                    showMessage,
                    date: new Date().getTime() / 1000,
                    pin: res.pin
                }
            });
        }).catch(err => {
            //start new chat and send message
            this.storage.save({
                key: 'Chat',
                id: userId,
                data: {
                    id: userId,
                    messages: [id],
                    showMessage,
                    date: new Date().getTime() / 1000,
                    pin: false
                }
            });
        });
        return messageData;
    }

    //get chats with users
    async getChats(){
        let res = await this.storage.getAllDataForKey('Chat').then(chats => {
            let arr = [];
            //make array for returning all chats
            chats.map(chat => {
                let obj = {};
                obj.id = chat.id;
                obj.content = chat.showMessage;
                obj.date = chat.date;
                obj.pin = chat.pin;
                //get user info
                this.appManager.getUsers.filter(user => {
                    if(user.id == chat.id){
                        obj.user = {
                            name: user.name,
                            img: user.img
                        }
                    }
                });
                arr.push(obj);
            });
            return arr;
        }).catch(err => {
            return "No";
        });

        return res;
    }

    //pin chats
    pinChat(id){
        this.storage.load({
            key: 'Chat',
            id: id
        }).then(res => {
            this.storage.save({
                key: 'Chat',
                id: id,
                data: {
                    ...res,
                    id: id,
                    pin: !res.pin
                }
            });
        })
    }
}

export default new Database();