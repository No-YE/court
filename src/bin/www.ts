import app from '../app';

const port = process.env.PORT || 3000;

app.listen(port)
  .then(() => console.log('start'))
  .catch(e => console.error(e));
