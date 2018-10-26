import { Injectable } from '@angular/core';
import {ReservationModel} from '../interfaces/ReservationModel';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationStatusRESTService {

  constructor(private http : HttpClient) { }

  public sendReservationStarted(reservation : ReservationModel) : void {
    console.log("SEND");
    const data = {"roomId" : 1, "reservationId" : reservation.id};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post('http://localhost:8090/api/start', JSON.stringify(data), httpOptions).subscribe(
      (val) => {
        //POST call successful value returned in body
        //this.result = val.toString();
      },
      response => {
        //POST call in error
      },
      () => {
        //The POST observable is now completed
      });
  }

  public sendReservationEnded(reservation : ReservationModel) {
    const data = {"roomId" : 1, "reservationId" : reservation.id};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post("http://localhost:8090/api/stop", JSON.stringify(data) ,httpOptions).subscribe(
      (val) => {
        //POST call successful value returned in body
        //this.result = val.toString();
      },
      response => {
        //POST call in error
      },
      () => {
        //The POST observable is now completed
      });
  }
}
