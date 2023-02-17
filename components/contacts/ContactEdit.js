import router from 'next/router'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as solidIcon from '@fortawesome/free-solid-svg-icons'
import {client} from '@/lib/sanity/client'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity/client'
import {useState} from 'react'
import {contactInputData} from '@/lib/contacts/contactData'

const ContactCreate = ({contact}) => {
  const [contactData, setContactData] = useState({
    profileImage: contact.profileImage,
    firstName: contact.firstName,
    lastName: contact.lastName,
    birthday: contact.birthday,
    phoneNumber: contact.phoneNumber,
    email: contact.email,
    memo: contact.memo,
  })
  const handleBackspaceIconClick = () => router.back()

  const uploadImage = event => {
    const selectedImage = event.target.files[0]
    if (
      selectedImage.type === 'image/png' ||
      selectedImage.type === 'image/svg' ||
      selectedImage.type === 'image/jpeg' ||
      selectedImage.type === 'image/gif' ||
      selectedImage.type === 'image/tiff'
    ) {
      client.assets
        .upload('image', selectedImage, {
          contentType: selectedImage.type,
          filename: selectedImage.name,
        })
        .then(uploadImage => {
          setContactData(prevState => {
            return {...prevState, profileImage: uploadImage}
          })
        })
        .catch(error => {
          console.log('Upload failed:', error.message)
        })
    }
  }

  const handleChange = event => {
    const {name, value} = event.target
    setContactData(prevState => {
      return {...prevState, [name]: value}
    })
  }
  const handleSubmit = async event => {
    event.preventDefault()
    if (contactData.profileImage?._id) {
      setContactData(prevState => {
        return {
          ...prevState,
          profileImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: contactData.profileImage?._id,
            },
          },
        }
      })
    }
    const doc = {
      _type: 'contact',
      profileImage: contactData.profileImage,
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      birthday: contactData.birthday,
      phoneNumber: contactData.phoneNumber,
      email: contactData.email,
      memo: contactData.memo,
    }
    client
      .patch(contact._id)
      .set(doc)
      .commit()
      .then(() => {
        router.push('/contacts')
      })
  }

  return (
    <ContactCreateStyle>
      <form onSubmit={handleSubmit}>
        <div className="detail-header">
          <div className="backspace" onClick={handleBackspaceIconClick}>
            <FontAwesomeIcon icon={solidIcon.faArrowLeft} />
          </div>
          <div className="contact-profile-wrapper">
            <label htmlFor="profile">
              <Image
                src={urlFor(contactData.profileImage).url()}
                width={170}
                height={170}
                alt="profile image"
                className="contact-profile"
              />
            </label>
            <input
              type="file"
              id="profile"
              name="profileImage"
              style={{display: 'none'}}
              onChange={uploadImage}
            />
            <div className="contact-profile-name">
              {contact.firstName + ' ' + contact.lastName}
            </div>
          </div>
          <div className="button-wrapper">
            <button type="submit">Save</button>
          </div>
        </div>
        <div className="contact-detail-box">
          {contactInputData.map((input, index) => (
            <label htmlFor={input.name} key={index}>
              <div className="contact-detail">
                <FontAwesomeIcon
                  icon={input?.icon}
                  className="contact-detail-icon"
                />
                <input
                  type="text"
                  name={input.name}
                  placeholder={input.placeholder}
                  value={contactData[input.name]}
                  onChange={handleChange}
                />
              </div>
            </label>
          ))}
        </div>
      </form>
    </ContactCreateStyle>
  )
}

export default ContactCreate

const ContactCreateStyle = styled.div`
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
      margin-bottom: 10px;
    }
    .contact-detail {
      padding: 6px 2px;
      position: relative;
      height: 50px;
      .contact-detail-icon {
        font-size: 18px;
        color: #f6ab00;
        position: absolute;
        bottom: 15px;
      }
      input {
        position: absolute;
        cursor: pointer;
        left: 45px;
        font-size: 16px;
        color: #2c2c2c;
        width: 50%;
        height: 40px;
        border: none;
        border-bottom: 1px solid #dddddd;
        background: linear-gradient(#f6ab00, #f6ab00) bottom / 0% 2px no-repeat
          #fff;
        transition: 0.4s;
        &:focus {
          outline: none;
          background-size: 100% 2px;
        }
      }
    }
  }
`
