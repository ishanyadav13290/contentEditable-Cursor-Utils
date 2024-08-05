function splitHtmlAtIndex(html, index) {
  let count = 0;
  let insideTag = false;
  let splitIndex = -1;

  for (let i = 0; i < html.length; i++) {
      if (html[i] === "<") {
          insideTag = true;
      } else if (html[i] === ">") {
          insideTag = false;
      } else if (!insideTag) {
          count++;
      }

      if (count === index) {
          splitIndex = i + 1;
          break;
      }
  }
  let left = "";
  let right = "";
  let leftInsideTag = false;
  for (let i = 0; i < html.length; i++) {
      if (html[i] === "<") {
          leftInsideTag = true;
          left += html[i];
          right += html[i];
      } else if (html[i] === ">") {
          leftInsideTag = false;
          left += html[i];
          right += html[i];
      } else if (leftInsideTag) {
          left += html[i];
          right += html[i];
      } else if (!leftInsideTag && splitIndex <= i) {
          left += html[i];
      } else if (!leftInsideTag && splitIndex > i) {
          right += html[i];
      }
  }

  if (splitIndex === -1) {
      return [html, ""];
  }

  return [right,left];
}
