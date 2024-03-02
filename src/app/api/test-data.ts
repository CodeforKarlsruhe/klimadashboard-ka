import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: [number, number][];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  res.status(200).json({ data: [[Date.now() - 10000, 10], [Date.now(), 1]] });
}
