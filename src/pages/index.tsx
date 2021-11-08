import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Text,
  VStack,
  Link as ChakraLink,
  Button,
  FormControl,
  Input,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import { NewsCard } from '../components/NewsCard';
import { getNewsStorage, populateLists } from '../utils/localStorage';
import { News, NewsStorage } from '../utils/types';

const Home: NextPage = () => {
  const [newsList, setNewsList] = useState<NewsStorage>({} as NewsStorage);
  const [filteredList, setFilteredList] = useState<News[]>([] as News[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    populateLists(); // Populating for tests

    setNewsList(getNewsStorage());
  }, []);

  function handleSearch() {
    setIsSearching(true);

    const search = newsList.news.filter((n) => {
      return n.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredList(search);
  }

  function handleClearSearch() {
    setIsSearching(false);
    setSearchTerm('');
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
          justify="space-between"
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
          <FormControl
            order={[1, null, 0]}
            maxW={['100%', null, '360px']}
            display="flex"
            gridGap="0.5rem"
          >
            <Input
              placeholder="Pesquisar notícias"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button colorScheme="yellow" onClick={handleSearch}>
              <SearchIcon />
            </Button>
          </FormControl>
        </Flex>
      </Flex>
      <VStack w="90vw" maxW="1040px" mx="auto" my="5rem">
        <Head>
          <title>Notícias | Página Inicial</title>
        </Head>
        <VStack w="100%" maxW="720px">
          <Box alignSelf="flex-start" mb="2rem">
            <Text as="h1">
              {isSearching
                ? `${filteredList.length} notícia(s) encontrada(s)`
                : 'Todas as Notícias'}
            </Text>
            {isSearching && (
              <Button
                variant="unstyled"
                fontWeight="normal"
                opacity="0.8"
                _hover={{ opacity: 1, textDecoration: 'underline' }}
                onClick={handleClearSearch}
              >
                Limpar pesquisa
              </Button>
            )}
          </Box>
          {isSearching
            ? filteredList.map((n) => {
                return (
                  <NewsCard
                    key={n.newsId}
                    author={n.author.name}
                    content={n.content}
                    title={n.title}
                    newsId={n.newsId}
                  />
                );
              })
            : newsList.news === undefined
            ? 'Nenhuma notícia encontrada'
            : newsList.news.map((n) => {
                return (
                  <NewsCard
                    key={n.newsId}
                    author={n.author.name}
                    content={n.content}
                    title={n.title}
                    newsId={n.newsId}
                  />
                );
              })}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Home;
