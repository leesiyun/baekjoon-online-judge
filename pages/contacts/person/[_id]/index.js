import {client} from '@/lib/sanity/client'
import ContactDetail from '@/components/contacts/ContactDetail'

const Detail = ({contact}) => {
  return <ContactDetail contact={contact[0]} />
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
  const contact = await client.fetch(
    `*[_type == "contact" && _id == '${params._id}']`,
  )
  return {props: {contact}}
}
