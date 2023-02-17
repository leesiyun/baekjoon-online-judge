import router from 'next/router'
import styled, {keyframes} from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as solidIcon from '@fortawesome/free-solid-svg-icons'

const ContactCreateButton = () => {
  const handleClick = () => router.push('/contacts/create')
  return (
    <ContactCreateButtonStyle>
      <button onClick={handleClick}>
        <span className="button-text">CREATE CONTACT</span>
        <FontAwesomeIcon className="button-icon" icon={solidIcon.faPlus} />
      </button>
    </ContactCreateButtonStyle>
  )
}

export default ContactCreateButton

const ButtonAnimation = keyframes`
  0%  {width: 90px; }
  100% { width: 180px; }
`

const TextAnimation = keyframes`
  0%  {opacity: 0 }
  100% { opacity: 1 }
`

const ContactCreateButtonStyle = styled.div`
  display: flex;
  justify-content: right;
  button {
    cursor: pointer;
    background-color: #f6ab00;
    border: none;
    color: #fff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    position: relative;
    top: -15px;
    padding: 1px 0 0 2px;
    right: 60px;
    box-shadow: 0px 4px 16px 0px #000a3c1a;
    .button-icon {
      font-size: 33px;
      position: absolute;
      bottom: 13px;
      right: 14px;
    }
    .button-text {
      display: none;
      font-size: 18px;
    }
    &:hover {
      animation: ${ButtonAnimation} 0.2s;
      width: 180px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      .button-text {
        animation: ${TextAnimation} 0.2s;
        position: absolute;
        right: 28px;
        display: flex;
      }
    }
  }
`
