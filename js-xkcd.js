import chartXkcd from 'chart.xkcd'; // https://www.npmjs.com/package/chart.xkcd

export function initializeChartXkcd() {
  const selectedElements = document.querySelectorAll('.js-xkcd');
  selectedElements.forEach( (selectedElement) =>  {
    const modifierClass = Array.from(selectedElement.classList).filter(c => c.startsWith('js-xkcd-'))[0].split('-').slice(2)[0];
    let config = {};
    try {
      config = JSON.parse(selectedElement.dataset.jsConfig);
      if (selectedElement.dataset.jsData) {
        const data = JSON.parse(selectedElement.dataset.jsData)
        config.data = data;
      }
      if (selectedElement.dataset.jsLegendPosition) {
        // downLeft, downRight, upLeft, upRight
        if (!Object.prototype.hasOwnProperty.call(config, "options")) {
          config.options = {};
        }
        config.options.legendPosition = chartXkcd.config.positionType[selectedElement.dataset.jsLegendPosition]
      }
    } catch (error) {
      console.error("Error parsing data values:", error);
    }

    switch (modifierClass) {
      case "bar":
        new chartXkcd.Bar(selectedElement, config);
        break;
      case "stacked":
        new chartXkcd.StackedBar(selectedElement, config);
        break;
      case "pie":
        new chartXkcd.Pie(selectedElement, config);
        break;
      case "line":
        new chartXkcd.Line(selectedElement, config);
        break;
      case "xy":
        new chartXkcd.XY(selectedElement, config);
        break;
      case "radar":
        new chartXkcd.Radar(selectedElement, config);
        break;
      default:
        console.error(`chart type based on modifier class '${modifierClass}' not implemented or not found!`);
        break;
    }
  });
}

initializeChartXkcd();