import { app } from './app';

const PORT = process.env.PORT;

app.listen(PORT || 3333, () => {
  console.log('Server started! 🏆');
});
