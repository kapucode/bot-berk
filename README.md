# Base Bot Discord usando Discord.js
Uma simples base de bot, facilitando a criação de comandos (usando handlers) e slash & subcommands.
- Antes de tudo, lembre-se de ter o Node.js e o NPM instalados em sua máquina.

## Instalação 
1. Clone o repositório:
```
git clone https://github.com/kapucode/base-bot-v1
```

2. Instale as dependências do projeto:
```
npm install
```

3. Renomeie o arquivo **.env.example** para **.env** e em seguida preencha as informações necessárias no arquivo:
```
BOT_TOKEN=token do bot
CLIENT_ID=id do bot
GUILD_ID=id do seu servidor
```

## Pasta /examples
Na pasta, há exemplos de como criar cada coisa. Por exemplo, como criar um slash subcommand que funcione de acordo com a estrutura do projeto. Além das coisas simples, a base possui estruturas e classes UI prontas para uso, e em `examples` mostra como usa elas.

## Personalização 
O arquivo `core/structures/client.js` possui variáveis do objeto de `client` facilmente personalizáveis. Caso queira, você pode alterá-las do jeito que preferir.
- Não recomendamos mexer nas variáveis que são Collection's `(new Collection())` caso você não souber mexer nisso, pois nelas que os comandos são registrados.

A base possui o arquivo `src/ui/Messages.js` que possui mensagens reutilizáveis para ocasiões diferentes. Por exemplo, mensagens de erro, mensagem de menção do bot, e mais. Você pode utilizar ela para exibir mensagens, assim como também pode adicionar mais.