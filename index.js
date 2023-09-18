require("dotenv").config();
const puppeteer = require("puppeteer");
const { sleep, solveRecaptchaV2, currentTime } = require("./bypassServices");

const bypassRecaptchaIBBIZ = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();

    const apiKey = process.env.TOKEN_API;
    const siteKey = "6LfQ9OkUAAAAABLHOt-u-7X662tf_dBqR0EeYHbw";
    const siteUrl = "https://newbiz.bri.co.id";

    await page.goto(siteUrl, { waitUntil: "networkidle2" });

    const captchaToken = await solveRecaptchaV2(
      apiKey,
      "userrecaptcha",
      siteKey,
      siteUrl
    );
    if (!captchaToken) throw new Error("TOKEN_NOT_VALID");

    console.log(
      `[${currentTime()}] REASSIGN GLOBAL VARIABLE recaptcha WITH ${captchaToken}`
    );

    await page.evaluate(async (captchaToken) => {
      window.grecaptcha.getResponse = () => captchaToken;
      recaptcha = captchaToken;
    }, captchaToken);

    console.log(`[${currentTime()}] TRY TO FILL CORP ID`);
    await page.type("#corpid", "corpid");
    await sleep(2);
    console.log(`[${currentTime()}] TRY TO FILL USER ID`);
    await page.type("#userid", "userid");
    await sleep(2);
    console.log(`[${currentTime()}] TRY TO FILL PASSWORD`);
    await page.type("#password", "password");
    await sleep(2);
    console.log(`[${currentTime()}] TRY TO CLICK SUBMIT`);
    await page.click("#btn-submit");
  } catch (error) {
    console.log(error);
  }
};

bypassRecaptchaIBBIZ();
