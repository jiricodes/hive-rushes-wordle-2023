const gridContainer = document.querySelector('.grid-container');
let selectedBox = null;

const boxElements = document.querySelectorAll('.box');
const rowContainers = document.querySelectorAll('.grid-row');
let keyboardButtons;
 function sendRowDataToServer(rowData) {
   fetch('/api/v1/guess', {
 	method: 'POST',
 	headers: {
 	  'Content-Type': 'application/json',
 	},
 	body: JSON.stringify({ guess: rowData }),
   })
 	.then((response) => response.json())
 	.then((data) => {
 	  console.log(data);
 	  // Update the front-end based on the response (e.g., set status for each box)
 	})
 	.catch((error) => {
 	  console.error('Error:', error);
 	});
 }
//function sendRowDataToServer(rowData){
//	console.log(rowData);
//}

function focusOnGameBoard() {
	gridContainer.focus();
  }
// Starting the game
function focusOnFirstBox() {
	const firstBox = boxElements[0];
	selectedBox = firstBox;
	selectedBox.classList.add('selected-box');
	selectedBox.querySelector('input').focus(); // Set focus on the input element
}

document.addEventListener('DOMContentLoaded', () => {
	focusOnFirstBox(); // Call this function to set the focus on the first box
	
	// Add event listeners to the keyboard buttons
	keyboardButtons = document.querySelectorAll('.keyboard button');
	keyboardButtons.forEach((button) => {
		button.addEventListener('click', () => {
		  const letter = button.getAttribute('data-letter');
		  if (selectedBox) {
			const input = selectedBox.querySelector('input');
			input.value = letter.toUpperCase();
			input.previousElementSibling.textContent = letter.toUpperCase();
	
			const currentIndex = Array.from(boxElements).indexOf(selectedBox);
			const nextIndex = currentIndex + 1;
	
			if (nextIndex < boxElements.length && !isRowFilled(selectedBox.closest('.grid-row'))) {
			  selectedBox.classList.remove('selected-box');
			  selectedBox = boxElements[nextIndex];
			  selectedBox.classList.add('selected-box');
			  selectedBox.querySelector('input').focus();
			}
		  }
	
		  // After handling web keyboard input, focus back on the game board
		  button.blur();
		  focusOnGameBoard();
		  // Blur the web keyboard button to return focus to the game board
		});
	  });
	
	// Add event listener to the delete button
	const deleteButton = document.getElementById('delete-button');
	deleteButton.addEventListener('click', () => {
		const input = selectedBox.querySelector('input');
		input.value = '';
		input.previousElementSibling.textContent = '';
		
		const currentIndex = Array.from(boxElements).indexOf(selectedBox);
		const previousIndex = currentIndex - 1;
		
		if (previousIndex >= 0 && currentIndex % 5 !== 0) {
			selectedBox.classList.remove('selected-box');
			selectedBox = boxElements[previousIndex];
			selectedBox.classList.add('selected-box');
			selectedBox.querySelector('input').focus();
		}
	});
});

function sendRowData(rowContainer) {
	const boxElementsInRow = rowContainer.querySelectorAll('.box');
	const rowData = [];
	
	boxElementsInRow.forEach((box) => {
		const input = box.querySelector('input');
		const value = input.value.toUpperCase();
		rowData.push(value);
	});
	
	sendRowDataToServer(rowData);
}

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

function moveToNextRow(currentRowContainer) {
	const nextRowContainer = currentRowContainer.nextElementSibling;
	if (nextRowContainer) {
		sendRowData(currentRowContainer);
		selectedBox.classList.remove('selected-box');
		selectedBox = nextRowContainer.querySelector('.box');
		selectedBox.classList.add('selected-box');
		selectedBox.querySelector('input').focus();
	} else {
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

// Click event for each box and first box in each row using event delegation
function handleMouseOut(box) {
  if (box !== selectedBox) {
	box.classList.remove('hover');
  }
}
function handleMouseOver(box) {
	if (box !== selectedBox) {
	  box.classList.add('hover');
	}
  }
  
gridContainer.addEventListener('click', (e) => {
	const target = e.target;
	if (target.classList.contains('box')) {
		handleBoxClick(target);
	} else if (target.classList.contains('first-box')) {
		handleFirstBoxClick(target);
	}
});

// Mouseover and Mouseout events for each box
boxElements.forEach((box) => {
  box.addEventListener('mouseover', () => {
	handleMouseOver(box);
  });

  box.addEventListener('mouseout', () => {
	handleMouseOut(box);
  });
});

gridContainer.addEventListener('keydown', (e) => {
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
	} else if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
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
	} else if (e.key === 'Enter') {
		// Check if the current row is filled before moving to the next row
		const currentRowContainer = selectedBox.closest('.grid-row');
		moveToNextRowIfFilled(currentRowContainer);
		e.preventDefault(); // Prevent the default behavior of "Enter" (like submitting a form)
	}
});

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
