import { Drawer } from 'antd'
import './style.scss'

const MyDrawer = ({ config, closeDrawer }) => {
  return (
    <Drawer
      className={`my--drawer ${config.wrapClassName} ${config.noPadding ? 'no-padding' : ''}`}
      placement={config.placement || 'bottom'}
      closable={false}
      onClose={() => closeDrawer()}
      open={config.open || false}
    >
      {config.content || <></>}
    </Drawer>
  )
}

export default MyDrawer
