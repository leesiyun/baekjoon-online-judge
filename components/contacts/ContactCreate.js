import router from 'next/router'
import styled from 'styled-components'
import {client} from '@/lib/sanity/client'
import {useState} from 'react'
import {contactInputData} from '@/lib/contacts/contactData'

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
        {contactInputData.map((input, index) => (
          <label htmlFor={input.name} key={index}>
            <input
              type="text"
              name={input.name}
              placeholder={input.placeholder}
            />
          </label>
        ))}
        <button type="submit">Save</button>
      </form>
    </ContactCreateStyle>
  )
}

export default ContactCreate

const ContactCreateStyle = styled.div``
