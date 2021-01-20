class Singleton {
  private static instance: Singleton;

  public constructor() {
    Singleton.instance = this;
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

}

class AnotherSingleton extends Singleton {
}

const singleton: Singleton = Singleton.getInstance();
const anotherSingleton: AnotherSingleton = AnotherSingleton.getInstance();
const testSingleton = new Singleton();

if (singleton === anotherSingleton === testSingleton) {
  console.log('Singleton works, both variables contain the same instance.');
} else {
  console.log('Singleton failed, variables contain different instances.');
}
