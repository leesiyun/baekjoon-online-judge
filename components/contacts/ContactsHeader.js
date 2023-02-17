import styled from 'styled-components'

const ContactsHeader = () => (
  <ContactsHeaderStyle>
    <div>Name</div>
    <div>Email</div>
    <div>Phone number</div>
  </ContactsHeaderStyle>
)

export default ContactsHeader

const ContactsHeaderStyle = styled.div`
  display: flex;
  width: 100%;
  padding: 25px 20px 20px 30px;
  border-bottom: 1px solid #dddddd;
  font-weight: 600;
  div {
    &:nth-child(1) {
      padding-right: 40%;
    }
    &:nth-child(2) {
      padding-right: 23%;
    }
    &:nth-child(3) {
      padding-right: 18%;
    }
  }
`
