const gridContainer = document.querySelector('.grid-container');
let selectedBox = null;

// Get all box elements
const boxElements = document.querySelectorAll('.box');
const rowContainers = document.querySelectorAll('.grid-row');

function sendRowDataToServer(rowData) {
    fetch('/check_word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ row: rowData }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response data here
        console.log(data);
        // Update the front-end based on the response (e.g., set status for each box)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  function focusOnFirstBox() {
    const firstBox = boxElements[0]; // Get the first box element
    selectedBox = firstBox;
    selectedBox.classList.add('selected-box');
    selectedBox.querySelector('input').focus();
  }
  
  // Trigger the focus on the first box when the page is loaded
  document.addEventListener('DOMContentLoaded', () => {
    focusOnFirstBox();
  });
  
// Click event for each box (excluding the first box in each row)
boxElements.forEach((box) => {
  box.addEventListener('click', () => {
    if (selectedBox && !box.classList.contains('first-box')) {
      selectedBox.classList.remove('selected-box');
    }

    selectedBox = box;
    selectedBox.classList.add('selected-box');
    selectedBox.querySelector('input').focus();
  });
});

// Click event for the first box in each row
rowContainers.forEach((rowContainer) => {
  const firstBox = rowContainer.querySelector('.box');
  firstBox.classList.add('first-box'); // Add a class to identify the first box in each row

  firstBox.addEventListener('click', () => {
    if (selectedBox) {
      selectedBox.classList.remove('selected-box');
    }

    selectedBox = firstBox;
    selectedBox.classList.add('selected-box');
    selectedBox.querySelector('input').focus();
  });
});

// Mouseover and Mouseout effects for each box
boxElements.forEach((box) => {
  box.addEventListener('mouseover', () => {
    if (box !== selectedBox) {
      box.classList.add('hover');
    }
  });

  box.addEventListener('mouseout', () => {
    if (box !== selectedBox) {
      box.classList.remove('hover');
    }
  });
});

function sendRowData(rowContainer) {
    const boxElementsInRow = rowContainer.querySelectorAll('.box');
    const rowData = [];
  
    boxElementsInRow.forEach((box) => {
      const input = box.querySelector('input');
      const value = input.value.toUpperCase(); // Convert the value to uppercase if needed
      rowData.push(value);
    });
  
    const jsonData = JSON.stringify(rowData);
    console.log(jsonData); // Replace this line with your actual data sending logic
  }
// function sendRowData(rowContainer) {
//     const boxElementsInRow = rowContainer.querySelectorAll('.box');
//     const rowData = [];
  
//     boxElementsInRow.forEach((box) => {
//       const input = box.querySelector('input');
//       const value = input.value.toUpperCase();
//       rowData.push(value);
//     });
  
//     sendRowDataToServer(rowData);
//   }
function isRowFilled(rowContainer) {
    const boxElementsInRow = rowContainer.querySelectorAll('.box');
    for (let i = 0; i < boxElementsInRow.length; i++) {
      const input = boxElementsInRow[i].querySelector('input');
      if (!input.value || !/^[a-zA-Z]$/.test(input.value)) {
        return false;
      }
    }
    return true;
  }
// Move to the next row if the current row is filled
function moveToNextRow(currentRowContainer) {
  const nextRowContainer = currentRowContainer.nextElementSibling;
  if (nextRowContainer) {
    sendRowData(currentRowContainer);
    selectedBox.classList.remove('selected-box');
    selectedBox = nextRowContainer.querySelector('.box');
    selectedBox.classList.add('selected-box');
    selectedBox.querySelector('input').focus();
  } else {
    // If the current row is the last row, send the data here
    if (isRowFilled(currentRowContainer)) {
      sendRowData(currentRowContainer);
    }
  }
}
function moveToNextRowIfFilled(currentRowContainer) {
    const boxElementsInRow = currentRowContainer.querySelectorAll('.box');
    const lastBox = boxElementsInRow[boxElementsInRow.length - 1];
    if (isRowFilled(currentRowContainer) && lastBox.classList.contains('selected-box')) {
      moveToNextRow(currentRowContainer);
    }
  }
// Click event for the delete button
gridContainer.addEventListener('keydown', (e) => {

//arrow movement for debugging
//  const arrowKeys = ['ArrowLeft', 'ArrowRight'];

//   if (arrowKeys.includes(e.key)) {
//     e.preventDefault();

//     const currentIndex = Array.from(boxElements).indexOf(selectedBox);
//     let nextIndex = currentIndex;

//     if (e.key === 'ArrowLeft') {
//       nextIndex = currentIndex - 1;
//     } else if (e.key === 'ArrowRight') {
//       nextIndex = currentIndex + 1;
//     }
//     if (nextIndex >= 0 && nextIndex < boxElements.length) {
//       selectedBox.classList.remove('selected-box');
//       selectedBox = boxElements[nextIndex];
//       selectedBox.classList.add('selected-box');
//       selectedBox.querySelector('input').focus();
//     }
//   } else 
if (e.key === 'Backspace') {
    e.preventDefault();

    const currentIndex = Array.from(boxElements).indexOf(selectedBox);
    const previousIndex = currentIndex - 1;

    // If the cursor is in the first box of the row, do nothing
    if (currentIndex % 5 === 0) {
      return;
    }

    const input = selectedBox.querySelector('input');
    input.value = '';
    input.previousElementSibling.textContent = '';

    if (previousIndex >= 0) {
      selectedBox.classList.remove('selected-box');
      selectedBox = boxElements[previousIndex];
      selectedBox.classList.add('selected-box');
      selectedBox.querySelector('input').focus();
    }
  } else if (e.key.length === 1) {
    const currentRowContainer = selectedBox.closest('.grid-row');
    const input = selectedBox.querySelector('input');
    input.value = e.key.toUpperCase();
    input.previousElementSibling.textContent = e.key.toUpperCase();
    
    const currentIndex = Array.from(boxElements).indexOf(selectedBox);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < boxElements.length && !isRowFilled(currentRowContainer)) {
        selectedBox.classList.remove('selected-box');
        selectedBox = boxElements[nextIndex];
        selectedBox.classList.add('selected-box');
        selectedBox.querySelector('input').focus();
    }

    // Prevent the keydown event from propagating further for letter keys (a-z, A-Z)
    e.stopPropagation();
    e.preventDefault();
}
else if (e.key === 'Enter') {
    // Check if the current row is filled before moving to the next row
    const currentRowContainer = selectedBox.closest('.grid-row');
    moveToNextRowIfFilled(currentRowContainer);
    e.preventDefault(); // Prevent the default behavior of "Enter" (like submitting a form)
}
});
