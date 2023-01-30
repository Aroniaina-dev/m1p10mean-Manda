import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Car } from 'src/app/models/car';
import { HttpResponseModel } from 'src/app/models/http-response-model';
import { Reparation } from 'src/app/models/reparation';
import { User } from 'src/app/models/user';
import { VoitureTemp } from 'src/app/models/voitureTemp';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  getMarque(): Observable<any> {
    return this.http.get(environment.end_point+'marque',{observe:'response'});
  }
  getType(marque: string): Observable<any> {
    return this.http.get(environment.end_point+`/type/${marque}`,{observe:'response'});
  }

  depot(car : Car): Observable<any> {
    return this.http.post(environment.end_point+"voitureTemp/ajout",car);
  }

  atelier(): Observable<any> {
    return this.http.get(environment.end_point+'/voiture',{observe:'response'});
  }
  getUser(id: string): Observable<any> {
    return this.http.get(environment.end_point+`/user/${id}`,{observe:'response',withCredentials : true});
  }
  getMateriel(): Observable<any> {
    return this.http.get(environment.end_point+`/materiel`,{observe:'response'});
  }
  reparation(reparation:Array<Reparation>,id:string): Observable<any> {
    return this.http.post(environment.end_point+`/reparation/${id}`,{reparation},{observe:'response'});
  }

  getVoiture(): Observable<any> {
    return this.http.get(environment.end_point+`/userVoiture`,{observe:'response',withCredentials : true});
  }

  getReparation(): Observable<any> {
    return this.http.get(environment.end_point+"voitureTemp/listereparation");
  }

  finishedReparation(idReparation:string,idVoiture:string): Observable<any> {
    return this.http.put(environment.end_point+`/reparation/${idReparation}`,{idVoiture},{observe:'response',withCredentials : true});
  }

}
