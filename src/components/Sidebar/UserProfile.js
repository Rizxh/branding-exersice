import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    StackDivider,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiMoreVertical } from "react-icons/fi";

export const UserProfile = (props) => {
    const router = useRouter();
    const { name, role, image } = props;

    const isMobile = useBreakpointValue({ base: true, xl: false });

    const onLogoutClicked = async () => {
        userService.logout();
    };

    if (!isMobile) {
        return (
            <Stack spacing="4" divider={<StackDivider />}>
                <Box />
                <HStack spacing="3" justify="space-between">
                    <HStack spacing="4">
                        <Avatar boxSize="10" src="https://i.pravatar.cc/300" />
                        <Box>
                            <Text
                                textStyle="sm"
                                fontWeight="medium"
                                fontSize={{ base: "xs", lg: "sm" }}
                                maxW="15vw"
                            >
                                {name}
                            </Text>
                            <Text
                                textStyle="sm"
                                color="fg.muted"
                                fontSize={{ base: "xs", lg: "sm" }}
                            >
                                {role}
                            </Text>
                        </Box>
                    </HStack>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={"full"}
                            variant={"link"}
                            cursor={"pointer"}
                            minW={0}
                        >
                            <IconButton
                                variant="tertiary"
                                icon={<FiMoreVertical />}
                                aria-label="Open Menu"
                            />
                        </MenuButton>
                        <MenuList
                            style={{ position: "absolute", right: "0px", bottom: "50px" }}
                        >
                            <MenuItem onClick={onLogoutClicked}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </Stack>
        );
    } else {
        return (
            <Stack spacing="4">
                <HStack spacing="3" justify="space-between">
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={"full"}
                            variant={"link"}
                            cursor={"pointer"}
                            minW={0}
                        >
                            <Avatar boxSize="8" src="https://i.pravatar.cc/300" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onLogoutClicked}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </Stack>
        );
    }
};
