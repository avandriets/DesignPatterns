interface Print {
  print(): void;
}

interface Scan {
  scan(): void;
}

class MFU implements Print, Scan {

  print(): void {
    console.log('MFU Print!');
  }

  scan(): void {
    console.log('MFU Scan!');
  }

}

class Printer implements Print {

  print(): void {
    console.log('Printer print!');
  }

}

class Scanner implements Scan {

  scan(): void {
    console.log('Scanner scan!');
  }

}

const printer = new Printer();
printer.print();

const scanner = new Scanner();
scanner.scan();

const mfu = new MFU();
mfu.print();
mfu.scan();
