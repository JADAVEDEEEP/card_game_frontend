// decklab_scraper.js
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs-extra";

const BASE_URL = "https://onepiece.limitlesstcg.com/cards/";

const cardIds = [
  "OP15-002",
  "OP15-058",
  "OP15-098",
  "OP15-002"
];

// remove duplicates
const uniqueIds = [...new Set(cardIds)];

function parseMeta(metaText) {
  const parts = metaText.split("•").map(p => p.trim());

  let category = "";
  let colors = [];
  let cost = null;
  let power = null;
  let life = null;

  parts.forEach(p => {
    if (["Leader", "Character", "Event", "Stage"].includes(p)) {
      category = p;
    } else if (p.includes("/")) {
      colors = p.split("/");
    } else if (p.includes("Cost")) {
      cost = parseInt(p.replace("Cost", "").trim());
    } else if (p.includes("Life")) {
      life = parseInt(p.replace("Life", "").trim());
    } else if (p.includes("Power")) {
      power = parseInt(p.replace("Power", "").trim());
    } else {
      colors = [p];
    }
  });

  return { category, colors, cost, power, life };
}

async function scrapeCard(cardId) {
  try {
    const url = `${BASE_URL}${cardId}`;
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const name = $("h1").text().trim();
    const metaText = $(".card-subtitle").text();
    const effect = $(".card-text").text().trim();

    const rarity = $(".card-rarity").text().trim();
    const set = $(".card-set").text().trim();

    // image
    const img_url = $(".card-image img").attr("src");
    const img_full_url = img_url?.startsWith("http")
      ? img_url
      : `https://onepiece.limitlesstcg.com${img_url}`;

    const { category, colors, cost, power, life } = parseMeta(metaText);

    return {
      id: cardId,
      pack_id: set || null,
      name: name.replace(/\s/g, ""),
      rarity,
      category,
      img_url,
      img_full_url,
      colors,
      cost: cost || life, // leader = life
      attributes: [], // not available directly → can extend later
      power,
      counter: null, // need deeper parsing if character
      types: [], // can extract later
      effect,
      trigger: null
    };

  } catch (err) {
    console.log(`❌ Error ${cardId}:`, err.message);
    return null;
  }
}

async function main() {
  const results = [];

  for (const id of uniqueIds) {
    console.log(`🔄 Scraping ${id}...`);
    const card = await scrapeCard(id);
    if (card) results.push(card);
  }

  await fs.writeJson("./decklab_cards.json", results, { spaces: 2 });

  console.log("✅ Saved → decklab_cards.json");
}

main();