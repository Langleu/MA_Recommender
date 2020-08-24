export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // eslint-disable-next-line no-console
      console.log(req.body);
      res.status(200).json(req.body);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
