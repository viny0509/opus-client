import images from 'common/images'
import ReduxService from 'common/redux'
import Image from 'components/Image'
import PrimaryButton from 'components/PrimaryButton'
import { Z_INDEX } from 'constants/UI'
import useDebounce from 'hooks/useDebounce'
import useOverlay from 'hooks/useOverlay'
import { useSettingRedux } from 'hooks/useRedux'
import useStoreFilter from 'hooks/useStoreFilter'
import useTranslate from 'hooks/useTranslate'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { defaultStoreFilter, keysStoreFilter } from '.'
import Checkbox from './Checkbox'
import Collapse from './Collapse'
import Search from './Search'

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 0px 15px;
  padding-bottom: 20px;
`

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleContainerMargin = styled.div`
  height: 40px;
`

const TitleContainer = styled.div`
  background: #ffffff;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: ${Z_INDEX.OVERLAY};
  padding: 0px 20px;
  gap: 10px;
`

const Side = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
`
const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
`

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const CountryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const CountryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
`

// const ShowAllButton = styled.div`
//   font-weight: 500;
//   font-size: 14px;
//   line-height: 150%;
//   color: #f5545e;
// `

const FlagImage = styled.img`
  width: 20px;
`

const FilterList = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
  color: #000000;
  opacity: ${(props) => (props.$active ? 1 : 0.5)};
`

const FilterStoreOverlay = () => {
  const settingRedux = useSettingRedux()
  const { translate, renderField } = useTranslate()
  const { closeOverlay } = useOverlay()
  const router = useRouter()
  const [searchCountryText, setSearchCountryText] = useState('')
  const searchCountry = useDebounce(searchCountryText, 500)
  const [countryList, setCountryList] = useState((settingRedux?.country || []).slice(0, 5))
  // const [showAllCountry, setShowAllCountry] = useState(false)
  const { filters } = useStoreFilter()

  const [filterLocal, setFilterLocal] = useState({ ...defaultStoreFilter, ...filters })

  useEffect(() => {
    if (searchCountry !== '') {
      setCountryList(
        (settingRedux?.country || []).filter(
          (item) => item?.name?.toLowerCase().includes(searchCountry.toLowerCase()) || item?.slug?.toLowerCase().includes(searchCountry.toLowerCase())
        )
      )
    } else {
      // if (showAllCountry) {
      //   setCountryList(settingRedux?.country || [])
      // } else {
      setCountryList((settingRedux?.country || []).slice(0, 5))
      // }
    }
  }, [searchCountry])

  const clearAll = () => {
    // const query = { ...router.query }
    // Object.keys(query).forEach((key) => {
    //   if (keysStoreFilter.includes(key)) {
    //     delete query[key]
    //   }
    // })
    // router.replace({
    //   query,
    // })
    setFilterLocal(defaultStoreFilter)
  }

  const handleChangeFilter = (key, value) => {
    const newFilter = { ...filterLocal }
    if (Array.isArray(defaultStoreFilter[key])) {
      const newData = [...filterLocal[key]]
      const index = newData.indexOf(value)
      if (index > -1) {
        newData.splice(index, 1)
      } else {
        newData.push(value)
      }
      newFilter[key] = newData
    } else {
      newFilter[key] = value
    }
    setFilterLocal(newFilter)
  }

  const applyFilter = () => {
    const query = { ...router.query }
    Object.keys(filterLocal).forEach((key) => {
      if (keysStoreFilter.includes(key)) {
        query[key] = filterLocal[key]
        if (!query[key]) {
          delete query[key]
        }
      }
    })
    router.replace({
      query,
    })
    closeOverlay()
  }

  return (
    <Container>
      <TopContainer>
        <TitleContainerMargin />
        <TitleContainer>
          <Side>
            <Image width={18} height={18} onClick={() => closeOverlay()} src={images.icCloseBlack} />
          </Side>
          <Title>{translate('filter.title')}</Title>
          <Side />
        </TitleContainer>
        <Checkbox
          className='MT20'
          title={translate('filter.listing')}
          value={filterLocal.listing}
          onChange={(listing) => {
            handleChangeFilter('listing', listing)
          }}
        />
        <Collapse defaultOpen className='MT20' title={translate('filter.country', { count: settingRedux?.country?.length || 0 })}>
          <Search
            value={searchCountryText}
            onChange={(e) => setSearchCountryText(e.target.value)}
            className='MT20'
            placeholder={translate('filter.searchCountry')}
            prefix={<Image src={images.icSearch} width={15} height={15} />}
          />
          <CountryList className='MT20'>
            {countryList?.map((item) => (
              <Checkbox
                key={item?.slug}
                value={filterLocal.countries.includes(item?.slug)}
                onChange={() => handleChangeFilter('countries', item?.slug)}
                title={
                  <CountryContainer>
                    <FlagImage src={item?.icon} />
                    {item?.name}
                  </CountryContainer>
                }
              />
            ))}
            {/* {!showAllCountry && searchCountry === '' && <ShowAllButton onClick={() => setShowAllCountry(true)}>{translate('filter.showAll')}</ShowAllButton>} */}
          </CountryList>
        </Collapse>
        <Collapse defaultOpen className='MT20' title={translate('filter.category', { count: settingRedux?.category?.length || 0 })}>
          <FilterList className='MT10'>
            {settingRedux?.category?.map((cate) => (
              <FilterItem key={cate.slug} $active={filterLocal.categories.includes(cate?.slug)} onClick={() => handleChangeFilter('categories', cate?.slug)}>
                <Image width='auto' height={50} src={cate?.icon} />
                {renderField(cate?.name)}
              </FilterItem>
            ))}
          </FilterList>
        </Collapse>
        <Collapse defaultOpen className='MT20' title={translate('filter.chain', { count: settingRedux?.nftStoreChainIds?.length || 0 })}>
          <FilterList className='MT10'>
            {settingRedux?.nftStoreChainIds?.map((chainId) => {
              const chain = ReduxService.getChain(chainId)
              return (
                <FilterItem key={chainId} $active={filterLocal.chainIds.includes(`${chainId}`)} onClick={() => handleChangeFilter('chainIds', `${chainId}`)}>
                  <Image width='auto' height={50} src={chain?.logo} />
                  {chain?.name}
                </FilterItem>
              )
            })}
          </FilterList>
        </Collapse>
      </TopContainer>
      <ActionContainer>
        <PrimaryButton onClick={() => clearAll()} background='#ffffff' textColor='#000000' border='1px solid #e0e0e0' fullWidth>
          {translate('filter.clearAll')}
        </PrimaryButton>
        <PrimaryButton onClick={() => applyFilter()} fullWidth>
          {translate('done')}
        </PrimaryButton>
      </ActionContainer>
    </Container>
  )
}

export default FilterStoreOverlay
