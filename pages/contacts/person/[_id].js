import {client} from '../../../lib/sanity/client'
import ContactsDetail from '../../../components/contacts/ContactsDetail'

const Detail = ({contact}) => {
  console.log(contact)
  return (
    <>
      <ContactsDetail contact={contact[0]} />
    </>
  )
}

export default Detail

export const getStaticPaths = async () => {
  const contacts = await client.fetch('*[_type == "contact"]')
  const paths = contacts.map(contact => ({
    params: {
      _id: contact._id,
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const contacts = await client.fetch('*[_type == "contact"]')
  return {
    props: {
      contact: contacts.filter(contact => contact._id === params._id),
    },
  }
}
