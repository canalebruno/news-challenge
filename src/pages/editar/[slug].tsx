import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
  Link as ChakraLink,
  Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FormEvent } from 'react';
import {
  getAuthorsStorage,
  getNewsStorage,
  populateLists,
} from '../../utils/localStorage';
import { AuthorStorage, News, NewsStorage } from '../../utils/types';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

interface EditarProps {
  slug: string;
}

export default function Editar({ slug }: EditarProps) {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [authorValue, setAuthorValue] = useState('');
  const [authorsList, setAuthorsList] = useState<AuthorStorage>(
    {} as AuthorStorage
  );
  const [invalidAuthor, setInvalidAuthor] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidContent, setInvalidContent] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const route = useRouter();

  let news = {} as News | undefined;

  let newsStorage = {} as NewsStorage;

  useEffect(() => {
    const authorsStorage = getAuthorsStorage();

    setAuthorsList(authorsStorage);
  }, []);

  useEffect(() => {
    newsStorage = getNewsStorage();

    news = newsStorage.news.find((n) => n.newsId === Number(slug));
    if (news !== undefined && isLoading) {
      setAuthorValue(news.author.name);
      setTitleValue(news.title);
      setContentValue(news.content);
      setIsLoading(false);
    }
  }, [news]);

  function handleUpdate(event: FormEvent) {
    event.preventDefault();

    setInvalidTitle(false);
    setInvalidAuthor(false);
    setInvalidContent(false);

    try {
      // Validation
      if (titleValue === '' || authorValue === '' || contentValue === '') {
        if (titleValue === '') {
          setInvalidTitle(true);
        }
        if (authorValue === '') {
          setInvalidAuthor(true);
        }
        if (contentValue === '') {
          setInvalidContent(true);
        }

        throw new Error();
      }

      // Checking if Author already exists
      let authorData = authorsList.authors.find((author) => {
        return authorValue === author.name;
      });

      if (authorData === undefined) {
        authorsList.idCount++;

        authorData = {
          authorId: authorsList.idCount,
          name: authorValue,
        };

        authorsList.authors.push(authorData);

        window.localStorage.setItem('authors', JSON.stringify(authorsList));
      }

      const newsIndex = newsStorage.news.findIndex((n) => {
        return n.newsId === Number(slug);
      });

      newsStorage.news[newsIndex] = {
        newsId: Number(slug),
        title: titleValue,
        content: contentValue,
        author: authorData,
      };

      // Saving data
      window.localStorage.setItem('news', JSON.stringify(newsStorage));
      route.push(`/noticias/${slug}`);
    } catch {}
  }

  return (
    <Box>
      <Flex bg="gray.600" maxW="100vw">
        <Flex
          py="1rem"
          as="nav"
          w="90vw"
          maxW="1040px"
          mx="auto"
          justify="flex-start"
          align="center"
          flexDir={['column', null, 'row']}
          gridGap="1rem"
        >
          <Flex
            align="center"
            w={['100%', null, 'fit-content']}
            justify="space-between"
            gridGap="2rem"
          >
            <ChakraLink>
              <Link href="/" passHref>
                Início
              </Link>
            </ChakraLink>
            <Button colorScheme="yellow">
              <Link href="/cadastrar" passHref>
                Cadastrar Notícia
              </Link>
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <VStack w="90vw" maxW="1040px" mx="auto" my="5rem">
        <Head>
          <title>Notícias | Registro</title>
        </Head>
        <VStack as="form" w="100%" maxW="720px">
          <Text as="h2" alignSelf="flex-start">
            Edição de Notícia
          </Text>
          <Flex w="100%" justify="flex-end" align="center" gridGap="1rem">
            <ChakraLink
              display="flex"
              alignItems="center"
              border="1px solid white"
              px="1rem"
              h="2.375rem"
              borderRadius="0.375rem"
              opacity="0.7"
              _hover={{ opacity: '1' }}
            >
              <Link href={`/noticias/${slug}`} passHref>
                Cancelar Edição
              </Link>
            </ChakraLink>

            <Button
              onClick={(event) => {
                handleUpdate(event);
              }}
              type="submit"
              colorScheme="yellow"
            >
              Atualizar
            </Button>
          </Flex>
          <FormControl isRequired isInvalid={invalidTitle}>
            <FormLabel>Título</FormLabel>
            <Input
              value={titleValue}
              onChange={(e) => {
                setTitleValue(e.target.value);
                // setInvalidTitle(false);
              }}
            />
            <FormErrorMessage>Campo obrigatório.</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={invalidAuthor}>
            <FormLabel>Autor</FormLabel>
            <Input
              value={authorValue}
              onChange={(e) => {
                setAuthorValue(e.target.value);
                setInvalidAuthor(false);
              }}
            />
            <FormErrorMessage>Campo obrigatório.</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={invalidContent}>
            <FormLabel>Conteúdo</FormLabel>
            <Textarea
              resize="none"
              h="50vh"
              maxH="25rem"
              value={contentValue}
              onChange={(e) => {
                setContentValue(e.target.value);
                setInvalidContent(false);
              }}
            />
            <FormErrorMessage>Campo obrigatório.</FormErrorMessage>
          </FormControl>
        </VStack>
      </VStack>
    </Box>
  );
}

export const getStaticPaths = () => {
  const paths = [] as string[];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: any) => {
  const slug = context.params.slug;

  return {
    props: {
      slug,
    },
  };
};
