import 'dotenv/config';
import express from "express";

const app = express();

app.get('/', (req, res) => {
  return res.json({
    project: 'Nlw Ecoleta',
    Dev: 'Adrian'
  })
})

app.listen(process.env.PORT)