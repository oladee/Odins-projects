#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Category = require("./models/category");
  const Item = require("./models/item");

  
  const categories = [];
  const items = [];

  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategory();
    await createItem();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function categoryCreate(index, name, desc) {
    const category = new Category({ name, desc });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }

  
  async function itemCreate(index, name, desc, category, price, numberInStock) {
    const item = new Item({
      name, desc, category, price, numberInStock
    });
    await item.save();
    item[index] = item;
    console.log(`Added item: ${name}`);
  }
  
  async function createCategory() {
    console.log("Adding category");
    await Promise.all([
      categoryCreate(0, "Bags", "A category for legendary bags"),
      categoryCreate(1, "Shoes",  "A category for legendary Shoes"),
      categoryCreate(2, "Hats",  "A category for legendary Hats"),
    ]);
  }
  
  async function createItem() {
    console.log("Adding authors");
    await Promise.all([
      itemCreate(0, "Versace", "This is a quality good Versace Shoe", [categories[1]], 50, 20),
      itemCreate(1, "VeryGown", "This is a quality good Bag", [categories[0]], 150, 20),
      itemCreate(1, "Laud Hats", "Quality Hats from Romaine pee", [categories[2]], 250, 20),
    ]);
  }
  
  