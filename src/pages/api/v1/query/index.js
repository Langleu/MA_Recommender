import { runQuery } from '../../../../grakn';

const serviceQuery = (arr) => {
  let counter = 0;
  return arr.map(ob => {
    counter++;
    return `$service${counter} isa service, has image "${ob.image}", has version "${ob.version}"; (inclusion: $deployment, included: $service${counter}) isa include;`
  });
}

const handleQuery = async (req, res) => {
  const { images, type } = req.body;
  if (type !== "docker-compose") return res.status(200).json([]);
  let imageArr = images.split(',');
  let services = '';
  if (imageArr[0]) {
    imageArr = imageArr.map(image => {
      let temp = image.split(':');
      return { image: temp[0], version: temp[1] ? temp[1] : 'latest'}
    });
    services = serviceQuery(imageArr).join(' ');
  }

  console.log(`match $deployment isa deployment, has score $deployment_score, has name $deployment_name, has rawUrl $deployment_rawUrl; $deployment_score > 50; $repository isa repository, has name $repository_name, has description $repository_description; (container: $repository, containment: $deployment) isa contain; $user isa user, has name $user_name; (owner: $user, ownee: $repository) isa own; ${services} get; sort $deployment_score desc; limit 5;`);

  const results = await runQuery(
    `match $deployment isa deployment, has score $deployment_score, has name $deployment_name, has rawUrl $deployment_rawUrl; $deployment_score > 50; $repository isa repository, has name $repository_name, has description $repository_description; (container: $repository, containment: $deployment) isa contain; $user isa user, has name $user_name; (owner: $user, ownee: $repository) isa own; ${services} get; sort $deployment_score desc; limit 5;` // eslint-disable-line max-len
  );
  res.status(200).json(results);
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      await handleQuery(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
