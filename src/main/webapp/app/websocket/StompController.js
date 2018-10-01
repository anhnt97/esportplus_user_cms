var TYPE_CHAT = "CHAT";
var TYPE_JOIN = "JOIN";
var TYPE_NOTIFY = "NOTIFY";
var TYPE_NEW_BET = "NEW_BET";//khi co nguoi tao ban moi
var TYPE_RELOAD_ALL = "RELOAD_ALL";//reload tat ca cac ban
var TYPE_RELOAD = "RELOAD_TABLE";//reload rieng 1 ban
var TYPE_UPDATE_SET_MATCH = "UPDATE_SET_MATCH";//update -set -match
var IP_WS = "https://web-socket.esportplus.net/ws";
var StompController = function (roomId) {
    this.stompClient = null;
    this.currentSubscription = null;
    this.username = "cms_esp";
    this.roomId = roomId;
    this.topic = "";
    this.callback = null;
    this.connected = false;
    console.log("Room ID = " + roomId);
}

StompController.prototype = {

    setCallBack: function (target, selector) {
        this.callback = target;
        this.selector = selector;
    },
    connection: function () {

        this.topic = "/app/chat/" + this.roomId + '/addUser';
        var socket = new SockJS(IP_WS);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({'user-name': this.username}, this.onConnected.bind(this), this.onError.bind(this));

        // this.stompClient.connect(
        //     {},
        //     frame => {
        //     this.connected = true;
        // console.log(frame);
        // this.stompClient.subscribe(this.topic, tick => {
        //     console.log(tick);
        //     });
        // },
        // error => {
        //     console.log(error);
        //     this.connected = false;
        // });
    },
    enterRoom: function (newRoomId) {
        this.roomId = newRoomId;
        // Cookies.set('roomId', roomId);
        this.topic = "/app/chat/" + this.roomId;
        console.log("enterRoom======>" + this.topic);
        if (this.currentSubscription) {
            this.currentSubscription.unsubscribe();
        }
        this.currentSubscription = this.stompClient.subscribe('/channel/' + this.roomId, this.onMessageReceived);
        this.stompClient.send('/app/chat/' + this.roomId + '/addUser',
            {},
            JSON.stringify({
                header: {
                    type: 'JOIN',
                    sender: this.username,
                    receiver: 'esport'
                },
                data: {
                    content: "JOIN!"
                }
            })
        );

        this.stompClient.subscribe('/user/channel/' + this.roomId, this.onPrivateMessageReceived);
    },
    onConnected: function () {
        console.log("Connection = " + this.roomId);
        this.enterRoom(this.roomId);
    },

    onError: function (error) {
        console.log("Could not connect to WebSocket server. Please refresh this page to try again!");
    },
    onMessageReceived: function (payload) {
        var message = JSON.parse(payload.body);

        console.log("*********************>>>>>>>" + message);
        var messageElement = document.createElement('li');

        if (message.header.type == "JOIN") {
            message.data.content = message.header.sender + ' joined!';
        } else if (message.header.type == "LEAVE") {
            message.data.content = message.header.sender + ' left!';
        }
        else if (message.header.type == "NEW_BET") {
            message.data.content = message.header.sender + 'NEW_BET!';
        }
        else if (message.header.type == "NOTIFY") {
            message.data.content = message.header.sender + ": " + message.data.content;
        } else {

        }

        // console.log(JSON.stringify(app));
        app.callBackFunction(message.header.type);

        // if (this.callback != null) {
        //     console.log(JSON.stringify(message));
        //     this.callback.callBackFunction(message.header.type);
        // }

        // this.$refs.foo.doSomething();
    },
    onPrivateMessageReceived: function (payload) {
        console.log("******** PRIVATE MSG*******>>>>>>>" + payload);
        var message = JSON.parse(payload.body);

        console.log("******** PRIVATE MSG*******>>>>>>>" + message);
    },
    sendMessage: function (messageContent) {
        if (messageContent && this.stompClient != null) {
            var chatMessage =
                {
                    header:
                        {
                            type: 'CHAT',
                            sender: this.username,
                            receiver: 'esport'
                        },
                    data:
                        {
                            content: messageContent
                        }
                };


            // {
            //     sender: username,
            //     content: messageInput.value,
            //     type: 'CHAT'
            // };
            this.stompClient.send('/app/chat/' + this.roomId + '/sendMessage', {'user-name': this.username}, JSON.stringify(chatMessage));
        }
    },
    closeConnection() {
        this.stompClient.disconnect();
    }
}