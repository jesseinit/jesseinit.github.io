// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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

  const send_call = fetch("https://api.taptapsend.com/api/fxRates", requestOptions)
    .then((response) => response.json())
    .then((result) => rates.send = result.availableCountries[1].corridors[27]["fxRate"])
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
  
  const tap_call = fetch("https://sendgateway.myflutterwave.com/api/v1/config/getcurrencyrate?fromCurrency=EUR&toCurrency=NGN", requestOptions)
    .then(response => response.json())
    .then(response => response.data[0].baseRate)
    .catch(error => console.log('error', error));
  

  await Promise.all([send_call, tap_call])
  .then(([tap_response, send_response]) => {
    rates.send = send_response.toString();
    rates.tap = tap_response.toString();
  })
  .catch(error => {
    console.error(error); 
  });

  return res.status(200).json(rates);
  
};
