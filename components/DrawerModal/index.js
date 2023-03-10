import { Drawer } from 'antd'
import styles from './DrawerModal.module.scss'
import images from 'common/images'

const DrawerModal = (props) => {
  const { isOpen, onClose, children } = props
  return (
    <Drawer
      width={'100%'}
      height={'auto'}
      title={null}
      placement='bottom'
      onClose={onClose}
      open={isOpen}
      closable={false}
      drawerStyle={{
        background: 'rgba(0, 0, 0, 0.45)',
      }}
      bodyStyle={{
        background: '#ffffff',
        padding: '20px',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
      }}
    >
      <div className={styles.closeIconBox}>
        <img onClick={onClose} className={styles.closeIconImg} src={images.icClose} />
      </div>
      {children}
    </Drawer>
  )
}

export default DrawerModal
