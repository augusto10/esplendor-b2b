# Integração com Catalogo-Esplendor

Fonte examinada: repositório privado `augusto10/Catalogo-Esplendor`, branch `versao-2.0-catalogo`.

## Contrato verificado
- `GET /api/products` aceita `q`, `categoria`, `limit`, `offset`.
- Resposta: `items` com `id`, `codigoAdm`, `nomeVenda`, `grupo`, `marca`, `imagemPrincipal`, `multiploVenda`, `quantidadeCaixa`, `ativo`; e `meta.source`.
- O catálogo de origem pode retornar dados locais ou mockados, conforme configuração.
- O catálogo original não apresenta preços; não há autorização para inventar preços ou estoque.

## Configuração
Defina `CATALOG_API_BASE_URL` no ambiente do servidor apontando para a implantação acessível do catálogo. A URL de produção sugerida deve ser validada antes do uso.

Quando configurado, o adaptador faz consulta server-side e rejeita `meta.source=mock`. Se a API falhar, a loja exibe indisponibilidade, sem fingir dados reais. Sem variável, usa demonstração explicitamente identificada.

## Limitações desta primeira adaptação
- Não foram executados testes de rede ou build.
- A API de origem limita a consulta e seu handler atual carrega um lote inicial antes de filtrar; paginação completa e sincronização precisam ser projetadas para um catálogo grande.
- Imagens relativas da origem não são reutilizadas nesta fase. Exibir emoji genérico até implementar proxy seguro de imagens ou assets sincronizados.
- Grupos da origem não correspondem necessariamente às quatro categorias de marketing da home; mapear taxonomia após conferir dados reais.
- Não há carrinho, preços, autenticação ou checkout funcional.
- Nenhuma escrita no Santri ou alteração no catálogo original.
