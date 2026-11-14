# Arquitetura inicial

## Etapa atual
- Next.js com App Router e TypeScript.
- Identidade visual provisória, a validar com a marca oficial.
- `CatalogAdapter` e `MockCatalogAdapter` isolados da interface.
- Nenhum preço, estoque, login, pedido ou checkout real nesta entrega.
- Páginas de catálogo, carrinho e acesso empresarial apenas como base de navegação.

## Integração futura
1. Inspecionar contrato da API de leitura do catálogo atual.
2. Implementar `SantriCatalogAdapter` no servidor, sem inventar endpoints e sem expor tokens.
3. Criar autenticação empresarial com isolamento por CNPJ/empresa.
4. Criar banco PostgreSQL e modelo de pedidos com aprovação comercial obrigatória.
5. Checkout salva solicitação `PENDING_APPROVAL` em banco próprio.
6. Aprovação altera somente estados locais. Envio ao Oracle fica fora deste escopo e exige homologação separada.

## Segurança
Não inserir segredos no repositório, não executar SQL de escrita no ERP e não alterar o integrador MaxPedido.
