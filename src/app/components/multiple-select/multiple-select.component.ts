import {Component,Input,Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.css']
})
export class MultipleSelectComponent {
  @Input() list:any[]; 
    
  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  
  showDropDown = false
  checkedList : any[];
  selectedItems : any[];
  currentSelected : {};

  constructor() {
    this.checkedList = [];
    this.selectedItems = [];
  }

  getSelectedValue(status:Boolean,value:any){
  if(status){
    this.checkedList.push(value.name);  
    this.selectedItems.push(value);
  }else{
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index,1);
  }
  
  this.currentSelected = {checked : status, name:value};

  //share checked list
  this.shareCheckedlist();
  
  //share individual selected item
  this.shareIndividualStatus();
  }
  shareCheckedlist(){
        this.shareCheckedList.emit(this.selectedItems);
  }
  shareIndividualStatus(){
      this.shareIndividualCheckedList.emit(this.currentSelected);
  }



}