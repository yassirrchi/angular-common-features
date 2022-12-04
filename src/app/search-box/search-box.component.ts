import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  searchFormGroup!:FormGroup;
  @Output() searchEvent=new EventEmitter();

  constructor(private fb:FormBuilder,private productService:ProductService) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control(null)
    })
  }
  handleSearchProduct(){
    let keyword=this.searchFormGroup.value.keyword
    
    
  }
  searchParent(){
    let keyword=this.searchFormGroup.value.keyword
    this.searchEvent.emit(keyword)

  }

}
