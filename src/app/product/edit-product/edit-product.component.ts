import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../types/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  product: ProductInterface = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    productId: '',
  };
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      const product = await this.productService.getDetails(this.productId);
      if (product) {
        this.product = product;
      }
    }
  }

  async saveProduct() {
    if (this.productId) {
      await this.productService.updateProduct(this.productId, this.product);
      this.router.navigate(['/catalog']);
    }
  }
}
