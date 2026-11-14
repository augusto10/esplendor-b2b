export type CatalogProduct = {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  icon: string;
  imageUrl?: string;
  saleMultiple?: number | null;
  boxQuantity?: number | null;
};
export interface CatalogAdapter {
  list(params?: { query?: string; category?: string }): Promise<CatalogProduct[]>;
}
type SourceProduct = {
  id: string; codigoAdm: string; nomeVenda: string; grupo: string | null;
  marca: string | null; imagemPrincipal: string | null; multiploVenda: number | null;
  quantidadeCaixa?: number | null; ativo: boolean;
};
type SourceResponse = { items: SourceProduct[]; meta?: { source?: string } };
const DEMO_PRODUCTS: CatalogProduct[] = [
  {id:"demo-1",sku:"DEMO-001",name:"Kit de ferramentas profissional",category:"Ferramentas",brand:"Marca demonstrativa",icon:"🧰"},
  {id:"demo-2",sku:"DEMO-002",name:"Luminária LED de sobrepor",category:"Iluminação",brand:"Marca demonstrativa",icon:"💡"},
  {id:"demo-3",sku:"DEMO-003",name:"Conjunto de conexões hidráulicas",category:"Hidráulica",brand:"Marca demonstrativa",icon:"🔧"},
  {id:"demo-4",sku:"DEMO-004",name:"Extensão elétrica reforçada",category:"Elétrica",brand:"Marca demonstrativa",icon:"🔌"},
];
export class MockCatalogAdapter implements CatalogAdapter {
  async list(params: {query?: string; category?: string} = {}) {
    const query=params.query?.trim().toLocaleLowerCase("pt-BR");
    return DEMO_PRODUCTS.filter(p=>(!query||[p.name,p.sku,p.brand,p.category].some(s=>s.toLocaleLowerCase("pt-BR").includes(query)))&&(!params.category||p.category===params.category));
  }
}
export class EsplendorCatalogAdapter implements CatalogAdapter {
  constructor(private readonly baseUrl: string) {}
  async list(params: {query?: string; category?: string} = {}) {
    const endpoint=new URL("/api/products",this.baseUrl);
    endpoint.searchParams.set("limit","120");
    if(params.query) endpoint.searchParams.set("q",params.query);
    if(params.category) endpoint.searchParams.set("categoria",params.category);
    const response=await fetch(endpoint,{next:{revalidate:300},signal:AbortSignal.timeout(8000)});
    if(!response.ok) throw new Error(`Catalog API returned ${response.status}`);
    const payload: unknown=await response.json();
    if(!payload||typeof payload!=="object"||!Array.isArray((payload as SourceResponse).items)) throw new Error("Invalid catalog response");
    const source=payload as SourceResponse;
    if(source.meta?.source==="mock") throw new Error("Upstream catalog is serving mock data");
    return source.items.filter(p=>p&&p.ativo&&p.id&&p.codigoAdm&&p.nomeVenda).map(p=>({
      id:String(p.id),sku:String(p.codigoAdm),name:String(p.nomeVenda),
      category:p.grupo||"Outros",brand:p.marca||"Marca não informada",icon:"📦",
      imageUrl:typeof p.imagemPrincipal==="string"&&/^https:\/\//i.test(p.imagemPrincipal)?p.imagemPrincipal:undefined,
      saleMultiple:typeof p.multiploVenda==="number"?p.multiploVenda:null,
      boxQuantity:typeof p.quantidadeCaixa==="number"?p.quantidadeCaixa:null,
    }));
  }
}
export const isLiveCatalogConfigured=Boolean(process.env.CATALOG_API_BASE_URL);
export const catalog: CatalogAdapter=isLiveCatalogConfigured
  ?new EsplendorCatalogAdapter(process.env.CATALOG_API_BASE_URL!)
  :new MockCatalogAdapter();
