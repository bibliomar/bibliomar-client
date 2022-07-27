# bibliomar-react
A complete rewrite of Bibliomar based on React.

### Português
## Do que se trata?
Bibliomar é um buscador de livros que usa o acervo do LibraryGenesis como base.  

A melhor forma de entender como funciona, é simplesmente acessando o [site](https://bibliomar.site).  

O publico alvo é brasileiro, já que em nosso país alguns livros podem chegar a custar mais de 5% do salário minímo, e as alternativas
existentes na internet forçam o usuario a aguardar longas filas de download, ou simplesmente não possuem um acervo tão robusto.

## Principais funcionalidades
Atualmente, no Bibliomar você pode:  
- Pesquisar livros em uma interface intuitiva.  
E isso atrelado ao uso do acervo gigante do LibraryGenesis significa que dificilmente você não vai achar o que procura.
- 

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

Primeiramente, recomendamos seguir este tutorial:  
[Meu primeiro PR](https://github.com/Lamarcke/bibliomar-react/blob/main/IMNEW.md)  
Ele vai te guiar pelos primeiros passos para deixar seu ambiente de desenvolvimento pronto e como trabalhar no seu primeiro issue.

Caso você tenha mais experiencia com backend, não exite em dar uma olhada no código do [Bibliotera](https://github.com/Lamarcke/Biblioterra).

### Principais formas de contribuição
#### Refatoramento
Esse é um projeto que passou muito tempo no forno, projetado por uma só pessoa. E durante essas noites mal dormidas que passamos juntos, tenho de admitir que algumas partes do código podem ser melhoradas.  
Se você encontrar alguma função, chamada a API, tipagem errônea, nã