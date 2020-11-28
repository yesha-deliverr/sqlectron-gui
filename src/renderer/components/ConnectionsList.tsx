import React, { useState } from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  FaTable,
  FaSearch,
  FaPlus,
  FaPlug,
  FaEdit,
  FaAngleDown,
  FaRedo,
  FaDatabase,
} from 'react-icons/fa';

import { BsTable } from 'react-icons/bs';

//import mysqlLogo from './server-db-client-mysql.png';
import {
  LightMode,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Icon,
  Text,
  HStack,
  Tag,
  DarkMode,
  IconButton,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  StackDivider,
  Badge,
  Box,
  Heading,
  Link,
  VStack,
  Grid,
  GridItem,
  Flex,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
const showColorModeSwitcher = false;

const connect = () => {
  window.open('', 'NewConnectionWindowComponent');
};

interface ConnectionsListProps {}

const connectionItems = (
  bgHover: string,
  connections: any,
  groupName: string,
) => {
  if (!connections.length) {
    return (
      <Text
        fontWeight='semibold'
        color='gray.600'
        fontSize='xs'
        align='center'
        p='0.75em'
        borderTopWidth='1px'
        borderTopStyle='solid'
        borderTopColor='#393A3A'
        borderBottomWidth='1px'
        borderBottomStyle='solid'
        borderBottomColor='#393A3A'
      >
        No connections
      </Text>
    );
  }

  return (
    <VStack
      spacing={0}
      align='stretch'
      borderTopWidth='1px'
      borderTopStyle='solid'
      borderTopColor='#393A3A'
      borderBottomWidth='1px'
      borderBottomStyle='solid'
      borderBottomColor='#393A3A'
    >
      {connections.map((item: any) => {
        return (
          <ConnectionItem bgHover={bgHover} item={item} groupName={groupName} />
        );
      })}
    </VStack>
  );
};

const ConnectionItem = ({
  bgHover,
  item,
  groupName,
}: {
  bgHover: string;
  groupName: string;
  item: any;
}) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Flex
      key={groupName + item.client}
      p='5px 5px 5px 10px'
      _hover={{ background: bgHover }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Box w='100px'>
        <Tag
          size='sm'
          paddingRight='2'
          css={{
            width: '100%',
            'vertical-align': 'middle',
            'font-size': '0.45em',
            display: 'inline-grid',
            'text-align': 'center',
          }}
        >
          {item.client}
        </Tag>
      </Box>
      <Box flex={1} css={{ 'min-width': '0px' }}>
        <Text
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          ml='2'
          isTruncated
        >
          {item.name}
        </Text>
        <Text color='gray.600' fontSize='xs' paddingLeft={2} isTruncated>
          {item.host}
        </Text>
      </Box>
      {isShown && (
        <HStack direction='row' spacing={1} align='center'>
          <IconButton
            aria-label='Edit'
            size='xs'
            icon={<FaPlug />}
            onClick={connect}
          />
          <IconButton aria-label='Edit' size='xs' icon={<FaEdit />} />
        </HStack>
      )}
    </Flex>
  );
};
export const ConnectionsList = ({}: ConnectionsListProps) => {
  const bgExpanded = useColorModeValue('gray.100', 'gray.700');
  const bgHover = useColorModeValue('gray.200', 'darkThemeApp.listHoverBg');

  const groups = [
    {
      name: 'Production',
      color: 'red',
      connections: [
        {
          client: 'MySQL',
          name: 'sqlectron-db',
          host: 'localhost:3306',
          database: 'sqlectron-db',
        },
        {
          client: 'Cassandra',
          name: 'locator-api',
          host: 'localhost:5505',
          database: 'locations',
        },
        {
          client: 'Postgres',
          name: 'users-api',
          host: 'users-api-production.xxxxxxxxxxxx.us-east-1.rds.amazonaws.com',
          database: 'users',
        },
      ],
    },
    {
      name: 'Preview',
      color: 'yellow',
      connections: [],
    },
    {
      name: 'Testing',
      color: 'teal',
      connections: [],
    },
    {
      name: 'Development',
      color: 'gray',
      connections: [],
    },
  ];

  // NOTE: min-width required to force host values hide when the screen isn't large enough
  return (
    <Accordion
      defaultIndex={[0]}
      size='sm'
      css={{ 'min-width': '0px' }}
      allowMultiple
    >
      {groups.map((group) => (
        <AccordionItem key={group.name} border='0'>
          <AccordionButton>
            <AccordionIcon />
            <Box flex='1' textAlign='left' marginLeft='1em'>
              <Badge colorScheme={group.color}>{group.name}</Badge>
            </Box>
          </AccordionButton>
          <AccordionPanel p={0} bg='darkThemeApp.barCompoenentBg'>
            {connectionItems(bgHover, group.connections, group.name)}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};