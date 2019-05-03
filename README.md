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

## How to Interact

### Console

1. Após fazer o deploy do contrato abra o console do truffle.

```
truffle console
```

2. Instancie o contrato.

```
Elections.deployed().then(function(i) { app = i })
```
> Nesse momento a variável app é uma instância do nosso contrato.



## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
