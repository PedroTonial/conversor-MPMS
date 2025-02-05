# Teste Técnico - Mercado de Pulgas dos Mil Saberes

## Descrição Geral

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 14.1.2.

Este projeto utiliza a Versão v18.20.5 do [NodeJS](https://nodejs.org/en).

## Executando a Aplicação pela primeira vez:

Clone o repositório de [link do repo]

Dentro da pasta do projeto execute o comando `npm install` para instalar as dependências do Node básicas do projeto.

O projeto não necessita "rodar" um banco + backend, ele está sendo emulado com a plataforma Firebase, com um real-time database, para simular de forma fiel um ambiente de desenvolvimento. O banco encontra-se em [link Firebase]

Execute `npm start` para executar o servidor local do projeto (`http://localhost:4200/`) e testar a aplicação.

## Funcionalidades Extras:

1. Selecionar a moeda de origem e a moeda de destino separadamente, para que a aplicação seja dinâmica e escalável - caso o mercado de pulgas queira expandir negócios.

2. Para manter uma UX amigável e intuitiva, foi adicionado um botão _switch_, que alterna entre as moedas de origem e destino, para facilitar a checagem dos valores de conversão e/ou apenas inverter as moedas entre si.

3. Para melhoria das mensagens de erro, foram adicionados toasters de aviso em todos os métodos HTTP, além de também terem sido adicionados nos campos de input na tela painel-conversao.

4. Como dito acima, para a simulação mais próxima de um ambiente de desenvolvimento real, foi utilizado o Real-Time Database da plataforma Firebase, como banco de dados e Endpoint da aplicação.

5. Além dos filtros pedidos, o histórico possui filtros para todos os campos da tabela, assim como mais colunas de informação.

6. Com foco na UX, foram implementadas funções dinâmicas que habilitam e desabilitam botões conforme a validação dos campos de preenchimento.

7. Foram adicionados componentes de loading, para simular um carregamento de dados, principalmente na tabela de transações, caso um anão tenha criado algum erro no backend - ou a forja esteja fria - e a resposta do endpoint seja lenta!
