export function initializeShowCode() {
  const selectedElements = document.querySelectorAll('.js-show-code');
  for (var i = 0, selectedElement; selectedElement = selectedElements[i]; i++) {
    showCodeFor = document.getElementById(selectedElement.getAttribute('for'));
    selectedElement.innerHTML = replaceAngleBrackets(showCodeFor.outerHTML);
    selectedElement.addEventListener("click", (event) => {
      navigator.clipboard.writeText(event.target.textContent);
      event.target.parentNode.querySelector(".js-copied").classList.remove("d-none");
      setTimeout(function () {
        event.target.parentNode.querySelector(".js-copied").classList.add("d-none");
        document.getSelection().removeAllRanges();
      }, 1000);
    });
  }
}

initializeShowCode();

function replaceAngleBrackets(text) {
  return text.replace(/[<>]/g, function(match) {
    return match === '<' ? '&lt;' : '&gt;';
  });
}

