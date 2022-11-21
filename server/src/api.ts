import express from 'express';
import * as dotenv from 'dotenv';
import apiErrorHandler from '@middlewares/errorHandler';
import adminRoutes from '@routes/adminRoutes';
import userRoutes from '@routes/userRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT as string;

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.use(adminRoutes);

app.use(userRoutes);

app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
