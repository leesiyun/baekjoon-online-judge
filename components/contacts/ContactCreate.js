import router from 'next/router'
import styled from 'styled-components'
import client from '../../lib/sanity/client'
import {useState} from 'react'

const ContactCreate = () => {
  const [imagesAssets, setImagesAssets] = useState(null)

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
        .then(document => {
          setImagesAssets(document)
        })
        .catch(error => {
          console.log('Upload failed:', error.message)
        })
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (imagesAssets?._id) {
      const doc = {
        _type: 'contact',
        profileImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imagesAssets?._id,
          },
        },
        firstName: event.target.firstName?.value,
        lastName: event.target.lastName?.value,
        birthday: event.target.firstName?.value,
        phoneNumber: event.target.phoneNumber?.value,
        email: event.target.email?.value,
        memo: event.target.memo?.value,
      }
      client.create(doc).then(() => {
        router.push('/contacts')
      })
    }
  }

  return (
    <ContactCreateStyle>
      <form onSubmit={handleSubmit}>
        <label htmlFor="profile">
          <input type="file" name="profileImage" onChange={uploadImage} />
        </label>
        <label htmlFor="firstName">
          <input type="text" name="firstName" placeholder="First name" />
        </label>
        <label htmlFor="lastName">
          <input type="text" name="lastName" placeholder="Last name" />
        </label>
        <label htmlFor="phoneNumber">
          <input type="text" name="phoneNumber" placeholder="Phone Number" />
        </label>
        <label htmlFor="email">
          <input type="text" name="email" placeholder="Email " />
        </label>
        <label htmlFor="birthday">
          <input type="text" name="birthday" placeholder="Birthday" />
        </label>
        <label htmlFor="memo">
          <input type="text" name="memo" placeholder="Memo" />
        </label>
        <button type="submit">Save</button>
      </form>
    </ContactCreateStyle>
  )
}

export default ContactCreate

const ContactCreateStyle = styled.div``
