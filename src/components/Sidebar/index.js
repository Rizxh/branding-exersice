import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Stack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUserFriends, FaLayerGroup } from "react-icons/fa";
import { UserProfile } from "./UserProfile";
import { PiCarProfileFill } from "react-icons/pi";

import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "./Logo";
import { NavLink } from "./NavLink";

// Import end

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);
    }
  }, [router]);

  const LinkComponent = () => {
    return (
      <>
        <Link href="/">
          <NavLink
            label="Home"
            icon={FaLayerGroup}
            aria-current={router.pathname == "/branding/home" ? "page" : undefined}
          />
        </Link>
        <Link href="/product-xion1">
          <NavLink
            label="Product - Xion1"
            icon={FaUserFriends}
            aria-current={router.pathname == "/product-xion1" ? "page" : undefined}
          />
        </Link>
      </>
    );
  };

  if (!isLoading) {
    return (
      <>
        {/* Sidebar Desktop */}
        <Flex display={{ base: "none", xl: "flex" }}>
          <Flex
            width={{ base: "full", sm: "25vw" }}
            py={{ base: "6", sm: "8" }}
            px={{ base: "4", sm: "6" }}
            flex="1"
            bg="bg.surface"
            borderRightWidth="1px"
            justifyContent="space-between"
            height="100vh"
            direction="column"
            position="fixed"
          >
            <Stack spacing="8">
              <Logo alignSelf="start" />
            </Stack>
            <Stack spacing={6}>
              <Box h="60vh">
                <Stack>
                  <LinkComponent />
                </Stack>
              </Box>
            </Stack>
            <UserProfile
            name="Xion1"
            role="Admin"
            />
          </Flex>
        </Flex>
        {/* End Sidebar Desktop */}
        {/* Mobile Display */}
        <Flex display={{ base: "flex", xl: "none" }}>
          <VStack w="100%" gap="0">
            <Box bg="white" px="4" w="100%" boxShadow={"lg"} zIndex="2">
              <Flex
                h="16"
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <IconButton
                  size={"md"}
                  icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                  aria-label={"Open Menu"}
                  display={{ xl: "none" }}
                  onClick={isOpen ? onClose : onOpen}
                />
                <Center>
                  <Logo iconColor="blue.600" />
                </Center>
                <UserProfile
                />
              </Flex>
              {isOpen ? (
                <Box pb={4} display={{ xl: "none" }}>
                  <Stack as={"nav"} spacing="1">
                    <LinkComponent />
                  </Stack>
                </Box>
              ) : null}
            </Box>
          </VStack>
        </Flex>
        {/* End Mobile Display */}
        <Box
          flex="1"
          bg="gray.100"
          mt="0 !important"
          ml={{ base: "0", xl: "25vw" }}
          maxW={{ base: "100vw", xl: "75vw" }}
        >
          {children}
        </Box>
      </>
    );
  }

}
