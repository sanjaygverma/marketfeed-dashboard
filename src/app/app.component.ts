import { Component } from '@angular/core';
import { StockFeedWebSocketComponent }  from './StockFeedWebSocketComponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'marketfeed-dashboard';

  appComponent : AppComponent
  stockFeedWs: StockFeedWebSocketComponent;
  stockFeeds: any;
  

  //A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. Define an ngOnInit() method to handle any additional initialization tasks.
  ngOnInit(){
    this.appComponent = new AppComponent()
    this.stockFeedWs = new StockFeedWebSocketComponent(this.appComponent);
    this.stockFeedWs.connect();
  }

  connect()
  {
    this.stockFeedWs.connect();
  }

  disconnect()
  {
    this.stockFeedWs.disconnect();
  }
  

  handleMessage(message)
  {
    this.stockFeeds = message;  
  }
}
