"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const apiKey = process.env.CURRENCY_API_KEY;
app.get('/', async (req, res, next) => {
    res.json({
        message: "Hey, welcome the Currency API, try the following requests,  /latest/USD or /all/fiat"
    });
});
// get current rates based on the US Dollar
app.get('/latest/:baseCurrency', async (req, res, next) => {
    try {
        const baseCurrency = req.params.baseCurrency;
        console.log(`Base currency is ${baseCurrency}`);
        const response = await axios_1.default.get(`https://api.currencybeacon.com/v1/latest?api_key=${apiKey}&base=${baseCurrency}`);
        console.log(`Response is ${response.data.rates}`);
        res.json({ baseCurrency: baseCurrency, comparisons: response.data.rates });
    }
    catch (error) {
        console.log(`Error when getting the latest rates: ${error}`);
        res.json({
            message: "Try /latest/baseCurrency such as /latest/USD"
        });
    }
});
// get all currencies supported by the api
app.get('/all/:currencyType', async (req, res, next) => {
    try {
        const currencyType = req.params.currencyType;
        const response = await axios_1.default.get(`https://api.currencybeacon.com/v1/currencies?api_key=${apiKey}&type=${currencyType}`);
        console.log(`Response is ${response.data.response}`);
        res.json({
            currencyType: currencyType,
            response: response.data.response
        });
    }
    catch (err) {
        console.log(`Error when fetching all currencies: ${err}`);
        res.json({
            message: "Error occured. Try selecting what type of currency, maybe fiat or crypto"
        });
    }
});
// Convert currency to , from and amount
app.get('/convert/:from/:to/:amount', async (req, res, next) => {
    try {
        const { from, to, amount } = req.params;
        console.log(`Currnecy from is ${from}, currency to is ${to} while the amount to be converted is ${amount}`);
        const response = await axios_1.default.get(`https://api.currencybeacon.com/v1/convert?api_key=${apiKey}&from=${from}&to=${to}&amount=${amount}`);
        console.log(`Response is ${response.data.value}`);
        res.json({
            from: from,
            to: to,
            amount: amount,
            conversion: response.data.value
        });
    }
    catch (err) {
        console.log(`Error when converting currencies: ${err}`);
        res.json({
            message: "Error when converting currencies, try specifying /convert/from/to/amount such as convert/KES/USD/5000"
        });
    }
});
// Get historical context of of exachange rate data, from 1996 actually
app.get('/history/:base/:date', async (req, res, next) => {
    try {
        const { base, date } = req.params;
        console.log(`Base currency is ${base} while the date is ${date}`);
        const response = await axios_1.default.get(`https://api.currencybeacon.com/v1/historical?api_key=${apiKey}&base=${base}&date=${date}`);
        console.log(`Response is ${response.data}`);
        res.json({
            baseCurrency: base,
            date: date,
            history: response.data.rates
        });
    }
    catch (err) {
        console.log(`Error when digging into the past: ${err}`);
        res.json({
            message: "Error when checking history, maybe try /history/base/date such as /history/USD/10-10-2024"
        });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
