
export declare class Statement {
  readonly sql: string;
  readonly params: any[];

  constructor(sql?: string, ...params: any[]): Statement;
  append(stmt: Statement): Statement;
  append(sql: string, ...params: any[]): Statement;
  pack(): [string, any[]];
}

declare function SQLStringTemplate(strings: string[], ...args: any[]): Statement;

declare namespace SQLStringTemplate {
  function set(values: object): Statement;
  function values(values: object): Statement;
}

export = SQLStringTemplate;