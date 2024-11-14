
import { ProductService } from 'src/service/produto.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/Iprodutos';


@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})




export class ListaProdutoComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log("Chega aqui");

  }

  getProducts() {

    this.productService.getProducts().subscribe(
      data => {
        this.products = data
        console.log(data)
      },
      err => {
        console.log(err)
      }

    )

    // obterProdutoPorCodigo(id: number): void {
    //   this.productService.getProductById(id).subscribe(product => {
    //     this.produtoSelecionado = product;
    //     console.log(this.produtoSelecionado); // Exibe o produto no console
    //   });
    // }
  }


}
