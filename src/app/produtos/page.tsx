import { catalog, isLiveCatalogConfigured } from "@/features/products/catalog";
import { ProductGrid } from "@/components/product-grid";
export default async function Products({searchParams}:{searchParams:Promise<{q?:string;categoria?:string}>}){
  const p=await searchParams;
  let items:Awaited<ReturnType<typeof catalog.list>>=[];
  let unavailable=false;
  try { items=await catalog.list({query:p.q,category:p.categoria}); } catch { unavailable=true; }
  return <main className="shell section"><h1 style={{fontSize:36,fontWeight:850,letterSpacing:"-.045em"}}>Catálogo de produtos</h1><p className="muted" style={{marginBottom:24}}>{isLiveCatalogConfigured?"Produtos consultados no catálogo da Esplendor.":"Busca demonstrativa por produto, categoria ou código. Integração real ainda não configurada."}</p>{unavailable?<p className="notice">Não foi possível consultar o catálogo. Verifique a configuração e a disponibilidade da origem.</p>:<ProductGrid products={items}/>}</main>;
}
