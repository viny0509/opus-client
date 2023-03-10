import ReduxService from 'common/redux'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import allMessages from 'static/lang/config'
import config from 'static/lang/config/config.json'

const useTranslate = () => {
  const language = useSelector((state) => state.language)

  const messages = useMemo(() => {
    return allMessages[language] || allMessages['en']
  }, [language])

  const translate = (key, variables, defaultMessage = '') => {
    let message = messages
    if (key.includes('.')) {
      key.split('.').forEach((k) => {
        message = message[k]
      })
    } else {
      message = message[key]
    }
    if (message) {
      if (variables && Object.keys(variables).length > 0) {
        Object.keys(variables).forEach((key) => {
          message = message.replace(new RegExp(`{${key}}`, 'g'), variables[key])
        })
      }
      if (config?.globalVariables && Object.keys(config?.globalVariables).length > 0) {
        Object.keys(config?.globalVariables).forEach((key) => {
          message = message.replace(new RegExp(`{${key}}`, 'g'), config?.globalVariables[key])
        })
      }
      return message
    }
    return defaultMessage
  }

  const renderField = (fieldObj = {}, defaultValue = '') => {
    return `${fieldObj?.[language] || fieldObj?.['en'] || defaultValue}`
  }

  return {
    language,
    messages,
    translate,
    renderField,
  }
}

export const translateFunction = (key, variables, defaultMessage = '') => {
  const language = ReduxService.getLanguage()
  let message = allMessages[language] || allMessages['en']
  if (key.includes('.')) {
    key.split('.').forEach((k) => {
      message = message[k]
    })
  } else {
    message = message[key]
  }
  if (message) {
    if (variables && Object.keys(variables).length > 0) {
      Object.keys(variables).forEach((key) => {
        message = message.replace(new RegExp(`{${key}}`, 'g'), variables[key])
      })
    }
    return message
  }
  return defaultMessage
}

export default useTranslate
