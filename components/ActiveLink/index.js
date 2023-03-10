import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { lowerCase } from 'common/function'

const ActiveLinkContainer = styled.a`
  height: 100%;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #ffffff;
  white-space: nowrap;
  padding: 7px 12px;
  &.active {
    color: #ff571f;
    border-bottom: 1px solid #ff571f;
  }
  &:hover {
    color: #ff571f;
  }
`

const ActiveLinkDivContainer = styled.div`
  height: 100%;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #ffffff;
  white-space: nowrap;
  padding: 7px 12px;
  &.active {
    color: #ff571f;
    border-bottom: 1px solid #ff571f;
  }
  &:hover {
    color: #ff571f;
  }
`

const ActiveLink = ({ href = '', routeActive = [], children, className = '', onClick, ...rest }) => {
  const route = useRouter()
  const routes = [...routeActive.map((item) => lowerCase(item)), href.toLowerCase()]

  if (onClick) {
    return (
      <ActiveLinkDivContainer
        onClick={() => {
          onClick()
        }}
        className={`${className} ${routes.includes(lowerCase(route.asPath)) ? 'active' : ''}`}
        {...rest}
      >
        {children}
      </ActiveLinkDivContainer>
    )
  }

  return (
    <Link href={href}>
      <ActiveLinkContainer className={`${className} ${routes.includes(lowerCase(route.asPath)) ? 'active' : ''}`} href={href} {...rest}>
        {children}
      </ActiveLinkContainer>
    </Link>
  )
}

export default ActiveLink
