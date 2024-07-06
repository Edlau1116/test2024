const getRawBody = require("raw-body");

const currency = [
  {
    id: "USD",
    name: "United States Dollar",
    symbol: "$",
    rate: 1.0,
    description:
      "The primary currency of the United States and many other countries.",
  },
  {
    id: "EUR",
    name: "Euro",
    symbol: "€",
    rate: 0.85,
    description: "The official currency of many European countries.",
  },
];
const getCurrency = (id) => {
  return currency.find((c) => c.id === id);
};
const getRate = (id) => {
  return currency.find((c) => c.id === id)["rate"];
};

const calRate = (frsymbol, amount) => {
  return currency.find((c) => c.id === frsymbol)["rate"] * amount;
};

console.log(getRate("USD"));

exports.handler = (req, resp, context) => {
  let params = {
    path: req.path,
    queries: req.queries,
    headers: req.headers,
    method: req.method,
    requestURI: req.url,
    clientIP: req.clientIP,
  };

  const addCurrency = (id, name, symbol, rate, description) => {
    currency.push({
      id,
      name,
      symbol,
      rate,
      description,
    });
  };

  switch (req.method) {
    case "GET":
      if (req.path === `/currency/:symbol`) {
        resp.setHeader("Content-Type", "application/json");
        resp.send(JSON.stringify(getCurrency("USD"), null, " "));
      } else if (req.path === `/rate/:symbol`) {
        resp.setHeader("Content-Type", "application/json");
        resp.send(JSON.stringify(`"exchange":${getRate("EUR")}`, null, " "));
      } else if (req.path === `/rate/:frsymbol/:amount`) {
        resp.setHeader("Content-Type", "application/json");
        resp.send(JSON.stringify(calRate("USD", 100), null, " "));
      } else {
        resp.setStatusCode(404);
        resp.send("Invalid path");
      }
      break;
  }
};
