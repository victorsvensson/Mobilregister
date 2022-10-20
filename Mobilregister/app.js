const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const User = require("./models/user");
const e = require("express");
const { findByIdAndUpdate } = require("./models/user");

const PhoneModel = require("./models/phoneModels");

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
//Homepage
app.get("/mobilregister", async (req, res) => {
    const users = await User.find({});
    res.render("mobilregister/index", { users });
});

app.post("/mobilregister", async (req, res) => {
    const search = req.body.search.trim();
    console.log(search);
    const searchResults = await User.find({
        name: { $regex: new RegExp("^" + search + ".*", "i") },
    }).exec();
});

//Create a new user page
app.get("/mobilregister/new", (req, res) => {
    res.render("mobilregister/new");
});

app.post("/mobilregister/new", async (req, res) => {
    const newUser = new User(req.body);
    console.log(newUser);
    await newUser.save();
    res.redirect("/mobilregister");
});

app.delete("/mobilregister/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

//Edit user
app.get("/mobilregister/:id/edit", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render("mobilregister/edit", { user });
});

app.put("/mobilregister/:id/", async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {
        ...req.body.mobilregister,
    });
    console.log(req.body.mobilregister);
    res.redirect("/mobilregister");
});

//New phone
app.get("/mobilregister/addPhone", async (req, res) => {
    const phones = await PhoneModel.find({});
    console.log(phones);
    res.render("mobilregister/addPhone", { phones });
});

app.post("/mobilregister/addPhone", async (req, res) => {
    const newPhone = new PhoneModel(req.body);
    console.log(newPhone.modelName);
    // console.log(newPhone);
    // res.redirect("/mobilregister");
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});
