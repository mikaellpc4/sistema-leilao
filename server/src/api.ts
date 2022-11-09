import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.TEST)

const app = express();
const port = 3333;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
