import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import pageRouter from "./routes/page.routes";

const app = express();
const PORT = process.env.PORT || 3000;

const COOKIE_SECRET = "mySuperSecret";

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(COOKIE_SECRET));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", pageRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
