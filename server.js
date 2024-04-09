const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json())

app.post("/enter", (req, res) => {
    // console.log(req.body);
    fs.readFile(path.join(__dirname + "/public/data.json"), "utf-8", (error, data) => {
        // console.log(data);
        data = JSON.parse(data);
        data.push(req.body);
        // console.log(data);
        fs.writeFile(path.join(__dirname + "/public/data.json"), JSON.stringify(data), (error) => {
            if (error) {
                console.log("Getting Error ");
            }
            res.status(200).json(req.body);
        })
    })
})

app.get("/ui", (req, res) => {
    fs.readFile(path.join(__dirname + "/public/data.json"), "utf-8", (error, data) => {
        // data = JSON.parse(data);
        res.send(data);
    })
})

app.post("/removeItem", (req, res) => {
    console.log(req.body.name);

    fs.readFile(path.join(__dirname + "/public/data.json"), "utf-8", (error, data) => {
        // data = data.json();
        data = JSON.parse(data);
        let arr = data.filter((item) => {
            if (item.id != req.body.id) {
                return item;
            }
        })
        // data = data.stringify(data);

        fs.writeFile(path.join(__dirname + "/public/data.json"), JSON.stringify(arr), (error) => {
            if (error) {
                console.log("Getting Error ");
            }
            res.status(200).json(req.body);
        })
    })


})

app.get("/", (req, res) => {
    // console.log("Done!");
    res.sendFile(path.join(__dirname + "/public/page.html"));

})

app.post("/update", (req, res) => {
    console.log(req.body);

    fs.readFile(path.join(__dirname + "/public/data.json"), "utf-8", (error, data) => {
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        let db = data.map(item => {
            if (item.id == req.body.id) {
                console.log("task");
                item.name = req.body.name;
            }
            return item;
        });

        fs.writeFile(path.join(__dirname + "/public/data.json"), JSON.stringify(db), (error) => {
            if (error) {
                console.log("Error while writing into file... ");

            }
            else {
                console.log("file updated successfully....")

            }
            res.status(200).json(req.body);
        })

        console.log(db);
    })
})

app.post("/checkbox", (req, res) => {
    fs.readFile(path.join(__dirname + "/public/data.json"), "utf-8", (error, data) => {
        data = JSON.parse(data);
        let ans = data.filter((item) => {
            if (item.id == req.body.id) {
                item.status = req.body.status;
            }
            return item;
        })

        fs.writeFile(path.join(__dirname + "/public/data.json"), JSON.stringify(ans), (error) => {
            if (error) {
                console.log("error")
            }
            res.status(200).json(req.body);
        })
    })
})

app.listen(3000, (error) => {
    if (error) {
        console.log("Error");
    }
    else {
        console.log("server (port 3000) has been started");
    }
})