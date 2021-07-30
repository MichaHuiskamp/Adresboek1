import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GebruikerModel } from 'src/app/gebruiker-dashboard/gebruiker-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-gebruiker-dashboard',
  templateUrl: './gebruiker-dashboard.component.html',
  styleUrls: ['./gebruiker-dashboard.component.css']
})
export class GebruikerDashboardComponent implements OnInit {

  formValue !: FormGroup;
  gebruikerModelObj : GebruikerModel = new GebruikerModel();
  adressenData !: any;
  showAdd!: boolean;
  showUpdate !: boolean;
  constructor(private formBuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      streetName : [''],
      streetNum : [''],
      streetAdd : [''],
      zipCode : [''],
      location : [''],
      phoneNum : [''],
      email : ['']
    })
    this.getAllAddresses();
  }
  clickAddGebruiker(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postGebruikerDetails(){
    this.gebruikerModelObj.firstName = this.formValue.value.firstName;
    this.gebruikerModelObj.lastName = this.formValue.value.lastName;
    this.gebruikerModelObj.streetName = this.formValue.value.streetName;
    this.gebruikerModelObj.streetNum = this.formValue.value.streetNum;
    this.gebruikerModelObj.streetAdd = this.formValue.value.streetAdd;
    this.gebruikerModelObj.zipCode = this.formValue.value.zipCode;
    this.gebruikerModelObj.location = this.formValue.value.location;
    this.gebruikerModelObj.phoneNum = this.formValue.value.phoneNum;
    this.gebruikerModelObj.email = this.formValue.value.email;

    this.api.postAdres(this.gebruikerModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Adres details zijn toegevoegd")
      let ref = document.getElementById('sluit')
      ref?.click();
      this.formValue.reset();
      this.getAllAddresses();
    },
    err=>{
      alert("Oops, er ging iets fout")
      })
    }
    getAllAddresses(){
      this.api.getAdres()
      .subscribe(res=>{
        this.adressenData = res;
      })
    }
    deleteAdres(row : any){
      this.api.deleteAdres(row.id)
      .subscribe(res=>{
        alert("Adres gewist!");
        this.getAllAddresses();
      })
    }
    onEdit(row : any){
      this.showAdd = false;
      this.showUpdate = true;
      this.gebruikerModelObj.id = row.id;
      this.formValue.controls['firstName'].setValue(row.firstName);
      this.formValue.controls['lastName'].setValue(row.lastName);
      this.formValue.controls['streetName'].setValue(row.streetName);
      this.formValue.controls['streetNum'].setValue(row.streetNum);
      this.formValue.controls['streetAdd'].setValue(row.streetAdd);
      this.formValue.controls['zipCode'].setValue(row.zipCode);
      this.formValue.controls['location'].setValue(row.location);
      this.formValue.controls['phoneNum'].setValue(row.phoneNum);
      this.formValue.controls['email'].setValue(row.email);
      }
      updateGebruikerDetails(){
        this.gebruikerModelObj.firstName = this.formValue.value.firstName;
        this.gebruikerModelObj.lastName = this.formValue.value.lastName;
        this.gebruikerModelObj.streetName = this.formValue.value.streetName;
        this.gebruikerModelObj.streetNum = this.formValue.value.streetNum;
        this.gebruikerModelObj.streetAdd = this.formValue.value.streetAdd;
        this.gebruikerModelObj.zipCode = this.formValue.value.zipCode;
        this.gebruikerModelObj.location = this.formValue.value.location;
        this.gebruikerModelObj.phoneNum = this.formValue.value.phoneNum;
        this.gebruikerModelObj.email = this.formValue.value.email;

        this.api.updateAdres(this.gebruikerModelObj,this.gebruikerModelObj.id)
        .subscribe(res=>{
          alert("Gegevens succesvol gewijzigd!");
          let ref = document.getElementById('sluit')
          ref?.click();
          this.formValue.reset();
          this.getAllAddresses();
        })
      }

}
