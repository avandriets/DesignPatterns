abstract class Computer {

  protected constructor(public ram: string, public hdd: string, public cpu: string) {
  }

  public abstract getRAM(): string;

  public abstract getHDD(): string;

  public abstract getCPU(): string;

  public getComputerInfo(): string {
    return `RAM= ${this.getRAM()}, HDD= ${this.getHDD()}, CPU=${this.getCPU()}`;
  }

}

class PC extends Computer {

  constructor(ram: string, hdd: string, cpu: string) {
    super(ram, hdd, cpu);
  }

  getCPU(): string {
    return this.cpu;
  }

  getHDD(): string {
    return this.hdd;
  }

  getRAM(): string {
    return this.ram;
  }

}

class Server extends Computer {

  constructor(ram: string, hdd: string, cpu: string) {
    super(ram, hdd, cpu);
  }

  getCPU(): string {
    return this.cpu;
  }

  getHDD(): string {
    return this.hdd;
  }

  getRAM(): string {
    return this.ram;
  }

}

class ComputerFactory {

  public static getComputer(type: string, ram: string, hdd: string, cpu: string): Computer {

    if (type === 'PC') {
      return new PC(ram, hdd, cpu);
    } else if (type === 'Server') {
      return new Server(ram, hdd, cpu);
    } else {
      return null;
    }

  }

}

console.log(ComputerFactory.getComputer('PC', '8', '120', '2').getComputerInfo());
console.log(ComputerFactory.getComputer('Server', '64', '300', '10').getComputerInfo());
