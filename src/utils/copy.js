function clipboardCopy (text) {
  // Use the Async Clipboard API when available
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  }

  // ...Otherwise, use document.execCommand() fallback

  // Put the text to copy into a <span>
  var span = document.createElement('span')
  span.textContent = text

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = 'pre'

  // An <iframe> isolates the <span> from the page's styles
  var iframe = document.createElement('iframe')
  iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms allow-modals')

  // Add the <iframe> to the page
  document.body.appendChild(iframe)
  var win = iframe.contentWindow

  // Add the <span> to the <iframe>
  win.document.body.appendChild(span)

  // Get a Selection object representing the range of text selected by the user
  var selection = win.getSelection()

  // Fallback for Firefox which fails to get a selection from an <iframe>
  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  var range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  var success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) {
    return false
  }

  selection.removeAllRanges()
  win.document.body.removeChild(span)
  document.body.removeChild(iframe)

  // The Async Clipboard API returns a promise that may reject with `undefined` so we
  // match that here for consistency.
  return success // eslint-disable-line prefer-promise-reject-errors
}

export {
  clipboardCopy as copy
}
