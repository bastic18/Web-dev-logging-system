import { Injectable } from '@angular/core';
import {Log} from '../models/log';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogService {
logs: Log[];

private logsource= new BehaviorSubject<Log>({id:null, date: null,text:null});
chosenlog= this.logsource.asObservable();
private statesource= new BehaviorSubject<boolean>(true);
statesrc= this.statesource.asObservable();


  constructor() {
   // this.logs=[
    //   {id: '1', date: new Date ('8/14/19') , text: 'gen comp'},
    //   {id: '2', date: new Date ('9/14/19') , text: 'gen 2comp'},
    //   {id: '3', date: new Date ('10/14/19') , text: 'gen 3comp'},
    // ]
    this.logs=[];
   }

   getlog(): Observable<Log[]>{
     if(localStorage.getItem('logs_devlog')==null){this.logs=[];} else {
       this.logs=JSON.parse(localStorage.getItem('logs_devlog'));
     }
     return of (this.logs.sort((al,bas)=>{return bas.date=al.date}));
   }

   setFormLog(log: Log){
     this.logsource.next(log);
   }
   addlog(l: Log){
this.logs.unshift(l);
localStorage.setItem('logs_devlog',JSON.stringify(this.logs));

   }
   updatelog(l:Log){
this.logs.forEach((a,index)=>{
if (l.id ===a.id){
  this.logs.splice(index,1);
}

});
this.logs.unshift(l);
localStorage.setItem('logs_devlog',JSON.stringify(this.logs));

   }
   deletelog(l: Log){
    this.logs.forEach((a,index)=>{
      if (l.id ===a.id){
        this.logs.splice(index,1);
      }

      });
      localStorage.setItem('logs_devlog',JSON.stringify(this.logs));

   }

   clearState(){
this.statesource.next(true);
   }
}
