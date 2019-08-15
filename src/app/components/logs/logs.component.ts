import { Component, OnInit } from '@angular/core';
import {Log} from '../../models/log'
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
logs: Log [];
selectedLog: Log;
loaded: boolean=false;


  constructor(private  _lservice: LogService) { }

  ngOnInit() {
    this._lservice.statesrc.subscribe(clear=>{
if (clear){
this.selectedLog={id:'', date:'',text: '' };
}
    });
this._lservice.getlog().subscribe(l=>{
  this.logs=l;
  this.loaded=true;
});
  }
ongetcurrent(l: Log){
this._lservice.setFormLog(l);
this.selectedLog= l;
}

delete(l: Log){
if (confirm ('Do you want to delete?') ){
  this._lservice.deletelog(l);
}
}
}
