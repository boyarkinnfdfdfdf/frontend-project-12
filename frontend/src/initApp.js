import i18n from './services/i18n.js'
import profanityInit from './services/initProfanity.js'

const initApp = () => {
  i18n.t()
  profanityInit()
}

export default initApp
