document.addEventListener('DOMContentLoaded', () => {
    let selectedCell = null;

    // Generate the Sudoku grid
    const sudokuGrid = document.getElementById('sudoku-grid');
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${i}`;

        // Add classes for thicker borders based on divisibility
        if ((i + 1) % 3 === 0 && (i + 1) % 9 !== 0) {
            cell.classList.add('thick-right');
        }
        if (i >= 18 && i < 27 || i >= 45 && i < 54 || i >= 72 && i < 81) {
            cell.classList.add('thick-bottom');
        }
        if (i < 9) {
            cell.classList.add('thick-top');
        }
        if (i % 9 == 0) {
            cell.classList.add('thick-left');
        }
        if (((i + 1) % 9) == 0) {
            cell.classList.add('thick-right');
        }

        // Main number div
        const mainNumber = document.createElement('div');
        mainNumber.classList.add('main-number');
        cell.appendChild(mainNumber);

        // Subgrid div
        const subGrid = document.createElement('div');
        subGrid.classList.add('subGrid');
        subGrid.id = `subGrid-${i}`;
        subGrid.style.display = 'none'; // Initially hide subgrid
        for (let j = 0; j < 9; j++) {
            const subCell = document.createElement('div');
            subCell.classList.add('subCell');
            subCell.id = `subCell-${j}`;
            subCell.textContent = j + 1;
            subGrid.appendChild(subCell);
        }
        cell.appendChild(subGrid);

        sudokuGrid.appendChild(cell);
    }

    // Select all cells and add click event listeners
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (selectedCell) {
                selectedCell.classList.remove('selected');
            }
            selectedCell = cell;
            selectedCell.classList.add('selected');
        });
    });

    // Automark checkbox
    const automarkCheckbox = document.getElementById('automark-checkbox');

    // Add event listener to automark checkbox
    automarkCheckbox.addEventListener('change', () => {
        const isChecked = automarkCheckbox.checked;
        cells.forEach(cell => {
            const subGrid = cell.querySelector('.subGrid');
            const mainNumber = cell.querySelector('.main-number');
            if (isChecked && (mainNumber.textContent) == '') {
                subGrid.style.display = 'grid'; // Show subgrid
            } else {
                subGrid.style.display = 'none'; // Hide subgrid
            }
        });
    });

    // Select all number buttons and add click event listeners
    const numberButtons = document.querySelectorAll('.number-btn');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (selectedCell) {
                const number = button.getAttribute('data-number');
                const mainNumber = selectedCell.querySelector('.main-number');
                const subGrid = selectedCell.querySelector('.subGrid');

                if (number === 'X') {
                    mainNumber.textContent = ''; // Clear main number
                    subGrid.style.display = 'grid'; // Show subgrid
                } else {
                    mainNumber.textContent = number; // Set main number
                    subGrid.style.display = 'none'; // Hide subgrid
                }
            }
        });
    });
});
