import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, ChevronRight, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";

export const metadata: Metadata = { title: "Acesso empresarial" };

export default function SignIn() {
  return (
    <main className="container status-page">
      <div className="breadcrumbs"><Link href="/">Início</Link><ChevronRight size={14}/><span>Área do cliente</span></div>
      <div className="status-layout">
        <div className="status-copy">
          <span className="eyebrow">ÁREA EXCLUSIVA PARA EMPRESAS</span>
          <h1>Seu espaço de compras está sendo preparado.</h1>
          <p>Estamos desenvolvendo uma área segura para que cada empresa possa acessar suas próprias condições comerciais e acompanhar suas compras.</p>
          <div className="status-list">
            <span><CheckCircle2 size={19}/> Acesso empresarial individualizado</span>
            <span><CheckCircle2 size={19}/> Condições comerciais por cliente</span>
            <span><CheckCircle2 size={19}/> Experiência de compra simplificada</span>
          </div>
          <div className="inline-notice"><ShieldCheck size={19}/> O acesso ainda não está habilitado. Esta página não solicita dados ou senhas.</div>
          <Link className="button button-primary" href="/produtos">Explorar o catálogo <ArrowRight size={19}/></Link>
        </div>
        <div className="status-visual" aria-hidden="true">
          <div className="status-visual-orbit"/>
          <div className="status-panel">
            <span className="status-panel-icon"><Building2 size={32}/></span>
            <span className="status-panel-overline">PORTAL EMPRESARIAL</span>
            <strong>Bem-vindo à Esplendor.</strong>
            <div className="status-panel-field"><UserRound size={18}/> Acesso da empresa</div>
            <div className="status-panel-field"><LockKeyhole size={18}/> Área protegida</div>
            <span className="status-panel-state"><span/> Em preparação</span>
          </div>
        </div>
      </div>
    </main>
  );
}
