import express, { urlencoded } from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import db from "./db/db-connection.js";

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
  res.json("Hello ");
});

// GET ALL CONTACTS
app.get("/api/v1/contacts", async (req, res) => {
  try {
    const { rows: contacts } = await db.query(
      "SELECT * FROM contacts ORDER BY name ASC "
    );
    res.status(200).json({
      status: "success",
      results: contacts.length,
      data: { contacts },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

app.get("/api/v1/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { rows: contact } = await db.query(
      "SELECT * FROM contacts WHERE id=$1",
      [id]
    );
    res.status(200).json({
      status: "success",
      data: { contact },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// CREATE CONTACT
app.post("/api/v1/contacts", async (req, res) => {
  try {
    const { name, email, phone, notes } = req.body;

    const { rows: newContact } = await db.query(
      "INSERT INTO contacts (name, email, phone, notes) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, notes]
    );
    res.status(200).json({
      status: "success",
      data: { newContact },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

app.put("/api/v1/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, notes } = req.body;

    const { rows: updatedContact } = await db.query(
      "UPDATE contacts SET (name, email, phone, notes) = ($1, $2, $3, $4) WHERE id = $5 RETURNING *",
      [name, email, phone, notes, id]
    );
    res.status(200).json({
      status: "success",
      data: { updatedContact },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/v1/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await db.query(
      "DELETE FROM contacts WHERE id = $1",
      [id]
    );
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
