import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, ChevronRight, CircuitBoard,
  Droplets, HardHat, Hammer, Lightbulb, Package, PackageSearch,
  Paintbrush, SearchCheck, ShieldCheck, Sparkles, Sprout, Wrench, Zap
} from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { catalog, isLiveCatalogConfigured } from "@/features/products/catalog";
import { categories, categoryHref } from "@/lib/storefront";

const categoryIcons = [Wrench, Zap, Droplets, Lightbulb, Hammer, Paintbrush, HardHat, Package, Sprout];

export default async function Home() {
  let products: Awaited<ReturnType<typeof catalog.list>> = [];
  let unavailable = false;
  try {
    products = await catalog.list();
  } catch {
    unavailable = true;
  }

  return (
    <main>
      <div className="container">
        <div className="welcome-line">
          <span><Sparkles size={15} /> Bem-vindo ao portal Esplendor Atacadista</span>
          <span>Uma nova experiência para comprar no atacado</span>
        </div>

        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <span className="hero-eyebrow"><span className="status-dot" /> ESPLENDOR PARA EMPRESAS</span>
            <h1 id="hero-heading">Sua empresa precisa de soluções. <em>A gente simplifica.</em></h1>
            <p>Encontre produtos para o seu negócio em um catálogo organizado, com navegação rápida e a confiança da Esplendor Atacadista.</p>
            <div className="hero-actions">
              <Link href="/produtos" className="button button-accent">Explorar produtos <ArrowRight size={19} /></Link>
              <a href="https://catalogo.esplendoratacadista.com.br/" target="_blank" rel="noopener noreferrer" className="button button-hero-ghost">
                Catálogo institucional <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-footnote"><ShieldCheck size={16} /> Portal dedicado ao atendimento de clientes empresariais</div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-orbit orbit-one" />
            <div className="hero-art-orbit orbit-two" />
            <div className="hero-feature-card">
              <div className="feature-card-top"><span className="feature-card-stamp"><PackageSearch size={16} /></span><span>CATÁLOGO ESPLENDOR</span><span className="feature-card-dots">•••</span></div>
              <div className="feature-card-icon"><CircuitBoard size={64} strokeWidth={1.15} /></div>
              <div className="feature-card-info"><span>Encontre tudo em um só lugar</span><strong>O próximo item do seu negócio.</strong></div>
              <div className="feature-card-bottom"><span><span className="mini-dot" /> Navegação simplificada</span><ArrowUpRight size={18} /></div>
            </div>
            <div className="floating-tile floating-tile-first"><span><Wrench size={25} /></span><div><strong>Ferramentas</strong><small>Para cada desafio</small></div><ChevronRight size={16} /></div>
            <div className="floating-tile floating-tile-second"><span><Zap size={24} /></span><div><strong>Elétrica</strong><small>Soluções completas</small></div><ChevronRight size={16} /></div>
            <span className="hero-sparkle hero-sparkle-one">✦</span>
            <span className="hero-sparkle hero-sparkle-two">✳</span>
          </div>
        </section>
      </div>

      <section className="container benefit-strip" aria-label="Vantagens do portal">
        <div className="benefit-item"><div className="benefit-icon"><SearchCheck size={24}/></div><div><strong>Encontre com facilidade</strong><span>Busque por nome, marca ou código.</span></div></div>
        <div className="benefit-item"><div className="benefit-icon"><PackageSearch size={24}/></div><div><strong>Catálogo organizado</strong><span>Produtos reunidos por categoria.</span></div></div>
        <div className="benefit-item"><div className="benefit-icon"><BadgeCheck size={24}/></div><div><strong>Foco no seu negócio</strong><span>Uma experiência feita para empresas.</span></div></div>
      </section>

      <section className="container content-section" aria-labelledby="categories-title">
        <div className="section-heading">
          <div><span className="eyebrow">NAVEGUE POR DEPARTAMENTO</span><h2 id="categories-title">O que você procura hoje?</h2><p>Explore nossas linhas de produtos e encontre o que faz sentido para seu negócio.</p></div>
          <Link className="text-link" href="/produtos">Ver todas as categorias <ArrowRight size={18}/></Link>
        </div>
        <div className="categories-grid">
          {categories.slice(0, 8).map((category, index) => {
            const Icon = categoryIcons[index];
            return (
              <Link className={"category-card tone-" + (index % 4)} href={categoryHref(category.value)} key={category.value}>
                <span className="category-icon"><Icon size={30} strokeWidth={1.7}/></span>
                <strong>{category.label}</strong>
                <small>{category.description}</small>
                <span className="category-arrow"><ArrowUpRight size={17}/></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="products-section" aria-labelledby="products-heading">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">EXPLORE NOSSO CATÁLOGO</span><h2 id="products-heading">{isLiveCatalogConfigured ? "Uma seleção para você começar" : "Conheça a experiência Esplendor"}</h2><p>{isLiveCatalogConfigured ? "Alguns itens disponíveis para consulta no catálogo." : "Uma demonstração de como os produtos serão apresentados."}</p></div>
            <Link className="text-link" href="/produtos">Ver todos os produtos <ArrowRight size={18}/></Link>
          </div>
          {unavailable ? (
            <div className="empty-state compact-empty"><PackageSearch size={28}/><strong>Catálogo temporariamente indisponível</strong><p>Não foi possível carregar os produtos. Tente novamente mais tarde.</p></div>
          ) : (
            <>
              {!isLiveCatalogConfigured && <div className="inline-notice"><Sparkles size={17} /> Esta é uma vitrine demonstrativa. Os produtos exibidos não são itens reais do ERP.</div>}
              <ProductGrid products={products.slice(0, 8)} />
            </>
          )}
          <div className="view-more-wrap"><Link href="/produtos" className="button button-outline">Ver catálogo completo <ArrowRight size={18}/></Link></div>
        </div>
      </section>

      <section className="container closing-banner" aria-label="Acesso empresarial">
        <div className="closing-icon"><PackageSearch size={35} /></div>
        <div><span className="eyebrow">UM PORTAL PENSADO PARA SUA EMPRESA</span><h2>Seu próximo pedido começa com uma boa escolha.</h2><p>Explore produtos enquanto preparamos as próximas funcionalidades de compra B2B.</p></div>
        <Link href="/produtos" className="button button-light">Explorar catálogo <ArrowRight size={19}/></Link>
      </section>
    </main>
  );
}
