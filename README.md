# Bibliomar
[![Netlify Status](https://api.netlify.com/api/v1/badges/bd4c5d37-8033-4b0f-abc4-7f8203e957a5/deploy-status)](https://app.netlify.com/sites/bibliomar/deploys)


Sua suíte completa de leitura: pesquise, baixe e leia livros gratuitamente.


### Português
## Do que se trata?
Bibliomar é um buscador de livros que usa o acervo do LibraryGenesis como base.  

A melhor forma de entender como funciona, é simplesmente acessando o [site](https://bibliomar.site).  

O publico alvo é brasileiro, já que em nosso país alguns livros podem chegar a custar mais de 5% do salário minímo, e as alternativas
existentes na internet forçam o usuario a aguardar longas filas de download, ou simplesmente não possuem um acervo tão robusto.

## Em constante evolução
O Bibliomar se tornou um projeto grande, e provavelmente vai continuar crescendo.  
Nosso objetivo é tornar o Bibliomar a solução definitiva de leitura no Brasil (e em países de lingua portuguesa).
Você pode verificar as novas mudanças no [changelog](CHANGELOG.md).

## Principais funcionalidades
*Algumas dessas mudanças podem só estar disponíveis em preview. Cheque o [changelog](CHANGELOG.md)*.  

Atualmente, no Bibliomar você pode:  
- Pesquisar e baixar livros em uma interface intuitiva.  
E isso atrelado ao uso do acervo gigante do LibraryGenesis significa que dificilmente você não vai achar o que procura.


- Salvar livros em sua biblioteca em três categorias diferentes. Estes podem ser baixados a qualquer momento e terão seu progresso salvo no leitor online.


- Ler seus livros online, sem a necessidade de baixar um leitor ePub ou o arquivo do livro.  
Isso é possível graças a uma nova tecnologia que nos permite renderizar ePubs direto no navegador.  
Além disso, o seu progresso de leitura é salvo online e sincronizado entre dispositivos.

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
[Quero contribuir](https://github.com/Lamarcke/bibliomar-react/blob/main/IMNEW.md)  
Ele vai te guiar pelos primeiros passos para deixar seu ambiente de desenvolvimento pronto e como trabalhar no seu primeiro issue.  
La também tem algumas dicas sobre como a aplicação funciona.

Caso você tenha mais experiencia com backend, não exite em dar uma olhada no código do [Bibliotera](https://github.com/Lamarcke/Biblioterra).

### Principais formas de contribuição
#### Refatoramento
Esse é um projeto que passou muito tempo no forno, projetado por uma só pessoa. 
E durante essas noites mal dormidas que passamos juntos, tenho de admitir que algumas partes do código podem ser melhoradas.  
Se você encontrar alguma função, chamada a API ou tipagem errônea, não exite em abrir um issue ou PR para corrigir.

#### Tipagem
Nós estamos tentando extrair o máximo do Typescript, por isso, qualquer ajuda com a tipagem do código é muito bem-vinda.  
Isso ajuda no desenvolvimento atual e futuro.

#### Design
Você pode sugerir mudanças no design de alguma parte do site, e os membros da comunidade vão avaliar a implementação.  
Para isso, abra um issue e descreva sua sugestão.

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