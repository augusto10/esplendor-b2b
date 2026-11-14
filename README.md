# Esplendor B2B

Primeira versão navegável da loja virtual B2B da Esplendor Atacadista, com estilo premium e foco em compra no atacado.

## Executar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. Para validar a compilação, execute `npm run build` e `npm run typecheck`.

## Escopo implementado

- Home com hero, categorias e vitrine.
- Catálogo demonstrativo com pesquisa e filtro por categoria.
- Navegação para carrinho e acesso empresarial (páginas preparatórias).
- Adaptador de catálogo tipado com dados explicitamente demonstrativos.
- Layout responsivo inicial.

**Importante:** preços, estoque, login, carrinho funcional, pedidos e aprovação comercial ainda não estão implementados. Nenhuma operação de escrita no Santri é realizada. O código de integração do MaxPedido permanece intocado.

Veja [a arquitetura](docs/ARQUITETURA.md) e os próximos passos.
