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

### English

### A bit of context
This is a huge text, full of rambling and honest thoughts about programming in general.  
Please don't mind the language, i refrain from speaking like this anywhere else other than this piece of text. Thanks for your time.

Please pay the [original project](http://bibliomar.herokuapp.com/) a visit while you are reading this.

The original project had a backend written in Python, using FlaskAPI. It was good to work it, mainly because of Flask's simplicity.  
After some time, problems in the project design started to arise. I will cite some that were most relevant:
- A user's request would put too much strain on the server.
  At the time, Bibliomar (it was backend and frontend in one project) was being hosted on Heroku Free Tier. This tier gives you one
  free web dyno to work it. So i had a simple application, that would do 10-25 requests everytime the user searched for something.

- The `/cover/:md5` route accepted one md5 string as a path parameter, and returned a single url string after scraping for metadata.  
  So, if a user searches for something that returns 20 results, and for every result there is, a request is made for a new cover url, in a restrained enviroment with one single worker
  and limited bandwitch.


Guess what happens when you try to do anything while the app is doing it's thing on that starved single worker?  
Exactly, everything breaks. You can't access book pages because the server is overloaded. The frontend was designed in a way that you had to wait 1,5s for each entry to appear on screen.  
Why is everything purple? What was i thinking?

Well, i will stop rambling.  
You only need to know that there was this thing, called error 500, that neither Flask nor Heroku could point me out what was the actual cause.  
I spent days trying to solve it, telling people "I'm sorry, you need to reload the page several times, it works after that but i don't know why!!"  
Until it hit me, while looking at those desperate attempts of fixing the mess i made, i started thinking:  
"Well, maybe i'm just looking at the tree, and not the whole forest..."

After all this time, i can say that i was wrong, even when i was looking at the whole forest, that one tree was so big that i couldn't see nothing.  
For starters, i could possibly solve that error issue simply refactoring some of my functions to be async.
It was a big letdown to finally announce my first project, which i built from scratch, with the help of my wife, and thinking about my soon-to-be-born son to gather resolve, simply not working.

When i was looking at how much work had to be done, to even start looking at possible results, i gave up.
Not on programming, mind you, i fucking love doing this.
I gave up because that project sucked. I couldn't look at the whole forest at that time because how is a lumberjack supposed to know how to chop a tree before even touching an axe?
It was a beginner's mistake. And one i'm really proud of.
That's why i started everything from scratch, with new technology and a new mindset, this time actually planning what would be done beforehand.

Still, life is a car with no breaks, so while i was working on this project, my wife was 7-months pregnant, and we were dealing
with life problems and trying to get by.  
Biblioterra took 1-2 months to make. Not much of actual coding, but almost 2 months in time.  
Bibliomar, the frontend, was out in like 15-20 days. I found learning React to be quite pleasant,
it simplified some things, overcomplicated some others, but still gave me much freedom in how to tackle user interfaces.
I also have more stability these days, so focusing on coding has been easier.

Wrapping up, this is a portion of the story behind my ~~first~~ second actual project. One i'm really proud of.

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