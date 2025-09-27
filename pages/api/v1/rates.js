const { exec } = require("child_process");

const COMMON_HEADERS = {
    'accept': '*/*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
};

const createTapTapHeaders = () => {
    const headers = new Headers();
    Object.entries(COMMON_HEADERS).forEach(([key, value]) => headers.append(key, value));
    headers.append('authority', 'api.taptapsend.com');
    headers.append('appian-version', 'web/2022-05-03.0');
    headers.append('origin', 'https://www.taptapsend.com');
    headers.append('referer', 'https://www.taptapsend.com/');
    headers.append('sec-ch-ua', '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"');
    headers.append('sec-fetch-site', 'same-site');
    headers.append('x-device-id', 'web');
    headers.append('x-device-model', 'web');
    headers.append('Cookie', 'SESSION=NTI4ZGZmOGEtZGZkNS00ZGUwLWE2MmYtMDA4OWNjZGZlZjkx');
    return headers;
};

const createFlutterwaveHeaders = () => {
    const headers = new Headers();
    Object.entries(COMMON_HEADERS).forEach(([key, value]) => headers.append(key, value));
    headers.append('authority', 'sendgateway.myflutterwave.com');
    headers.append('accept', 'application/json, text/plain, */*');
    headers.append('origin', 'https://send.flutterwave.com');
    headers.append('referer', 'https://send.flutterwave.com/');
    headers.append('sec-ch-ua', '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"');
    headers.append('sec-fetch-site', 'cross-site');
    headers.append('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    return headers;
};

const createNalaHeaders = () => {
    const headers = new Headers();
    Object.entries(COMMON_HEADERS).forEach(([key, value]) => headers.append(key, value));
    headers.append('accept-language', 'en-GB,en;q=0.9,nl-NL;q=0.8,nl;q=0.7,en-US;q=0.6');
    headers.append('origin', 'https://www.nala.com');
    headers.append('priority', 'u=1, i');
    headers.append('referer', 'https://www.nala.com/');
    headers.append('sec-ch-ua', '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"');
    headers.append('sec-fetch-site', 'cross-site');
    headers.append('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36');
    return headers;
};

const createAfriexHeaders = () => {
    const headers = new Headers();
    Object.entries(COMMON_HEADERS).forEach(([key, value]) => headers.append(key, value));
    headers.append('accept-language', 'en-GB,en;q=0.9,nl-NL;q=0.8,nl;q=0.7,en-US;q=0.6');
    headers.append('if-none-match', 'W/"acc-nnqCARN36oEAk9YJsCdpfbMyZVQ"');
    headers.append('origin', 'https://www.afriex.com');
    headers.append('priority', 'u=1, i');
    headers.append('referer', 'https://www.afriex.com/');
    headers.append('sec-ch-ua', '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"');
    headers.append('sec-fetch-site', 'cross-site');
    headers.append('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36');
    return headers;
};

const createDefaultErrorResponse = (provider, href) => ({
    rate: 0,
    provider,
    bestRate: false,
    href
});

export default async (req, res) => {
    let rates = [];

    const tapTapCall = fetch(
        "https://api.taptapsend.com/api/fxRates",
        {
            method: "GET",
            headers: createTapTapHeaders(),
            redirect: "follow",
        }
    )
        .then((response) => response.json())
        .then((result) => {
            const nlRates = result.availableCountries.find((availableCountry) => {
                return availableCountry.isoCountryCode === "NL"
            });
            let fxRate = 0;
            if (nlRates) {
                for (let corridor of nlRates.corridors) {
                    if (corridor.isoCountryCode === "NG") {
                        fxRate = corridor.fxRate;
                        break;
                    }
                }
            }
            return {
                rate: fxRate,
                provider: "TapTap",
                bestRate: false,
                href: "https://www.taptapsend.com/",
            };
        })
        .catch((error) => {
            console.error("Error calling TapTap:", error);
            return createDefaultErrorResponse("TapTap", "https://www.taptapsend.com/");
        });

    const sendCall = fetch(
        "https://sendgateway.myflutterwave.com/api/v1/config/getcurrencyrate?fromCurrency=EUR&toCurrency=NGN",
        {
            method: "GET",
            headers: createFlutterwaveHeaders(),
            redirect: "follow",
        }
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
        .catch((error) => {
            console.error("Error calling Send:", error);
            return createDefaultErrorResponse("Send", "https://send.flutterwave.com/");
        });

    const curlCommand = `curl -v 'https://acemoneytransfer.com/make-request' \
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
  `;

    const aceCall = new Promise((resolve, reject) => {
        exec(curlCommand, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
                return;
            }
            try {
                const parsedRate = JSON.parse(stdout);
                resolve({
                    rate: parseFloat(parsedRate.data.exchange_rate).toFixed(2),
                    provider: "Ace Transfer",
                    bestRate: false,
                });
            } catch (parseError) {
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
        .catch((error) => {
            console.error("Error calling Ace:", error);
            return createDefaultErrorResponse("Ace Transfer", "https://acemoneytransfer.com/referral-link/3056004");
        });

    const remitlyCall = new Promise((resolve, reject) => {
        fetch("https://api.remitly.io/v5/pricing/estimates?amount=1%20EUR&anchor=SEND&conduit=NLD%3AEUR-NGA%3ANGN&purpose=OTHER", {
            headers: {
                accept: "application/json",
            },
            referrerPolicy: "no-referrer",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "omit"
        }).then(result => resolve(result.json())).catch(error => reject(error));
    })
        .then((result) => {
            return {
                rate: parseFloat(result[0].exchange_rate_info.base_rate).toFixed(2),
                provider: "Remitly",
                bestRate: false,
                href: "https://remit.ly/94fqcne9",
            };
        })
        .catch((error) => {
            console.error("Error calling Remitly:", error);
            return createDefaultErrorResponse("Remitly", "https://remit.ly/94fqcne9");
        });

    const nalaCall = new Promise((resolve, reject) => {
        fetch("https://partners-api.prod.nala-api.com/v1/fx/rates", {
            method: "GET",
            headers: createNalaHeaders(),
            redirect: "follow"
        })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    })
        .then((result) => {
            const nalaRates = result.data.find(
                (data) => {
                    return data.source_currency === "EUR" && data.destination_currency === "NGN"
                }
            );
            return {
                rate: parseFloat(nalaRates.rate).toFixed(2),
                provider: "Nala",
                bestRate: false,
                href: "https://join.iwantnala.com/JESSE-715106",
            };
        })
        .catch((error) => {
            console.error("Error calling Nala:", error);
            return createDefaultErrorResponse("Nala", "https://join.iwantnala.com/JESSE-715106");
        });


    const lemfiCall = new Promise((resolve, reject) => {
        fetch("https://lemfi.com/api/lemonade/v2/exchange", {
            headers: {
                accept: "application/json",
                "accept-language": "en-GB,en;q=0.9,nl-NL;q=0.8,nl;q=0.7,en-US;q=0.6",
                "content-type": "application/json",
                priority: "u=1, i",
                "sec-ch-ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            referrer: "https://lemfi.com/",
            referrerPolicy: "origin",
            body: '{"from":"EUR","to":"NGN"}',
            method: "POST",
            mode: "cors",
            credentials: "include"
        }).then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    }).then((result) => {
        return {
            rate: Math.floor(result.data.rate % 10000),
            provider: "Lemfi(referal code - OBIN6518)",
            bestRate: false,
            href: "https://lemfi.com",
        };
    })
        .catch((error) => {
            console.error("Error calling Lemfi:", error);
            return createDefaultErrorResponse("Lemfi(referal code - OBIN6518)", "https://lemfi.com");
        });

    const afriexCall = new Promise((resolve, reject) => {
        fetch("https://prod.afx-server.com/v2/public/rates?base=EUR", {
            method: "GET",
            headers: createAfriexHeaders(),
            redirect: "follow"
        })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    })
        .then((result) => {
            const ngnRate = result.rates.EUR.NGN;
            return {
                rate: parseFloat(ngnRate).toFixed(2),
                provider: "Afriex",
                bestRate: false,
                href: "https://www.afriex.com/",
            };
        })
        .catch((error) => {
            console.error("Error calling Afriex:", error);
            return createDefaultErrorResponse("Afriex", "https://www.afriex.com/");
        });

    const wiseCall = new Promise((resolve, reject) => {
        fetch("https://wise.com/gateway/v4/comparisons?payInMethod=BANK_TRANSFER&sendAmount=10&sourceCurrency=EUR&targetCurrency=NGN", {
            headers: {
                accept: "*/*",
                "accept-language": "en-GB,en;q=0.9,nl-NL;q=0.8,nl;q=0.7,en-US;q=0.6",
                "content-type": "application/json",
                priority: "u=1, i",
                "sec-ch-ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            referrer: "https://wise.com/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include"
        }).then((response) => {
            return resolve(response.json());
        }).catch((error) => reject(error));
    }).then((result) => {
        const wiseProvider = result.providers.find(provider => provider.alias === "wise");
        if (wiseProvider && wiseProvider.quotes.length > 0) {
            const wiseQuote = wiseProvider.quotes[0];
            return {
                rate: parseFloat(wiseQuote.rate).toFixed(2),
                provider: "Wise",
                bestRate: false,
                href: "https://wise.com/invite/dic/obinnae93",
            };
        } else {
            throw new Error("Wise provider or quotes not found");
        }
    }).catch((error) => {
        console.error("Error calling Wise:", error);
        return createDefaultErrorResponse("Wise", "https://wise.com/invite/dic/obinnae93");
    });

    await Promise.all([
        aceCall,
        tapTapCall,
        remitlyCall,
        nalaCall,
        lemfiCall,
        afriexCall,
        wiseCall
    ])
        .then(
            ([
                aceResponse,
                tapTapResponse,
                remitlyResponse,
                nalaResponse,
                lemfiResponse,
                afriexResponse,
                wiseResponse
            ]) => {
                rates = [
                    aceResponse,
                    tapTapResponse,
                    remitlyResponse,
                    nalaResponse,
                    lemfiResponse,
                    afriexResponse,
                    wiseResponse
                ];
            }
        )
        .catch((error) => {
            console.error("Error in Promise.all:", error);
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

    rates = rates.filter(rate => rate.rate > 0);

    return res.status(200).json(rates);
};
