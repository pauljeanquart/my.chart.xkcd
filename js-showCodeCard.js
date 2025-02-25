import prettier from "prettier/standalone.mjs";
import prettierPluginHtml from "prettier/plugins/html.mjs";

export function initializeShowCodeCard() {
  const selectedElements = document.querySelectorAll('.js-show-code-card');
  selectedElements.forEach((selectedElement) => {
    const showCodeFor = document.getElementById(selectedElement.getAttribute('for'));
    formatHtml(showCodeFor.outerHTML)
      .then((result) => {
        selectedElement.querySelector('.card-body').innerHTML = replaceAngleBrackets(result.trim());
      });

    selectedElement.querySelector('.btn-clipboard').addEventListener("click", (event) => {
      const preElement = event.target.closest('.js-show-code-card').querySelector('.card-body').cloneNode(true);
      [...preElement.childNodes].filter(x => x.nodeType !== 3).forEach(x => x.remove());
      navigator.clipboard.writeText(preElement.textContent);
      event.target.classList.add("btn-success");
      event.target.innerText = "Copied!";
      setTimeout(function () {
        event.target.classList.remove("btn-success");
        event.target.innerText = "Copy";
      }, 1000);
    });
  });
}

initializeShowCodeCard();

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