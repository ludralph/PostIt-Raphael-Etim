/* eslint linebreak-style: ['error', 'windows']*/
import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import routes from './routes/index';


env.config();
const app = express();
const port = process.env.PORT || 3000;


// Middlewares used
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/', routes);
app.listen(port, () => {
  console.log('Listening on port 3000');
});
export default app;
