import { observable, action, computed } from 'mobx';

class AppManager {
    @observable root = null; //app root
    @observable users = [{
        id: 1,
        name: 'Hossein Sh',
        img: require('../images/profiles/user1.jpg')
    },{
        id: 2,
        name: 'Ali rezaee',
        img: require('../images/profiles/user2.jpg')
    },{
        id: 3,
        name: 'Sara',
        img: require('../images/profiles/user3.jpg')
    },{
        id: 4,
        name: 'Mohammadreza',
        img: require('../images/profiles/user4.jpg')
    },{
        id: 5,
        name: 'Taraa',
        img: require('../images/profiles/user5.jpg')
    },{
        id: 6,
        name: 'AlmasCo',
        img: require('../images/profiles/user6.jpg')
    },{
        id: 7,
        name: 'Hossein',
        img: require('../images/profiles/user7.jpg')
    },{
        id: 8,
        name: 'React',
        img: require('../images/profiles/user8.jpg')
    }]

    //router
    @action appInitialized() {
        this.root = 'loading';
    }
    @action homePage() {
        this.root = 'home';
    }
    @computed get activeRoot(){
        return this.root;
    }

    //user
    @computed get  getUsers() {
        return this.users;
    }
}

export default new AppManager();