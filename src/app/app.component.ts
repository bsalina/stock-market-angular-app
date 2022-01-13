import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { stockModel } from './dashboard/dashboard.model';
import { ApiService } from './shared/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  closeResult: string = '';
  formValue !: FormGroup;
  stockdata !: any;
  showadd !: boolean;
  showupdate !: boolean;
  stockModelObj : stockModel = new stockModel();
  title = 'frontend';
  
  constructor(private modalService: NgbModal, private formbuilder:FormBuilder, private api : ApiService) {}
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit(): void{
    this.formValue = this.formbuilder.group({
      stock_name: [''],
      status : [''],
      quantity:[''],
      amount:[''],
      date:['']
    })
    this.getstockdetails();
  }
  clickadd(){
    this.formValue.reset();
    this.showadd = true;
    this.showupdate = false;
  }
  poststockdetails(){
    this.stockModelObj.stock_name = this.formValue.value.stock_name;
    this.stockModelObj.status = this.formValue.value.status;
    this.stockModelObj.quantity = this.formValue.value.quantity;
    this.stockModelObj.amount = this.formValue.value.amount;
    this.stockModelObj.date = this.formValue.value.date;

    this.api.poststock(this.stockModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert("stock added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getstockdetails();
    },
    
      err=>{
        alert("something went wrong");
      })
  }
  getstockdetails(){
    this.api.getstock(this.stockdata)
    .subscribe(res=>{
      this.stockdata = res;

    })
  }
  deletestocks(row : any){
    this.api.deletestock(row.id)
    .subscribe(res=>{
      alert("stock deleted")
      this.getstockdetails();
    })
  }
  onEdit(row: any){
    this.showadd = false;
    this.showupdate = true;
    this.stockModelObj.id = row.id;
    this.formValue.controls['stock_name'].setValue(row.stock_name);
    this.formValue.controls['status'].setValue(row.status);
    this.formValue.controls['quantity'].setValue(row.quantity);
    this.formValue.controls['amount'].setValue(row.amount);
    this.formValue.controls['date'].setValue(row.date);
  }
  updatestockdetails(){
    this.stockModelObj.stock_name = this.formValue.value.stock_name;
    this.stockModelObj.status = this.formValue.value.status;
    this.stockModelObj.quantity = this.formValue.value.quantity;
    this.stockModelObj.amount = this.formValue.value.amount;
    this.stockModelObj.date = this.formValue.value.date;
    this.api.updatestock(this.stockModelObj,this.stockModelObj.id)
    .subscribe(res=>{
      alert("updated succcessfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getstockdetails();
    })
  
  }
 
}

