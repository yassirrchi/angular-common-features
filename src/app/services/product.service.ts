import { Injectable } from '@angular/core';
import { Observable,of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/Product.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   
  products:Array<Product>;
  
  getAllProducts():Observable<Array<Product>>{
/* if(Math.random()<0.5)
return throwError("network error") */

    return of(this.products);
  }
  getPageProducts(page:number,size:number):Observable<PageProduct>{
    let index=page*size; 
    let totalpages=~~(this.products.length/size);
if(this.products.length%size!=0)
totalpages++;
let pageProduct=this.products.slice(index,index+size)
return of({page:page,size:size,totalPages:totalpages,products:pageProduct})
        
      }
    


  deleteProduct(productid:string):void{
    let conf=confirm("are you sure?")
    if(conf)
    this.products=this.products.filter(product=>product.id.localeCompare(productid)!=0)


  }
  searchProduct(keyword:string,page:number,size:number):Observable<PageProduct>{
    let index=page*size; 
    let result=this.products.filter(p=>p.name.includes(keyword))
    let totalpages=~~(result.length/size);
if(this.products.length%size!=0)
totalpages++;


  let pageProduct=result.slice(index,index+size)
  return of({page:page,size:size,totalPages:totalpages,products:pageProduct})
}

  constructor() {
    this.products=[
      {id:UUID.UUID(),name:"Computer",price:2000,promotion:false},
      {id:UUID.UUID(),name:"Printer",price:440,promotion:true},
      {id:UUID.UUID(),name:"Computer",price:3200,promotion:false},
    ];
    for(let i=0;i<10;i++){
      this.products.push({
        id: UUID.UUID(), name: "Laptop", price: Math.random() * 800,
        promotion: false
      })
    }
   
   }
}
