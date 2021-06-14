import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardService} from "../../services/card.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {config} from "rxjs";
import {Card} from "../../models/card";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!:FormGroup;
  showSpinner:boolean=false;



  constructor(
    private dialogRef:MatDialogRef<CardModalComponent>,
    private fb:FormBuilder,
    private cardService:CardService,
    private _snackBar: MatSnackBar,
    private snackbarServices:SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data:Card
  ) {
    this.data = data;
  }

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm=this.fb.group({
      name:[this.data?.name|| '',Validators.maxLength(50)],
      title:[this.data?.title|| '',[Validators.required,Validators.maxLength(255)]],
      phone:[this.data?.phone|| '',[Validators.required,Validators.maxLength(20)]],
      email:[this.data?.email|| '',[Validators.email,Validators.maxLength(50)]],
      address:[this.data?.address|| '',Validators.maxLength(255)],
    });
  }

  addCard():void{
    this.showSpinner=true;
    this.cardService.addCard(this.cardForm.value)
      .subscribe((res:any)=>{
        this.getSuccess(res || 'Kartvizit elave olundu.');
      },(err:any)=>
      {
        this.getError(err.message || 'Kartvizit elave olunmadi xəta var !' );
      });
  }

  updateCard(): void {
    this.showSpinner=true;
    this.cardService.updateCard(this.cardForm.value, this.data.id)
      .subscribe((res: any) => {
        this.getSuccess(res || 'Kartvizit Update olundu.');
      },(err:any)=>{
        this.getError(err.message || 'Kartvizit update olunmadi xəta var !' );
        });
  }
  deleteCard():void{
    this.showSpinner=true;
    this.cardService.deleteCard(this.data.id)
      .subscribe((res:any)=>{
        this.getSuccess(res || 'Kartvizit basariyal silindi.');
      },(err:any)=>{
        this.getError(err.message || 'Kartvizit silinerken xəta baş verdi !');
      });
  }


  getSuccess(message:string):void{
    this.snackbarServices.createSnackbar('success',message);
    this.cardService.getCards();
    this.showSpinner=false;
    this.dialogRef.close();

  }

  getError(message:string):void{
    this.snackbarServices.createSnackbar('error',message);
    this.showSpinner=false;

  }

}
