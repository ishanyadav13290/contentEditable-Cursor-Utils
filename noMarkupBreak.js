// innerHTML and innerText aren't useful for DOM manipulation.

// However, the selection and ranges API is great for this. extractContents automatically splits elements without breaking markup.

function splitNode(selection, root) {
  let range = selection.getRangeAt(0);
  let {firstChild, lastChild} = root;

  let previousRange = document.createRange();
  previousRange.setStart(firstChild, 0);
  previousRange.setEnd(range.startContainer, range.startOffset);

  let nextRange = document.createRange();
  nextRange.setStart(range.endContainer, range.endOffset);
  nextRange.setEnd(lastChild, lastChild.length);
  return {
    previous: previousRange,
    current: range,
    next: nextRange,
  };
}

let ranges = splitNode(document.getSelection(), contentEditableDiv);
let nextFragment = ranges.next.extractContents();



// Thanks for posting this.

//Worked wonderfully until I tried splitting a content editable that ended in bold text.

// Looked at the code and recognized that it could only handle cases where firstChild and lastChild are text nodes.

// Made a few tweaks to fix:

previousRange.setStart(firstChild, 0); becomes previousRange.setStartBefore(firstChild);
nextRange.setEnd(lastChild, lastChild.length); becomes nextRange.setEndAfter(lastChild);
export function splitNode(selection, root) {
  let range = selection.getRangeAt(0);
  let {firstChild, lastChild} = root;

  let previousRange = document.createRange();
  previousRange.setStartBefore(firstChild);
  previousRange.setEnd(range.startContainer, range.startOffset);

  let nextRange = document.createRange();
  nextRange.setStart(range.endContainer, range.endOffset);
  nextRange.setEndAfter(lastChild);

  return {
    previous: previousRange,
    current: range,
    next: nextRange,
  };
}
