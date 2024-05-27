// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { log } from 'console';

export default async (req, res) => {
  let rates = [];

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
      const fxRate = result.availableCountries[1].corridors.find((corridors) => corridors.countryDisplayName == "Nigeria")
      return {
        "rate": fxRate["fxRate"],
        "provider": "TapTap", "bestRate": false, "href": "https://www.taptapsend.com/"
      }
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
      return { "rate": parseFloat(response.data[0].baseRate).toFixed(2), "provider": "Send", "bestRate": false, "href": "https://send.flutterwave.com/" }
    })
    .catch(error => console.log('error', error));

  const { exec } = require('child_process');

  const curlCommand = `curl 'https://acemoneytransfer.com/make-request' \
    -H 'authority: acemoneytransfer.com' \
    -H 'accept: */*' \
    -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
    -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
    -H 'origin: https://acemoneytransfer.com' \
    -H 'referer: https://acemoneytransfer.com/Nigeria/Send-Money-to-Nigeria' \
    -H 'sec-ch-ua: "Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-platform: "macOS"' \
    -H 'sec-fetch-dest: empty' \
    -H 'sec-fetch-mode: cors' \
    -H 'sec-fetch-site: same-origin' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' \
    -H 'x-requested-with: XMLHttpRequest' \
    --data-raw 'uri=rate%2Fcalculator&type=POST&data%5Bsrc_amount%5D=100&data%5Bdest_amount%5D=&data%5Buser_currency%5D=EUR&data%5Bcalculation_mode%5D=S&data%5Bdest_iso_numeric_code%5D=566&data%5Bsrc_iso_numeric_code%5D=528'
  `

  const ace_call = new Promise((resolve, reject) => {
    exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      }
      try {
        const parsed_rate = JSON.parse(stdout)
        resolve({ "rate": parseFloat(parsed_rate.data.exchange_rate).toFixed(2), "provider": "Ace Transfer", "bestRate": false });
      } catch (parseError) {
        console.log("curl_ace_call_exceptions>>>>", parseError)
        reject(parseError.message);
      }
    });
  }).then((result) => {
    return { "rate": parseFloat(result.rate).toFixed(2), "provider": "Ace Transfer", "bestRate": false, "href": "https://acemoneytransfer.com/referral-link/3056004" }
  }
  ).catch((result) => {
    console.log("ace_call_exceptions>>>>", result)
    return { "rate": 0.00, "provider": "Ace Transfer", "bestRate": false, "href": "https://acemoneytransfer.com/referral-link/3056004" }
  }
  )

  const remitlyCurlCommand = `curl --location 'https://api.remitly.io/v5/pricing/estimates?amount=100.00%20EUR&anchor=SEND&conduit=NLD%3AEUR-NGA%3ANGN&purpose=OTHER' \
  --header 'accept: application/json' \
  --header 'accept-language: en, en;q=0.5' \
  --header 'content-type: application/json' \
  --header 'origin: https://www.remitly.com' \
  --header 'priority: u=1, i' \
  --header 'referer: https://www.remitly.com/' \
  --header 'remitly-deviceenvironmentid: 3RoCMKdq1DauxuTShWkZhQpbQm6AKs0ALkUxILdiIWPuJfxDIokB1w0JII8kqhj1q8ZXWAPFoELwpTlRRKYfiwWoihvXkYcDCYnoACCVAASj' \
  --header 'sec-ch-ua: "Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"' \
  --header 'sec-ch-ua-mobile: ?0' \
  --header 'sec-ch-ua-platform: "macOS"' \
  --header 'sec-fetch-dest: empty' \
  --header 'sec-fetch-mode: cors' \
  --header 'sec-fetch-site: cross-site' \
  --header 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' \
  --header 'x-remitly-perf-reqsize: 0' \
  --header 'x-remitly-perf-starttime: 1714932144397'
  `

  const remitly_call = new Promise((resolve, reject) => {
    exec(remitlyCurlCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      }
      try {
        const parsed_rate = JSON.parse(stdout)
        resolve({ "rate": parsed_rate[0].exchange_rate_info.base_rate});
      } catch (parseError) {
        reject(parseError.message);
      }
    });
  }).then((result) => {
    return { "rate": parseFloat(result.rate).toFixed(2), "provider": "Remitly", "bestRate": false, "href": "https://remit.ly/94fqcne9" }
  }
  ).catch((result) => {
    return { "rate": 0.00, "provider": "Ace Transfer", "bestRate": false, "href": "https://remit.ly/94fqcne9" }
  }
  )

  await Promise.all([ace_call, send_call, tap_call, remitly_call])
    .then(([ace_reponse, send_response, tap_response, remitly_response]) => {
      rates = [ace_reponse, send_response, tap_response,remitly_response]
    })
    .catch(error => {
      console.error(error);
    });


  const maxRateIndex = rates.reduce((maxIndex, currentObject, currentIndex, array) => {
    const currentRate = parseFloat(currentObject.rate);
    const maxRate = parseFloat(array[maxIndex].rate);
    return currentRate > maxRate ? currentIndex : maxIndex;
  }, 0);

  rates.forEach((object, index) => {
    object.bestRate = index === maxRateIndex;
  });

  res.setHeader('Cache-Control', 's-maxage=86400')
  return res.status(200).json(rates);

};
