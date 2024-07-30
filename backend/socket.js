import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

let playerScores = [];

// io.on("connection", (socket) => {
//   socket.on("scores", (scores) => {
//     playerScores.push({ ...scores, id: socket.id });

//     socket.emit("playerScores", playerScores);
//   });

//   setInterval(() => {
//     socket.emit("messages", playerScores);
//   }, 5000);
// });

io.on("connection", (socket) => {
  socket.on("msgReq", (msgReq) => {
    const { daoId } = msgReq;

    setInterval(() => {
      if (daoId) {
        // console.log(`emiting messages for ${daoId}`);
        getMessagesByDao(daoId).then((res) => {
          //console.log(res);
          socket.emit("msgRes", res);
        });
      }
    }, 5000);
  });

  socket.on("postMsg", (postMsg) => {
    const { messageBody, userWallet, daoId } = postMsg;
    postMessage(messageBody, userWallet, daoId).then((res) => {
      //console.log(res);
      socket.emit("msgRes", res);
    });
  });
});

const getMessagesByDao = async (daoId) => {
  if (daoId === -1) {
    let { data: Messages, error } = await supabase
      .from("Messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (Messages) {
      return Messages;
    }

    if (error) {
      console.log(error);
      return error;
    }
  } else {
    let { data: Messages, error } = await supabase
      .from("Messages")
      .select("*")
      .eq("dao_id", daoId)
      .order("created_at", { ascending: true });

    if (Messages) {
      return Messages;
    }

    if (error) {
      console.log(error);
      return error;
    }
  }
};

const postMessage = async (messageBody, userWallet, daoId) => {
  const { data, error } = await supabase
    .from("Messages")
    .insert([
      {
        message_body: messageBody,
        dao_id: daoId,
        user_wallet: userWallet,
      },
    ])
    .select()
    .order("created_at", { ascending: true });
  if (error) {
    console.error(error);
    // res.status(500).end();
    return error;
  }

  // res.status(200).send(data);
  return data;
};

httpServer.listen(8000, () => {
  console.log("Server is running!");
});
