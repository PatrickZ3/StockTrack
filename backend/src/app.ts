import express from "express";
import cors from "cors";
import testRoute from './routes/test'
import transactionRoute from './routes/transactions.routes'

const app = express();

app.use(cors());
app.use(express.json());

// register routes
app.use("/test-db", testRoute);
app.use("/transactions", transactionRoute);

app.get("/", (req, res) => {
    res.send("Backend server is running");
})

export default app;