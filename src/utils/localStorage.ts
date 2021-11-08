import { Author, News, NewsStorage as NewsStorageType } from "./types";

// Gets or creates new author's storage
export function getAuthorsStorage() {
  let authors = {
    idCount: 0,
    authors: [] as Author[],
  };

  const authorsStorage = window.localStorage.getItem('authors');
  
  if (authorsStorage !== null) {
    authors = JSON.parse(authorsStorage)
  }
  
  return authors;
}

// Gets or creates new news' storage
export function getNewsStorage() {
  let news = {
    idCount: 0,
    news: [] as News[],
  };
  
  const newsStorage = window.localStorage.getItem('news');
  
  if (newsStorage !== null) {
    news = JSON.parse(newsStorage)

  }
  
  return news;
}

// Delete a news post
export function deleteNewsPost(id :number) {
  const newsStorage = window.localStorage.getItem('news');

  if (newsStorage !== null) {
    let updated = JSON.parse(newsStorage)

    updated.news = updated.news.filter((n : News) => n.newsId !== id)
  
    window.localStorage.setItem('news',JSON.stringify(updated));
  }
}

// Populating the lists for tests
export function populateLists() {
  const authorsStorage = window.localStorage.getItem('authors');

  if (authorsStorage === null) {
    window.localStorage.setItem('authors', JSON.stringify(populateAuthors))
  }
  
  const newsStorage = window.localStorage.getItem('news');
  
  if (newsStorage === null) {
    window.localStorage.setItem('news', JSON.stringify(populateNews))
  }
}

const populateAuthors = {
  idCount: 2,
  authors: [
  {
    authorId: 1,
    name: 'Gabriel Tibaldo'
  },
  {
    authorId: 2,
    name: 'Michel Gomes'
  },
]}

const populateNews = {
  idCount: 5,
  news: [
  {
    newsId: 5,
  title: 'Celular entra em falso horário de verão',
  content: 'Diversos brasileiros e brasileiras acordaram neste domingo (07) sem ter a real noção de que horas são: descobriram mais tarde que o celular entrou em horário de verão por engano, adiantando em uma hora. O mesmo ocorreu em 2020. Como se sabe, no país não há mais este mecanismo por decisão do presidente Jair Bolsonaro.\n\nPor ora não há nenhuma manifestação das fabricantes de smartphones. No entanto, os relatos no Twitter dão uma pista importante: o problema parece estar concentrado em telefones com sistema Android (produzido pelo Google), principalmente os fabricados pela Samsung.',
  author: {
    authorId: 1,
    name: 'Gabriel Tibaldo'
  }
  },
  {
    newsId: 4,
  title: 'Instalooker funciona?',
  content: 'Instalooker é uma plataforma que promete mostrar o conteúdo de perfis privados do Instagram. De acordo com o site, que pode ser acessado tanto pelo PC quanto pelo smartphone, é possível visualizar fotos e vídeos de qualquer pessoa que tenha a conta fechada na rede social, mesmo sem segui-la. Para isso, basta informar o nome de usuário do contato que você deseja "espionar" e fazer uma busca no site.\n\nA proposta do Instalooker é tentadora para usuários que buscam como ver perfis privados do Instagram, mas o site não entrega os resultados esperados. Para mostrar os conteúdos, a plataforma exibe uma série de propagandas suspeitas e ainda exige que o "espião" baixe aplicativos desconhecidos, o que pode representar riscos à segurança do dispositivo.',
  author: {
    authorId: 2,
    name: 'Michel Gomes'
  }
  },
  {
    newsId: 3,
  title: "Na'Vi vence a G2",
  content: "A Natus Vincere venceu a G2 Esports, neste domingo (7), e se sagrou campeã do PGL Major Stockholm 2021, torneio mundial de Counter-Strike: Global Offensive (CS:GO). Essa também foi a primeira vez na história que a equipe do astro Oleksandr s1mple Kostyliev, um dos melhores jogadores de CS:GO de todos os tempos, levantou a taça de um Major. A competição foi decidida em uma série melhor de três partidas (MD3) em que a Na'Vi foi superior no duelo e chegou à vitória por 2–0, parciais de 16–11, na Ancient, e 22–19, na Nuke./n/nVale destacar que a Na'Vi também se tornou a primeira equipe na história a conquistar um Major de forma invicta, sem perder um único mapa sequer durante sua campanha. Com a vitória, a equipe levará a taça para casa e a premiação de US$ 1 milhão (cerca de R$ 5,5 milhões). A seguir, veja os destaques da série entre Na'Vi e G2 na final do PGL Major Stockholm 2021.",
  author: {
    authorId: 1,
    name: 'Gabriel Tibaldo'
  }
  },
  {
    newsId: 2,
  title: 'Celular Nokia em 2021',
  content: 'A Nokia foi a marca do primeiro celular de muitos brasileiros e, apesar de a empresa finlandesa não ter mais a mesma popularidade do passado, ainda segue a todo vapor no país. O leque de opções é variado e focado principalmente nos mercados de entrada e intermediário. Confira na lista abaixo todos os modelos da companhia que estão oficialmente à venda por aqui./n/nCom foco nos consumidores que buscam smartphones mais acessíveis, a Nokia disponibiliza desde aparelhos básicos, com valores abaixo de R$ 700, como o C2 e o C01 Plus, até celulares um pouco mais tecnológicos, como os modelos 5.3 e 5.4, que custam em média R$ 1.400 na Amazon. Vale destacar que a Nokia pertence à HMD Global, que, no Brasil, trabalha em parceria com a Multilaser.',
  author: {
    authorId: 2,
    name: 'Michel Gomes'
  }
  },
  {
    newsId: 1,
  title: 'Power bank 20.000 mAh',
  content: 'O power bank é um dispositivo portátil que acomoda bateria para recarregar aparelhos compatíveis sem a necessidade de uma tomada. O acessório deve ser uma boa opção para manter a carga dos celulares completa quando o usuário passa muito tempo longe de casa. Os modelos variam na capacidade e podem conter números mais baixos, como 5.000 mAh, ou mais elevados, de 20.000 mAh – que permitem uma maior quantidade de recargas./n/nAlém dos smartphones, os dispositivos também são compatíveis com tablets e até notebooks, dependendo do modelo. Marcas como Multilaser, ELG e Geonav disponibilizam o item por valores que começam em R$ 117 e podem chegar a R$ 557. Confira cinco opções de power banks de 20.000 mAh para comprar no Brasil em 2021.',
  author: {
    authorId: 1,
    name: 'Gabriel Tibaldo'
  }
  },
]}