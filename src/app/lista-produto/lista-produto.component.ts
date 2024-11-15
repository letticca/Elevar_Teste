
import { ProductService } from 'src/service/produto.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/Iprodutos';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';



@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})



export class ListaProdutoComponent implements OnInit {
  formGroup! : FormGroup;
  products: Product[] = [];
  produtosFiltrados:  any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log("Chega aqui");
    this.formGroup = new FormGroup ({
      input : new FormControl(' ')
    });
    this.getProducts();

  }

    // getProducts() {
    //     this.productService.getProducts().subscribe(
    //     data => {
    //       this.products = data
    //      // this.produtosFiltrados =[...this.products]
    //       console.log(data)
    //       console.log(this.produtosFiltrados)
    //     },
    //     err => {
    //       console.log(err)
    //     }
    //   )
    // }

    getProducts() {
      this.productService.getProducts().subscribe(
        data => {
          if (data && Array.isArray(data.produtos)) {  // Verifica se 'data.produtos' é um array
            this.products = data.produtos;
            this.produtosFiltrados = [...this.products];
          } else {
            console.error("Erro: 'data.produtos' não é um array", data);
            this.products = [];
            this.produtosFiltrados = [];
          }
          console.log(data);
          console.log(this.produtosFiltrados);
        },
        err => {
          console.log(err);
        }
      );
    }



    filtrarNome(): void {
      const filtro = this.formGroup.get('input')?.value?.toLowerCase() || '';

      this.produtosFiltrados = this.products.filter(produto =>
        produto.titulo.toLowerCase().includes(filtro)
      );
      console.log('Produtos filtrados:', this.produtosFiltrados);
    }
}


