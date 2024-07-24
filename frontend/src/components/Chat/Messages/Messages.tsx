//@ts-nocheck comment
import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

const Messages = ({ userAdd, messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map(({ id, dao_id, message_body, user_wallet }) => {
        if (user_wallet == userAdd) {
          return (
            <Flex key={id} w="100%" justify="flex-end">
              <Flex
                bg="black"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{message_body}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={id} w="100%">
              <Avatar
                name="Computer"
                src="https://static.thenounproject.com/png/2821166-200.png"
                bg="white"
              ></Avatar>
              <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                ml={2}
              >
                <Text>{message_body}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      {/* <AlwaysScrollToBottom /> */}
    </Flex>
  );
};

export default Messages;
