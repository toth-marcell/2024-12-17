import express from "express";
import { Decoration } from "./models.js";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("view options", {
  rmWhitespace: true,
});
app.get("/", async (req, res) => {
  res.render("index", { decors: await Decoration.findAll() });
});

app.get("/decoration", async (req, res) => {
  res.json(await Decoration.findAll());
});

app.post("/decoration", async (req, res) => {
  const id = req.body.id || 0;
  const existing = await Decoration.findByPk(id);
  if (existing) {
    await existing.update({
      name: req.body.name,
      stock: req.body.stock,
      price: req.body.price,
    });
  } else {
    await Decoration.create({
      name: req.body.name,
      stock: req.body.stock,
      price: req.body.price,
    });
  }
  if (req.headers["content-type"] == "application/json") res.end();
  else res.redirect("/");
});

app.put("/decoration", async (req, res) => {
  const decor = await Decoration.findByPk(req.body.id);
  await decor.update({
    stock: req.body.stock,
  });
  res.end();
});

app.delete("/decoration", async (req, res) => {
  await Decoration.destroy({ where: { id: req.body.id } });
  res.end();
});

const port = 3000;
app.listen(port, () => console.log(`Listening on :${port}`));
