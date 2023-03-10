import { Button } from 'antd'
import classNames from 'classnames'
import styled, { css } from 'styled-components'

const CustomButton = styled(Button)`
  background: ${(props) => props.$background || '#FF571F'};
  border-radius: 25px;
  color: ${(props) => props.$textColor || '#ffffff'} !important;
  cursor: ${(props) => (props.disabled || props.loading ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.8 : 1)};
  border: ${(props) => props.border || 'none'};
  &.full-width {
    flex: 1;
  }
  &.small {
    min-height: 30px !important;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
  }
  &.medium {
    min-height: 40px !important;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    border-radius: 40px;
    padding: 0px 20px;
  }
  &.large {
    min-height: 60px !important;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    border-radius: 40px;
    padding: 0px 30px;
  }
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.6;
    background: ${(props) => props.$background || '#FF571F'};
    color: ${(props) => props.$textColor || '#ffffff'} !important;
    &:hover {
      opacity: 0.6;
      background: ${(props) => props.$background || '#FF571F'};
      color: ${(props) => props.$textColor || '#ffffff'} !important;
    }
  }

  ${(props) =>
    props.width &&
    css`
      width: 100%;
      max-width: ${props.width};
    `}
`

const PrimaryButton = ({
  children,
  className = '',
  color = null,
  fullWidth = false,
  size = 'medium',
  disabled,
  width = null,
  textColor = '#ffffff',
  background = '#FF571F',
  border = 'none',
  htmlType = 'submit',
  ...rest
}) => {
  return (
    <CustomButton
      disabled={disabled}
      color={color}
      $textColor={textColor}
      $background={background}
      border={border}
      htmlType={htmlType}
      className={classNames(`pri-btn ${className} ${size}`, { 'full-width': fullWidth, disabled: disabled })}
      width={width}
      {...rest}
    >
      {children}
    </CustomButton>
  )
}

export default PrimaryButton
