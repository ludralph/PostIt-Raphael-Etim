import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';
import routes from './routes/index';
import models from './models';

dotenv.config();
const env = process.env.NODE_ENV || 'development';

const compiler = webpack(config);
const app = express();
const port = process.env.PORT || 5000;
// Middlewares used
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
const secret = process.env.SECRET;
app.set('SECRET', secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/api/v1', routes);

if (env === 'development') {
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,
'../client/public/index.html'));
});

models
  .sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port);
  });
export default app;
