import client from '../../lib/sanity/client'

export default async function handler(req, res) {
  const response = await client.fetch('*[_type == "contact"]')
  res.status(200).json(response)
  switch (req.method) {
    case 'DELETE':
      await client.delete(req.body).then(res => {
        res.body
      })
      res.status(200).json({msg: 'Success'})
      break
  }
}
