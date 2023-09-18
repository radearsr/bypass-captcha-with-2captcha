const axios = require("axios");

const currentTime = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;
  year = year < 10 ? `0${year}` : year;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  const strTime = `${hours}:${minutes}:${seconds}`;
  return `${day}-${month}-${year} ${strTime}`;
};

const sleep = async (second) => {
  return new Promise((acc, rej) => {
    setTimeout(() => {
      acc();
    }, second * 1000);
  });
};

const solveRecaptchaV2 = async (key, method, googlekey, pageurl) => {
  console.log(
    `[${currentTime()}] SOLVE RECAPTCHA START GOOGLE_KEY=${googlekey} | PAGE_URL=${pageurl} | API_KEY${key} | METHOD=${method}`
  );
  const getIdEndpoint = "https://2captcha.com/in.php";
  const { data: responseGetCaptchaId } = await axios(getIdEndpoint, {
    params: {
      key,
      method,
      googlekey,
      pageurl,
      json: true,
    },
  });

  console.log(
    `[${currentTime()}] RESPONSE GET CAPTCHA ID ${JSON.stringify(
      responseGetCaptchaId
    )}`
  );

  if (responseGetCaptchaId.status !== 1)
    throw new Error("ERROR_GET_CAPTCHAID_STATUS");

  while (1) {
    console.log(`[${currentTime()}] DELAY 15 SECOND TO GETTING CAPTCHA TOKEN`);
    await sleep(15);
    console.log(`[${currentTime()}] TRY GETTING CAPTCHA TOKEN...`);
    const { data: responseCaptchaToken } = await axios(
      "http://2captcha.com/res.php",
      {
        params: {
          key,
          action: "get",
          id: responseGetCaptchaId.request,
          key,
          json: true,
        },
      }
    );
    console.log(
      `[${currentTime()}] RESPONSE GET CAPTCHA TOKEN ${JSON.stringify(
        responseCaptchaToken
      )}`
    );
    if (responseCaptchaToken.status === 1) {
      return responseCaptchaToken.request;
    }
    if (responseCaptchaToken.request !== "CAPCHA_NOT_READY")
      throw new Error("ERROR_GET_CAPTCHA_RESPONSE");
  }
};

module.exports = {
  sleep,
  solveRecaptchaV2,
  currentTime,
};
