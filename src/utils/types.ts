export interface Author {
  authorId: number,
  name: string
}

export interface News {
  newsId: number,
  title: string,
  content: string,
  author: Author
}

export interface AuthorStorage {
  idCount: number,
  authors: Author[]
}

export interface NewsStorage {
  idCount: number,
  news: News[]
}

