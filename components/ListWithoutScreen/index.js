import Loading from 'components/Loading'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'

const Wrapper = styled.div``

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.gap}px;
`

const LoadingContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ItemContainer = styled.div`
  width: 100%;
  max-width: ${(props) => props.maxWidth};
`
/**
 *
 * @param {{ breakpoints: { [key: number]: number }, gap: number, items: any[], fetchMoreData: () => {}, hasMore: boolean, loading: boolean, renderItem: (item: any, index: number) => <></> }} param0
 * @returns
 */
const ListWithContainerSize = ({
  breakpoints = {
    300: 1,
    320: 2,
    400: 2,
    480: 3,
    580: 4,
    670: 4,
    770: 5,
  },
  gap = {
    300: 15,
    320: 15,
    400: 15,
    480: 15,
    580: 15,
    670: 20,
    770: 20,
  },
  items = [],
  fetchMoreData = () => {},
  hasMore,
  loading,
  page,
  renderItem = () => <></>,
}) => {
  const listRef = useRef()
  const [listWidth, setListWidth] = useState(null)
  useLayoutEffect(() => {
    setListWidth(listRef.current?.offsetWidth || null)
    const observe = new ResizeObserver(() => {
      if (listRef.current?.offsetWidth) {
        setListWidth(listRef.current.offsetWidth)
      }
    })
    observe.observe(listRef.current)
    return () => {
      observe.unobserve(listRef.current)
      observe.disconnect()
    }
  }, [])

  const matchBreakpoints = useMemo(() => {
    if (listWidth) {
      const listBreakpoint = Object.keys(breakpoints)
        .map((breakpoint) => Number(breakpoint))
        .sort((a, b) => b - a)
      for (const breakpoint of listBreakpoint) {
        if (listWidth > breakpoint) {
          return breakpoint
        }
      }
    }
    return null
  }, [listWidth, breakpoints])

  const itemInRow = breakpoints[matchBreakpoints] || 0
  const cuurentGap = useMemo(() => {
    if (typeof gap === 'number') {
      return gap
    }
    if (typeof gap === 'object') {
      return gap[matchBreakpoints]
    }
  }, [gap, matchBreakpoints])

  const widthPerItem = `${100 / itemInRow}%`
  const wrapRenderItem = (item, index) => {
    return (
      <ItemContainer
        maxWidth={`calc(${widthPerItem} - ${(cuurentGap / itemInRow) * (itemInRow - 1)}px)`}
        key={`list_${index}_${item?._id || item?.nftId || item?.id || item?.key}`}
      >
        {renderItem(item, index)}
      </ItemContainer>
    )
  }
  return (
    <Wrapper ref={listRef}>
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
          <Container gap={cuurentGap}>{items.map((item, index) => wrapRenderItem(item, index))}</Container>
        )}
      </InfiniteScroll>
    </Wrapper>
  )
}

export default ListWithContainerSize
