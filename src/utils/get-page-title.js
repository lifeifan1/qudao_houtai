import defaultSettings from '@/settings'

const title = defaultSettings.title || '渠道后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
