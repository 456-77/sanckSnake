let inputDirection = {x: 1, y: 0};

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && inputDirection.x!== 1) {
        inputDirection = {x: -1, y: 0};
    } else if (event.key === 'ArrowDown' && inputDirection.x!== -1) {
        inputDirection = {x: 1, y: 0};
    } else if (event.key === 'ArrowLeft' && inputDirection.y!== 1) {
        inputDirection = {x: 0, y: -1};
    } else if (event.key === 'ArrowRight' && inputDirection.y!== -1) {
        inputDirection = {x: 0, y: 1};
    }
});

const getInputDirection = () => {
    return inputDirection;
}
