import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { LimitEllipsisPipe } from '../utils/limit-ellipsis.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LimitEllipsisPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  async ngOnInit() {
    this.products = await this.productService.getLastAddedProducts(5);
  }

  async addToCart(productId: string) {
    await this.productService.addToCart(productId);
    this.router.navigate(['cart']);
  }
}
