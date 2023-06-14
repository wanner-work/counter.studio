type ShortNumberProps = {
  number: number
}

export default function ShortNumber ({ number }: ShortNumberProps) {
  const formatNumber = (num: number): string => {
    const suffixes = ['', 'k', 'm', 'b', 't']
    const value = Math.abs(num)

    // Determine the appropriate suffix index for the number
    const suffixIndex = Math.floor(Math.log10(value) / 3)

    // Divide the number by the corresponding power of 1000
    const shortValue = (value / Math.pow(1000, suffixIndex))

    // Check if the decimal part is zero, and remove the decimal place if it is
    const formattedValue = shortValue % 1 === 0 ? shortValue.toFixed(0) : shortValue.toFixed(1)

    // Concatenate the formatted value and suffix
    return `${formattedValue}${suffixes[suffixIndex]}`
  }

  return <>{formatNumber(number)}</>
}
