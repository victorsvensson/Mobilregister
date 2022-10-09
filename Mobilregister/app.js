const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const User = require("./models/user");

//Connect to database
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/mobilregister");
    console.log("Database is now connected");
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
//

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method")); //used to PUT, normally you can just get and post
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true })); //Need to be used to be able to POST

app.get("/", (req, res) => {
    res.redirect("/mobilregister");
});

app.get("/mobilregister", async (req, res) => {
    const users = await User.find({});
    res.render("mobilregister/index", { users });
});

app.post("/mobilregister", async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    console.log(newUser);
    res.redirect("/mobilregister");
});

app.delete("/mobilregister/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

app.put("/mobilregister/:id", async (req, res) => {
    await User.findByIdAndUpdate(req.params.id);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});