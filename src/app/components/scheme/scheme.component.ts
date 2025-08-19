import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SchemeService } from '../../services/scheme.service';
import { Scheme } from '../../models/scheme.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SchemeComponent implements OnInit {
  schemeForm!: FormGroup;
  schemes: Scheme[] = [];
  isEditing = false;

  constructor(private fb: FormBuilder, private schemeService: SchemeService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSchemes();
  }

  initForm() {
    this.schemeForm = this.fb.group({
      SchemeCode: [''],
      SchemeName: [''],
      Remarks: [''],
      InterestType: [''],
      InterestPercent: ['']
    });
  }

  loadSchemes() {
    this.schemeService.getAll().subscribe(data => {
      this.schemes = data;
    });
  }

  saveScheme() {
      console.log("save scheme");
    const scheme: Scheme = this.schemeForm.value;
    if (this.isEditing) {
      this.schemeService.update(scheme.SchemeCode, scheme).subscribe(() => {
        this.loadSchemes();
        this.cancelEdit();
      });
    } else {
      this.schemeService.create(scheme).subscribe(() => {
        this.loadSchemes();
        this.schemeForm.reset();
      });
    }
  }

  editScheme(scheme: Scheme) {
    this.schemeForm.patchValue(scheme);
    this.isEditing = true;
  }

  deleteScheme(code: string) {
    this.schemeService.delete(code).subscribe(() => {
      this.loadSchemes();
    });
  }

  cancelEdit() {
    this.schemeForm.reset();
    this.isEditing = false;
  }
}
