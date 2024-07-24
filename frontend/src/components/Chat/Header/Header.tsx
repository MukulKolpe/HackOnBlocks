//@ts-nocheck comment
import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";

const Header = ({ daoMembers, daoInfo }) => {
  return (
    <Flex w="100%">
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          {daoInfo?.daoName || "Dao Name"}
        </Text>
        <Text color="green.500"> {daoMembers?.length || "2"} Members</Text>
      </Flex>
    </Flex>
  );
};

export default Header;
