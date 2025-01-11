const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir); 
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get("/", function(req, res) {
    fs.readdir(filesDir, function(err, files) {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error reading directory.");
        }
        res.render("index", { files: files });
    });
});


app.post("/create", function(req, res) {
    const fileName = `${req.body.title.split(" ").join("-")}.txt`;
    const filePath = path.join(filesDir, fileName);

    
    fs.writeFile(filePath, req.body.details, function(err) {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Error writing file.");
        }
        res.redirect("/"); 
    });
});


app.listen(3000);

