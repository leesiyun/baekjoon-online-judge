import styled from 'styled-components'
import router from 'next/router'

const ContactsMain = ({contactList}) => {
  const handleClick = () => router.push('/contacts/detail')
  const handleDelete = async contactId => {
    const response = await fetch('/api/contacts', {
      method: 'DELETE',
      body: contactId,
    })
    const data = await response.json()
    console.log(data)
    router.replace(router.asPath)
  }

  return (
    <ContactsMainStyle>
      <div className="contactsCount">CONTACTS (2)</div>
      <div>
        {contactList.map(contact => (
          <div key={contact._id}>
            <div className="contactItem" onClick={handleClick}>
              <div className="contactIcon"></div>
              <div className="contactName">
                {contact.firstName} {contact.lastName}
              </div>
              <div>{contact.email}</div>
              <div>{contact.phoneNumber}</div>
            </div>
            <button onClick={() => handleDelete(contact._id)}>delete</button>
          </div>
        ))}
      </div>
    </ContactsMainStyle>
  )
}

export default ContactsMain

const ContactsMainStyle = styled.div`
  padding: 20px 2%;

  .contactsCount {
    font-size: 13px;
    margin-bottom: 20px;
  }
  .contactItem {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    div {
      &:nth-child(2) {
        width: 38%;
      }
      &:nth-child(3) {
        width: 27%;
      }
    }
  }

  .contactIcon {
    width: 40px;
    height: 40px;
    background-color: red;
    border-radius: 50%;
    margin-right: 20px;
  }
`
