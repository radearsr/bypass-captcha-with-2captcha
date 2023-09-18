const puppeteer = require("puppeteer");

(async () => {
  // Launch a headless Chromium browser
  const browser = await puppeteer.launch({
    headless: false,
  });

  // Open a new page
  const page = await browser.newPage();

  // Define a JavaScript function that we want to expose to the page
  // const grecaptcha = (name) => {
  //   return `Hello, ${name}!`;
  // };

  // Navigate to a webpage
  await page.goto("https://newbiz.bri.co.id/");

  // Evaluate a script on the page that uses the exposed function
  await page.evaluate(async () => {
    // Call the 'greet' function from the page's context
    window.grecaptcha.getResponse = () => "HELOO";
    // window.login = () => {
    //   $("#alert").addClass("d-none");
    //   $("#btn-submit").attr("disabled", "true");
    //   $("#spinner-login").removeClass("d-none");
    //   $("#text-login").addClass("d-none");

    //   $.ajax({
    //     url: "/api/login",
    //     type: "POST",
    //     dataType: "json",
    //     data: {
    //       corpid: $("#corpid").val().toUpperCase(),
    //       userid: $("#userid").val().toUpperCase(),
    //       password: $("#password").val(),
    //       "g-recaptcha-response": "TEST",
    //     },
    //     async: true,
    //     success: function (response) {
    //       if (response.rc == "00") {
    //         window.location.href = response.redirect;
    //       } else {
    //         $("#alert").removeClass("d-none");
    //         $("#alert-msg").html(response.msg);
    //         $("#btn-submit").removeAttr("disabled");
    //         $("#spinner-login").addClass("d-none");
    //         $("#text-login").removeClass("d-none");
    //         resetRecaptcha();
    //       }
    //     },
    //     error: function () {
    //       $("#alert").removeClass("d-none");
    //       $("#alert-msg").html("Koneksi Terputus ");
    //       $("#btn-submit").removeAttr("disabled");
    //       $("#spinner-login").addClass("d-none");
    //       $("#text-login").removeClass("d-none");
    //       resetRecaptcha();
    //     },
    //   });
    // };
    recaptcha = "HELO";
    // window.recaptcha = "HELOO";
    // return await window.grecaptcha("John");
  });

  // Print the result
  // console.log(result); // Output: Hello, John!
  const content = await page.content();
  console.log(content);
  // Close the browser
  // await browser.close();
})();
