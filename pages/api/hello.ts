// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const bot = process.env.TELEGRAM_TOKEN;
  const api = `https://api.telegram.org/bot${bot}`;
  const chatId = process.env.CHAT_ID;
  console.log(api, chatId);
  const { data } = req.body;
  axios
    .post(`${api}/sendMessage`, {
      chat_id: "-4152348122",
      text: data,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).json({ name: "John Doe" });
}
