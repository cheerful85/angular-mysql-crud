import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Contact } from '../models/Contact';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  API_URI='http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getContacts(){
    return this.http.get(`${this.API_URI}/contacts`);
  }

  getContact(id: string){
    return this.http.get(`${this.API_URI}/contacts/${id}`);
  }

  deleteContact(id: string){
    return this.http.delete(`${this.API_URI}/contacts/${id}`);
  }

  saveContact(contact: Contact){
    return this.http.post(`${this.API_URI}/contacts`, contact);
  }

  updateContact(id: string|number|undefined, updatedContact: Contact): Observable<Contact>{
    return this.http.put(`${this.API_URI}/contacts/${id}`, updatedContact);
  }

}
