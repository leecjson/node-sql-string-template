const $ = require('./');

test('default', () => {
  expect($`I Love You ${5}, And I Hate ${'You'}.`.pack())
    .toStrictEqual([
      'I Love You ?, And I Hate ?.',
      [5, 'You']
    ]);
});

test('empty', () => {
  expect($``.pack()).toStrictEqual(['', []]);
});

test('empty arguments', () => {
  expect($`My Test ...`.pack()).toStrictEqual(['My Test ...', []]);
});

test('edge arguments', () => {
  const a = 5, b = 't';
  expect($`${a} My Test ... ${b}`.pack())
    .toStrictEqual(['? My Test ... ?', [a, b]]);
});

test('select case', () => {
  const userName = 'admin';
  const password = '123456';
  expect($`SELECT FROM user WHERE userName=${userName} AND password=${password}`.pack())
    .toStrictEqual([
      'SELECT FROM user WHERE userName=? AND password=?',
      [userName, password]
    ]);
});

test('raw variables do not count as parameters', () => {
  const itemId = 'supercalifragilisticexpialidocious';
  const tableName = 'project.dataset.table'
  const {sql, params} = $`SELECT * FROM \`${$.raw(tableName)}\` WHERE item_id = ${itemId}`
  expect({sql, params})
    .toStrictEqual({
      sql: `SELECT * FROM \`${tableName}\` WHERE item_id = ?`,
      params: [itemId]
    });
});

test('exports.set', () => {
  const data = {
    userName: 'mytest',
    pwd: '123456'
  };
  expect($`UPDATE user SET ${$.set(data)} WHERE id=${1}`.pack())
    .toStrictEqual([
      'UPDATE user SET userName=?, pwd=? WHERE id=?',
      [data.userName, data.pwd, 1]
    ])
});

test('exports.set assertion', () => {
  expect(() => $.set(undefined)).toThrowError();
  expect(() => $.set(null)).toThrowError();
  expect(() => $.set([])).toThrowError();
  expect(() => $.set('sdsds')).toThrowError();
  expect(() => $.set(123123)).toThrowError();
  expect(() => $.set({})).toThrowError();
});

test('exports.values', () => {
  const data = {
    userName: 'mytest',
    pwd: '123456'
  };
  expect($`INSERT INTO user ${$.values(data)}`.pack())
    .toStrictEqual([
      'INSERT INTO user (userName, pwd) values (?, ?)',
      [data.userName, data.pwd]
    ]);
});

test('exports.values assertion', () => {
  expect(() => $.values(undefined)).toThrowError();
  expect(() => $.values(null)).toThrowError();
  expect(() => $.values([])).toThrowError();
  expect(() => $.values('sdsds')).toThrowError();
  expect(() => $.values(123123)).toThrowError();
  expect(() => $.values({})).toThrowError();
});


test('function', () => {
  expect($`DELETE FROM user WHERE ${() => $`id = ${5}`}`.pack())
    .toStrictEqual(['DELETE FROM user WHERE id = ?', [5]]);
});

test('function assertion', () => {
  expect(() => $`DELETE FROM user WHERE id=${() => 1}`).toThrowError();
  expect(() => $`DELETE FROM user WHERE id=${() => "name"}`).toThrowError();
});


test('exports.join', () => {
  const list = [
    5,
    '23',
    'fw'
  ];
  expect($`SELECT * FROM WHERE X IN (${$.join(list)})`.spread())
    .toStrictEqual([
      'SELECT * FROM WHERE X IN (?, ?, ?)',
      list
    ]);
});
