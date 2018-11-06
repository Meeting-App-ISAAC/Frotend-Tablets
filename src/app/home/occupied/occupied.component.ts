import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ReservationStatusRESTService} from '../../services/reservation-status-rest.service';
import {ReservationModel} from '../../interfaces/ReservationModel';
import {DurationButtonUser} from '../DurationButtonUser';

@Component({
  selector: 'app-occupied',
  templateUrl: './occupied.component.html',
  styleUrls: ['./occupied.component.css']
})
export class OccupiedComponent extends DurationButtonUser{


  @Input() until : Date;
  @Input() title : String;
  @Output() end = new EventEmitter();

  public showDialog : boolean =false;
  public error : boolean = false;
  public constructor(private rest : ReservationStatusRESTService){
    super();
  }


  public endEvent() : void{
    this.closeExtendDialog();
    this.end.emit();
  }
  public extendEvent() : void{
    this.openExtendDialog();
  }
  private openExtendDialog() : void{
    console.log(this.currentReservation);
    console.log(this.nextReservation);
    console.log(this.timeButtonsFree);
    this.showDialog = true;
  }
  public closeExtendDialog() : void{
    this.showDialog = false;
    this.timeButtonSelected = 0;
  }
  private showError(){
    this.error = true;
  }
  private hideError(){
    this.error = false;
  }
  public submitExtendDialog() : void{
    this.hideError();
    this.rest.sendReservationExtend(this.currentReservation, this.getMinutes()).subscribe(
      (val) => {
        if(val.toString() === 'true'){
          this.closeExtendDialog();
        } else {
          this.showError();
        }
      },
      response => {
        //POST call in error
      },
      () => {
        //The POST observable is now completed
      });
  }
}
