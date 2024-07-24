//@ts-nocheck comment
import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Divider from "@/components/Chat/Divider/Divider";
import Footer from "@/components/Chat/Footer/Footer";
import Header from "@/components/Chat/Header/Header";
import Messages from "@/components/Chat/Messages/Messages";
import usersideabi from "@/utils/abis/usersideabi.json";
import { ethers } from "ethers";

const chat = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      id: 1,
      message_body: "Test Message",
      dao_id: 1,
      user_wallet: "0x4F53d589FE623aF6D0dc3ccA612C2F35F64d3cb9",
    },
    {
      id: 2,
      message_body: "Test Message - 2 ",
      dao_id: 1,
      user_wallet: "0xD0dac55c2470d47E799D404C64c57CdC07b849d6",
    },
    {
      id: 3,
      message_body: "Test Message - 3",
      dao_id: 1,
      user_wallet: "0xD0dac55c2470d47E799D404C64c57CdC07b849d6",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [userAdd, setUserAdd] = useState("");
  const [daoInfo, setDaoInfo] = useState();
  const [daoMembers, setDaoMembers] = useState([]);

  const loadData = async () => {
    if (window.ethereum._state.accounts.length !== 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      setUserAdd(accounts[0]);
    } else {
      console.log("Metamask not connected");
    }
    if (router?.query?.daoId) {
      const res = await fetch(`/api/get-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          daoId: router.query.daoId,
        }),
      });
      const data = await res.json();
      console.log(data);
      setMessages(data);
    }
  };

  const getDaoInfo = async () => {
    if (window.ethereum._state.accounts.length !== 0 && router?.query?.daoId) {
      const daoNum = router.query.daoId;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        usersideabi,
        signer
      );
      const accounts = await provider.listAccounts();
      const res = await contract.daoIdtoDao(BigInt(daoNum));
      console.log(res);
      setDaoInfo(res);

      const res2 = await contract.getAllDaoMembers(BigInt(daoNum));
      setDaoMembers(res2);
    } else {
      console.log("Metamask no connected");
    }
  };

  useEffect(() => {
    if (router?.query?.daoId) {
      loadData();
      getDaoInfo();
    }
  }, [router]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [
      ...old,
      {
        user_wallet: userAdd,
        message_body: data,
        dao_id: router?.query?.daoId,
      },
    ]);
    setInputMessage("");

    const res = await fetch(`/api/post-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        daoId: router?.query?.daoId,
        messageBody: data,
        userWallet: userAdd,
      }),
    });

    loadData();

    // setTimeout(() => {
    //   setMessages((old) => [...old, { from: "computer", text: data }]);
    // }, 1000);
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w="40%" h="90%" flexDir="column">
        <Header daoMembers={daoMembers} daoInfo={daoInfo} />
        <Divider />
        <Messages userAdd={userAdd} messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default chat;
