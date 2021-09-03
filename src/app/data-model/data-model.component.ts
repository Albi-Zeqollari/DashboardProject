import { Component, OnInit } from '@angular/core';
import { WebSocketServiceService } from '../web-socket-service.service';

@Component({
  selector: 'app-data-model',
  templateUrl: './data-model.component.html',
  styleUrls: ['./data-model.component.scss']
})
export class DataModelComponent implements OnInit {


  public gasPrices!:[]
  public rainyDayss!:[]

  constructor( private webSocketService: WebSocketServiceService  ) {
    
    let stompClient = this.webSocketService.connect();
        stompClient.connect({}, () => {

			// Subscribe to notification topic
            stompClient.subscribe('/topic/notification', (dataModel: { body: string; }) => {

				// Update notifications attribute with the recent messsage sent from the server
                this.gasPrices= JSON.parse(dataModel.body).gasPrice;
                this.rainyDayss= JSON.parse(dataModel.body).rainyDays;
         
            })
        });
   }

  ngOnInit(): void {
  }
  

}
