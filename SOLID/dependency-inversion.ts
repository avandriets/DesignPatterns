enum Relationship {
  parent = 'parent',
  children = 'children'
}

interface Relation {
  from: Person;
  to: Person;
  type: Relationship;
}

class Person {
  name: string;

  public constructor(name: string) {
    this.name = name;
  }

}

interface Extendable {
  addRelation(parent: Person, child: Person, type: Relationship);
}

interface Searchable {
  searchChildrenOf(name: string): Person[];
}

interface PersonStorage {
  getRelations(): Relation[];
}

class Relationships implements Extendable, PersonStorage, Searchable {

  private data: Relation[];

  constructor() {
    this.data = [];
  }

  public addRelation(parent: Person, child: Person, type: Relationship): void {
    this.data.push({ from: parent, to: child, type });
  }

  public getRelations(): Relation[] {
    return this.data;
  }

  public searchChildrenOf(name: string): Person[] {
    return this.getRelations()
      .filter(r => r.from.name === name && r.type === Relationship.children)
      .map(p => p.to);
  }

}

const parentJohn: Person = new Person('John');
const childAlex = new Person('Alex')
const childJason = new Person('Jason')

const rel = new Relationships();
rel.addRelation(parentJohn, childAlex, Relationship.children);
rel.addRelation(parentJohn, childJason, Relationship.children);

rel.searchChildrenOf('John').forEach(p => {
  console.log(`${p.name} is child of John`);
});
