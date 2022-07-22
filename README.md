# bibliomar-react
A complete rewrite of Bibliomar based on React.

# Português
## Do que se trata?
Bibliomar é um buscador de livros que usa o acervo do LibraryGenesis como base.  

A melhor forma de entender como funciona, é simplesmente acessando o [site](https://bibliomar.site).  

O publico alvo é brasileiro, já que em nosso país alguns livros podem chegar a custar mais de 5% do salário minímo, e as alternativas
existentes na internet forçam o usuario a aguardar longas filas de download, ou simplesmente não possuem um acervo tão robusto.

## O original
Primeiramente, vale salientar que existe um Bibliomar original, problemático, sentimental, mas altamente funcional, e ele ainda pode ser acessado na internet:
[Bibliopai](http://bibliomar.herokuapp.com/) e seu [código-fonte](https://github.com/Lamarcke/Bibliomar)
O principal problema dessa versão do site com certeza são os erros 500, e se você analisar o código, pode-se perceber que isso é um problema no design do proprio aplicativo, basicamente, um iniciante projeta um site que funciona
durante o desenvolvimento, mas sobrecarrega facilmente em um ambiente de produção. E isso se deve principalmente ao fato de que o tier gratuito do Heroku, onde o Bibliomar original é hospedado, só disponibiliza um worker para atender as solicitações,
este, pelo design do aplicativo, ficava facilmente sobrecarregado, originando esses erros 500 na hora de acessar os livros.

## Como funciona?
Nós abstraimos bastante do processo durante o desenvolvimento, mas o Bibliomar pode ser considerado como um web-scraping do LibraryGenesis, que então apresenta esses dados em uma interface mais elegante.

Existem três componentes principais para que isso seja possível:
- [grab-fork-from-libgen](https://github.com/Lamarcke/grab-fork-from-libgen)  
Essa é a base de tudo, essa biblioteca é a responsável por fazer o web-scraping no site do LibraryGenesis, e retornar as informações de forma organizada.  


- [Biblioterra](https://github.com/Lamarcke/Biblioterra)  
Esse é o backend, uma API em Python, utilizando FastAPI.  


- Bibliomar (aqui)  
E esse é o frontend, que consome a API e apresenta em uma interface ao usuario final.  


## Como posso contribuir?
Basta entrar na aba de "Issues" ou "Project" e procurar algum problema que você queira resolver.  

Você pode se familiarizar com o código assumindo issues mais simples, e é altamente recomendado acessar a documentação do [Biblioterra](https://biblioterra.herokuapp.com/v1/docs) caso você queira alterar ou criar alguma solicitação para a API.

Caso você tenha mais experiencia com backend, não exite em dar uma olhada no código do [Bibliotera](https://github.com/Lamarcke/Biblioterra).