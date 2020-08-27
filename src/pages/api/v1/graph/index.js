import { runQuery } from '../../../../grakn';

const getGraph = async (req, res) => {
  const query = `match $service isa service, has name $service_name; $deployment id ${req.query.deploymentId}; (inclusion: $deployment, included: $service) isa include;  get;`;
  const results = await runQuery(query);
  res.status(200).json(results);
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await getGraph(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
