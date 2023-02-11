import styled from 'styled-components'
import router from 'next/router'
import {BiArrowBack} from 'react-icons/bi'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity/client'

const ContactsDetail = ({contact}) => {
  const handleBackspaceIconClick = () => router.back()
  const handleEditButtonClick = () => router.push(`${contact._id}/edit`)
  return (
    <ContactsDetailStyle>
      <div className="detail-header">
        <div className="backspace" onClick={handleBackspaceIconClick}>
          <BiArrowBack />
        </div>
        <Image
          src={urlFor(contact.profileImage).url()}
          width={170}
          height={170}
          alt="profile image"
          className="contact-profile"
        />
        <div className="contact-name">
          {contact.firstName + ' ' + contact.lastName}
        </div>
        <button onClick={handleEditButtonClick}>Edit</button>
      </div>
      <div className="contact-detail">
        <div>{contact.phoneNumber}</div>
        <div>{contact.email}</div>
        <div>{contact.birthday}</div>
        <div>{contact.memo}</div>
      </div>
    </ContactsDetailStyle>
  )
}

export default ContactsDetail

const ContactsDetailStyle = styled.div`
  .detail-header {
  }

  .backspace {
    margin: 25px 0 0 10px;
    font-size: 20px;
    position: absolute;
    top: 5px;
  }

  .contact-profile {
    border-radius: 50%;
    margin: 35px 0px 0px 50px;
  }

  .contact-name {
  }
`
