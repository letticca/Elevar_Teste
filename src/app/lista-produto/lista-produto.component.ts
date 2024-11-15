
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
      input : new FormControl(' '),
      precoMin: new FormControl(' '),
      precoMax :new FormControl(' ')
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

    filtrarStatus(): void {
      const filtro = this.formGroup.get('input')?.value?.toLowerCase() || '';

      // Determina o valor booleano com base no input do usuário
      const statusFiltrado = filtro === 'ativo' ? true : filtro === 'inativo' ? false : null;

      if (statusFiltrado !== null) {
          this.produtosFiltrados = this.products.filter(produto =>
              produto.status === statusFiltrado
          );
      } else {
          // Se o input não for "ativo" ou "inativo", exibe todos os produtos
          this.produtosFiltrados = this.products;
      }
      console.log('Produtos filtrados:', this.produtosFiltrados);
  }

  filtrarPorPreco(): void {
    const precoMin = this.formGroup.get('precoMin')?.value || 0;
    const precoMax = this.formGroup.get('precoMax')?.value || Infinity;

    this.produtosFiltrados = this.products.filter(produto =>
        produto.valor >= precoMin && produto.valor <= precoMax
    );

    console.log('Produtos filtrados por preço:', this.produtosFiltrados);
}



}


