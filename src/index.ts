import { Main } from './main';

process.stdin.setEncoding('utf8');
process.stdin.on('readable', Main.handleShoppingItemsInput);

process.stdin.on('end', () => {
  process.stdout.write('end');
});
