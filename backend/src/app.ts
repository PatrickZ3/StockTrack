import express from "express";
import cors from "cors";
import testRoute from './routes/test'

const app = express();

app.use(cors());
app.use(express.json());
app.use("/test-db", testRoute);

app.get("/", (req, res) => {
    res.send("Backend server is running");
})

export default app;