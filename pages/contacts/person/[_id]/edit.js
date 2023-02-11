import {client} from '@/lib/sanity/client'
import ContactEdit from '@/components/contacts/ContactEdit'

const Edit = ({contact}) => <ContactEdit contact={contact[0]} />

export default Edit

export const getStaticPaths = async () => {
  const contacts = await client.fetch('*[_type == "contact" ]')
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
