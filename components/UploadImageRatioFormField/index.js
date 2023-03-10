import { Form, Upload } from 'antd'
import AntdImgCrop from 'antd-img-crop'
import { showNotificationError } from 'common/function'
import images from 'common/images'
import Image from 'components/Image'
import Loading from 'components/Loading'
import useTranslate from 'hooks/useTranslate'
import { useEffect, useState } from 'react'
import UploadService from 'services/Api/Upload'
import styled, { css } from 'styled-components'
import './style.scss'

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

const Input = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 320px;
  gap: 10px;
  aspect-ratio: ${(props) => props.aspect || 1};
  background: #ffffff;
  border: 1px dashed #e0e0e0;
  border-radius: 20px;
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
  color: #828282;
  flex-direction: column;
`

const ImageContainer = styled.div`
  width: 100%;
  max-width: 320px;
  aspect-ratio: ${(props) => props.aspect || 1};
  position: relative;
  display: flex;
  align-items: center;
`

const RemoveButton = styled(Image)`
  position: absolute;
  right: 10px;
  ${(props) =>
    !props.$removeButtonCenter &&
    css`
      right: 15px;
      top: 15px;
    `}
`

export const UploadImageRatio = ({ value, onChange, $removeButtonCenter, ratio = 1, onBlur, styleInput = {} }) => {
  const [image, setImage] = useState(value || null)
  const [uploading, setUploading] = useState(false)

  const { translate } = useTranslate()

  useEffect(() => {
    onChange && onChange(image)
  }, [image])

  const handleChangeImage = async (file) => {
    setUploading(true)
    if (file.size >= 5242880) {
      showNotificationError('File size exceeds maximum')
      setUploading(false)
      return
    }
    const res = await UploadService.upload(file)
    if (res?.data?.url) {
      setImage(res?.data?.url)
    } else {
      showNotificationError('Upload file failed')
    }
    onBlur && onBlur()
    setUploading(false)
  }

  return (
    <InputContainer>
      {image ? (
        <ImageContainer aspect={ratio}>
          <Image radius='20px' src={image} width='100%' ratio={ratio} />
          <RemoveButton onClick={() => setImage(null)} $removeButtonCenter={$removeButtonCenter} src={images.icRemoveImage} />
        </ImageContainer>
      ) : (
        <AntdImgCrop zoom={false} aspect={ratio} modalTitle='Upload 12' modalOk='ok' modalCancel='cancel' onModalOk={(file) => handleChangeImage(file)}>
          <Upload disabled={uploading || !!image} showUploadList={false} accept='.png,.jpg,.jpeg,.gif,.svg'>
            <Input style={styleInput ?? {}} aspect={ratio}>
              {uploading ? (
                <Loading />
              ) : (
                <>
                  <Image src={images.icUploadImage} />
                  {translate('input.upload')}
                </>
              )}
            </Input>
          </Upload>
        </AntdImgCrop>
      )}
    </InputContainer>
  )
}

const UploadImageRatioFormField = ({
  name,
  label = null,
  subLabel = null,
  ratio = 1,
  $removeButtonCenter = false,
  required = false,
  error = null,
  className = '',
  styleImage,
  styleInput,
}) => {
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
      <CustomFormItem style={styleImage ?? {}} name={name}>
        <UploadImageRatio styleInput={styleInput} $removeButtonCenter={$removeButtonCenter} ratio={ratio} onBlur={() => setBlur(true)} />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export default UploadImageRatioFormField
