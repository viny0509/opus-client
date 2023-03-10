import { numberWithCommas, roundingNumber, scientificToDecimal } from 'common/function'

const FormatBalance = ({ balance, decimals = 8, symbol = '', className = 'text-20 ' }) => {
  return (
    <span className={`text text-bold ${className}`}>
      {numberWithCommas(scientificToDecimal(roundingNumber(balance, decimals)))} {symbol}
    </span>
  )
}

export default FormatBalance
