import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface } from '../../types/interfaces';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  productId: string = '';
  productDetails: ProductInterface = {
    name: '',
    description: '',
    createdBy: '',
    imageUrl: '',
    price: 0,
    productId: this.productId,
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<any> {
    const route = this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });
    this.productDetails = await this.productService.getDetails(this.productId);
  }

  async addToCart(productId: string) {
    await this.productService.addToCart(productId);
    this.router.navigate(['cart']);
  }
}
