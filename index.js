const express = require("express");
const puppeteer = require("puppeteer");
const replace = require("absolutify");

const app = express();

app.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.send("Not url provided");
  } else {
    try {
      console.log(req.query.url);

      const browser = await puppeteer.launch();

      const page = await browser.newPage();
      await page.goto(`https://${url}`);

      let document = await page.evaluate(
        () => document.documentElement.outerHTML
      );
      document = replace(document, `/?url=${url.split("/")[0]}`);

      return res.send(document);
    } catch (err) {
      console.log(err);

      return res.send(err);
    }
  }
});

app.listen(5000);
