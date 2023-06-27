import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import MButton from './button'

MButton.install = (app: App) => {
  app.component(MButton.name, MButton)
}

export default MButton as SFCWithInstall<typeof MButton>