import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/models/http-response-model';
import { User } from 'src/app/models/user';
import { VoitureTemp } from 'src/app/models/voitureTemp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Appel de l'api qui permet de recuperer la liste de toutes les Users
   */
  getAll(loginType: Number): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.end_point+"user/atelier/"+loginType);
  }

  getAllFinancier(loginType: Number): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.end_point+"user/financier/"+loginType);
  }


  /**
   * Appel de l'api qui permet de sauvegarder un User
   * @param User objet de l'unite à sauvegarder
   */
  save(User: User): Observable<HttpResponseModel<User>> {
    return this.httpClient.post<HttpResponseModel<User>>(environment.end_point, User);
  }

  /**
   * Appel de l'api qui permet de modifier un User
   * @param User l'objet à modifier
   */
  update(User: User): Observable<HttpResponseModel<User>> {
    return this.httpClient.put<HttpResponseModel<User>>(environment.end_point, User);
  }

  /**
   * Appel de l'api qui permet de supprimer un User
   * @param id
   */
  delete(id: string): Observable<HttpResponseModel<any>> {
    return this.httpClient.delete<HttpResponseModel<any>>(environment.end_point + id);
  }


  getVoitureByID(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.end_point + "voiture");
  }

  changeStatesGarage(user: User, idVoiture: string): Observable<HttpResponseModel<User>> {
    return this.httpClient.put<HttpResponseModel<User>>(environment.end_point+"user/voiture/"+idVoiture, user);
  }

  changeStatesReparer(user: User, idVoiture: string, idMateriel: string): Observable<HttpResponseModel<User>> {
    return this.httpClient.put<HttpResponseModel<User>>(environment.end_point+"user/voiture/"+idVoiture+"/"+idMateriel, user);
  }

  changeStatesTerminer(user: User, idVoiture: string): Observable<HttpResponseModel<User>> {
    return this.httpClient.put<HttpResponseModel<User>>(environment.end_point+"user/voiture_reparer/"+idVoiture, user);
  }

  sendEmail(email: string, objet: string,body: string): Observable<HttpResponseModel<any>> {
    return this.httpClient.post<HttpResponseModel<any>>(environment.end_point+"user/sendEmail",{
      email: email,
      objet: objet,
      body: body
    });
  }

  changeStatesBonDeSortie(user: User, idVoiture: string): Observable<HttpResponseModel<User>> {
    return this.httpClient.put<HttpResponseModel<User>>(environment.end_point+"user/bondesortie/"+idVoiture, user);
  }

  changeStatesPayement(user: User, idVoiture: string): Observable<HttpResponseModel<User>> {
    return this.httpClient.put<HttpResponseModel<User>>(environment.end_point+"user/payement/"+idVoiture, user);
  }

  getAllVoitureTemp(): Observable<HttpResponseModel<VoitureTemp[]>> {
    return this.httpClient.get<HttpResponseModel<VoitureTemp[]>>(environment.end_point+"voitureTemp");
  }

}
