import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-multiple-image-upload',
  templateUrl: './multiple-image-upload.component.html',
  styleUrls: ['./multiple-image-upload.component.css']
})
export class MultipleImageUploadComponent implements OnInit {
  public togleImgs: boolean = false
  public uploaded = false
  private base_64: string = ";base64,"
  public imgs: any[]

  @Output() onUploadImage = new EventEmitter();
  
  @Input()
  set images(imgs: any[]){
    if(imgs !== undefined){
      imgs.forEach(i => this.imgs.push(i))
    }
  }

  constructor() { 
    this.imgs = []
   }

  ngOnInit(): void {
  }

  onFileChanged(event: Event): void{
    let file: File = (<HTMLInputElement>event.target).files[0]

    if(this.imgs.length < 5){
      let reader = new FileReader()
      reader.readAsDataURL((<HTMLInputElement>event.target).files[0])
      reader.onload = () => {
        let type = reader.result.toString().match("^.+?(;base64),")[0]
        let url = reader.result.toString().split(this.base_64)[1]
        this.imgs.push({name: file.name, type: type, url: url})
      }
    }
  }

  onUpload(): void {
    this.onUploadImage.emit(this.imgs)
    this.uploaded = true
  }

  clearImages(): void{
    this.imgs = []
    this.uploaded = false
    this.onUploadImage.emit([])
  }

}
