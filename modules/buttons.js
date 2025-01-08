export function createButtons(containerId, buttonData, onButtonClick) {
    const container = document.getElementById(containerId);
    buttonData.forEach(button => {
        const buttonElement = document.createElement("button");
        buttonElement.textContent = button.label;
        if(button.className){
            buttonElement.classList.add(button.className);
        }
        buttonElement.addEventListener("click",()=> onButtonClick(button.operation));
        container.appendChild(buttonElement);
    })
}