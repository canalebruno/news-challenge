import { Flex, Text, VStack, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

interface NewsCardProps {
  title: string;
  content: string;
  author: string;
  newsId: number;
}

export function NewsCard({ author, content, title, newsId }: NewsCardProps) {
  const shortDescription = content.slice(0, 250);

  return (
    <Flex
      flexDir="column"
      borderRadius="6px"
      border="1px white solid"
      p="2rem"
      align="flex-start"
      w="100%"
    >
      <Text as="span" fontWeight="500" opacity="0.8">
        {author}
      </Text>
      <Text as="h2" mb="1.5rem">
        {title}
      </Text>
      <Text as="p">
        {shortDescription}
        {'... '}
        <ChakraLink
          opacity="0.7"
          textDecoration="underline"
          _hover={{ opacity: '1' }}
        >
          <Link href={`/noticias/${newsId}`} passHref>
            Leia mais
          </Link>
        </ChakraLink>
      </Text>
    </Flex>
  );
}
