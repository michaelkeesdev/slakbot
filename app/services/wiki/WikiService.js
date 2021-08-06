/*
https://nl.wikipedia.org/w/api.php?action=opensearch&search={word}

https://nl.wikipedia.org/api/rest_v1/page/summary/{word}



// SCRAPE
dag + maand dutch = 6_augustus
https://nl.wikipedia.org/wiki/Sjabloon:Hoofdpagina_-_wist_je_dat_{date}


const htmlString = "<strong>Beware of the leopard</strong>";
const doc3 = parser.parseFromString(htmlString, "text/html");




*/
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import { sample } from "lodash";
import { WEETJES_ANSWER } from "../../answers/weetjes/Weetjes";
import { HttpClient } from "./../../../httpClient";

const axios = require("axios");

const monthNames = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

const STATIC_WEETJE_PID = 3;
const USER_WEETJE_PID = 50;

class WikiService {
  httpClient;
  constructor(httpClient = new HttpClient()) {
    this.httpClient = httpClient;
  }

  async getWikiSummary(topic) {
    const topicStrs = topic.split(" ");
    const word = topicStrs[topicStrs.length - 1];
    const res = await this.httpClient.get(
      `https://nl.wikipedia.org/api/rest_v1/page/summary/${word}`
    );
    return res.extract;
  }

  async getWikiSearch(topic) {
    const topicStrs = topic.split(" ");
    const word = topicStrs[topicStrs.length - 1];
    const res = await this.httpClient.get(
      `https://nl.wikipedia.org/w/api.php?action=opensearch&search=${word}`
    );
    return res[3][0];
  }

  // TODO WeetjeService
  async getWeetje() {
    let staticWeetje = Math.floor(Math.random() * STATIC_WEETJE_PID);
    let userWeetje = Math.floor(Math.random() * USER_WEETJE_PID);

    let res = "";
    if (staticWeetje === 1) {
      res = sample(WEETJES_ANSWER);
    } else if (userWeetje === 1) {
      res = "Wist ge dat ge suckt"; // TODO USER weetje
    } else {
      res = this.getWikiWeetjesToday();
    }
    return res;
  }

  async getWikiWeetjesToday() {
    const date = new Date();
    const month = monthNames[date.getMonth()];
    const day = date.getDay();

    const res = await this.httpClient.get(
      `https://nl.wikipedia.org/wiki/Sjabloon:Hoofdpagina_-_wist_je_dat_${day}_${month}`,
      { "Content-Type": "text/html" }
    );
    const { document } = new JSDOM(res).window;

    const weetje = `Wist je dat ${sample(this.parseWeetjes(document))}`;

    return weetje;
  }

  parseWeetjes(document) {
    const weetjes = [];
    const textBlock = document.getElementById("mw-content-text");
    const ul = textBlock.getElementsByTagName("ul")[0];
    const lis = ul.getElementsByTagName("li");
    for (const li of lis) {
      weetjes.push(li.textContent.split("...")[1].trim());
    }
    return weetjes;
  }
}

export { WikiService };
