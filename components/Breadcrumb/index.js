import Image from 'components/Image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import images from 'common/images'
import PageWrapper from 'components/PageWrapper'
import React, { useContext, useMemo } from 'react'
import { Affix } from 'antd'
import { BreadscrumbContext } from './BreadscrumbContext'

const Container = styled.div`
  height: 40px;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    cursor: pointer;
    color: #e14d2a;
  }
`
const CurrentPage = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const BreadcrumbContainer = styled(PageWrapper)`
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const BreadscrumbWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  overflow: hidden;
  border-bottom: 1px solid #e0e0e0;
  @media screen and (max-width: 768px) {
    border-bottom: none;
  }
`

const ActionContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  overflow: hidden;
`

/**
 *
 * @param {{ ancestor: { path: string, name: string, component: any }[] | { path: string, name: string, component: any }[][], currentPage: string, withContainer?: boolean, actions: any[] }} props
 * @returns
 */
const Breadcrumb = ({ ancestor = [], currentPage, withContainer = false, actions = [], styleWrapper = null, ...rest }) => {
  const router = useRouter()
  const { preRoute } = useContext(BreadscrumbContext)

  const Wrapper = withContainer ? BreadcrumbContainer : BreadscrumbWrapper

  const items = useMemo(() => {
    let result = null
    if (ancestor?.length > 0 && Array.isArray(ancestor[0])) {
      ancestor.forEach((item) => {
        if (item?.[item?.length - 1]?.path === preRoute) {
          result = item
        }
      })
      if (!result) {
        result = ancestor[0]
      }
    }
    return result || ancestor
  }, [preRoute, ancestor])

  return (
    <Wrapper style={styleWrapper ?? {}}>
      <Container {...rest}>
        {items.map((item, index) => (
          <div key={index} className='MR3'>
            {item.name && <span onClick={() => item.path && router.push(item.path)}>{`${item.name}`}</span>}
            {item.component && item.component}
            <Image className='MT5' width={12} height={11} src={images.icLeftArrow} />
          </div>
        ))}
        <CurrentPage>{currentPage}</CurrentPage>
      </Container>
      <ActionContainer>{actions.map((action) => action)}</ActionContainer>
    </Wrapper>
  )
}

export const BreadcrumbAffix = ({ children, className, ...rest }) => {
  return (
    <Affix className={`${className} breadcrumb-affix`} {...rest}>
      {children}
    </Affix>
  )
}

export default Breadcrumb
