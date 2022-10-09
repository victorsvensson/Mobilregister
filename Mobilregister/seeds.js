const mongoose = require("mongoose");
const User = require("./models/user");

//Connect to database
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/mobilregister");
    console.log("Database is now connected");
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
//

const p = new User({
    name: "Victor",
    number: 0101123123,
    model: "iPhone 4",
});

p.save()
    .then((p) => {
        console.log(p);
    })
    .catch((e) => {
        console.log(e);
    });
