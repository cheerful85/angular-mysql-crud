import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/Contact';
import { ActivatedRoute, Router } from '@angular/router'

import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contact: Contact = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 666123456,
    created_at: new Date()
  };

  edit : boolean = false;

  constructor(private contactsService : ContactsService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if([params['id']]){
      this.contactsService.getContact(params['id']).subscribe(
        res => { 
          console.log(res);
          this.contact = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
    console.log(params);
  }

  saveNewContact(){
    delete this.contact.created_at;
    delete this.contact.id;
    if (this.contact.firstName=='' || this.contact.lastName=='' || this.contact.email=='' || this.contact.phoneNumber==null){
      alert("Revisa los inputs. Falta algun dato por introducir");  
    }else{
      this.contactsService.saveContact(this.contact).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/contacts']);
        },
        err => console.error(err)
      )
    }
  }

  updateContact(){
    delete this.contact.created_at;
    this.contactsService.updateContact(this.contact.id, this.contact)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/contacts']);
      },
      err => console.log(err)

    )
  }

}
