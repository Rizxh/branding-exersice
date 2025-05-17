import { Inter } from "next/font/google";
import {
  Flex,
  Box,
  Text,
  Image,
  Link,
  Input,
  Stack,
  Heading,
  SimpleGrid,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  HStack,
  StackDivider,
  Card,
  Grid,
  GridItem,
  GridCol,
  GridRow,
  GridTemplateColumns,
  GridAutoColumns,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <VStack
      p={{ base: "4", xl: "8" }}
      align="stretch"
      minH="100vh"
      gap="5"
      spacing={4}
    >
      {/* Heading Link */}
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/product-xion1">Branding</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/product-xion1">Product - Xion1</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {/* Home Button */}
      <HStack justifyContent="space-between" pt={4} pb={4}>
        <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
          Product - Xion1
        </Heading>
      </HStack>
      {/* Form Menu*/}
      {/* box 1 */}
      <Box bg="white" rounded={6} p={6}> {/* Pembungkus*/}
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Banner
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
            >
              ADD
            </Button>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>
        {/* Form */}
        <SimpleGrid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)',sm:'repeat(2, 1fr)', xl: 'repeat(3, 1fr)',  lg: 'repeat(3, 1fr)'}} gap={6} pt={6}>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Logo</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Logo</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Logo</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Logo</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='Digital Display Content Management ...'/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='AI-powered Audience Analytics' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='DOOH System Management and ...' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='AI-powered Marketing Management ...' />
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder='A system that allows businesses to ...' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder='This solution uses artificial ...' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder='A platform that manages and ...' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder='A tool that leverages AI to automate ...' />
          </FormControl>
        </VStack>
        </SimpleGrid>
        
      </Box>
      {/* box 2 */}
      <Box bg="white" rounded={6} p={6} mt={6}> {/* Pembungkus*/}
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Solution Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
            >
              ADD
            </Button>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <SimpleGrid alignItems={"end"} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)',sm:'repeat(2, 1fr)', xl: 'repeat(3, 1fr)',  lg: 'repeat(3, 1fr)'}} gap={6} pt={6}>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Section Title</FormLabel>
            <Input placeholder='Solutions' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Logo</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Logo</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Logo</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Logo</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Logo</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='Digital Display Content Management ...'/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='Digital Display Content Management ...'/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='AI-powered Audience Analytics' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='DOOH System Management and ...' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='AI-powered Marketing Management ...' />
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder='A system that allows businesses to ...' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder='A system that allows businesses to ...' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder='This solution uses artificial ...' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder='A platform that manages and ...' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder='A tool that leverages AI to automate ...' />
          </FormControl>
        </VStack>
        </SimpleGrid>
      </Box>
      {/* box 3 */}
      <Box bg="white" rounded={6} p={6} mt={6}> {/* Pembungkus*/}
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
            >
              ADD
            </Button>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <SimpleGrid alignItems={"end"} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)',sm:'repeat(2, 1fr)', xl: 'repeat(3, 1fr)',  lg: 'repeat(3, 1fr)'}} gap={6} pt={6}>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Section Title</FormLabel>
            <Input placeholder='Products' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Asset</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Asset</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='Digital Display Content Management ...'/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='Digital Display Content Management ...'/>
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Link</FormLabel>
            <Input placeholder='A system that allows businesses to ...' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Link</FormLabel>
            <Input placeholder='A system that allows businesses to ...' />
          </FormControl>
        </VStack>
        </SimpleGrid>
      </Box>
      {/* box 4 */}
      <Box bg="white" rounded={6} p={6} mt={6}> {/* Pembungkus*/}
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
            >
              ADD
            </Button>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <SimpleGrid alignItems={"start"} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)',sm:'repeat(2, 1fr)', xl: 'repeat(3, 1fr)',  lg: 'repeat(3, 1fr)'}} gap={6} pt={6}>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Asset</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Button</FormLabel>
            <Input placeholder='solution-img.png' />
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='Digital Display Content Management ...'/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Link</FormLabel>
            <Input placeholder='Digital Display Content Management ...'/>
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder='A system that allows businesses to ...' />
          </FormControl>
        </VStack>
        </SimpleGrid>
      </Box>
      {/* box 5 */}
      <Box bg="white" rounded={6} p={6} mt={6}> {/* Pembungkus*/}
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
            >
              ADD
            </Button>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <Grid alignItems={"end"} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', sm:'repeat(2, 1fr)', xl: 'repeat(3, 1fr)',  lg: 'repeat(3, 1fr)'}} gap={6} pt={6}>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Section Title</FormLabel>
            <Input placeholder='Technology Ecosystem' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Asset</FormLabel>
            <Input placeholder='xion1.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Asset</FormLabel>
            <Input placeholder='displ.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Asset</FormLabel>
            <Input placeholder='virbe.png' />
          </FormControl>
        </VStack>
        <GridItem colSpan={2}>
          <VStack gap={6}>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input placeholder='Unified Marketing Solution Suite'/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input placeholder='Exclusive Distributor of Smart Digital Signage and Audience Measurement Technology'/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input placeholder='Enterprise-ready AI-powered Virtual Beings'/>
            </FormControl>

          </VStack>
        </GridItem>
        </Grid>
      </Box>
      {/* box 6 */}
      <Box bg="white" rounded={6} p={6} mt={6}> {/* Pembungkus*/}
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
            >
              ADD
            </Button>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <Grid alignItems={"end"} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', sm:'repeat(2, 1fr)', xl: 'repeat(3, 1fr)',  lg: 'repeat(3, 1fr)'}} gap={6} pt={6}>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Section</FormLabel>
            <Input placeholder='Products' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Asset</FormLabel>
            <Input placeholder='product-Asset.png' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Asset</FormLabel>
            <Input placeholder='product-Asset.png' />
          </FormControl>
        </VStack>
        <GridItem colSpan={2}>
          <VStack>
            <FormControl isRequired>
              <FormLabel>Section Description</FormLabel>
              <Input placeholder='Xion1 offers multitudes of products with a wide range of selections: learn more by ...'/>
            </FormControl>
            <Grid w={"100%"} templateColumns={'repeat(2, 1fr)'}>
              <GridItem>
              <FormControl isRequired pt={4}>
                <FormLabel>Title</FormLabel>
                <Input placeholder='Xion1'/>
              </FormControl>
              <FormControl isRequired pt={6}>
                <FormLabel>Title</FormLabel>
                <Input placeholder='DISPL'/>
              </FormControl>
              </GridItem>
            </Grid>
          </VStack>
        </GridItem>
        </Grid>
      </Box>
      {/* box 7 */}
      <Box bg="white" rounded={6} p={6} mt={6}> {/* Pembungkus*/}
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
            >
              ADD
            </Button>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <SimpleGrid alignItems={"end"} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)',sm:'repeat(2, 1fr)', xl: 'repeat(3, 1fr)',  lg: 'repeat(3, 1fr)'}} gap={6} pt={6}>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Section Title</FormLabel>
            <Input placeholder='Articles' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Asset</FormLabel>
            <Input placeholder='news-img.png'/>
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder='Digital Signage Outlook 2024: ...'/>
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Excerpts</FormLabel>
            <Input placeholder="As we transition from 2023, it's..." />
          </FormControl>
        </VStack>
        </SimpleGrid>
      </Box>
      {/* box 8 */}
      <Box bg="white" rounded={6} p={6} mt={6}> {/* Pembungkus*/}
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
            >
              ADD
            </Button>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <SimpleGrid alignItems={"start"} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)',sm:'repeat(2, 1fr)', xl: 'repeat(3, 1fr)',  lg: 'repeat(3, 1fr)'}} gap={6} pt={6}>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Section Title</FormLabel>
            <Input placeholder='Use Our App Today & Experience ...' />
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Button</FormLabel>
            <Input placeholder='Explore Platform'/>
          </FormControl>
        </VStack>
        <VStack gap={6}>
          <FormControl isRequired>
            <FormLabel>Link</FormLabel>
            <Input placeholder='https://xion1.com' />
          </FormControl>
        </VStack>
        </SimpleGrid>
      </Box>
    </VStack>
  );
}
