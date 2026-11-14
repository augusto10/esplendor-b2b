import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { catalog, isLiveCatalogConfigured } from "@/features/products/catalog";
const categories=[{name:"Ferramentas",icon:"🧰"},{name:"Elétrica",icon:"⚡"},{name:"Hidráulica",icon:"🚰"},{name:"Iluminação",icon:"💡"}];
export default async function Home() {
  let products: Awaited<ReturnType<typeof catalog.list>>=[];
  let unavailable=false;
  try { products=await catalog.list(); } catch { unavailable=true; }
  return <main className="shell"><section className="hero"><div><span className="pill">O seu parceiro em negócios</span><h1>Mais praticidade para <span className="accent">abastecer seu negócio.</span></h1><p>Explore nossa nova experiência de compra B2B. Em breve, catálogo integrado, condições comerciais e pedidos com aprovação.</p><Link href="/produtos" className="btn" style={{background:"#f49a46",color:"#13243b",marginTop:15}}>Explorar catálogo →</Link></div><div className="heroicon" aria-hidden="true">✦</div></section><section className="section"><div className="sectionhead"><h2>Compre por categoria</h2><span className="muted">Encontre o que sua empresa precisa</span></div><div className="categories">{categories.map(c=><Link className="category" href={'/produtos?categoria='+encodeURIComponent(c.name)} key={c.name}><span className="emoji">{c.icon}</span>{c.name} →</Link>)}</div></section><section className="section"><div className="sectionhead"><h2>{isLiveCatalogConfigured?"Produtos do catálogo":"Vitrine demonstrativa"}</h2><Link href="/produtos">Ver catálogo →</Link></div>{unavailable?<p className="notice">Catálogo indisponível no momento. Nenhum produto demonstrativo será apresentado como real.</p>:<>{!isLiveCatalogConfigured&&<p className="notice" style={{marginBottom:19}}>Estes produtos são exemplos de interface. Nenhum preço, estoque ou pedido está conectado ao Santri.</p>}<ProductGrid products={products}/></>}</section></main>;
}
