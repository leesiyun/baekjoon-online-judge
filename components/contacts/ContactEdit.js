import router from 'next/router'
import {BiArrowBack} from 'react-icons/bi'
import styled from 'styled-components'
import {client} from '@/lib/sanity/client'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity/client'
import {useState} from 'react'
import {contactInputData} from '@/lib/contacts/contactInputData'

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
      <div className="backspace" onClick={handleBackspaceIconClick}>
        <BiArrowBack />
      </div>
      <form onSubmit={handleSubmit}>
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
        {contactInputData.map((input, index) => (
          <label htmlFor={input.name} key={index}>
            <input
              type="text"
              name={input.name}
              placeholder={input.placeholder}
              value={contactData[input.name]}
              onChange={handleChange}
            />
          </label>
        ))}
        <button type="submit">Save</button>
      </form>
    </ContactCreateStyle>
  )
}

export default ContactCreate

const ContactCreateStyle = styled.div`
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
`
