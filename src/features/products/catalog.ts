export type CatalogProduct = { id: string; sku: string; name: string; category: string; brand: string; icon: string };
export interface CatalogAdapter { list(params?: { query?: string; category?: string }): Promise<CatalogProduct[]>; }
// Dados exclusivamente demonstrativos. Não correspondem a produtos, preços ou estoques reais.
const DEMO_PRODUCTS: CatalogProduct[] = [
 {id:"demo-1",sku:"DEMO-001",name:"Kit de ferramentas profissional",category:"Ferramentas",brand:"Marca demonstrativa",icon:"🧰"},
 {id:"demo-2",sku:"DEMO-002",name:"Luminária LED de sobrepor",category:"Iluminação",brand:"Marca demonstrativa",icon:"💡"},
 {id:"demo-3",sku:"DEMO-003",name:"Conjunto de conexões hidráulicas",category:"Hidráulica",brand:"Marca demonstrativa",icon:"🔧"},
 {id:"demo-4",sku:"DEMO-004",name:"Extensão elétrica reforçada",category:"Elétrica",brand:"Marca demonstrativa",icon:"🔌"},
];
export class MockCatalogAdapter implements CatalogAdapter { async list(params: {query?: string; category?: string} = {}) { const query=params.query?.trim().toLocaleLowerCase("pt-BR");return DEMO_PRODUCTS.filter(p=>(!query||[p.name,p.sku,p.brand,p.category].some(s=>s.toLocaleLowerCase("pt-BR").includes(query)))&&(!params.category||p.category===params.category)); } }
export const catalog: CatalogAdapter = new MockCatalogAdapter();
