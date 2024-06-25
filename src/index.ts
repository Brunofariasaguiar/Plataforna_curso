import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import router from './routes';

export const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
