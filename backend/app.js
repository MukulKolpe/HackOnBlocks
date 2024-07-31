import express from "express";
import { createClient } from "@supabase/supabase-js";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
// require("dotenv").config();
// console.log(process.env);

const app = express();

// using morgan for logs
app.use(morgan("combined"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.post("/get-messages", async (req, res) => {
  const { daoId } = req.body;
  if (daoId === -1) {
    let { data: Messages, error } = await supabase
      .from("Messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (Messages) {
      res.status(200).json(Messages);
    }

    if (error) {
      console.log(error);
      res.status(500).end();
    }
  } else {
    let { data: Messages, error } = await supabase
      .from("Messages")
      .select("*")
      .eq("dao_id", daoId)
      .order("created_at", { ascending: true });

    if (Messages) {
      res.status(200).json(Messages);
    }

    if (error) {
      console.log(error);
      res.status(500).end();
    }
  }
});

app.post("/post-message", async (req, res) => {
  const { messageBody, daoId, userWallet } = req.body;
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
    res.status(500).end();
    return;
  }

  res.status(200).send(data);
});

app.get("*", (req, res) => {
  res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(8000, () => {
  console.log(`> Ready on http://localhost:8000`);
});
