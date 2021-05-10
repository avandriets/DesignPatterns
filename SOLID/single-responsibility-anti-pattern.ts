import * as fs from 'fs';

class Bus {

  private _passengerCount = 0;
  private passengers: string[] = [];

  get passengerCount(): number {
    return this._passengerCount;
  }

  public addPassenger(name: string): void {
    this.passengers.push(name);
    this._passengerCount++;
  }

  public removePassenger(name: string): void {
    const index = this.passengers.indexOf(name);

    this.passengers.splice(index, 1);
    this._passengerCount--;
  }

  public toString(): string {
    return this.passengers.join(',');
  }

  //
  // ### Anti-pattern Golden Object ###
  //
  // second responsibility

  public save(fileName: string): void {
    fs.writeFileSync(fileName, this.toString());
  }

  public loadFromFs(fileName: string): void {
    // Load data from file system
  }

}

const bus = new Bus();

bus.addPassenger('Alex');
bus.addPassenger('Dmitriy');
bus.addPassenger('Sam');

bus.save('output/test-1.txt');

console.log(`Passengers count: ${bus.passengerCount}, list: ${bus.toString()}`);

bus.removePassenger('Alex');

console.log(`Passengers count: ${bus.passengerCount}, list: ${bus.toString()}`);

bus.save('output/test-2.txt');
