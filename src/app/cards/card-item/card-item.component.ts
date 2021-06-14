import { Component,Input, OnInit } from '@angular/core';
import {Card} from "../../models/card";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CardModalComponent} from "../card-modal/card-modal.component";
import {config} from "rxjs";

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() card!: Card;

  constructor(
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }
  openUpdateCardModal(card:Card):void{
    this.dialog.open(CardModalComponent,{
      width:'400px',
        data:card
    });
  }

}
