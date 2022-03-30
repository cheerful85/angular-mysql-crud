import { Component, HostBinding, OnInit } from '@angular/core';

import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  contacts: any = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(){
    this.contactsService.getContacts().subscribe(
      res => {
        this.contacts = res;
      },
      err => console.error(err)
    );  
  }

  deleteContact(id: string){
    this.contactsService.deleteContact(id).subscribe(
      res => {
        console.log(res);
        this.getContacts();
      },
      err => console.log(err)
    )
  }

}
