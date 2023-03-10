import images from 'common/images'
import Image from 'components/Image'
import { useState } from 'react'
import styled from 'styled-components'
import { message } from 'antd'
const MAX_FILE_SIZE = 5 * 1024 * 1024
import { getBase64 } from 'common/function'
import UploadService from 'services/Api/Upload'

const Container = styled.div``

const Label = styled.div`
  margin-bottom: 8px;
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

const Wrap = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
  padding: 1px;
`

const CustomInput = styled.input`
  display: none !important;
  border-radius: 20px;
`

const InputIconLabel = styled.label`
  cursor: pointer;
`

const List = styled.div`
  display: inline-flex;
  gap: 12px;
  align-items: center;
`

const IconWrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
`

const IconText = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: #828282;
`

const Item = styled.div`
  border: ${(props) => (props.border ? `1px dashed #E0E0E0` : `none`)};
  width: 110px;
  height: 110px;
  position: relative;
  border-radius: 20px;
`

const ItemIcon = styled.div`
  position: absolute;
  z-index: 10;
  top: 6px;
  right: 5px;
  cursor: pointer;

  img {
    cursor: pointer !important;
  }
`

const CustomImage = styled(Image)`
  object-fit: cover;
`

const UploadMultipleInput = (props) => {
  const { label, required, name, onChange } = props
  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChangeUpload = async (event) => {
    const files = Array.from(event.target?.files) || []
    const filesTooLarge = []
    const filePromises = []
    setLoading(true)

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        filesTooLarge.push(file)
        message.error(`Maximum file size is 5MB`)
      } else {
        filePromises.push(file)
      }
    })

    try {
      const listUpload = await Promise.all(
        filePromises.map(async (file) => {
          const base64 = await getBase64(file)
          const url = URL.createObjectURL(file)
          const res = await UploadService.upload(file)

          return {
            file: file,
            base64: base64,
            url: url,
            images: res?.data?.url || [],
          }
        })
      )
      const newFileList = [...fileList, ...listUpload]
      setFileList(newFileList)
      onChange && onChange(newFileList)
    } catch (error) {
      message.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveImage = (index) => {
    const newArrImage = [...fileList]
    newArrImage.splice(index, 1)
    setFileList(newArrImage)
    onChange && onChange(newArrImage)
  }

  return (
    <Container>
      {label && (
        <Label>
          {label}
          {required && <span>*</span>}
        </Label>
      )}

      <Wrap>
        <List>
          <Item border>
            <CustomInput
              id={name}
              name={name}
              type='file'
              disabled={loading}
              multiple
              onChange={handleChangeUpload}
              accept='image/png, image/gif, image/jpeg'
            />
            <InputIconLabel htmlFor={name} id={name}>
              <IconWrap>
                {loading ? (
                  <IconText>Loading...</IconText>
                ) : (
                  <>
                    <Image src={images.icUploadImage} width={15} height={15} />
                    <IconText>Upload</IconText>
                  </>
                )}
              </IconWrap>
            </InputIconLabel>
          </Item>
          {!fileList?.length < 1 &&
            fileList?.map((item, index) => (
              <Item key={index}>
                <ItemIcon onClick={() => handleRemoveImage(index)}>
                  <Image src={images.icRemoveImage} width={20} height={20} />
                </ItemIcon>
                <CustomImage src={item?.base64} width={110} height={110} radius={`20px`} />
              </Item>
            ))}
        </List>
      </Wrap>
    </Container>
  )
}

export default UploadMultipleInput
