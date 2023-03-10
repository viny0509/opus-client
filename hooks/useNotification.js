import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import NotificationService from 'services/Api/Notification'

const getNotification = async () => {
  const res = await NotificationService.getAll()
  return res.data
}

const useNotification = () => {
  const { data, isLoading } = useQuery(QUERY_KEY.notification, getNotification)
  return {
    isLoading: isLoading,
    data: data?.items || null,
  }
}

export default useNotification
