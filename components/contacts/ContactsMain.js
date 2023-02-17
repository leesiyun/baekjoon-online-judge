import styled from 'styled-components'
import router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity/client'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as regularIcon from '@fortawesome/free-regular-svg-icons'

const ContactsMain = ({contactList}) => {
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
      <div className="contacts-count">CONTACTS (2)</div>
      <div>
        {contactList.map(contact => (
          <div key={contact._id} className="contact-item-container ">
            <Link
              href={`/contacts/person/${contact._id}`}
              className="contact-item"
            >
              <Image
                src={urlFor(contact.profileImage).url()}
                width={40}
                height={40}
                alt="profile image"
                className="contact-profile"
              />
              <div className="contact-name">
                {contact.firstName} {contact.lastName}
              </div>
              <div>{contact.email}</div>
              <div>{contact.phoneNumber}</div>
            </Link>
            <button onClick={() => handleDelete(contact._id)}>
              <FontAwesomeIcon icon={regularIcon.faTrashCan} />
            </button>
          </div>
        ))}
      </div>
    </ContactsMainStyle>
  )
}

export default ContactsMain

const ContactsMainStyle = styled.div`
  padding: 20px 0;
  height: 98%;

  .contacts-count {
    font-size: 13px;
    margin-bottom: 20px;
    padding: 12px 60px;
  }
  .contact-item-container {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    width: 100%;
    padding: 12px 60px;
    align-items: center;
    button {
      cursor: pointer;
      border: none;
      background-color: inherit;
      font-size: 18px;
      color: #a5a8a9;
      margin-right: 10px;
      visibility: hidden;
    }
    &:hover {
      background-color: #f5f5f5;
      button {
        visibility: visible;
        &:hover {
          color: #4a4a4a;
        }
      }
    }
  }
  .contact-item {
    display: flex;
    align-items: center;
    div {
      &:nth-child(2) {
        width: 38%;
      }
      &:nth-child(3) {
        width: 27%;
      }
    }
  }

  .contact-profile {
    border-radius: 50%;
    margin-right: 20px;
    background-color: #2c2c2c;
    box-shadow: 0px 4px 16px 0px #000a3c1a;
  }
`
