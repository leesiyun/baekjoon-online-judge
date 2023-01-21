import router from 'next/router'
import styled from 'styled-components'

const ContactCreate = () => {
  const handleSubmit = async event => {
    event.preventDefault()
    // TODO : image asset 저장하기
    console.log(event.target.profileImage.files[0])
    await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify({
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        phoneNumber: event.target.phoneNumber.value,
        email: event.target.email.value,
        birthday: event.target.birthday.value,
        memo: event.target.memo.value,
      }),
    })
    router.push('/contacts')
  }
  return (
    <ContactCreateStyle>
      <form onSubmit={handleSubmit}>
        <label htmlFor="profile">
          <input type="file" name="profileImage" />
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
