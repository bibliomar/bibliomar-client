### Lista de mudanças

Bibliomar está em constante evolução, e a comunidade está trabalhando o tempo todo para manter o projeto ativo.

Essa são algumas mudanças importantes que aconteceram desde o lançamento oficial, que chamaremos versão 1.0.

##### Versão 1.5 - Não lançada ao publico:
- Novo leitor online, suportando arquivos ePub
O leitor online se tornou o componente mais complexo do Bibliomar, apresentando pelo menos 6000 linhas de código.
Ele só é possível graças a biblioteca [react-reader].
Essa versão só pode ser visualizada em preview, já que o leitor não se encontra em um estado completo (funcional, mas falta algums detalhes.)

##### Versão 2.0 - Em andamento:  

- Temas, agora o aplicativo possui temas claros e escuros, assim como leitor, ‘design’ por [placeholder].  
- Tela de informações dos livros completamente refeita, agradecimentos ao [placeholder]  
- Agora o usuario logado pode retornar a uma URL de um livro que já tenha acessado e esteja em sua biblioteca.  
Antes, quando o Bibliomar não encontrava as informações dentro do `sessionStorage`, o usuario era redirecionado a uma página de erro.  
Isso só vale para usuarios logados que tem o livro em questão na sua biblioteca.  
- 