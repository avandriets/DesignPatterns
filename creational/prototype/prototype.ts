class TestProto {
  user: string;

  hello(): string {
    return `Hello ${this.user}`;
  }

  clone(): TestProto {
    return Object.create(this);
  }

  cloneTwo(): TestProto {
    return new (this as any).constructor();
  }

}

const test1 = new TestProto();
test1.user = 'John';
console.log(test1.hello());

const test2 = test1.clone();
test2.user = 'Bob';
console.log(test2.hello());

console.log(test1 == test2);
