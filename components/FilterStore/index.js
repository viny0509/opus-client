import images from 'common/images'
import ReduxService from 'common/redux'
import Image from 'components/Image'
import Responsive from 'components/Responsive'
import useDebounce from 'hooks/useDebounce'
import useOverlay from 'hooks/useOverlay'
import { useSettingRedux } from 'hooks/useRedux'
import useStoreFilter from 'hooks/useStoreFilter'
import useTranslate from 'hooks/useTranslate'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import Collapse from './Collapse'
import FilterStoreOverlay from './FilterStoreOverlay'
import Search from './Search'

const FilterButon = styled.div`
  width: 100%;
  height: 40px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
  gap: 10px;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  gap: 10px;
`

const FilterItem = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
  color: #000000;
  opacity: ${(props) => (props.$active ? 1 : 0.5)};
  gap: 3px;
  cursor: pointer;
`

export const defaultStoreFilter = {
  listing: undefined,
  countries: [],
  categories: [],
  chainIds: [],
}

export const keysStoreFilter = ['listing', 'countries', 'categories', 'chainIds']

const FilterStore = () => {
  const settingRedux = useSettingRedux()
  const [searchCountryText, setSearchCountryText] = useState('')
  const searchCountry = useDebounce(searchCountryText, 500)
  const [countryList, setCountryList] = useState((settingRedux?.country || []).slice(0, 5))
  // const [showAllCountry, setShowAllCountry] = useState(false)

  const router = useRouter()
  const { translate, renderField } = useTranslate()
  const { openOverlay } = useOverlay()
  const { filters, countFilter } = useStoreFilter()

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

  const handleChangeFilter = (key, value) => {
    const newFilter = { ...filters }
    if (Array.isArray(defaultStoreFilter[key])) {
      const newData = [...filters[key]]
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
    const query = { ...router.query }
    Object.keys(newFilter).forEach((key) => {
      if (keysStoreFilter.includes(key)) {
        query[key] = newFilter[key]
        if (!query[key]) {
          delete query[key]
        }
      }
    })
    router.replace({
      query,
    })
  }

  return (
    <Responsive
      mobile={
        <FilterButon
          onClick={() =>
            openOverlay({
              content: <FilterStoreOverlay />,
            })
          }
        >
          <Image src={images.icFilter} width={15} height={15} />
          {countFilter === 0 ? translate('filter.title') : translate('filter.titleWithCount', { count: countFilter })}
        </FilterButon>
      }
      desktop={
        <Container>
          <Checkbox title={translate('filter.listing')} value={filters.listing} onChange={(v) => handleChangeFilter('listing', v)} />
          <Collapse defaultOpen title={translate('filter.countryWithCount', { count: settingRedux?.country?.length || 0 })}>
            <Search
              value={searchCountryText}
              onChange={(e) => {
                // if (showAllCountry) {
                //   setShowAllCountry(false)
                // }
                setSearchCountryText(e.target.value)
              }}
              className='MT20'
              placeholder={translate('filter.searchCountry')}
              prefix={<Image src={images.icSearch} width={15} height={15} />}
            />
            <CountryList className='MT20'>
              {countryList?.map((item) => (
                <Checkbox
                  key={item?.slug}
                  value={filters.countries.includes(item?.slug)}
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
          <Collapse defaultOpen title={translate('filter.categoryWithCount', { count: settingRedux?.category?.length || 0 })}>
            <FilterList className='MT10'>
              {settingRedux?.category?.map((cate) => (
                <FilterItem key={cate.slug} $active={filters.categories.includes(cate?.slug)} onClick={() => handleChangeFilter('categories', cate?.slug)}>
                  <Image cursor='pointer' height={30} width='auto' src={cate?.icon} />
                  {renderField(cate?.name)}
                </FilterItem>
              ))}
            </FilterList>
          </Collapse>
          <Collapse defaultOpen title={translate('filter.chainWithCount', { count: settingRedux?.nftStoreChainIds?.length || 0 })}>
            <FilterList className='MT10'>
              {settingRedux?.nftStoreChainIds?.map((chainId) => {
                const chain = ReduxService.getChain(chainId)
                return (
                  <FilterItem key={chainId} $active={filters.chainIds.includes(`${chainId}`)} onClick={() => handleChangeFilter('chainIds', `${chainId}`)}>
                    <Image cursor='pointer' width={30} height={30} src={chain?.logo} />
                    {chain?.name}
                  </FilterItem>
                )
              })}
            </FilterList>
          </Collapse>
        </Container>
      }
    />
  )
}

export default FilterStore
