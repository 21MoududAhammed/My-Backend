const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const booksCollection = client.db("booksDB").collection("books");

    // Use routes
    app.use("/", bookRoutes(booksCollection));

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("This is backend server for CRUD operations.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
