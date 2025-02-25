import prettier from "prettier/standalone.mjs";
import prettierPluginHtml from "prettier/plugins/html.mjs";

export function initializeShowCode() {
  const selectedElements = document.querySelectorAll('.js-show-code');
  selectedElements.forEach((selectedElement) => {
    const showCodeFor = document.getElementById(selectedElement.getAttribute('for'));
    formatHtml(showCodeFor.outerHTML)
      .then((result) => {
        selectedElement.childNodes.forEach(c => c.nodeType === Node.TEXT_NODE && c.remove());
        selectedElement.innerHTML += replaceAngleBrackets(result.trim());
      });

    selectedElement.addEventListener("click", (event) => {
      const preElement = event.target.cloneNode(true);
      [...preElement.childNodes].filter(x => x.nodeType !== 3).forEach(x => x.remove());
      navigator.clipboard.writeText(preElement.textContent);
      if (event.target.querySelector(".js-show-code-copied")) {
        event.target.querySelector(".js-show-code-copied").classList.remove("d-none");
        setTimeout(function () {
          event.target.querySelector(".js-show-code-copied").classList.add("d-none");
          document.getSelection().removeAllRanges();
        }, 1000);
      }
    });
  });
}

initializeShowCode();

function replaceAngleBrackets(text) {
  return text.replace(/[<>]/g, function (match) {
    return match === '<' ? '&lt;' : '&gt;';
  });
}

function formatHtml(text) {
  return prettier.format(text, {
    parser: "html",
    plugins: [prettierPluginHtml],
  });
}