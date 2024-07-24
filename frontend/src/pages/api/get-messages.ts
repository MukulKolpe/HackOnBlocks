// @ts-nocheck comment
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/db/supaBaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
