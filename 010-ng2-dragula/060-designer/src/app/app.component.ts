import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import Config from './designer-model/config';
import ConfigType from './designer-model/config-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  subs = new Subscription();

  config = {
    name: "desinger",
    type: ConfigType.CONTAINER,
    items: [{
      name: 'test1',
      type: ConfigType.CONTAINER,
      items: [
        {
          name: 'test3',
          type: ConfigType.ITEM,
          items: []
        },
        {
          name: 'test4',
          type: ConfigType.CONTAINER,
          items: [{
            name: 'test5',
            type: ConfigType.ITEM,
            items: []
          }]
        }
      ]
    },
    {
      name: 'test2',
      type: ConfigType.ITEM,
      items: []
    }] 
  };
  
  
  get itemsJson(){
    return JSON.stringify(this.config);
  }

  
}
