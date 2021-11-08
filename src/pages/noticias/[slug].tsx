import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteNewsPost, getNewsStorage } from '../../utils/localStorage';
import { News } from '../../utils/types';

interface NewsPostProps {
  slug: string;
}

export default function NewsPost({ slug }: NewsPostProps) {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  let news = {} as News | undefined;

  useEffect(() => {
    const newsStorage = getNewsStorage();

    news = newsStorage.news.find((n) => n.newsId === Number(slug));

    if (news !== undefined) {
      setAuthor(news.author.name);
      setTitle(news.title);
      setContent(news.content);
      setIsLoading(false);
    }
  }, [news]);

  function handleDelete() {
    deleteNewsPost(Number(slug));
    router.push('/');
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
          <title> Notícias | {title} </title>
        </Head>
        {isLoading ? (
          <Text>
            Carregando... <Spinner />
          </Text>
        ) : (
          <Flex flexDir="column" w="100%" maxW="720px" alignItems="flex-start">
            <Flex w="100%" justify="flex-end" align="center" gridGap="1rem">
              <Button onClick={handleDelete} colorScheme="red">
                Excluir
                <DeleteIcon ml="0.35rem" />
              </Button>

              <Link href={`/editar/${slug}`}>
                <Button colorScheme="yellow">
                  Editar
                  <EditIcon ml="0.35rem" />
                </Button>
              </Link>
            </Flex>
            <Text as="h2">{title}</Text>
            <Text as="span" mb="2rem">
              Escrito por {author}
            </Text>
            <Text>{content}</Text>
          </Flex>
        )}
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
