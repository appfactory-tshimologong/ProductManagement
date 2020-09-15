import { Component, OnInit, OnDestroy } from '@angular/core';
import {IProduct} from './product';
import {ProductService} from './product.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductDetailComponent } from './product-detail.component';


@Component({
   templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit
{
  pageTitle:string = 'Product List';
  showImage: boolean = false;
  errorMessage: string;

  private _listFilter: string;

  get listFilter(): string{
    return this._listFilter;
  }
  
  set listFilter(value:string){
    
    this._listFilter=value;

    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter):this.products;
  }

  filteredProducts: IProduct[];

  products: IProduct[];

  
 constructor(private productService: ProductService,public dialog: MatDialog ){
  
 }

 openDialog(){
   this.dialog.open(ProductDetailComponent,{data: 1});
 }

 onRatingClicked(message:string): void{
   this.pageTitle = message;
 }

 ngOnInit(): void {
   this.productService.getProducts().subscribe({
    next: products => {
      this.products = products;
      this.filteredProducts = this.products;
    },
    error: err => this.errorMessage = err
  });
  

}
  toggleImage():void{
    this.showImage = !this.showImage;
  }
  
  performFilter(filterBy:string):IProduct[]{

    filterBy = filterBy.toLocaleLowerCase();
    
    return this.products.filter((product:IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
