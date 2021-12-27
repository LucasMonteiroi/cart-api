# Cart API

Esta API foi desenvolvida para simular um carrinho de compras, atendendo as seguintes necessidades:

- Adicionar um item no carrinho
- Atualizar a quantidade de um item no carrinho
- Remover um item do carrinho
- Limpar o carrinho
- Gerar totais e subtotais
- Adicionar um cupom de desconto ao carrinho
- Persistir o carrinho
- Recuperar o carrinho
- Retornar um JSON com o carrinho completo

# Consumindo a API

Para executar o fluxo de carrinho e consumir os métodos (com exceção da criação de um carrinho), recomenda-se criar os seguintes itens previamente:

1. Produto
2. Cupom de desconto (opcional)

Após esses itens prévios, os fluxos podem ser executados normalmente

## Modelos de Dados

Os modelos de dados das entidades criadas são os abaixo:

#### Produto

| Atributo    | Tipo   | Obrigatorio |
| ----------- | ------ | ----------- |
| Name        | String | Sim         |
| Description | String | Não         |
| Barcode     | String | Sim         |
| Value       | Number | Sim         |

#### Cupom de Desconto

| Atributo     | Tipo    | Obrigatorio |
| ------------ | ------- | ----------- |
| Tag          | String  | Sim         |
| Description  | String  | Não         |
| Amount       | String  | Sim         |
| IsPercentage | Boolean | Sim         |

#### Carrinho

| Atributo        | Tipo   | Obrigatorio |
| --------------- | ------ | ----------- |
| Store           | String | Não         |
| Products        | Array  | Não         |
| DiscountCoupon  | String | Não         |
| Total           | Number | Não         |
| DiscountApplied | Number | Não         |
| Subtotal        | Number | Não         |

## Tecnologias utilizadas

O projeto foi desenvolvido em NodeJs e as seguintes tecnologias e frameworks foram utilizadas:

- Mongodb (com Mongoose)
- Express
- Eslint
- Prettier
- Docker (com Compose)

## Como rodar a API?

Para rodar a API será necessário ter em sua máquina: **Docker, Insomina, NodeJs**
Com isso execute os comandos abaixo:

```bash
# Clonar repositório
$ git clone https://github.com/LucasMonteiroi/cart-api.git

# Navegue até a pasta
$ cd cart-api

# Instale as dependências e execute os containers
$ docker-compose up
```

## Como consumir a API?

Baixe a collection de requests abaixo:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Cart%20API&uri=https%3A%2F%2Fgithub.com%2FLucasMonteiroi%2Fcart-api%2Fblob%2Fmain%2FRequests.json)
