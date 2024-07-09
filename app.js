// app.js

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
  
    // Select all number buttons and add click event listeners
    const numberButtons = document.querySelectorAll('.number-btn');
    numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (selectedCell) {
          const number = button.getAttribute('data-number');
          if (number === 'X') {
            selectedCell.textContent = '';
          } else {
            selectedCell.textContent = number;
          }
        }
      });
    });
  });
  