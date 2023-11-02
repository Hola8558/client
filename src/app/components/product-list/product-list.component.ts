import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  public products : Product[] = [];

  constructor(private productService : ProductService){
    this.getProducts()
  }

  getProducts(){
    this.productService.getProducts()
      .subscribe(
        (res: any)=> {
          if (Array.isArray(res)) {
            // Si res es un array, úsalo directamente
            this.products = res;
          } else if (typeof res === 'object' && res !== null && 'products' in res && Array.isArray(res.products)) {
            // Si res es un objeto con una propiedad 'products' que es un array, úsalo
            this.products = res.products;
          } else {
            // Si no se cumple ninguna condición, muestra un error o manejo adecuado
            console.error('Formato de respuesta no reconocido:', res);
          }
        },
        err => console.log(err)
      );
  };

  deleteProdcut(is: string){
    this.productService.deleteProduct(is)
    .subscribe(
      res=> {
        this.getProducts();
      },
      err => console.log(err)

    )
  }

}
