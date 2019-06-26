import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { EMEvent } from '../models/emevent.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EMEvent) { }

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(_ => {
      this.dialogRef.close();
    });
  }

  openLoc(){
    let url = 'https://maps.google.com/maps?q='+ this.event.lat + ',' + this.event.lon
    window.open(url, '_blank');
  }

  close(){
    this.dialogRef.close();
  }
}
