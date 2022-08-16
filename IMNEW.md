## Quero contribuir
Esse tutorial vai te ajudar a fazer seu primeiro PR nesse repositório. Esperamos também fornecer dicas úteis para entender melhor
o funcionamento do aplicativo.

### Obrigado!
Primeiramente, muito obrigado pelo interesse em contribuir para esse projeto e lembre-se, estamos sempre observando as discussões, e qualquer dúvida basta abrir um novo issue que resolveremos juntos.  


Você também pode entrar em contato com algum contribuidor.

### O que eu preciso saber?
Você vai precisar ter conhecimento básico de Javascript e React.  
Você pode se acostumar com as mudanças do Typescript conforme desenvolve, e pedir ajuda na comunidade caso tenha alguma dúvida.

### Se preparando para desenvolver  

Você precisa instalar o [NodeJS](https://nodejs.org/en/download/) para poder iniciar.  
Ele é usado no ViteJS, que organiza todas as dependências do Bibliomar.

*Caso você tenha dificuldades, recomendo utilizar o cliente desktop do Github.*

Primeiramente, faça uma cópia desse repositório no seu computador.  
*Code > Open with Github Desktop para abrir no Github Desktop*  

Abra seu terminal e digite:  
`git clone https://github.com/Lamarcke/bibliomar-react.git`  

Em seguida, entre na pasta:  
`cd bibliomar-react`  

E então:  
`npm install`  
E:  
`npm run dev`  

Isso irá iniciar o servidor da sua cópia local do Bibliomar no endereço `http://localhost:3000`.  
**Importante**: O seu servidor precisa estar hosteado nessa porta, já que o Biblioterra (backend) só aceita chamadas locais a partir dela.  
Caso não esteja, provavelmente algum aplicativo está usando a mesma. (Discord, Skype, etc...)  

### Botando a mão na massa
Agora, chegou a hora de codar, e a forma mais simples de começar é trabalhando em uma versão do [#5](https://github.com/Lamarcke/bibliomar-react/issues/5).  
Resolver esse issue vai ajudar você a realizar sua primeira contribuição, e de quebra entender como a comunicação entre o Bibliomar e o Biblioterra (backend) funcionam.  

Depois de terminar suas mudanças, faça um pull request fazendo o seguinte:  
`git add *`  
Em seguida, descreva suas mudanças:  
`git commit -m "Fiz uma tela muito mais melhor de bom"`  
E envie:  
`git push`  

Você vai receber uma solicitação para abrir um pull request, que é onde seu código vai ser analisado, e se tudo estiver ok, implementado.  

## Entendendo o aplicativo

Complexidade assusta, e apesar de o Bibliomar não ser um projeto de grande porte, algumas pessoas podem se assustar com a ideia de ter de entender tudo de uma só vez.  

Primeiramente:  
Você **não** precisa entender todo o aplicativo para ajudar.  

Existem algumas regras simples:  
*Você pode encontrar as pastas mencionadas dentro da `src`*.


Existem várias pastas, cada uma se tratando de uma rota específica do Bibliomar.  
Por exemplo, os componentes da pasta `search` se referem a rota `/search`, e tudo que nela reside.  


Caso você queira, por exemplo, contribuir para a parte da biblioteca do site, basta ir na pasta `/library` e começar a 
estudar o código.

