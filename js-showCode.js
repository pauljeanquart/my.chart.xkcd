export function initializeShowCode() {
  const selectedElements = document.querySelectorAll('.js-show-code');
  for (var i = 0, selectedElement; selectedElement = selectedElements[i]; i++) {
    showCodeFor = document.getElementById(selectedElement.getAttribute('for'));
    selectedElement.innerHTML += replaceAngleBrackets(showCodeFor.outerHTML);
    selectedElement.addEventListener("click", (event) => {
      const preElement = event.target.cloneNode(true);
      [...preElement.childNodes].filter(x => x.nodeType !==3).forEach(x => x.remove());
      navigator.clipboard.writeText(preElement.textContent);
      if (event.target.querySelector(".js-show-code-copied")) {
        event.target.querySelector(".js-show-code-copied").classList.remove("d-none");
        setTimeout(function () {
          event.target.querySelector(".js-show-code-copied").classList.add("d-none");
          document.getSelection().removeAllRanges();
        }, 1000);
      }
    });
  }
}

initializeShowCode();

function replaceAngleBrackets(text) {
  return text.replace(/[<>]/g, function(match) {
    return match === '<' ? '&lt;' : '&gt;';
  });
}

