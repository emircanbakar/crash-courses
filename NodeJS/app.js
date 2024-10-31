const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

const dbURI =
  "mongodb+srv://admin:admin@cluster0.ajqid.mongodb.net/node?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("err", err);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "about my new blog",
    body: "main content of blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/all-blog", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("6723af09ad4d5216ab806382")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  // res.send('<p>home page</p>')
  // res.sendFile("./views/index.html", { root: __dirname });
  const blogs = [
    {
      title: "hello world",
      snippet: "lorem ipsum dolor sit amet",
    },
    {
      title: "hi there",
      snippet: "lorem ipsum dolor sit amet",
    },
  ];

  res.render("index", { title: "home", blogs });
});

app.get("/about", (req, res) => {
  // res.send('<p>about page</p>')
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "about" });
});

// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create" });
});

app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
