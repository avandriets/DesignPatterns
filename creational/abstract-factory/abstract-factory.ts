interface Payload {
  weight: number;
}

interface Engine {
  thrust: number;
}

interface Stage {
  engines: Engine[];
}

interface Rocket {
  payload: Payload;
  stages: Stage[];
  type: string;
}

class Satellite implements Payload {

  constructor(
    public id: number,
    public weight: number
  ) {
  }

}

class FreightRocketFirstStage implements Stage {
  public engines: Engine[];
}

class FreightRocketSecondStage implements Stage {
  public engines: Engine[];
}

interface RocketFactory<R extends Rocket, P extends Payload, S extends Stage> {

  createRocket(): R;

  createPayload(): P;

  createStages(): S[];

}

class ExpPayload implements Payload {
  public weight: number;

  constructor(weight: number) {
    this.weight = weight;
  }

}

class ExpRocketStage implements Stage {
  public engines: Engine[];
}

class ExpRocket<V extends Payload, T extends Stage> implements Rocket {
  public payload: V;
  public stages: T[];
  public type = 'Experimental rocket';
}

class ExpRocketFactory implements RocketFactory<ExpRocket<ExpPayload, ExpRocketStage>, ExpPayload, ExpRocketStage> {

  public createRocket(): ExpRocket<ExpPayload, ExpRocketStage> {
    return new ExpRocket();
  }

  public createPayload(): ExpPayload {
    return new ExpPayload(33);
  }

  public createStages(): ExpRocketStage[] {
    return [
      new ExpRocketStage(),
    ];
  }

}

type FreightRocketStages = (FreightRocketFirstStage | FreightRocketSecondStage)[];

class FreightRocket<T extends Satellite, V extends FreightRocketStages> implements Rocket {
  public payload: T;
  public stages: V;
  public type = 'Freight rocket';
}

class FreightRocketFactory implements RocketFactory<FreightRocket<Satellite, FreightRocketStages>, Satellite, FreightRocketFirstStage | FreightRocketSecondStage> {

  private nextSatelliteId = 0;

  public createRocket(): FreightRocket<Satellite, FreightRocketStages> {
    return new FreightRocket();
  }

  public createPayload(): Satellite {
    return new Satellite(this.nextSatelliteId++, 100);
  }

  public createStages(): FreightRocketStages {
    return [
      new FreightRocketFirstStage(),
      new FreightRocketSecondStage()
    ];
  }

}

class Client {

  public buildRocket<T extends Rocket, P extends Payload, S extends Stage>(factory: RocketFactory<T, P, S>): T {
    const rocket = factory.createRocket();

    rocket.payload = factory.createPayload();
    rocket.stages = factory.createStages();

    return rocket;
  }

}

const client = new Client();

const expRocketFactory = new ExpRocketFactory();
const frtRocketFactory = new FreightRocketFactory();

const expRocket: ExpRocket<ExpPayload, ExpRocketStage> = client.buildRocket(expRocketFactory);
const frtRocket: FreightRocket<Satellite, FreightRocketStages> = client.buildRocket(frtRocketFactory);

console.log('Rocket type:', expRocket.type);
console.log('Experimental rocket weight:', expRocket.payload.weight);
console.log('Experimental rocket stages count:', expRocket.stages.length);

console.log('Rocket type:', frtRocket.type);
console.log('Freight rocket weight:', frtRocket.payload.weight);
console.log('Freight rocket stages count:', frtRocket.stages.length);
