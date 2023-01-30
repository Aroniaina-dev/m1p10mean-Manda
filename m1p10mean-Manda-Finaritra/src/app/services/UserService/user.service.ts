import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/models/http-response-model';
import { User } from 'src/app/models/user';
import { Voiture } from 'src/app/models/voiture';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser(loginId: Number): Observable<User> {
    return this.httpClient.get<User>(environment.end_point+"user/atelier/"+loginId);
  }

  addCar(voiture: Voiture, idUser:string): Observable<HttpResponseModel<User>> {
    return this.httpClient.post<HttpResponseModel<User>>(environment.end_point+"user/ajout_voiture/"+idUser, {
      voiture: voiture
    });
  }
}
