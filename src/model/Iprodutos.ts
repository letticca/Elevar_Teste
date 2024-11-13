export interface CategoriaGrupo {
    descricao: string;
    id: number;
  }
  
  export interface Product {
    codigo: string;
    descricao: string;
    id: number;
    precoPromocional: number;
    promocao: boolean;
    qtdEstoque: number;
    status: boolean;
    titulo: string;
    valor: number;
    gruposCategoria: CategoriaGrupo[];
  }