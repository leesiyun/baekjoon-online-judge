import client from '../../lib/sanity/client'

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const newContact = await JSON.parse(req.body)
      try {
        await client
          .create({
            _type: 'contact',
            firstName: newContact.firstName,
            lastName: newContact.lastName,
            phoneNumber: newContact.phoneNumber,
            email: newContact.email,
            birthday: newContact.birthday,
            memo: newContact.memo,
            _createdAt: new Date().toISOString(),
          })
          .then(res => {
            console.log(`Todo was created, document ID is ${res._id}`)
          })
        res
          .status(200)
          .json({msg: `Todo was created, document ID is ${res._id}`})
      } catch (err) {
        console.error(err)
        res.status(500).json({msg: 'Error, check console'})
      }
      break

    case 'DELETE':
      await client.delete(req.body).then(res => {
        res.body
      })
      res.status(200).json({msg: 'Success'})
      break
  }
}
