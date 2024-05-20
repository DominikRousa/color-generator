document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const saveFavoriteBtn = document.getElementById('saveFavoriteBtn');
    const colorDisplay = document.getElementById('colorDisplay');
    const colorCode = document.getElementById('colorCode');
    const colorHistoryContainer = document.getElementById('colorHistory');
    const favoriteColorsContainer = document.getElementById('favoriteColors');
 
    // Load the last saved color, color history, and favorite colors from localStorage
    const lastColor = localStorage.getItem('lastColor');
    const colorHistory = JSON.parse(localStorage.getItem('colorHistory')) || [];
    const favoriteColors = JSON.parse(localStorage.getItem('favoriteColors')) || [];
 
    if (lastColor) {
        setColor(lastColor);
    }
 
    updateColorHistory();
    updateFavoriteColors();
 
    generateBtn.addEventListener('click', () => {
        const randomColor = getRandomColor();
        setColor(randomColor);
        updateColorHistory(randomColor);
    });
 
    saveFavoriteBtn.addEventListener('click', () => {
        const currentColor = colorCode.textContent.replace('Color Code: ', '');
        if (!favoriteColors.includes(currentColor)) {
            favoriteColors.push(currentColor);
            localStorage.setItem('favoriteColors', JSON.stringify(favoriteColors));
            updateFavoriteColors();
        }
    });
 
    colorHistoryContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'DIV' && event.target.dataset.color) {
            setColor(event.target.dataset.color);
        }
    });
 
    favoriteColorsContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'DIV' && event.target.dataset.color) {
            setColor(event.target.dataset.color);
        } else if (event.target.tagName === 'DIV' && event.target.className === 'delete-button') {
            const colorToRemove = event.target.parentElement.dataset.color;
            const index = favoriteColors.indexOf(colorToRemove);
            if (index !== -1) {
                favoriteColors.splice(index, 1);
                localStorage.setItem('favoriteColors', JSON.stringify(favoriteColors));
                updateFavoriteColors();
            }
        }
    });
 
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
 
    function setColor(color) {
colorDisplay.style.backgroundColor = color;
        colorCode.textContent = `Color Code: ${color}`;
        localStorage.setItem('lastColor', color);
    }
 
    function updateColorHistory(newColor) {
        if (newColor) {
            colorHistory.push(newColor);
            if (colorHistory.length > 10) {
                colorHistory.shift();
            }
            localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
        }
 
        colorHistoryContainer.innerHTML = '';
        colorHistory.forEach(color => {
            const colorDiv = document.createElement('div');
colorDiv.style.backgroundColor = color;
            colorDiv.dataset.color = color;
            colorHistoryContainer.appendChild(colorDiv);
        });
    }
 
    function updateFavoriteColors() {
        favoriteColorsContainer.innerHTML = '';
        favoriteColors.forEach(color => {
            const colorDiv = document.createElement('div');
colorDiv.style.backgroundColor = color;
            colorDiv.dataset.color = color;
 
            // Create delete button
            const deleteButton = document.createElement('div');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'X';
            colorDiv.appendChild(deleteButton);
 
            favoriteColorsContainer.appendChild(colorDiv);
        });
    }
});