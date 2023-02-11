import styled from 'styled-components'
import ContactsHeader from '../../components/contacts/ContactsHeader'
import ContactsMain from '../../components/contacts/ContactsMain'
import {client} from '../../lib/sanity/client'
import {useState, useEffect} from 'react'
import ContactCreateButton from '../../components/contacts/ContactCreateButton'

const Contacts = ({contacts}) => {
  const [contactList, setContactList] = useState([])
  useEffect(() => setContactList(contacts), [contacts])

  return (
    <ContactsStyle>
      <ContactsHeader />
      <ContactsMain contactList={contactList} />
      <ContactCreateButton />
    </ContactsStyle>
  )
}

export default Contacts

const ContactsStyle = styled.div`
  color: #5f6367;
  font-size: 15px;
`

export const getServerSideProps = async () => {
  const contacts = await client.fetch('*[_type == "contact"]')
  return {
    props: {
      contacts,
    },
  }
}
