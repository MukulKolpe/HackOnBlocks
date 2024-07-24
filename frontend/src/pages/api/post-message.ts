// @ts-nocheck comment
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
