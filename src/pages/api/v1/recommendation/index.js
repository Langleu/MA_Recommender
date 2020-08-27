import { runQuery } from '../../../../grakn';

const handleQuery = async (req, res) => {
  // TODO: parse images and look for deployments that include specified services
  // TODO: if there are 0 results look for deployments that offer either or.
  const results = await runQuery(
    'match $deployment isa deployment, has score $deployment_score, has name $deployment_name, has rawUrl $deployment_rawUrl; $deployment_score == -1; $repository isa repository, has name $repository_name, has description $repository_description; (container: $repository, containment: $deployment) isa contain; $user isa user, has name $user_name; (owner: $user, ownee: $repository) isa own; get; limit 3;', // eslint-disable-line max-len
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
