// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { exec } = require("child_process");

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

    const tap_call = fetch(
        "https://api.taptapsend.com/api/fxRates",
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {
            const fxRate = result.availableCountries[1].corridors.find(
                (corridors) => corridors.countryDisplayName == "Nigeria"
            );
            return {
                rate: fxRate["fxRate"],
                provider: "TapTap",
                bestRate: false,
                href: "https://www.taptapsend.com/",
            };
        })
        .catch((error) => console.log("error", error));

    var myHeaders = new Headers();
    myHeaders.append("authority", "sendgateway.myflutterwave.com");
    myHeaders.append("accept", "application/json, text/plain, */*");
    myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("origin", "https://send.flutterwave.com");
    myHeaders.append("referer", "https://send.flutterwave.com/");
    myHeaders.append(
        "sec-ch-ua",
        '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"'
    );
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", '"macOS"');
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "cross-site");
    myHeaders.append(
        "user-agent",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    );

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const send_call = fetch(
        "https://sendgateway.myflutterwave.com/api/v1/config/getcurrencyrate?fromCurrency=EUR&toCurrency=NGN",
        requestOptions
    )
        .then((response) => response.json())
        .then((response) => {
            return {
                rate: parseFloat(response.data[0].baseRate).toFixed(2),
                provider: "Send",
                bestRate: false,
                href: "https://send.flutterwave.com/",
            };
        })
        .catch((error) => console.log("error", error));

    const curlCommand = `curl 'https://acemoneytransfer.com/make-request' \
	-H 'accept: */*' \
	-H 'accept-language: en-GB,en;q=0.9,nl-NL;q=0.8,nl;q=0.7,en-US;q=0.6' \
	-H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
	-H 'cookie: notice_gdpr_prefs=0|1|2:; notice_preferences=2:; _uc_referrer=direct; _uc_last_referrer=direct; _uc_initial_landing_page=https%3A//acemoneytransfer.com/; _uc_current_session=true; _uc_visits=1; TAsessionID=6b2ff11d-2c20-4313-95a5-4a293d6c78e5|EXISTING; locale=eyJpdiI6InhxUk5veWEwa0lMbGpxVDNpcmd5NWc9PSIsInZhbHVlIjoib3NXdXpBNm5QdUs2b0I5Sy9ERVVudG5BeW1keUdBVThPTUZRM2djRHl2NlVEc0JTV2xaZjJTZk9mNVdCeHFYQiIsIm1hYyI6IjJiZGRiNzA2MGQyYWNjNjNhMjE2YjUyN2I4M2FjMjU4NjUwY2FhZjkyNWQ0YjhjOWI1MzZlNDA4MzcyZDRlODIifQ%3D%3D; XSRF-TOKEN=eyJpdiI6IkU1ODZQUTFzdjNLdzVObUladW14ZXc9PSIsInZhbHVlIjoibldGZ0hFNDIveHZsYVBKeEtvRXZ6MkgwQ2FFOVJ2TlVTbjNQaUhCQzQ4enBYekN4VGRoWUh0dHBPQSs2V2FORFJjMmM0dGp5WFUrVS85dTB1aFUyY3Z3VFMrQmxjL1Q0ekQwRlpWSU1nNGlXcS9FZG5KL3hWb2VkdnNjcW5icUYiLCJtYWMiOiI2YzA2M2JhNGJmYmNjYThiZmU5OGFkMzI3OTNlYWI4NjhmMzI1OWZiNTkzNmUyMGFmNDkxNzZmZGQ5ZTllZTc2In0%3D; ace_money_transfer_session=eyJpdiI6IndiWGk1T2w0M3JDaFc5azBSUSsvZlE9PSIsInZhbHVlIjoidTRxaE00bGtXSTNmRDhSTWlyejJ6QUNUVy80bFUwTVlqWm1xUXJIeDVOV01XdkxVbTNkK3Jvb0xOdkxrN1ZpRWFqdUtLb2ZFS3NIZE9raFFXeTd5OXk3SDVPQ1BIYjZ6R2lTWXIzNmM1ZG90TWhhVEdhaFdCc1BwYTJkaWx6QWIiLCJtYWMiOiJmMWQyNTk3YWQyYTIyMDUxMGY3YzYyMjk1ODhhZTE0OGZmZGI1MTU5OTFhNTIzOWUxMTY1Mzc2OTAzZDY1YWFiIn0%3D; notice_behavior=implied|eu' \
	-H 'origin: https://acemoneytransfer.com' \
	-H 'priority: u=1, i' \
	-H 'referer: https://acemoneytransfer.com/Nigeria/Send-Money-to-Nigeria' \
	-H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
	-H 'sec-ch-ua-mobile: ?0' \
	-H 'sec-ch-ua-platform: "macOS"' \
	-H 'sec-fetch-dest: empty' \
	-H 'sec-fetch-mode: cors' \
	-H 'sec-fetch-site: same-origin' \
	-H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
	-H 'x-requested-with: XMLHttpRequest' \
	--data-raw 'uri=rate%2Fcalculator&type=POST&data%5Bsrc_amount%5D=100&data%5Bdest_amount%5D=&data%5Buser_currency%5D=EUR&data%5Bcalculation_mode%5D=S&data%5Bdest_iso_numeric_code%5D=566&data%5Bsrc_iso_numeric_code%5D=528&data%5Bsepecific_payer_id%5D=1966&auth=true'
  `;

    const ace_call = new Promise((resolve, reject) => {
        exec(curlCommand, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
            }
            try {
                const parsed_rate = JSON.parse(stdout);
                resolve({
                    rate: parseFloat(parsed_rate.data.exchange_rate).toFixed(2),
                    provider: "Ace Transfer",
                    bestRate: false,
                });
            } catch (parseError) {
                console.log("curl_ace_call_exceptions>>>>", parseError);
                reject(parseError.message);
            }
        });
    })
        .then((result) => {
            return {
                rate: parseFloat(result.rate).toFixed(2),
                provider: "Ace Transfer",
                bestRate: false,
                href: "https://acemoneytransfer.com/referral-link/3056004",
            };
        })
        .catch((result) => {
            console.log("ace_call_exceptions>>>>", result);
            return {
                rate: 0.0,
                provider: "Ace Transfer",
                bestRate: false,
                href: "https://acemoneytransfer.com/referral-link/3056004",
            };
        });

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
		`;

    const remitly_call = new Promise((resolve, reject) => {
        exec(remitlyCurlCommand, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
            }
            try {
                const parsed_rate = JSON.parse(stdout);
                resolve({ rate: parsed_rate[0].exchange_rate_info.base_rate });
            } catch (parseError) {
                reject(parseError.message);
            }
        });
    })
        .then((result) => {
            return {
                rate: parseFloat(result.rate).toFixed(2),
                provider: "Remitly",
                bestRate: false,
                href: "https://remit.ly/94fqcne9",
            };
        })
        .catch((error) => {
            console.error("Error Calling Ace>>>", error);
            return {
                rate: 0.0,
                provider: "Ace Transfer",
                bestRate: false,
                href: "https://remit.ly/94fqcne9",
            };
        });

    const profeeCurlCommand = `curl --location 'https://terminal.profee.com/api/v2/transfer/terminal/calculation' \
		--header 'accept: application/json, text/plain, */*' \
		--header 'accept-language: en-GB,en;q=0.9,nl-NL;q=0.8,nl;q=0.7,en-US;q=0.6' \
		--header 'content-type: application/json' \
		--header 'cookie: CANARY_NEXTJS=%5B%5D; __cf_bm=Fu.F9TXsck_h0lPuzJW_GmEsyEe9SniZmkKGskRpbNg-1716837733-1.0.1.1-uJc0ixmGe6gJByGEu2ATr5.YZ2OeOJQukkxNiNzwcHHfrjC9TB9HTRxcMP1lefztezHzzzQDM90p_0UlN6Geew; __app_refer=https://www.google.com/; __app_entry_url=https://www.profee.com/; __app_session_refer=https://www.google.com/; __app_session_entry_url=https://www.profee.com/; AMP_MKTG_edb98a63f6=JTdCJTIycmVmZXJyZXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRnd3dy5nb29nbGUuY29tJTJGJTIyJTJDJTIycmVmZXJyaW5nX2RvbWFpbiUyMiUzQSUyMnd3dy5nb29nbGUuY29tJTIyJTdE; cf_clearance=U7OTNWCrDA0sPxQ5E7LsoAGJcJPUw7ZW19IW.YPft84-1716837735-1.0.1.1-rktBV6kU5ymkhJDVWMhmPenC6CckfUYiSWdw0h5I4Xbc9kSDpDGKwPTYOaLG6mEH9r57aHP7L8HGvoXwbcFsoQ; __app_auth_entry_path=/; __app_browser_id=5e7a969a31a742de3e1933e3737f63b0; __app_visitor_id_ipqs=558b05a8ea7feccb0f5aa72a9cc346191c8488a4342e6a9b83b07aeeecf1cc38; AMP_edb98a63f6=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjI5OWYxZGE4My01ZGI3LTRjZjItODRiMi0yMThjNTIxM2JmNTclMjIlMkMlMjJ1c2VySWQlMjIlM0ElMjJXTC0xMDAwMDAwMDAxMDM5MzQ5JTIyJTJDJTIyc2Vzc2lvbklkJTIyJTNBMTcxNjgzNzczNDk4MSUyQyUyMm9wdE91dCUyMiUzQWZhbHNlJTJDJTIybGFzdEV2ZW50VGltZSUyMiUzQTE3MTY4MzgyMTExNzYlMkMlMjJsYXN0RXZlbnRJZCUyMiUzQTU3JTJDJTIycGFnZUNvdW50ZXIlMjIlM0EwJTdE; JSESSIONID=M2hVaXriuve_e1Q0N1fEoqCpdaJylSoki7KTNn-A; JWT_ACCESS_TOKEN=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ3YWxJZFwiOlwiV0wtMTAwMDAwMDAwMTAzOTM0OVwiLFwiand0Um9sZVwiOlwiVFJBTlNGRVJcIn0iLCJpc3MiOiJ0ZXJtaW5hbCIsImlhdCI6MTcxNjgzODIxMSwiZXhwIjoxNzE2ODQxODExLCJhdWQiOiJyZXN0LWFwaSx0ZXJtaW5hbCx3d3cifQ.SAYlC3BuKYmCFfCTEbRQIsDNaNkzz1kLjIv3QxiL1VrFHz-95pcVr6KsA5AIGBlPEHpzXVQWjBQ6lr6imq2bgw; __cf_bm=Xt6ZUfYD5BEac9GQ9gJv2YxPKxY28O7PHXPZaBv1yO4-1716854052-1.0.1.1-aFWNnTO2aoSoAZvUrHnSkIatITPtQzp2zwLmXtEtmvufWViVpHlo0WfJYJ457QJBHTlGBGV8gx2qnbWtaUwnwA; JSESSIONID=ajkmviH6OZbYlzZRicO3TQVcifs4vL1cgfwGIDub' \
		--header 'origin: https://www.profee.com' \
		--header 'priority: u=1, i' \
		--header 'referer: https://www.profee.com/' \
		--header 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
		--header 'sec-ch-ua-mobile: ?0' \
		--header 'sec-ch-ua-platform: "macOS"' \
		--header 'sec-fetch-dest: empty' \
		--header 'sec-fetch-mode: cors' \
		--header 'sec-fetch-site: same-site' \
		--header 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
		--header 'x-browser-id: 5e7a969a31a742de3e1933e3737f63b0' \
		--header 'x-request-id: 8a5aa5aa-8238-41f7-ad32-02ce182f30e8' \
		--header 'x-requested-by: send-next 1.8.697' \
		--data '{
			"methodId": "D2A161795786D8ED5CEE4A183095DCF8A20DFD5C",
			"from": {
				"currency": "EUR",
				"amount": 10,
				"country": 528
			},
			"to": {
				"currency": "NGN",
				"amount": null,
				"country": 566
			},
			"skipLimitValidation": true
		}'`;

    const profee_call = new Promise((resolve, reject) => {
        exec(profeeCurlCommand, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
            }
            try {
                const parsed_rate = JSON.parse(stdout);
                resolve({ rate: parsed_rate.body.currencyRate.rate });
            } catch (parseError) {
                reject(parseError.message);
            }
        });
    })
        .then((result) => {
            return {
                rate: parseFloat(result.rate).toFixed(2),
                provider: "Profee",
                bestRate: false,
                href: "https://profee.link/3sk4tj",
            };
        })
        .catch((error) => {
            console.error("Error Calling Profee>>>", error);
            return {
                rate: 0.0,
                provider: "Profee",
                bestRate: false,
                href: "https://profee.link/3sk4tj",
            };
        });

    await Promise.all([
        ace_call,
        send_call,
        tap_call,
        remitly_call,
        profee_call,
    ])
        .then(
            ([
                ace_reponse,
                send_response,
                tap_response,
                remitly_response,
                profee_call,
            ]) => {
                rates = [
                    ace_reponse,
                    send_response,
                    tap_response,
                    remitly_response,
                    profee_call,
                ];
            }
        )
        .catch((error) => {
            console.error(error);
        });

    const maxRateIndex = rates.reduce(
        (maxIndex, currentObject, currentIndex, array) => {
            const currentRate = parseFloat(currentObject.rate);
            const maxRate = parseFloat(array[maxIndex].rate);
            return currentRate > maxRate ? currentIndex : maxIndex;
        },
        0
    );

    rates.forEach((object, index) => {
        object.bestRate = index === maxRateIndex;
    });

    return res.status(200).json(rates);
};
