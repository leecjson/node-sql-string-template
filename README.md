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
const data = { name: "jon", age: 12 };
const [sql, params] = SQL`
  INSERT INTO account (name, age) values (${name}, ${age})
`.pack();
/*
sql: "INSERT INTO account (name, age) values (?, ?)"
params:  ["jon", 12]
*/
```

### Insert with ```values``` function
```javascript
const SQL = require('sql-string-template');
const { values } = SQL;

const data = { name: "jon", age: 12 };
const [sql, params] = SQL`
  INSERT INTO account ${values(data)}
`.pack();
/*
sql: "INSERT INTO account (name, age) values (?, ?)"
params:  ["jon", 12]
*/
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
`.pack();
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