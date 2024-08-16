import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var data = {
    names: [],
    blog: []
};
var counter = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.get("/about", (req,res)=>{
    res.render("about.ejs");
});

app.get("/Add", (req,res) => {
    res.render("add.ejs");
});

app.post("/submit", (req,res) =>{
    if(!checker(req.body.name)){
        console.log("Name not Entered.");
        res.render("added.ejs", {
            addStatus: "Not Added, Name not Entered"
        });
    }
    else if(!checker(req.body.text)){
        console.log("Blog not Entered.");
        res.render("added.ejs", {
            addStatus: "Not Added, Blog not Entered"
        });
    }
    else{
        data.names[counter] = req.body.name;
        data.blog[counter] = req.body.text;
        counter++;
        res.render("added.ejs", {
            addStatus: "Successfully added!"
        });
    }
});

app.get("/articles", (req,res) => {
    res.render("articles.ejs", {
        name : data.names,
        articles : data.blog
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function checker(a){
    if(a === ""){
        console.log("empty");
        return 0;
    }
    else{
        console.log("not empty");
        return 1;
    }
}