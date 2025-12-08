export const isMobileUser = () => {
  // eslint-disable-next-line max-len
  const mobileUserAgents = ['android', 'iphone', 'ipad', 'ipod', 'windows phone', 'blackberry', 'webos', 'symbian', 'bada', 'tizen', 'kaios', 'mobile', 'silk', 'opera mini', 'opera mobi', 'chrome mobile', 'crios', 'fxios', 'ucbrowser', 'samsungbrowser', 'qqbrowser']
  const userAgent = navigator.userAgent.toLowerCase()
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < mobileUserAgents.length; i++) {
    if (userAgent.includes(mobileUserAgents[i])) {
      return true
    }
  }

  return false
}
