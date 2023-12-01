function formatDate(inputString) {
  const dateObject = new Date(inputString)
  
  if (!isNaN(dateObject.getTime())) {
    const year = dateObject.getFullYear()
    const month = String(dateObject.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
    const day = String(dateObject.getDate()).padStart(2, '0')
  
    // eslint-disable-next-line sonarjs/prefer-immediate-return
    const formattedDate = `${year}-${month}-${day}`
  
    return formattedDate
  } else {
    return '0'
  }
}
  
export { formatDate }
  