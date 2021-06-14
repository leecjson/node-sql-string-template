
export declare class Statement {
  readonly sql: string;
  readonly params: any[];

  constructor(sql?: string, ...params: any[]): Statement;
  append(stmt: Statement): Statement;
  append(sql: string, ...params: any[]): Statement;
  pack(): [string, any[]];

  /**
   * aliases to pack()
   */
  spread(): [string, any[]];

  /**
   * rebind the binding params of statment
   * @param params
   */
  rebind(newParams: any[]): Statement;
}

declare function SQLStringTemplate(strings: TemplateStringsArray, ...args: any[]): Statement;

declare namespace SQLStringTemplate {
  function set(values: object): Statement;
  function values(values: object): Statement;
  function join(values: any[]): Statement;
  function raw(value: any): Statement;
}

export = SQLStringTemplate;
