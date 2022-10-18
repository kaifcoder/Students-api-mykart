const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Students Api. Use route /create => to create, /all => to get all students detail /update/{id} => to update a student" });
});

const students = require("./app/controllers/student.controller");

// Create
app.post("/create", students.create);

// Retrieve all
app.get("/all", students.findAll);

// Retrieve with id
app.get("/getStudent/:id", students.findOne);

// Update with id
app.put("/update/:id", students.update);

// Delete with id
app.delete("/delete/:id", students.delete);

// Delete all Students
app.delete("/deleteAll", students.deleteAll);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
