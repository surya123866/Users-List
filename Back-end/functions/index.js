const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const functions = require("firebase-functions");

const app = express();
app.use(cors());
const PORT = 3001;

const password = "lV1etQtqMaoT1JqW";

app.use(bodyParser.json());

// Connect to MongoDB (Make sure MongoDB server is running)
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://suryakommanapalli:${password}@usersdatabase.otexgnv.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Connected to MongoDB");
    //insertDummyData();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDatabase();

// Create a user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },

  createdAt: {
    type: String,
    required: true,
  },
});

// Create a user model
const UserModel = mongoose.model("User", userSchema);

// Dummy data with hashed passwords
const dummyData = [
  {
    name: "John Doe",
    mobile: "123-456-7890",
    email: "john.doe@example.com",
    createdAt: "2023-01-01T12:00:00Z",
  },
  {
    name: "Jane Smith",
    mobile: "987-654-3210",
    email: "jane.smith@example.com",
    createdAt: "2023-01-02T14:30:00Z",
  },
  {
    name: "Bob Johnson",
    mobile: "555-555-5555",
    email: "bob.johnson@example.com",
    createdAt: "2023-01-03T10:15:00Z",
  },
  {
    name: "Alice Williams",
    mobile: "333-333-3333",
    email: "alice.williams@example.com",
    createdAt: "2023-01-04T08:45:00Z",
  },
  {
    name: "Charlie Brown",
    mobile: "444-444-4444",
    email: "charlie.brown@example.com",
    createdAt: "2023-01-05T16:20:00Z",
  },
  {
    name: "Eva Davis",
    mobile: "777-777-7777",
    email: "eva.davis@example.com",
    createdAt: "2023-01-06T13:10:00Z",
  },
  {
    name: "Frank Miller",
    mobile: "666-666-6666",
    email: "frank.miller@example.com",
    createdAt: "2023-01-07T09:30:00Z",
  },
  {
    name: "Grace Turner",
    mobile: "222-222-2222",
    email: "grace.turner@example.com",
    createdAt: "2023-01-08T11:40:00Z",
  },
  {
    name: "Henry Wilson",
    mobile: "888-888-8888",
    email: "henry.wilson@example.com",
    createdAt: "2023-01-09T15:50:00Z",
  },
  {
    name: "Ivy Clark",
    mobile: "999-999-9999",
    email: "ivy.clark@example.com",
    createdAt: "2023-01-10T20:00:00Z",
  },
];

async function insertDummyData() {
  try {
    await UserModel.insertMany(dummyData);
    console.log("Dummy data inserted successfully");
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  } finally {
    mongoose.disconnect();
  }
}

// API endpoint for user login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if a user with the given email exists
    const user = await UserModel.findOne({ email });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, return user details
      res.json({
        userId: user._id,
        name: user.name,
        email: user.email,
        // Add other user details you want to return
      });
    } else {
      // Passwords do not match, return an error
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to add a new user
app.post("/api/user", async (req, res) => {
  try {
    const { name, email, mobile, createdAt } = req.body;

    // Validate request body
    if (!name || !email || !mobile || !createdAt) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const newUser = {
      name,
      email,
      mobile,
      createdAt,
    };

    const result = await UserModel.collection.insertOne(newUser);

    if (result.acknowledged) {
      // Send a response indicating success and include the inserted document's ID
      res.status(201).json({ success: true, userId: result.insertedId });
    } else {
      res.status(500).json({ error: "Failed to insert user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get a user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to update a user by ID
app.put("/api/user/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;
    await UserModel.findByIdAndUpdate(userId, updatedUserData);
    res.json(updatedUserData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete a user by ID
app.delete("/api/users/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await UserModel.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
exports.app = functions.https.onRequest(app);
