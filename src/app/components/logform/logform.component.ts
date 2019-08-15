import { Component, OnInit } from '@angular/core';
import {Log} from '../../models/log'
import { LogService } from '../../services/log.service';
@Component({
  selector: 'app-logform',
  templateUrl: './logform.component.html',
  styleUrls: ['./logform.component.css']
})
export class LogformComponent implements OnInit {
date: any;
text: string;
id: string;
newdata : boolean= true;
  constructor(private  _lservice: LogService) { }

  ngOnInit() {
    this._lservice.chosenlog.subscribe(l =>{
    if (l.id!== null){
      this.newdata= false
        this.date=l.date;
        this.id=l.id;
        this.text= l.text;
    }
    });
    //listen for selected log subscribable
  }
  Submitlog(){
if (this.newdata){
  const newlog={
   id: this.id_generator(),
   date: new Date(),
   text: this.text
  }
  //add log
  this._lservice.addlog(newlog);
} else {
//create log to update
const logupdate={
  id: this.id,
  date: new Date(),
  text: this.text
 }
 //update log
  this._lservice.updatelog(logupdate);
}

//clear input state/ go back to initial values
this.clearstate();

  }

  clearstate(){
    this.newdata= true;
    this.date='';
    this.id='';
    this.text= '';
    this._lservice.clearState();
  }

  id_generator (){

      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });

  }
}
