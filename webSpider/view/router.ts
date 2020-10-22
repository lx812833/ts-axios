import { Router, Request, Response } from "express";
import Crowller from "./crowller";
import webAnalyzer from "./analyzer";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("hello");
})

router.get("/getData", (req: Request, res: Response) => {
  const secret = 'x3b174jsx';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = new webAnalyzer();
  new Crowller(url, analyzer);
  res.send("get Data Success!");
})

export default router;