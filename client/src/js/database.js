import { openDB } from "idb";

// Function to initialize the jate database
const initdb = async () => {
  try {
    // Open the "jate" database with version 1
    const jateDb = await openDB("jate", 1);

    // Check if the "jate" object store already exists
    if (jateDb.objectStoreNames.contains("jate")) {
      console.log("jate database already exists");
      return jateDb;
    }

    // Create a new "jate" object store with an auto-incrementing key
    const tx = jateDb.transaction("jate", "readwrite");
    const objStore = tx.objectStore("jate");
    objStore.createIndex("id", "id", { unique: true });

    console.log("Database created");
    return jateDb;
  } catch (error) {
    console.error("Error creating database, Refer to error:", error);
    throw error;
  }
};

// Function to add content to the database
export const putDb = async (id, value) => {
  try {
    console.log("Attempt to save data to jate DB");

    // Initialize the jate database
    const jateDb = await initdb();

    // Start a read-write transaction
    const tx = jateDb.transaction("jate", "readwrite");
    const objStore = tx.objectStore("jate");

    const req = objStore.put({ id: id, value: value });
    await req;

    console.log("Put request sucessfull to jate DB");
  } catch (error) {
    console.error("Error adding data to jate DB:", error);
    throw error;
  }
};

// Function to retrieve all content from the database
export const getDb = async () => {
  try {
    console.log("Attempt to retrieve data from jate DB");

    // Initialize the jate database
    const jateDb = await initdb();

    // Start a read-only transaction
    const tx = jateDb.transaction("jate", "readonly");
    const objStore = tx.objectStore("jate");

    // Retrieve all items from the object store
    const req = objStore.getAll();
    const res = await req;

    console.log("Get request sucessfull to jate DB", res);
    return res;
  } catch (error) {
    console.error("Error getting data from jate DB:", error);
    throw error;
  }
};

// Initialize the jate database when this module is imported
initdb();
