class Code {

  public className: string;
  public fields: { name: string; value: string; }[];
  public params: string[];

  public constructor() {
    this.className = '';
    this.fields = [];
    this.params = [];
  }

  public toString(): string {

    const fs = this.fields.map(f => `${f.name} = ${f.value};`).join('');

    let constr = this.params.length > 0 ? this.params.join(', ') : '';

    if (this.params.length > 0) {
      constr = `constructor(${constr}){}`;
    }

    return `class ${this.className} { ${fs} ${constr} }`;
  }

}

class CodeBuilder {

  public code: Code;

  public constructor(code = new Code()) {
    this.code = code;
  }

  public get fields(): FieldsBuilder {
    return new FieldsBuilder(this.code);
  }

  public get construct(): ConstructBuilder {
    return new ConstructBuilder(this.code);
  }

  public set className(value) {
    this.code.className = value;
  }

  public build(): Code {
    return this.code;
  }

}

class FieldsBuilder extends CodeBuilder {

  public constructor(code: Code) {
    super(code);
  }

  public add(name: string, value: any): FieldsBuilder {
    this.code.fields.push({ name, value });

    return this;
  }

}

class ConstructBuilder extends CodeBuilder {

  public constructor(code: Code) {
    super(code);
  }

  public addParam(name: string): ConstructBuilder {
    this.code.params.push(name);

    return this;
  }

}

const cb = new CodeBuilder();
cb.className = 'Foo';

const code = cb.fields.add('name', 'Test').add('age', 33)
  .construct.addParam('name').addParam('age')
  .build();

console.log(code.toString());
