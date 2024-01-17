// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { log } from 'console';

export default async (req, res) => {
  let rates = { send: "John Doe" };

  var myHeaders = new Headers();
  myHeaders.append("authority", "api.taptapsend.com");
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
  myHeaders.append("appian-version", "web/2022-05-03.0");
  myHeaders.append("origin", "https://www.taptapsend.com");
  myHeaders.append("referer", "https://www.taptapsend.com/");
  myHeaders.append(
    "sec-ch-ua",
    '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"macOS"');
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-site");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
  );
  myHeaders.append("x-device-id", "web");
  myHeaders.append("x-device-model", "web");
  myHeaders.append(
    "Cookie",
    "SESSION=NTI4ZGZmOGEtZGZkNS00ZGUwLWE2MmYtMDA4OWNjZGZlZjkx"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const tap_call = fetch("https://api.taptapsend.com/api/fxRates", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return { "rate": result.availableCountries[1].corridors[29]["fxRate"], "provider": "tap" }
    })
    .catch((error) => console.log("error", error));

  var myHeaders = new Headers();
  myHeaders.append("authority", "sendgateway.myflutterwave.com");
  myHeaders.append("accept", "application/json, text/plain, */*");
  myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
  myHeaders.append("origin", "https://send.flutterwave.com");
  myHeaders.append("referer", "https://send.flutterwave.com/");
  myHeaders.append("sec-ch-ua", "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"");
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "cross-site");
  myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const send_call = fetch("https://sendgateway.myflutterwave.com/api/v1/config/getcurrencyrate?fromCurrency=EUR&toCurrency=NGN", requestOptions)
    .then(response => response.json())
    .then(response => {
      return { "rate": response.data[0].baseRate, "provider": "send" }
    })
    .catch(error => console.log('error', error));

  const { exec } = require('child_process');

  const curlCommand = 'curl https://acemoneytransfer.com/make-request -H "authority: acemoneytransfer.com" -H "accept: */*" -H "accept-language: en-GB,en-US;q=0.9,en;q=0.8" -H "content-type: application/x-www-form-urlencoded; charset=UTF-8" -H "origin: https://acemoneytransfer.com" -H "referer: https://acemoneytransfer.com/Nigeria/Send-Money-to-Nigeria" -H \'sec-ch-ua: "Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"\' -H "sec-ch-ua-mobile: ?0" -H \'sec-ch-ua-platform: "macOS"\' -H "sec-fetch-dest: empty" -H "sec-fetch-mode: cors" -H "sec-fetch-site: same-origin" -H "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -H "x-requested-with: XMLHttpRequest" --data-raw "uri=rate%2Fcalculator&type=POST&data%5Bsrc_amount%5D=100&data%5Bdest_amount%5D=&data%5Buser_currency%5D=EUR&data%5Bcalculation_mode%5D=S&data%5Bdest_iso_numeric_code%5D=566&data%5Bsrc_iso_numeric_code%5D=528&data%5Bsepecific_payer_id%5D=1199&auth=true" --compressed';

  const ace_call = new Promise((resolve, reject) => {
    exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      }
      try {
        const parsed_rate = JSON.parse(stdout)
        resolve({ "rate": parsed_rate.data.exchange_rate, "provider": "ace" });
      } catch (parseError) {
        reject(parseError.message);
      }
    });
  }).then((result) => {
    return { "rate": result.rate.toString(), "provider": "ace" }
  }
  ).catch((result) => "Could not get ace transfer rates")

  await Promise.all([ace_call, send_call, tap_call])
    .then(([ace_reponse, send_response, tap_response]) => {
      console.log("tap_response, send_response, ace_reponse>>>", tap_response, send_response, ace_reponse);
      rates.tap = parseFloat(tap_response.rate);
      rates.send = parseFloat(send_response.rate);
      rates.ace = parseFloat(ace_reponse.rate);
    })
    .catch(error => {
      console.error(error);
    });

  return res.status(200).json(rates);

};
