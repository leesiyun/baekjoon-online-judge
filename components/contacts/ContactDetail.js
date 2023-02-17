import router from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity/client'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as solidIcon from '@fortawesome/free-solid-svg-icons'

const ContactsDetail = ({contact}) => {
  const handleBackspaceIconClick = () => router.back()
  const handleEditButtonClick = () => router.push(`${contact._id}/edit`)

  const contactData = [
    {
      name: 'phoneNumber',
      placeholder: 'Phone Number',
      icon: solidIcon.faPhone,
    },
    {
      name: 'email',
      placeholder: 'Email',
      icon: solidIcon.faEnvelope,
    },
    {
      name: 'birthday',
      placeholder: 'Birthday',
      icon: solidIcon.faCakeCandles,
    },
    {
      name: 'memo',
      placeholder: 'Memo',
      icon: solidIcon.faFilePen,
    },
  ]
  return (
    <ContactsDetailStyle>
      <div className="detail-header">
        <div className="backspace" onClick={handleBackspaceIconClick}>
          <FontAwesomeIcon icon={solidIcon.faArrowLeft} />
        </div>
        <div className="contact-profile-wrapper">
          <Image
            src={urlFor(contact.profileImage).url()}
            width={170}
            height={170}
            alt="profile image"
            className="contact-profile"
          />
          <div className="contact-profile-name">
            {contact.firstName + ' ' + contact.lastName}
          </div>
        </div>
        <div className="button-wrapper">
          <button onClick={handleEditButtonClick}>Edit</button>
        </div>
      </div>
      <div className="contact-detail-box">
        <div className="contact-detail-title">Contact details</div>
        {contactData.map((datail, index) => (
          <div className="contact-detail" key={index}>
            <FontAwesomeIcon
              icon={datail.icon}
              className="contact-detail-icon"
            />
            <span>{contact[datail.name]}</span>
          </div>
        ))}
      </div>
    </ContactsDetailStyle>
  )
}

export default ContactsDetail

const ContactsDetailStyle = styled.div`
  .detail-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px 80px 40px 60px;
    border-bottom: 1px solid #dddddd;
  }

  .backspace {
    margin-top: 25px;
    font-size: 20px;
    position: absolute;
    top: 5px;
    cursor: pointer;
  }

  .contact-profile-wrapper {
    display: flex;
    align-items: center;

    .contact-profile-name {
      font-size: 28px;
      margin-left: 30px;
    }
  }

  .contact-profile {
    border-radius: 50%;
    margin: 35px 0px 0px 50px;
    background-color: #2c2c2c;
    box-shadow: 0px 4px 16px 0px #000a3c1a;
  }

  .button-wrapper {
    display: flex;
    align-items: flex-end;
    button {
      height: 40px;
      width: 90px;
      background-color: #f6ab00;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
  }

  .contact-detail-box {
    padding: 40px 100px;
    .contact-detail-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .contact-detail {
      padding: 6px 2px;
      position: relative;
      height: 40px;
      .contact-detail-icon {
        font-size: 18px;
        color: #f6ab00;
      }
      span {
        position: absolute;
        left: 45px;
        color: #2c2c2c;
      }
    }
  }
`
