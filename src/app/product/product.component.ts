import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products!:Array<any>;
  errorMessage!:string;
  currentPage:number=0;
  pageSize:number=5;
  totalPages!:number;
  currentAction:String="all";
  keyword!:string;
  


  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getPageProducts()
  }
  getPageProducts(){
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe(data=>{
      this.products=data.products;
      this.totalPages=data.totalPages;
    },err=>{
      this.errorMessage=err;
    })
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products=data;
    },err=>{
      this.errorMessage=err;
    })
  }
  deleteProduct(productId:string):void{
    this.productService.deleteProduct(productId)
    this.getAllProducts();
    

  }
  togglePromo(productid:string){
    let productINdex=this.products.findIndex(p=>p.id===productid)
    console.log(this.products.filter(p=>p.id===productid))
    console.log(productINdex)
     
    this.products[productINdex].promotion=!this.products[productINdex].promotion

  }
  searchProduct(name:string){
     
    this.keyword=name
    this.currentAction="search"
    this.productService.searchProduct(name,this.currentPage,this.pageSize).subscribe(data=>{
      this.products=data.products
      this.totalPages=data.totalPages
    },error=>{
      this.errorMessage=error
    })

  }
  gotoPage(page:number){
    this.currentPage=page;
    if(this.currentAction==="all")
    
    this.getPageProducts()
    else 
    this.searchProduct(this.keyword);
  }

}
