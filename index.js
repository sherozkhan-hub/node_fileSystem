const express = require("express");
const fs = require("fs");
const app = express();
const port = 900;

app.use(express.json());

// Creating user
app.post("/create", (req, res) => {
  try {
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Error reading the file");
        return;
      }
      let dataArray = JSON.parse(data);
      const objectToStore = req.body;
      //   objectToStore.id = dataArray.length + 1;
      dataArray.push(objectToStore);
      const jsonString = JSON.stringify(dataArray);
      fs.writeFile("data.json", jsonString, (err) => {
        if (err) {
          console.log("Error writing to file:", err);
          res.status(500).send("Error creating user");
        } else {
          console.log("User stored successfully!");
          res.status(200).json(JSON.parse(jsonString));
        }
      });
    });
  } catch (err) {
    console.log("Error processing the request:", err);
    res.status(400).send("Invalid request");
  }
});

// Getting users
app.get("/display", (req, res) => {
  try {
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Error reading the file");
        return;
      }
      res.status(200).json(JSON.parse(data));
    });
  } catch (error) {
    res.status(400).send("Invalid request");
  }
});

// Update the user
app.patch("/update/:id", (req, res) => {
  try {
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Error reading the file");
        return;
      }
      const { id, name, age } = req.body;
      let dataArray = JSON.parse(data);
      let index = dataArray.findIndex((data) => data.id == req.params.id);
      if (index === -1) {
        res.send("User does not exist");
      }
      const userToUpdate = dataArray.map((data) => {
        if (data.id == req.params.id) {
          data.name = name;
          data.age = age;
          return data;
        }
        return data;
      });
      console.log(userToUpdate);

      const jsonString = JSON.stringify(userToUpdate);

      fs.writeFile("data.json", jsonString, (err) => {
        if (err) {
          console.log("Error writing to file:", err);
          res.status(500).send("Error creating user");
        } else {
          console.log("User stored successfully!");
          res.status(200).send("Updated User");
        }
      });
    });
  } catch (error) {
    res.status(400).send("Invalid request");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
