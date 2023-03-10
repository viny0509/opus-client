import { Form } from 'antd'
import { showNotificationError } from 'common/function'
import images from 'common/images'
import Image from 'components/Image'
import Loading from 'components/Loading'
import { ethers } from 'ethers'
import useTranslate from 'hooks/useTranslate'
import { useEffect, useMemo, useState } from 'react'
import UploadService from 'services/Api/Upload'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  margin-bottom: ${(props) => (props.hasSub ? '0px' : '8px')};
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #828282;
  span {
    color: red;
  }
`

const Error = styled.div`
  color: red;
`

const CustomFormItem = styled(Form.Item)`
  margin: 0;
  width: 100%;
`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Input = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 1;
  background: #ffffff;
  border: 1px dashed #e0e0e0;
  border-radius: 20px;
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
  color: #828282;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 1;
  background: #ffffff;
  border: 1px dashed #e0e0e0;
`

const ImageContainer = styled.div`
  width: 100%;
  max-width: 250px;
  position: relative;
`

const RemoveButton = styled(Image)`
  position: absolute;
  top: 10px;
  right: 10px;
`

export const UploadInput = ({ value, onChange, onBlur }) => {
  const [image, setImage] = useState(value || null)
  const [uploading, setUploading] = useState(false)

  const id = useMemo(() => ethers.utils.randomBytes(10).join(''), [])

  const { translate } = useTranslate()

  useEffect(() => {
    onChange && onChange(image)
  }, [image])

  const handleChangeImage = async (e) => {
    setUploading(true)
    const { files } = e.target
    if (files[0].size >= 5242880) {
      showNotificationError('File size exceeds maximum')
      setUploading(false)
      return
    }
    const res = await UploadService.upload(files[0])
    if (res?.data?.url) {
      setImage(res?.data?.url)
    } else {
      showNotificationError('Upload file failed')
    }
    setUploading(false)
  }

  return (
    <InputContainer>
      {!image && (
        <input
          onBlur={() => onBlur && onBlur()}
          style={{ display: 'none' }}
          id={id}
          type='file'
          accept='image/png, image/gif, image/jpeg'
          onChange={handleChangeImage}
          onKeyUp={null}
        />
      )}
      {uploading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : image ? (
        <ImageContainer>
          <Image src={image} width='100%' height='auto' radius='25px' />
          <RemoveButton cursor='pointer' onClick={() => setImage(null)} src={images.icRemoveImage} />
        </ImageContainer>
      ) : (
        <Input htmlFor={id}>
          <Image src={images.icUploadImage} />
          {translate('input.upload')}
        </Input>
      )}
    </InputContainer>
  )
}

const UploadImageFormField = ({ name, label = null, subLabel = null, required = false, error = null, className = '' }) => {
  const [blur, setBlur] = useState(false)
  return (
    <Container className={className}>
      {label && (
        <Label hasSub={!!subLabel}>
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      {subLabel && <Label>{subLabel}</Label>}
      <CustomFormItem name={name}>
        <UploadInput onBlur={() => setBlur(true)} />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export default UploadImageFormField
