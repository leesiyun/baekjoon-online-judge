import styled from 'styled-components'
import router from 'next/router'

const ContactsMain = ({contactList}) => {
  const HandleClick = () => router.push('/contacts/detail')
  return (
    <ContactsMainStyle>
      <div className="contactsCount">CONTACTS (2)</div>
      <div>
        {contactList.map(contact => (
          <div className="contactItem" key={contact._id} onClick={HandleClick}>
            <div className="contactIcon"></div>
            <div className="contactName">
              {contact.firstName} {contact.lastName}
            </div>
            <div>{contact.email}</div>
            <div>{contact.phoneNumber}</div>
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
