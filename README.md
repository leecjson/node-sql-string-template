# SQL String Template

[![npm](https://img.shields.io/npm/v/sql-string-template.svg?maxAge=2592000)](https://www.npmjs.com/package/sql-string-template)
[![downloads](https://img.shields.io/npm/dm/sql-string-template.svg?maxAge=2592000)](https://www.npmjs.com/package/sql-string-template)
[![dependencies](https://david-dm.org/leecjson/node-sql-string-template.svg)](https://david-dm.org/leecjson/node-sql-string-template)
[![license](https://img.shields.io/npm/l/sql-string-template.svg?maxAge=2592000)](https://github.com/leecjson/node-sql-string-template/blob/master/LICENSE.txt)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A tiny tool allow you to use ES2015 template strings to render a sql prepared statements. (Only support quest mark placeholder for now!).

## Examples

### Insert
```javascript
const SQL = require('sql-string-template');

const data = { 
  name: "jon", 
  age: 12 
};
const stmt = SQL`
  INSERT INTO account 
    (name, age) 
    values 
    (${data.name}, ${data.age})
`;
// stmt.sql: "INSERT INTO account (name, age) values (?, ?)"
// stmt.params:  ["jon", 12]
*/
```

### Insert with ```values``` function
```javascript
const SQL = require('sql-string-template');
const { values } = SQL;

const data = { name: "jon", age: 12 };
const [sql, params] = SQL`
  INSERT INTO account ${values(data)}
`.spread();
// sql: "INSERT INTO account (name, age) values (?, ?)"
// params:  ["jon", 12]
```

### Update
```javascript
const SQL = require('sql-string-template');
const [sql, params] = SQL`
  UPDATE account SET ${SQL.set({
    name: "jon", 
    age: 12,
    school: null,
  })}
  WHERE id = ${1}
`.spread();
/*
sql: "UPDATE account SET name=?, age=?, school=?"
params:  ["jon", 12, null]
*/
```

### Select
```javascript
const SQL = require('sql-string-template');

const startDate = '2020-5-5';
const endDate = undefined;

const stmt = SQL`
  SELECT
    ${['id', 'name', 'pwd'].join(', ')}
  FROM
    account
  WHERE
    1=1
    ${startDate && SQL`AND startDate = ${startDate}`}
    ${endDate && SQL`AND endDate = ${endDate}`}
`;
/*
stmt.sql: "SELECT id, name, pwd FROM account WHERE 1=1 AND startDate=?"
stmt.params:  ["2020-5-5"]
*/
```


## Keyword Functions

#### values
```javascript
const data = {
  name: 'fk',
  age: 18
};
const stmt = SQL`insert into tbl ${SQL.values(data)}`;
stmt.sql; /* insert into tbl (name, age) values (?, ?) */
stmt.params; /* ['fk', 18] */
```

### set
```javascript
const data = {
  name: 'fk',
  age: 18
};
const stmt = SQL`update tbl set ${SQL.set(data)}`;
stmt.sql; /* update tbl set name=?, age=? */
stmt.params; /* ['fk', 18] */
```

### join
```javascript
const list = [
  "Nick", 
  "Adidas",
  "Jordon"
];
const stmt = SQL`select * from tbl where a in (${SQL.join(list)})`;
stmt.sql; /* select * from tbl where a in (?, ?, ?) */
stmt.params; /* ["Nick", "Adidas", "Jordon"] */
```

### raw
```javascript
const tableName = 'project.dataset.table';
const itemId = 345;
const stmt = $`SELECT * FROM ${$.raw(tableName)} WHERE item_id = ${itemId}`
stmt.sql; /* SELECT * FROM project.dataset.table WHERE item_id = ?` */
stmt.params; /* [345] */
```
