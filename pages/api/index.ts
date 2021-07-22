import { NextApiHandler } from "next";

const ApiProxy: NextApiHandler = (req, res) => {
  console.log(req.cookies);
  return res.json({
    hello: "world",
  });
};

export default ApiProxy;
