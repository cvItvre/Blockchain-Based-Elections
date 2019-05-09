# Sistema de Votação Eletrônica Baseada na Etehreum Blockchain

Sistema para votação eletrônica usando como base a Ethereum Blockchain. O uso da Blockchain garante a imutabilidade do dado, a eliminação do ponto único de falha, a distribuição dos dados e confiabialidade. Junto a isso temos o *smart contract* que nos garante a transparência, o voto único e o voto secreto.

## Getting Started

As instruções abaixo mostram quais são as dependencias, como instalá-las e explica cada parte da arquitetura do projeto.

### Prerequisites

* [Node.js](https://nodejs.org/en/) - Interpretador de código JavaScript.

```
Intale a versão LTS. Após instalado, abra seu bash ou prompt e rode o comando abaixo:

node -v

Se aparecer a versão do node, ele foi instalado com sucesso.
```
* [Truffle Framework](https://truffleframework.com/truffle) - Framework para o desenvolvimento de DApps.

```
Para instalar o Truffle vá ao terminal e digite:

npm install -g truffle
```

* [Ganache](https://truffleframework.com/ganache) - Blockchain local para o teste de DApps.

* [MetaMask](https://metamask.io/) - Extensão para o Google Chrome que permite se conectar à uma rede Ethereum e interagir com os smart contracts diretamente pelo Browser.

* [Ethereum Package Control](https://packagecontrol.io/packages/Ethereum) - Solidity Sintax Highlighting para o SublimeText 3.

```
1 Passo: Instalação do Package Control
  Instalação Simples
  
> Abra o console do SublimeText 3. (ctrl+ ou View -> Show Console)
> Cole o código python abaixo e dê enter.

import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

> Reinicie o Sublime.

  Instalação Manual

> Faça o download do Package Control (https://packagecontrol.io/Package%20Control.sublime-package).
> No Sublime vá até Preferences -> Browse Packages.
> Vá até o diretório Installed Packages/ e cole o download do Package Control dentro desse diretório.
> Reinicie o Sublime.

2 Passo: Instalação da sintaxe do Solidity

> Abra a Command Palette (Ctrl + Shift + P ou Tools -> Command Palette)
> Digite Install Package até aparecer Package Control: Install Package
> Digite Ethereum e selecione a opção de isntalar a sintaxe do Solidity.
> Reinicie o Sublime.

```

* [Mocha.js](https://mochajs.org/) - Framework de testes.

* [Chai.js](https://www.chaijs.com/) - Biblioteca de assertions para os testes.

### Understanding the Project Architecture

* **Rode a Blockchain local**  
Antes de tudo, abra o Ganache. A partir de agora sua Blockchain local estará rodando.

* **Set o projeto**  
Selecione um diretório específico e clone o projeto para sua máquina. Após isso abra-o como projeto no Sublime.

* **Os diretórios e arquivos: /contracts/**  
Este diretório é onde ficam todos os nossos *smart contracts*.

* **Os diretórios e arquivos: /contracts/Migrations.sol**  
Esse contrato que vai cuidar com todas as migrações sempre que implantarmos o contrato na Blockchain.

* **Os diretórios e arquivos: /contracts/Elections.sol**  
Contrato principal das eleições.

* **Os diretórios e arquivos: /mirations/**  
Este diretório é onde ficam todos os nossos arquivos de migração.

* **Os diretórios e arquivos: /mirations/1_initial_migration.js**  
Primeiro arquivo de migração, necessário para implantar nossos contratos para a Blockchain, porque quando fazemos isso, nós estamos criando uma transação na Blockchain, estamos mudando seu estado, assim como ocorre em um banco de dados.

* **Os diretórios e arquivos: /mirations/2_election_migration.js**  
Arquivo de migração para implantar o contrato Elections.sol para conseguirmos interagir com ele no console do Truffle

* **Os diretórios e arquivos: /node_modules/**  
Este diretório contém todas as nossas dependências do node irão ficar.

* **Os diretórios e arquivos: /src/**  
Este é o diretório onde fica todo o código do lado do cliente da nossa aplicação.

* **Os diretórios e arquivos: /test/**  
Este é o diretório que contém todos os nossos arquivos de teste.

* **Os diretórios e arquivos: /package.json**  
Arquivo que especifica todas as nossas dependências

* **Os diretórios e arquivos: /truffle.js**  
Arquivo que contém toda a configuração principal para o projeto Truffle.

## How to Run

### Console

* Migrar e fazer o deploy do contrato na Blockchain

```
truffle migrate
```

* Após alguma alteração no projeto, para remigrar o contrato

```
truffle migrate --reset
```

* Rodar os testes

```
truffle test
```

### Client-Side

* Migrar o contrato

```
truffle migrate [--reset]
```

* Iniciar o Light Server

```
npm run dev
```
> Na primeira vez o browser irá abrir provavelmente na porta 3000, o que significa que não está concetado à Blockchain local.

## How to Interact

### Console

**1. Após fazer o deploy do contrato abra o console do truffle.**

```
truffle console  
```

**2. Instancie o contrato.**

```
Elections.deployed().then(function(i) { app = i; })
```
> Nesse momento a variável app é uma instância do nosso contrato.  

**3. Para acessar uma variável de estado, por exemplo elecitonCount, só precisamos chamá-la:**

```
app.electionCount()
```
> Solidity cria automaticamente getters para nossas variáveis de estado, por isso, para chamar a variável utilizamos os parênteses.  

**4. Para acessar e manipular mappings:**

```
app.elections("Eleicoes 2018")
```
> Função get gerada automaticamente pelo Solidity para acessar um mapping.  

```
app.elections("Eleicoes 2018").then(function(e) {eleicao = e;})
```
> Variável eleicao é uma instância do mapping da Eleição 2018.  

```
eleicao[0]
```
> Para acessar cada atributo de uma estrutura.

```
eleicao[3].toNumber()
```
> Converter o tempo de abertura da eleição para número.  
> Obs.: Strings não precisam ser convertidas no console.  

**5. Acessar as contas da Blockchain com Web3**

```
web3.eth.accounts
```
> web3 = biblioteca  
> eth  = objeto  

**6. Referenciar contas individualmente**

```
web3.eth.accounts[0]
```

**7. Utilizar Metadatas**

```
eleicao.vote("Eleicao 2018", 99, { from: web3.eth.accounts[2] })
```
> Metadata 'from' será usado como msg.sender no contrato.

### Client-Side

**1. Conectar a Blockchain local com Metamask**

```
> Abra o metamask e conecte-se à um Custom RPC;
> No Ganache, copie a url do RPC Server e cole no Metamask (http://localhost:7545);
> Clique em Save.
```

**2. Importando contas para o Metamask**

```
> Vá ao Ganache e escolha a conta;
> Clique em "Show Keys" e copie a chave;
> Vá ao Metamask e clique em "Import Account";
> Escolha a opção de importar a partir de uma chave privada;
> Cole a chave e importe;
> Atualize a página.
```
