import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, PackageOpen, ShieldCheck, ShoppingBag } from "lucide-react";

export const metadata: Metadata = { title: "Carrinho" };

export default function Cart() {
  return (
    <main className="container status-page">
      <div className="breadcrumbs"><Link href="/">Início</Link><ChevronRight size={14}/><span>Meu carrinho</span></div>
      <div className="cart-intro"><span className="eyebrow">SUA JORNADA DE COMPRA</span><h1>Meu carrinho</h1><p>Em breve, seus produtos selecionados estarão reunidos aqui.</p></div>
      <div className="cart-empty">
        <div className="cart-empty-icon"><ShoppingBag size={42} strokeWidth={1.4}/></div>
        <h2>O carrinho está quase pronto para você.</h2>
        <p>A funcionalidade de compra será liberada após a integração de autenticação, preços por cliente e estoque. Enquanto isso, explore nosso catálogo.</p>
        <div className="cart-security"><ShieldCheck size={18}/> Nenhum pedido é enviado ao ERP nesta etapa.</div>
        <Link className="button button-primary" href="/produtos">Explorar produtos <ArrowRight size={19}/></Link>
        <span className="cart-empty-bottom"><PackageOpen size={17}/> Catálogo disponível para consulta <CheckCircle2 size={17}/></span>
      </div>
    </main>
  );
}
