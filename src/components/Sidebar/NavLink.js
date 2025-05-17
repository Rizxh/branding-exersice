import {
    HStack,
    Link,
    Icon,
    useColorMode as mode,
    Text
} from "@chakra-ui/react";

export const NavLink = ({ icon, isActive, label, ...rest }) => {
    return (
        <Link
            display="block"
            py={2}
            px={3}
            borderRadius="md"
            transition="all 0.3s"
            fontWeight="medium"
            lineHeight="1.5rem"
            aria-current={isActive ? "page" : undefined}
            {...rest}
        >
            <HStack spacing={4}>
                <Icon as={icon} boxSize="20px" />
                <Text as="span" fontSize={{ base: "xs", lg: "sm" }}>
                    {label}
                </Text>
            </HStack>
        </Link>
    );
};