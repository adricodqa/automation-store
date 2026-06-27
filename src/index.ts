import express from "express";
import path from "path";
import indexRoutes from "./routes/index.route";
import indexAuth from "./routes/auth.route";

const app = express();
const port = Number(process.env.PORT || 3000);

const publicPath = path.join(__dirname, "../public");
const bootstrapPath = path.join(__dirname, "../node_modules/bootstrap/dist");

app.use(express.json());
app.use(express.static(publicPath));
app.use("/bootstrap", express.static(bootstrapPath));

app.use(indexRoutes);
app.use(indexAuth);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});