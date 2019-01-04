const UIController = (() => {
  const updateButton = ({
    width,
    height,
    borderRadius,
    innerText = "Button",
    innerTextColor = "#000000",
    fillStyle = "Solid",
    backgroundColor1 = "none",
    backgroundColor2 = "none",
    gradientDirection = "From Left To Right",
    borderWidth = 1,
    borderStyle = "solid",
    borderColor = "#000000",
    shadowXOffset = 0,
    shadowYOffset = 0,
    shadowBlurRadius = 0,
    shadowSpreadRadius = 0,
    shadowColor = "#000000"
  }) => {
    const button = document.getElementsByClassName(
      "screen__showcase-button"
    )[0];
    if (fillStyle === "Gradient") {
      document.getElementById("gradientDirectionWraper").style.display =
        "block";
      document.getElementById("backgroundColor2Wraper").style.display = "block";
    } else {
      document.getElementById("gradientDirectionWraper").style.display = "none";
      document.getElementById("backgroundColor2Wraper").style.display = "none";
    }

    button.style.width = width + "px";
    button.style.height = height + "px";
    button.style.borderRadius = borderRadius + "px";
    button.innerHTML = innerText;
    button.style.color = innerTextColor;
    if (fillStyle === "Solid") {
      button.style.background = `${backgroundColor1}`;
    } else {
      let gradientStyle;
      switch (gradientDirection) {
        case "From Left To Right":
          gradientStyle = "to right";
          break;
        case "From Right To Left":
          gradientStyle = "to left";
          break;
        case "From Bottom To Top":
          gradientStyle = "to top";
          break;
        case "From Top To Bottom":
          gradientStyle = "to bottom";
          break;
      }

      button.style.background = `linear-gradient(${gradientStyle}, ${backgroundColor1}, ${backgroundColor2})`;
    }

    button.style.border = `${borderWidth}px ${borderStyle} ${borderColor}`;
    button.style.boxShadow = `${shadowColor} ${shadowXOffset}px ${shadowYOffset}px ${shadowBlurRadius}px ${shadowSpreadRadius}px`;
  };

  return {
    updateButton
  };
})();

const DataController = (() => {
  const buttonData = { fillStyle: "Solid" };
  const setAttributeToButton = (attribute, value) =>
    (buttonData[attribute] = value);
  const getHtmlCode = ({ innerText = "Button" }) =>
    `<button class='custom-button'>${innerText}</button>`;
  const getCssCode = ({
    width = 0,
    height = 0,
    borderRadius = 0,
    innerTextColor = "#000000",
    fillStyle = "Solid",
    backgroundColor1 = "none",
    backgroundColor2 = "none",
    gradientDirection = "From Left To Right",
    borderWidth = 1,
    borderStyle = "solid",
    borderColor = "#000000",
    shadowXOffset = 0,
    shadowYOffset = 0,
    shadowBlurRadius = 0,
    shadowSpreadRadius = 0,
    shadowColor = "#000000"
  }) => {
    let gradientStyle;
    switch (gradientDirection) {
      case "From Left To Right":
        gradientStyle = "to right";
        break;
      case "From Right To Left":
        gradientStyle = "to left";
        break;
      case "From Bottom To Top":
        gradientStyle = "to top";
        break;
      case "From Top To Bottom":
        gradientStyle = "to bottom";
        break;
    }

    return `.custom-button-#123 {
                width: ${width}px;
                height: ${height}px;
                boder-radius: ${borderRadius}px;
                color: ${innerTextColor};
                background: ${
                  fillStyle === "Solid"
                    ? backgroundColor1
                    : `linear-gradient(${gradientStyle}, ${backgroundColor1}, ${backgroundColor2})`
                };
                border: ${borderWidth}px ${borderStyle} ${borderColor};
                box-shadow: ${shadowColor} ${shadowXOffset}px ${shadowYOffset}px ${shadowBlurRadius}px ${shadowSpreadRadius}px;    
            }`;
  };

  return {
    getbuttonData: () => buttonData,
    setAttributeToButton,
    getCssCode,
    getHtmlCode
  };
})();

const MainController = ((UIController, DataController) => {
  const allInputs = [
    ...document.getElementsByTagName("input"),
    ...document.getElementsByTagName("select")
  ];
  allInputs.forEach(element => {
    element.addEventListener("change", evt => {
      DataController.setAttributeToButton(
        evt.currentTarget.id,
        evt.currentTarget.value
      );
      UIController.updateButton(DataController.getbuttonData());
    });
  });

  document
    .getElementsByClassName("screen__showcase-button")[0]
    .addEventListener("click", () => {
      document.getElementsByClassName("popup-modal__wraper")[0].style.display =
        "block";
      let cssContent = DataController.getCssCode(
        DataController.getbuttonData()
      );
      let htmlContent = DataController.getHtmlCode(
        DataController.getbuttonData()
      );
      document.getElementById("css").innerHTML = cssContent;
      document.getElementById("html").innerText = htmlContent;
    });
  document
    .getElementsByClassName("popup-modal__close-button")[0]
    .addEventListener("click", () => {
      document.getElementsByClassName("popup-modal__wraper")[0].style.display =
        "none";
    });
})(UIController, DataController);
