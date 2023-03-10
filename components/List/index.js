import { List as ListAntd } from 'antd'
import Loading from 'components/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'

const CustomList = styled(ListAntd)`
  .ant-row {
    width: 100% !important;
  }
  .ant-spin-container {
    display: flex;
    justify-content: center;
    overflow: hidden !important;
  }
`

const CustomListItem = styled(ListAntd.Item)`
  padding: 0px !important;
`

const LoadingContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

/**
 *
 * @param {{ grid: { gutter: number, xs: number, sm: number, md: number, lg: number, xl: number, xxl: number },items: any[], fetchMoreData: () => {}, hasMore: boolean, loading: boolean, renderItem: (item: any, index: number) => <></> }} param0
 * @returns
 */
const List = ({
  grid = {
    gutter: 12,
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
    xxl: 8,
  },
  items = [],
  fetchMoreData = () => {},
  hasMore,
  loading,
  page,
  renderItem = () => <></>,
}) => {
  const wrapRenderItem = (item, index) => {
    return <CustomListItem key={`list_${index}_${item?._id || item?.nftId || item?.id || item?.key}`}>{renderItem(item, index)}</CustomListItem>
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        loading && page === 1 ? (
          <></>
        ) : (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )
      }
    >
      {loading && page === 1 ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <CustomList grid={grid} dataSource={items} renderItem={wrapRenderItem}></CustomList>
      )}
    </InfiniteScroll>
  )
}

export default List
