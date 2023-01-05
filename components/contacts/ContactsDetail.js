import styled from 'styled-components'
import router from 'next/router'
import {BiArrowBack} from 'react-icons/bi'

const ContactsDetail = () => {
  const HandleClick = () => router.back()
  return (
    <ContactsDetailStyle>
      <div className="detail_header">
        <div className="backspace" onClick={HandleClick}>
          <BiArrowBack />
        </div>
        <div className="contactIcon"></div>
        <div className="contactName">kim lisa</div>
      </div>
    </ContactsDetailStyle>
  )
}

export default ContactsDetail

const ContactsDetailStyle = styled.div`
  .detail_header {
  }

  .backspace {
    margin: 25px 0 0 10px;
    font-size: 20px;
    position: absolute;
    top: 5px;
  }

  .contactIcon {
    width: 170px;
    height: 170px;
    background-color: red;
    border-radius: 50%;
    margin: 35px 0px 0px 50px;
  }

  .contactName {
  }
`
