import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
export const useSettingRedux = () => useSelector((state) => state?.settingRedux)
export const useSettingContract = () => useSelector((state) => state?.settingRedux?.contract)
export const useBlacklist = () => useSelector((state) => state?.settingRedux?.blacklist)
