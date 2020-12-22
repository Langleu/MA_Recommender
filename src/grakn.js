import Grakn from 'grakn-client';

export const graknMapToJSON = (map) => {
  const objects = Object.fromEntries(map);
  const temp = {};
  /* eslint-disable no-restricted-syntax, no-underscore-dangle */
  for (const [key, value] of Object.entries(objects)) {
    if (value.baseType === 'ENTITY') {
      temp[key] = {};
      temp[key].id = value.id;
    } else if (value.baseType === 'ATTRIBUTE') {
      const keys = key.split('_');
      temp[keys[0]][keys[1]] = value._value;
    }
  }
  /* eslint-enable no-restricted-syntax, no-underscore-dangle */

  return temp;
};

export const graknToJSON = (array) => {
  const results = [];
  array.forEach(async (answer) => {
    results.push(graknMapToJSON(answer.map()));
  });
  return results;
};

export const runQuery = async (query) => {
  const client = new Grakn(process.env.GRAKNURI || 'localhost:48555');
  const session = await client.session('docker');
  const readTransaction = await session.transaction().read();

  const answerIterator = await readTransaction.query(query);
  const answers = await answerIterator.collect();
  const results = graknToJSON(answers);

  await session.close();
  client.close();

  return results;
};
