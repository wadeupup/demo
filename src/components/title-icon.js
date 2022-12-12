export function name(title, siteName = '-', icon) {
  document.title = siteName + title;
  var link = document.querySelector('link[rel*="icon"]') || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'shortcut icon'
  link.href = icon
  document.getElementsByTagName('head')[0].appendChild(link)
}
export default {
  name
}