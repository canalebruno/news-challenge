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
} from '../utils/localStorage';
import { AuthorStorage } from '../utils/types';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

export default function Registrar() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [authorValue, setAuthorValue] = useState('');
  const [authorsList, setAuthorsList] = useState<AuthorStorage>(
    {} as AuthorStorage
  );
  const [invalidAuthor, setInvalidAuthor] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidContent, setInvalidContent] = useState(false);

  const route = useRouter();

  useEffect(() => {
    populateLists(); // Populating for tests

    const authorsStorage = getAuthorsStorage();

    setAuthorsList(authorsStorage);
  }, []);

  function handleSubmit(event: FormEvent) {
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

      const newsStorage = getNewsStorage();

      newsStorage.idCount++;

      const newContent = {
        newsId: newsStorage.idCount,
        title: titleValue,
        content: contentValue,
        author: authorData,
      };

      newsStorage.news.unshift(newContent);

      // Saving data
      window.localStorage.setItem('news', JSON.stringify(newsStorage));
      route.push(`/noticias/${newContent.newsId}`);
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
            Cadastro de Notícias
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
              <Link href="/" passHref>
                Cancelar
              </Link>
            </ChakraLink>

            <Button
              onClick={(event) => {
                handleSubmit(event);
              }}
              type="submit"
              colorScheme="yellow"
            >
              Publicar
            </Button>
          </Flex>
          <FormControl isRequired isInvalid={invalidTitle}>
            <FormLabel>Título</FormLabel>
            <Input
              value={titleValue}
              onChange={(e) => {
                setTitleValue(e.target.value);
                setInvalidTitle(false);
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
