import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var facts = [
    "A newborn kangaroo is the size of a lima bean.",
    "The only mammal capable of flight is the bat.",
    "Polar bear skin is black!",
    "Only female mosquitoes bite.",
    "Slugs have 4 noses.",
    "Starfish do not have a brain.",
    "Crocodiles cannot stick their tongue out.",
    "Hummingbirds are the only birds that can fly backwards.",
    "Fleas can jump 350 times its body length."
];

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs", {facts : facts});
  });

  app.get("/fact", (req, res) => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    res.render("fact.ejs", {randomFact : randomFact});
  });

  app.get("/submit", (req, res) => {
    res.render("submit.ejs");
  });

  app.post("/submit", (req, res)=>{
    var alreadyIn = false;
    facts.forEach(fact =>{
        if(fact === req.body.postContent){
            alreadyIn = true;
        }
    })
    if(!alreadyIn){
        facts.push(req.body.postContent);
    }
    res.redirect('/');
  });


  app.post("/edit-fact/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const updatedFact = req.body.newFact;
    if (index >= 0 && index < facts.length && updatedFact.trim() !== '') {
      facts[index] = updatedFact;
    }
    res.redirect('/');
  });
  
  app.post("/delete-fact/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < facts.length) {
      facts.splice(index, 1);
    }
    res.redirect('/');
  });
  


  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

