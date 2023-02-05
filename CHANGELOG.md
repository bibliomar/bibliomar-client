### Lista de mudanças

Bibliomar está em constante evolução, e a comunidade está trabalhando o tempo todo para manter o projeto ativo.

Essa são algumas mudanças importantes que aconteceram desde o lançamento oficial, que chamaremos versão 1.0.

##### Versão 1.5 - Não lançada ao publico:

- Novo leitor online, suportando arquivos ePub
  O leitor online se tornou o componente mais complexo do Bibliomar, apresentando pelo menos 6000 linhas de código.
  Ele só é possível graças a biblioteca [react-reader].
  Essa versão só pode ser visualizada em preview, já que o leitor não se encontra em um estado completo (funcional, mas
  falta algums detalhes.)

##### Versão 2.0 - Em andamento:

Muito obrigado ao [Mateus Prado], que fez o design de boa parte dos componentes nessa nova versão.  
O Bibliomar nunca esteve tão bonito.

- Temas, agora o aplicativo possui temas claros e escuros, assim como leitor, ‘design’ por [Mateus Prado].
- Tela de informações dos livros completamente refeita, agradecimentos ao [Mateus Prado].
- Agora a tela de mais informações dos livros é totalmente independente da biblioteca e da pesquisa, ou seja, você pode
  compartilhar o link de um livro diretamente, e novas informações exclusivas serão carregadas pra ele.
- Agora o download de livros para leitura online acontece em nossos servidores, aumentando assim a quantidade de
  servidores
  disponíveis graças a falta de limitação do CORS
- Além disso, a tela de informações dos livros se tornou o hub central do aplicativo: todas as ações relacionadas ao
  leitor e a biblioteca podem ser realizadas nela.
- O componente figure da biblioteca agora redireciona a este hub.
- Além disso, novas informações adicionadas a essa tela, baseadas na lista de livros salvos localmente do usuario.
- Muitos componentes tornaram-se obsoletos:
  Componente de mais informações antigo, alguns figures de livros que eram usados em outras partes do site,
  o componente `ReaderSavedBooksList`, o componente de modal dos livros da biblioteca, dentre outros.  
  Agora, temos apenas dois figures principais, tornando o design do site mais consistente.
  Isso é bom, pois agora o código está mais sucinto.
- Agora, ao entrar na URL de um livro no Bibliomar Reader, caso o leitor não encontre um arrayBuffer salvo
  (nos casos em que o usuario fecha o navegador e retorna a mesma URL) o leitor automaticamente irá tentar
  recuperar o livro da lista de livros salvos do usuario.
- O código de download de livros pelo leitor online foi em maior parte movido para o backend.
- Bibliomar (o backend) agora é hospedado na [fly.io](https://fly.io)
- Agora é possível filtrar os livros na biblioteca.
- Agora é possível mover e remover vários livros de uma vez na biblioteca.
- Corrigido o uso de tags `<a>` ao invés do equivalente `<Link />` para navegação. Isso ocasionava em recarregamentos
  completos de página, tirando o sentindo de construir um aplicativo SPA.
- Adicionado dois novos servidores `Crust` e `c4rex.co`, servidor `Infura` removido pelo LibraryGenesis.
- Chegamos a marca de 6500 linhas de código (excluindo linhas vazias e comentários). Dessas, 1375 são apenas nos
  componentes
  relacionados ao leitor online.

### Versão 2.5 - Não lançada ao publico:

- Um novo sistema de pesquisas baseado no ManticoreSearch começa a ser implementado
- Remoção da biblioteca de capas @readshape/covers (responsável pelas capas com padrões no caso de livros sem capa)
  Motivo: a geração de capas é pesada, além de ocupar um espaço muito grande no limitado armazenamento de sessão do
  navegador.
