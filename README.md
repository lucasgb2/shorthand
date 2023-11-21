
# Shorthand

Este projeto consiste em um arquitetura para gerenciamento de encurtação de links da web. Em síntese, o usuário acessará a página principal, informará o link no qual deseja encurtar e o sistema devolverá um novo link que ao ser acessado redirecionará para o link original uma vez informado.

## Em que situações eu precisaria de uma ferramenta que encurta links?

- Rastreabilidade
    - Ao gerar vários links encurtados de um mesmo link alvo, você consegue disponibiliza-lós em diferentes pontos estratégicos afim de saber a origem do redirecionamento.

- Redes Sociais
    - A maioria das redes sociais possui limite de caracteres em postagens, assim com encurtador de links você garante menos caracteres.


## Arquitetura

![Arquitetura](https://drive.google.com/uc?export=view&id=1CMfgjRhAq0_XAnpcoKa51LCsxT3qm4qQ)

### Descrição sobre arquitetura

O sistema foi projetado para possuir várias instâncias da API sendo executadas, assim sendo possível distribuir em vários pontos geográficos afim de diminuir a latência nas requisições.

Quando uma instância da API inicializa, um range de tokens é obtido do banco "Database RDBMS (SQLite, MySQL, Postgresql etc...)". Esse range de token somente estará disponível unicamente para a instância, conforme as requisições vão chegando 
este range é consumido, esgotando o range, um novo é obtido.

Ao solicitar um encurtamento de um link, um token é reservado e vinculado ao token alvo, dentre outras informações que são persitidos em um documento no banco "Database NoSQL". O token é vinculando como chave e o link alvo como valor
em uma instância de "Cache Redis". O fluxo finaliza com a devolução do link incurtado por completo, host e token.

Ao ser acessado o link, uma chamada GET será feita para API, o sistema verifica se há o token em cache, havendo o link alvo é recuperado e redirecionado para o usuário. Não havendo em cache, é recuperado do "Database NoSQL" salvo em cache e segue o fluxo anterior.

## Tecnologias utilizadas
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" width="50" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" width="50"  />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original-wordmark.svg" width="50" />








