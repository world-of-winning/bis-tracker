var ALLOWED_TAGS = new Set([
  "div", "span", "table", "tr", "td", "th", "tbody", "thead",
  "br", "b", "i", "em", "strong", "small", "a", "img", "ul", "li", "p",
]);
var ALLOWED_ATTRS = new Set([
  "class", "style", "href", "src", "alt", "width", "height", "colspan", "rowspan",
]);

export function sanitizeHTML(html) {
  if (!html) return "";
  var doc = new DOMParser().parseFromString(html, "text/html");
  cleanNode(doc.body);
  return doc.body.innerHTML;
}

function cleanNode(node) {
  var children = Array.from(node.childNodes);
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (child.nodeType === 1) {
      if (!ALLOWED_TAGS.has(child.tagName.toLowerCase())) {
        child.remove();
        continue;
      }
      Array.from(child.attributes).forEach(function(attr) {
        if (!ALLOWED_ATTRS.has(attr.name)) child.removeAttribute(attr.name);
      });
      ["href", "src"].forEach(function(a) {
        var v = child.getAttribute(a);
        if (v && v.trim().toLowerCase().indexOf("javascript:") === 0) child.removeAttribute(a);
      });
      cleanNode(child);
    }
  }
}
