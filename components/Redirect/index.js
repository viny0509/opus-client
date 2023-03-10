const { useRouter } = require('next/router')
const { useEffect } = require('react')

const Redirect = ({ to = '/', back = false }) => {
  const router = useRouter()

  useEffect(() => (back ? router.back() : router.push(to || '/')), [to, back])

  return null
}

export default Redirect
