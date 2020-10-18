import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { AppComponent } from './app.component'

export class StockFeedWebSocketComponent{

    webSocketEndPoint: string = 'http://localhost:8080/ws/';
    topic: string = "/feed/stocks/";
    stompClient: any; //unsure of the type
    appComponent: AppComponent;
    stockFeedsVal : any

    constructor(appComponent: AppComponent){
        this.appComponent = appComponent;
    }

    connect(){
        console.log('Initialize the WebSocket connection');
        let ws = new SockJS(this.webSocketEndPoint); //let ES6 introduced scope is block level eg. method,if condition etc
        this.stompClient = Stomp.over(ws);
        const _this = this; // const same as variable but its value cannot be changed
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function(sdkEvent){
                _this.onMessageReceived(sdkEvent);
            
            });
        },this.errorCallBack);
    };

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this.connect();
        }, 5000);
    };

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + JSON.parse(message.body));
        let rres = JSON.parse(message.body)
        this.appComponent.handleMessage(JSON.parse(message.body));
        this.stockFeedsVal = JSON.parse(message.body)
        
    }

}        