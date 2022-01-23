const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost:3306",
    password: "root",
    database: "gamesdb",
});

app.post("/addgame/", (req, res) => {
    const name = req.body.playerName;
    const playermove = req.body.playerMove;
    const computerMove = req.body.computerMove;
    const winner = req.body.winner;


    db.query(
        "INSERT INTO gametable (name, playermove, computermove, winner) VALUES (?,?,?,?,?)",
        [name, playermove, computerMove, winner],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM gametable", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});