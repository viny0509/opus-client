import images from 'common/images'
import Image from 'components/Image'
import styled from 'styled-components'

const CheckboxInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
`

const CheckboxTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #828282;
`

const Checkbox = ({ title, value, onChange, ...rest }) => {
  return (
    <CheckboxInputContainer onClick={() => onChange && onChange(!value)} {...rest}>
      <CheckboxTitle>{title}</CheckboxTitle>
      <Image src={value ? images.icCheckboxActive : images.icCheckbox} />
    </CheckboxInputContainer>
  )
}

export default Checkbox
