
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
  pesquisaForm! : FormGroup;
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log("Chega aqui");
    this.pesquisaForm = new FormGroup({})


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

    buscarCodigo() {
      // Obtém o valor do campo "codigo" do formulário
      const codigo = this.pesquisaForm.get('codigo')?.value;

      // Verifica se o código está definido e chama o serviço para obter os produtos
      if (codigo) {
        this.productService.getProducts().subscribe((produtos) => {
          // Procura o produto que corresponde ao código inserido no formulário
          const produtoEncontrado = produtos.find(produto => produto.codigo === codigo);

          if (produtoEncontrado) {
            console.log('Produto encontrado:', produtoEncontrado);
          } else {
            console.log('Produto não encontrado');
          }
        });
      } else {
        console.log('Por favor, insira um código válido');
      }
    }
    
    }

    // obterProdutoPorCodigo(id: number): void {
    //   this.productService.getProductById(id).subscribe(product => {
    //     this.produtoSelecionado = product;
    //     console.log(this.produtoSelecionado); // Exibe o produto no console
    //   });
    }
