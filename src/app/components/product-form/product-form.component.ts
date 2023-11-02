import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  public product: Product = {name : '', description: '', price: 0, imageURL: '', createdAt : Date.now()};

  public edit : boolean = false;

  constructor(private productService: ProductService, private router : Router, private activatedRoute: ActivatedRoute){
    const params = this.activatedRoute.snapshot.params as any;
    if (params){
      this.productService.getProduct(params.id)
        .subscribe(
          res => {
            this.product = res;
            this.edit = true
          }
        )
    }
  }

  submitProduct(){
    this.productService.createProduct(this.product)
      .subscribe(
        res => {
          this.router.navigate(['/']);
        },
        err => console.log(err)
      );

  }

  updateProdutc(){
    delete this.product.createdAt;
    this.productService.updateProduct(this.product._id!, this.product). subscribe(
      res => {
        this.router.navigate(['/']);
      }
    )
  }

}
