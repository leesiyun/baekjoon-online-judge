import router from 'next/router'

const ContactCreateButton = () => {
  const handleClick = () => router.push('/contacts/create')
  return (
    <>
      <button onClick={handleClick}>create</button>
    </>
  )
}

export default ContactCreateButton
