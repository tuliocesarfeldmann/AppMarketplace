import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ROLES_LIST } from 'src/app/util/api-util/utils';
import toaster from 'toastr';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  public form: FormGroup
  public rolesList = ROLES_LIST

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      path: new FormControl("", [Validators.required]),
      roles: new FormControl([], [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  roleList(item:any[]){
    this.form.controls["roles"].setValue(item)
  }

  createCategory(): void {
    let category: Category = this.form.value

    this.categoryService.saveCategory(category).subscribe({
      next: () => toaster.success("Categoria criada com sucesso!")
    })
  }

}
