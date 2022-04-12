// Import All Dependencies

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configure env file and Require connection file
dotenv.config({ path: "./db/.env" });
require("./db/connection");

const port = process.env.PORT;

// Required Model
const Users = require("./db/models/userSchema");
const Message = require("./db/models/msgSchema");
const { path } = require("express/lib/application");
const alogin = require("./db/AdminROuter/admin");

// These Method is Used To Get Data and Cookies From FrontEnd
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/alogin", alogin);

// Registration
app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { username, email, password } = req.body;

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await Users.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Users.create({
      username,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    console.log(token,"token");

    const created = await user.save();

    res.cookie(
      "token",
      token,
      { maxAge: 60 * 60 * 24 * 10 },
      { httpOnly: true }
    );

    if (created) {
      res.status(200).json({ message: "Registered in", token });
    } else {
      res.status(400).send("failed");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  let loggedIn = null;
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    if (user) {
      let comp = await bcrypt.compare(password, user.password);
      if (comp) {
        const token = jwt.sign(
          {
            email: user.email,
            password: user.password,
          },
          process.env.JWT_SECRET_KEY
        );

        res.append("id", [user._id]);
        res.cookie(
          "token",
          token,
          { maxAge: 60 * 60 * 24 * 10 },
          { httpOnly: true }
        );
        res.status(200).json({ message: "logged in", token });
      } else {
        res.status(400).send("failed");
      }
    } else {
      res.send("Invalid Email");
    }
  } catch (error) {
    res.status(400).send("Invalid Email");
  }
});

app.post("/contact", async (req, res) => {
  console.log(req.body);
  try {
    // Get user input
    const { username, email, message } = req.body;

    // Validate user input
    if (!(email && message && username)) {
      res.status(400).send("All input is required");
    }

    // Create user in our database
    const msg = await Message.create({
      username,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      message,
    });

    const created = await msg.save();

    if (created) {
      res.status(200).json({ message: "Registered in" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get("/logout", (req, res) => {
  const token = req.cookies.token;
  console.log(token, "1st");
  res.clearCookie("token", { path: "/" });
  res.status(200).send("User LoggedOut");
});

app.get("/auth", (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const token = req.cookies.token;
  if (token) {
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send("error");
    }
  } else {
    return res.status(401).send("no token avilable");
  }
});

app.get("/", (req, res) => {
  res.send("hee");
});

app.listen(port, () => {
  console.log("port 3002 is listening");
});
