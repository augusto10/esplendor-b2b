import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Headphones, LockKeyhole, PackageCheck,
  Search, ShoppingBag, UserRound
} from "lucide-react";
import { categories, categoryHref } from "@/lib/storefront";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Esplendor Atacadista | Portal de compras B2B",
    template: "%s | Esplendor Atacadista",
  },
  description: "Explore o catálogo Esplendor Atacadista com praticidade. Um portal dedicado às compras empresariais.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="utility-bar">
          <div className="container utility-inner">
            <span className="utility-intro"><LockKeyhole size={13} strokeWidth={2.3} /> Portal exclusivo para empresas</span>
            <a href="https://catalogo.esplendoratacadista.com.br/" target="_blank" rel="noopener noreferrer">
              Visite nosso catálogo institucional <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        <header className="site-header">
          <div className="container header-main">
            <Link href="/" className="brand" aria-label="Esplendor Atacadista — página inicial">
              <span className="brand-mark" aria-hidden="true"><span>E</span><i /></span>
              <span className="brand-type">
                <strong>esplendor<span>.</span></strong>
                <small>ATACADISTA</small>
              </span>
            </Link>

            <form className="header-search" role="search" action="/produtos">
              <Search size={19} aria-hidden="true" />
              <input name="q" aria-label="Buscar produtos, marcas e códigos"
                placeholder="O que sua empresa está procurando?" />
              <button type="submit" aria-label="Buscar produtos"><Search size={18} /></button>
            </form>

            <div className="header-actions">
              <Link className="header-action account-action" href="/entrar">
                <span className="header-action-icon"><UserRound size={21} /></span>
                <span><small>Área do cliente</small><strong>Entrar</strong></span>
              </Link>
              <Link className="header-action cart-action" href="/carrinho">
                <span className="header-action-icon"><ShoppingBag size={21} /></span>
                <span><small>Meus produtos</small><strong>Carrinho</strong></span>
              </Link>
            </div>
          </div>
          <nav className="category-nav" aria-label="Navegação principal">
            <div className="container category-nav-inner">
              <Link className="nav-all" href="/produtos"><span className="nav-grid-mark" aria-hidden="true">▦</span> Todos os produtos</Link>
              {categories.slice(0, 8).map((category) => (
                <Link key={category.value} href={categoryHref(category.value)}>{category.label}</Link>
              ))}
              <Link className="nav-view-all" href="/produtos">Ver catálogo <ArrowRight size={15} /></Link>
            </div>
          </nav>
        </header>

        {children}

        <footer className="site-footer">
          <div className="container footer-top">
            <div className="footer-about">
              <Link href="/" className="brand brand-footer" aria-label="Esplendor Atacadista — início">
                <span className="brand-mark" aria-hidden="true"><span>E</span><i /></span>
                <span className="brand-type"><strong>esplendor<span>.</span></strong><small>ATACADISTA</small></span>
              </Link>
              <p>Mais praticidade para quem movimenta negócios. Um espaço pensado para facilitar sua busca por produtos no atacado.</p>
            </div>
            <div className="footer-column">
              <h3>Explore</h3>
              <Link href="/produtos">Todos os produtos</Link>
              <Link href={categoryHref("FERRAMENTAS")}>Ferramentas</Link>
              <Link href={categoryHref("ELÉTRICA")}>Elétrica</Link>
              <Link href={categoryHref("HIDRÁULICA")}>Hidráulica</Link>
            </div>
            <div className="footer-column">
              <h3>Área empresarial</h3>
              <Link href="/entrar">Acesso do cliente</Link>
              <Link href="/carrinho">Carrinho</Link>
              <a href="https://catalogo.esplendoratacadista.com.br/" target="_blank" rel="noopener noreferrer">Catálogo institucional <ArrowUpRight size={13} /></a>
            </div>
            <div className="footer-support">
              <span className="footer-support-icon"><Headphones size={22} /></span>
              <h3>Conte com a Esplendor</h3>
              <p>Atendimento comercial e um catálogo pensado para o dia a dia da sua empresa.</p>
              <Link href="/produtos">Explorar produtos <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="container footer-bottom">
            <span>© {new Date().getFullYear()} Esplendor Atacadista. Todos os direitos reservados.</span>
            <span><PackageCheck size={14} /> Portal B2B em implantação · Compras ainda não habilitadas</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
