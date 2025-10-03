// queries.js - MongoDB queries for Tasks 3, 4, and 5

const { MongoClient } = require('mongodb');

// MongoDB connection
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

const client = new MongoClient(uri);

async function task3() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log("\nTask 3: Advanced Queries\n");

    // 1. Books that are in stock AND published after 2010
    const recentInStock = await collection.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log("Books in stock and published after 2010:");
    console.log(recentInStock);

    // 2. Projection: return only title, author, price
    const projected = await collection.find(
      {},
      { projection: { _id: 0, title: 1, author: 1, price: 1 } }
    ).toArray();
    console.log("\nBooks with only title, author, and price:");
    console.log(projected);

    // 3. Sorting: by price ascending
    const sortedAsc = await collection.find({}).sort({ price: 1 }).toArray();
    console.log("\nBooks sorted by price (ascending):");
    console.log(sortedAsc);

    // 4. Sorting: by price descending
    const sortedDesc = await collection.find({}).sort({ price: -1 }).toArray();
    console.log("\nBooks sorted by price (descending):");
    console.log(sortedDesc);

    // 5. Pagination: limit + skip (5 books per page, page 2 as example)
    const pageSize = 5;
    const page = 2;
    const paginated = await collection.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    console.log(`\nBooks on page ${page} (5 per page):`);
    console.log(paginated);

  } finally {
    await client.close();
  }
}

async function task4() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log("\nTask 4: Aggregation Pipelines\n");

    // 1. Average price of books by genre
    const avgPriceByGenre = await collection.aggregate([
      { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("Average price by genre:");
    console.log(avgPriceByGenre);

    // 2. Author with most books
    const topAuthor = await collection.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("\nAuthor with most books:");
    console.log(topAuthor);

    // 3. Group by publication decade
    const byDecade = await collection.aggregate([
      {
        $group: {
          _id: { $subtract: [{ $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] }] },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          decade: { $multiply: ["$_id", 10] },
          count: 1,
          _id: 0
        }
      },
      { $sort: { decade: 1 } }
    ]).toArray();
    console.log("\nBooks grouped by publication decade:");
    console.log(byDecade);

  } finally {
    await client.close();
  }
}

async function task5() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log("\nTask 5: Indexing\n");

    // 1. Index on title
    await collection.createIndex({ title: 1 });
    console.log("Index created on title field");

    // 2. Compound index on author + published_year
    await collection.createIndex({ author: 1, published_year: 1 });
    console.log("Compound index created on author + published_year");

    // 3. Use explain() to show performance
    const explainResult = await collection.find({ title: "1984" }).explain("executionStats");
    console.log("\nExplain output for query by title:");
    console.log(JSON.stringify(explainResult.executionStats, null, 2));

  } finally {
    await client.close();
  }
}

// Run tasks here:
(async function runAll() {
  await task3();
  await task4();
  await task5();
})();

