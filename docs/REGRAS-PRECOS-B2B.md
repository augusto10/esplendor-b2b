# Regra comercial: preços por cliente

Decisão confirmada: **cada cliente possui sua própria tabela de preços**.

## Regras obrigatórias
1. O catálogo público pode apresentar produtos, mas **não** expõe preço individual, tabela comercial ou saldo de estoque restrito.
2. Preço deve ser resolvido **no servidor**, usando a identidade autenticada do cliente e seu vínculo autorizado com o cadastro do Santri.
3. O cliente não pode escolher `cliente_id`, `tabela_id` ou parâmetros equivalentes em uma requisição para obter preços de terceiros.
4. A fonte da tabela e a regra de cálculo devem ser confirmadas na documentação OpenAPI real do Santri; **não presumir endpoints ou campos**.
5. Sem autenticação, vínculo de cliente válido ou resposta de preço confiável: **não exibir preço e não liberar compra**.
6. No carrinho, recalcular preço e validar múltiplo, embalagem, disponibilidade e condições comerciais no servidor; nunca confiar no preço enviado pelo navegador.
7. Separar cache de preços por cliente/tabela e evitar cache público compartilhado.
8. Registrar auditoria mínima de consulta e alteração comercial sem registrar senhas/tokens.
9. A integração de escrita de pedidos MaxPedido → Santri existente não será modificada. Nesta etapa, não criar pedidos no ERP.

## Etapas
- Reaproveitar o mapeamento, filtro de mix, múltiplos e fotos do `Catalogo-Esplendor`.
- Inspecionar OpenAPI do Santri e confirmar endpoints de clientes, tabelas, preços e estoque.
- Implementar autenticação empresarial e associação segura de usuário → cliente ERP.
- Criar serviço server-side de cotação de preços e estoque com testes de isolamento entre clientes.
- Só então habilitar preço e carrinho; fluxo de aprovação de pedidos ficará em banco próprio.

## Estado
Especificação de negócio confirmada. Endpoints de preço/estoque e comportamento por filial ainda **não validados**; nenhuma credencial deve ser commitada.
