import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Filter, PackageSearch, Search, SlidersHorizontal, X } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { catalog, isLiveCatalogConfigured } from "@/features/products/catalog";
import { categories } from "@/lib/storefront";

export const metadata: Metadata = {
  title: "Catálogo de produtos",
  description: "Encontre produtos por categoria, nome, marca ou código no portal Esplendor Atacadista.",
};

type Params = { q?: string; categoria?: string };

function filterHref(category: string, q: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("categoria", category);
  const query = params.toString();
  return "/produtos" + (query ? "?" + query : "");
}

export default async function Products({ searchParams }: { searchParams: Promise<Params> }) {
  const p = await searchParams;
  const q = typeof p.q === "string" ? p.q.trim().slice(0, 120) : "";
  const category = typeof p.categoria === "string" ? p.categoria.trim() : "";
  const selected = categories.find((item) => item.value.toLocaleLowerCase("pt-BR") === category.toLocaleLowerCase("pt-BR"));
  let products: Awaited<ReturnType<typeof catalog.list>> = [];
  let unavailable = false;
  try {
    products = await catalog.list({ query: q || undefined, category: category || undefined });
  } catch {
    unavailable = true;
  }

  return (
    <main className="catalog-page">
      <div className="container">
        <div className="breadcrumbs"><Link href="/">Início</Link><ChevronRight size={14}/><span>Produtos</span>{selected && <><ChevronRight size={14}/><span>{selected.label}</span></>}</div>
        <div className="catalog-title-row">
          <div><span className="eyebrow">ESPLENDOR ATACADISTA</span><h1>Catálogo de produtos</h1><p>Encontre exatamente o que seu negócio precisa.</p></div>
          <span className="catalog-page-label"><PackageSearch size={19}/> Portal de compras B2B</span>
        </div>

        <div className="catalog-layout">
          <aside className="filters-panel" aria-label="Filtros de produtos">
            <div className="filters-heading"><span><SlidersHorizontal size={19}/> Departamentos</span><Filter size={16}/></div>
            <nav className="filter-links" aria-label="Filtrar por categoria">
              <Link className={!category ? "active" : ""} href={filterHref("", q)}>Todos os produtos <ChevronRight size={15}/></Link>
              {categories.map((item) => (
                <Link key={item.value} className={item.value.toLocaleLowerCase("pt-BR") === category.toLocaleLowerCase("pt-BR") ? "active" : ""} href={filterHref(item.value, q)}>
                  {item.label} <ChevronRight size={15}/>
                </Link>
              ))}
            </nav>
            <div className="filter-tip"><PackageSearch size={21}/><strong>Procurando um item?</strong><p>Use a busca pelo nome do produto, marca ou código.</p></div>
          </aside>

          <div className="catalog-results">
            <form action="/produtos" role="search" className="catalog-search">
              {category && <input type="hidden" name="categoria" value={category}/>}
              <Search size={20}/>
              <input name="q" defaultValue={q} aria-label="Buscar neste catálogo" placeholder="Busque por produto, marca ou código" />
              <button type="submit">Buscar <ArrowRight size={17}/></button>
            </form>
            <div className="results-toolbar">
              <div>
                <h2>{selected ? selected.label : q ? "Resultados da busca" : "Todos os produtos"}</h2>
                <p>{unavailable ? "Consulta indisponível" : products.length + (products.length === 1 ? " produto exibido" : " produtos exibidos")}{q && " para “" + q + "”"}</p>
              </div>
              {(q || category) && <Link href="/produtos" className="clear-filters"><X size={15}/> Limpar filtros</Link>}
            </div>

            {!isLiveCatalogConfigured && !unavailable && <div className="inline-notice">Vitrine demonstrativa: os produtos exibidos são exemplos, sem preços ou estoque do ERP.</div>}
            {unavailable ? (
              <div className="empty-state"><PackageSearch size={32}/><strong>Não foi possível carregar o catálogo</strong><p>O serviço de produtos está temporariamente indisponível. Tente novamente mais tarde.</p><Link className="button button-outline" href="/produtos">Tentar novamente <ArrowRight size={17}/></Link></div>
            ) : <ProductGrid products={products}/>}
            {!unavailable && isLiveCatalogConfigured && <p className="catalog-disclaimer">Produtos apresentados para consulta. Preços, estoque e compras serão disponibilizados após a implementação do acesso empresarial.</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
