import { Main } from './main';

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const data = process.stdin.read() as string;
  if (data === null || data.length === 0) {
    Main.writeInputFormatMessage();
    return;
  }

  Main.handleShopingItemInput(data);
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
