export function getTextLength(element) {
    let range = element.ownerDocument.createRange()
    range.selectNodeContents(element)
  
    return range.toString().length
  }

  export function getCaretOffset(element) {
    let sel = element.ownerDocument.defaultView.getSelection()
    if (sel.rangeCount === 0) return 0
  
    let range = element.ownerDocument.defaultView.getSelection().getRangeAt(0)
    let preCaretRange = range.cloneRange()
    preCaretRange.selectNodeContents(element)
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    return preCaretRange.toString().length
  }
  
  export function isCaretAtStart(element) {
    if (element.ownerDocument.activeElement !== element) return false
    if (
      element.ownerDocument.defaultView.getSelection().getRangeAt(0).toString()
        .length > 0
    )
      return false
  
    return getCaretOffset(element) === 0
  }

  export function isCaretAtEnd(element) {
    if (element.ownerDocument.activeElement !== element) return false
    if (
      element.ownerDocument.defaultView.getSelection().getRangeAt(0).toString()
        .length > 0
    )
      return false
  
    return getCaretOffset(element) === getTextLength(element)
  }

  export function isCaretOnFirstLine(element) {
    if (element.ownerDocument.activeElement !== element) return false
  
    // Get the client rect of the current selection
    let window = element.ownerDocument.defaultView
    let selection = window.getSelection()
    if (selection.rangeCount === 0) return false
  
    let originalCaretRange = selection.getRangeAt(0)
  
    // Bail if there is text selected
    if (originalCaretRange.toString().length > 0) return false
  
    let originalCaretRect = originalCaretRange.getBoundingClientRect()
  
    // Create a range at the end of the last text node
    let startOfElementRange = element.ownerDocument.createRange()
    startOfElementRange.selectNodeContents(element)
  
    // The endContainer might not be an actual text node,
    // try to find the last text node inside
    let startContainer = startOfElementRange.endContainer
    let startOffset = 0
    while (startContainer.hasChildNodes() && !(startContainer instanceof Text)) {
      startContainer = startContainer.firstChild
    }
  
    startOfElementRange.setStart(startContainer, startOffset)
    startOfElementRange.setEnd(startContainer, startOffset)
    let endOfElementRect = startOfElementRange.getBoundingClientRect()
  
    return originalCaretRect.top === endOfElementRect.top
  }

 export function isCaretOnLastLine(element) {
    if (element.ownerDocument.activeElement !== element) return false
  
    // Get the client rect of the current selection
    let window = element.ownerDocument.defaultView
    let selection = window.getSelection()
    if (selection.rangeCount === 0) return false
  
    let originalCaretRange = selection.getRangeAt(0)
  
    // Bail if there is a selection
    if (originalCaretRange.toString().length > 0) return false
  
    let originalCaretRect = originalCaretRange.getBoundingClientRect()
  
    // Create a range at the end of the last text node
    let endOfElementRange = document.createRange()
    endOfElementRange.selectNodeContents(element)
  
    // The endContainer might not be an actual text node,
    // try to find the last text node inside
    let endContainer = endOfElementRange.endContainer
    let endOffset = 0
    while (endContainer.hasChildNodes() && !(endContainer instanceof Text)) {
      endContainer = endContainer.lastChild
      endOffset = endContainer.length ?? 0
    }
  
    endOfElementRange.setEnd(endContainer, endOffset)
    endOfElementRange.setStart(endContainer, endOffset)
    let endOfElementRect = endOfElementRange.getBoundingClientRect()
  
    return originalCaretRect.bottom === endOfElementRect.bottom
  }
