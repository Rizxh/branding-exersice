import { Center, Image } from "@chakra-ui/react";
import React from 'react'

export default function Logo() {
    return (
        <Center>
            <Image
                src="/images/logo/logo.png"
                alt="Logo Xion1"
                w={{ base: "80px", md: "90px", lg: "100px", xl: "120px" }} />
        </Center>
    );
};
