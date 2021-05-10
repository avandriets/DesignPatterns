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

}

class PersistenceManager {

  public saveToFile(fileName: string, transportation: Bus): void {
    fs.writeFileSync(fileName, transportation.toString());
  }

}

const persistenceManager = new PersistenceManager();
const bus = new Bus();

bus.addPassenger('Alex');
bus.addPassenger('Dmitriy');
bus.addPassenger('Sam');

persistenceManager.saveToFile('output/test-1.txt', bus);

console.log(`Passengers count: ${bus.passengerCount}, list: ${bus.toString()}`);

// Remove passenger
bus.removePassenger('Alex');

console.log(`Passengers count: ${bus.passengerCount}, list: ${bus.toString()}`);

persistenceManager.saveToFile('output/test-2.txt', bus);
