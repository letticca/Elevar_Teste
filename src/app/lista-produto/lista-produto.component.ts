
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
  produtosFiltrados: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log("Chega aqui");
    this.formGroup = new FormGroup ({
      input : new FormControl(' ')
    })



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
  }
  filtrar(): void {
    const filtro = this.formGroup.get('input')?.value?.toLowerCase() || '';

    this.produtosFiltrados = this.products.filter(produto =>
      produto.titulo.toLowerCase().includes(filtro)
    );

    console.log('Produtos filtrados:', this.produtosFiltrados);
  }
}
    // produto: Produto[] = [];
    // produtosFiltrados: Produto[] = [];
    // formGroup!: FormGroup;

    // constructor() {}

    // ngOnInit(): void {
    //   this.formGroup = new FormGroup({
    //     input: new FormControl('')
    //   })

    //   this.adicionarProduto()
    // }

    // filtrar(): void {
    //   const filtro = this.formGroup.get('input')?.value?.toLowerCase() || '';

    //   this.produtosFiltrados = this.produto.filter(produto =>
    //     produto.titulo.toLowerCase().includes(filtro)
    //   );

    //   console.log('Produtos filtrados:', this.produtosFiltrados);
    // }
    // }

    // obterProdutoPorCodigo(id: number): void {
    //   this.productService.getProductById(id).subscribe(product => {
    //     this.produtoSelecionado = product;
    //     console.log(this.produtoSelecionado); // Exibe o produto no console
    //   });

