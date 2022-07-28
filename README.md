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
- Pesquisar e baixar livros em uma interface intuitiva.  
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
Se você encontrar alguma função, chamada a API, tipagem errônea, não exite em abrir um issue ou PR para corrigi-la.

#### Temas para o leitor
Atualmente, possuimos alguns temas simples para o leitor online, e em breve escreverei um guia sobre como contribuir com seu próprio tema.

### English

### A bit of thanking
I learned a great ton of Python from messing around in [Willmeyers](https://github.com/willmeyers) codebase, and it's funny to me how a guy that never once saw me was a bridge in my learning process.

Thank you, the amazing people at LibraryGenesis, and the amazing people on my country, Brazil, who have had nothing but love to show for this project.  
I do hope it goes way beyond the scope it has now, because it's a project i've been wanting to see since my first days of reading on a screen.


Developers aside, there are three people i couldn't thank enough, and are the reason this was made possible.  
**My son**  
How can something so small have this much impact on someone's life?  
You still don't know what you want, or when you want it, the only thing you do most of the day is sleep.  
But seeing you learn one thing a day, everyday, showing us the most beautiful smile on Earth, is what gives me the strength to go on.  
You will always be my treasure, and i hope that i can show what i was doing while you were sleeping on your first year soon. I love you.

**My wife**  
The most important person on this project, and yet, she didn't write a single line of code.  
If it wasn't for you, the first Bibliomar would be just a single search bar, that returns a table with almost no content, on a white screen.  
I hope you know that you are the most important woman in my life, and the place you have in my heart can't be taken by no one else.

**My dad**  
I know that it's hard to trust a career like this in a third world country, but you've been doing it.  
I thank you very much for everything you have done, not only for me, but for your grandson as well.