/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, LockKeyhole, PackageOpen, ShoppingBag } from "lucide-react";
import type { CatalogProduct } from "@/features/products/catalog";
import { isLiveCatalogConfigured } from "@/features/products/catalog";

export function ProductGrid({ products }: { products: CatalogProduct[] }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <PackageOpen size={34}/>
        <strong>Nenhum produto encontrado</strong>
        <p>Tente buscar por outro termo ou explore uma categoria diferente.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <div className="product-image">
            <div className="product-fallback" aria-hidden="true"><PackageOpen size={42} strokeWidth={1.3}/></div>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} loading="lazy" decoding="async" referrerPolicy="no-referrer"/>
            )}
            <span className="product-image-badge">{isLiveCatalogConfigured ? "CATÁLOGO" : "DEMONSTRAÇÃO"}</span>
          </div>
          <div className="product-info">
            <div className="product-meta"><span>{product.brand}</span><span>Cód. {product.sku}</span></div>
            <h3>{product.name}</h3>
            {(Boolean(product.saleMultiple) || Boolean(product.boxQuantity)) && (
              <div className="product-quantities">
                {!!product.saleMultiple && <span>Múltiplo: <strong>{product.saleMultiple}</strong></span>}
                {!!product.boxQuantity && <span>Caixa: <strong>{product.boxQuantity} un.</strong></span>}
              </div>
            )}
            <div className="product-bottom">
              <div className="price-placeholder"><LockKeyhole size={14}/><span>Valores em breve</span></div>
              <button type="button" disabled aria-label={"Compra indisponível para " + product.name} className="product-cart-button"><ShoppingBag size={18}/><ArrowUpRight size={12}/></button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
