import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const OUTPUT_PATH = path.resolve("src/data/hardcover.json");
const HARDCOVER_API_TOKEN = process.env.HARDCOVER_API_TOKEN;

if (!HARDCOVER_API_TOKEN) {
  console.error("Missing HARDCOVER_API_TOKEN");
  process.exit(1);
}

async function hardcoverRequest(query, variables = {}) {
  const res = await fetch("https://api.hardcover.app/v1/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: HARDCOVER_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Hardcover fetch failed: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error(JSON.stringify(json.errors, null, 2));
    throw new Error("Hardcover GraphQL returned errors");
  }

  return json;
}

async function main() {
  const meQuery = `
    query GetMe {
      me {
        id
        username
      }
    }
  `;

  const meJson = await hardcoverRequest(meQuery);
  const me = meJson.data?.me?.[0] ?? null;

  if (!me) {
    throw new Error("Could not load Hardcover user");
  }

  const booksQuery = `
    query PortfolioHardcover($userId: Int!) {
      currentRead: user_books(
        where: { user_id: { _eq: $userId }, status_id: { _eq: 2 } }
        order_by: [{ updated_at: desc }]
        limit: 1
      ) {
        id
        updated_at
        book {
          title
          image {
            url
          }
          contributions(limit: 1) {
            author {
              name
            }
          }
        }
        user_book_reads(limit: 1, order_by: { started_at: desc_nulls_last }) {
          started_at
        }
      }

      lastFinished: user_books(
        where: { user_id: { _eq: $userId }, status_id: { _eq: 3 } }
        order_by: [{ updated_at: desc }]
        limit: 1
      ) {
        id
        updated_at
        book {
          title
          image {
            url
          }
          contributions(limit: 1) {
            author {
              name
            }
          }
        }
      }
    }
  `;

  const booksJson = await hardcoverRequest(booksQuery, { userId: me.id });

  const normalized = {
    username: me.username ?? null,
    currentRead: booksJson.data?.currentRead?.[0] ?? null,
    lastFinished: booksJson.data?.lastFinished?.[0] ?? null,
    fetchedAt: new Date().toISOString(),
  };

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(normalized, null, 2), "utf8");
  console.log(`Wrote Hardcover data to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});