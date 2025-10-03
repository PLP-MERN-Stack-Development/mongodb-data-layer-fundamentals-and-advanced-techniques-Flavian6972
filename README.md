# PLP Bookstore – MongoDB Assignment

This project demonstrates MongoDB CRUD operations, advanced queries, aggregation pipelines, and indexing using a sample **bookstore** database.

---

## 📦 Project Structure

* **insert_books.js** → Populates the `plp_bookstore.books` collection with sample book data.
* **queries.js** → Contains queries for Tasks 3–5 (advanced queries, aggregations, indexing).
* **README.md** → Instructions for running the scripts.
* **screenshots/** → Folder containing screenshots of MongoDB Compass/Atlas with sample data.

---

## 🛠️ Prerequisites

* [Node.js](https://nodejs.org/) installed
* [MongoDB Community Edition](https://www.mongodb.com/try/download/community) installed locally

  * or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
* MongoDB server running (`mongod`)

## 📚 Running the Scripts

### 1. Insert Sample Books (Task 2)

Run the script to create the `plp_bookstore` database and insert sample books:

```bash
node insert_books.js
```

Expected output:

* Connects to MongoDB
* Drops old collection if it exists
* Inserts 10+ sample books
* Displays the inserted books

---

### 2. Run Queries (Tasks 3–5)

The `queries.js` file contains functions for advanced queries, aggregations, and indexing.

To run **all tasks sequentially**:

```bash
node queries.js

## ✅ Features Demonstrated

* **CRUD operations** (Insert, Find, Update, Delete)
* **Advanced Queries**: filtering, projection, sorting, pagination
* **Aggregation Pipelines**: average price by genre, most books by author, grouping by decade
* **Indexing**: single-field and compound indexes with `explain()`

