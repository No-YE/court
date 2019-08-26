import app from '../app';
import { port } from '../config';

app.listen(port || 3000)
  .then(() => console.log('start'))
  .catch(e => console.error(e));
