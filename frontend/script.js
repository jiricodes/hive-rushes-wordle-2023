const gridContainer = document.querySelector('.grid-container');
let selectedBox = null;

const boxElements = document.querySelectorAll('.box');
const rowContainers = document.querySelectorAll('.grid-row');
let keyboardButtons;

// function handleRecivedData() {
	
// }

// function sendRowDataToServer(rowData) {
//     fetch('localhost:6969/guess', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ guess: rowData }),
//     })
//     .then((response) => response.json())
// 	.then((data) => {
// 		console.log(data);

// 	// check the validityty of the row
// 		const isValid = data.valid;
// 		//status for each box
// 		const numbersFromPython = data.state;
	
// 		// Get the row container (e.g., assuming you have a selectedRowContainer variable)
// 		// Replace this with the actual row container element
// 		const selectedRowContainer = selectedBox.closest('.grid-row');
	
// 		// Get all the boxes in the row
// 		const boxElementsInRow = selectedRowContainer.querySelectorAll('.box');
// 		const boxElementsInRow = rowData;
// 		// Loop through the box elements and apply the colors based on the numbers received
// 		if (isValid) {
// 			const errorMessage = document.getElementById('error-message');
// 			errorMessage.style.display = 'none';
// 			// Loop through the box elements and apply the colors based on the numbers received
// 			boxElementsInRow.forEach((box, index) => {
// 			  const number = numbersFromPython[index];
// 			  if (number === 0) {
// 				box.style.backgroundColor = 'yellow';
// 			  } else if (number === 1) {
// 				box.style.backgroundColor = 'green';
// 			  } else if (number === -1) {
// 				box.style.backgroundColor = 'gray';
// 			  }
// 			});
// 		  } else {
// 			const errorMessage = document.getElementById('error-message');
// 			errorMessage.style.display = 'block';
// 			console.log('Row is not valid. You need to modify the current row.');
// 		  }
// 	  })
// 	  .catch((error) => {
// 		console.error('Error:', error);
// 	  });
// 	  return (true);
// 	}
	
// sendRowDataToServer(rowData){
// 	console.log(rowData);
// }
// Test function to simulate server response and update the boxes
function updateBoxes(rowContainer, isValid, numbersFromPython, stage) {
    // Get all the boxes in the row
    const boxElementsInRow = rowContainer.querySelectorAll('.box');

    // Loop through the box elements and apply the colors based on the numbers received
    if (isValid) {
		const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'none';
        // Loop through the box elements and apply the colors based on the numbers received
        boxElementsInRow.forEach((box, index) => {
            const number = numbersFromPython[index];
            if (number === 0) {
                box.style.backgroundColor = 'rgb(177, 159, 77)';
            } else if (number === 1) {
                box.style.backgroundColor = 'rgb(97, 139, 85)';
            } else if (number === -1) {
                box.style.backgroundColor = 'dimgray';
            }
        });
    } else {
        // Row is not valid, you can show an error message or take appropriate action
		const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block';
        console.log('Row is not valid. You need to modify the current row.');
    }
	if (stage == "win") {
		const winMessage = document.getElementById('win-message');
        winMessage.style.display = 'block';
        console.log('Game won');
	}
	else if (stage == "loss") {
		const lossMessage = document.getElementById('loss-message');
        lossMessage.style.display = 'block';
        console.log('Game lost');
	}
	else {
		const winMessage = document.getElementById('win-message');
		const lossMessage = document.getElementById('loss-message');
        winMessage.style.display = 'none';
        lossMessage.style.display = 'none';
	}
}

function testSendRowDataToServer(rowData) {
    // Simulated server response data (replace this with your test data)
    const testData = {
        valid: false,
        state: [1, 1, 1, 1, 1], // Sample numbers received from the server (yellow, green, gray, yellow, green)
		stage: "win"
    };

    // Simulate server response delay (you can remove this in production)
    setTimeout(() => {
        console.log('Simulated server response:', testData);

        // Check the validity of the row
        const isValid = testData.valid;

        // Get the row container (e.g., assuming you have a selectedRowContainer variable)
        // Replace this with the actual row container element
        const selectedRowContainer = selectedBox.closest('.grid-row');

        // Call the function to update the boxes with the received data
        updateBoxes(rowData, isValid, testData.state, testData.stage);
    }, 10); // Simulated server response delay in milliseconds (1 second)
	return true;
}

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

//turn the row data to a json:able form
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

//check if the row is filled
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
//starts the next row
function moveToNextRow(currentRowContainer) {
	const nextRowContainer = currentRowContainer.nextElementSibling;
	let validRow;
	if (nextRowContainer) {
		validRow = testSendRowDataToServer(currentRowContainer);
		if (validRow == true) {
		selectedBox.classList.remove('selected-box');
		selectedBox = nextRowContainer.querySelector('.box');
		selectedBox.classList.add('selected-box');
		selectedBox.querySelector('input').focus();}
	} else {
		if (isRowFilled(currentRowContainer)) {
			testSendRowDataToServer(currentRowContainer);
		}
	}
}
//validity tester
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

//keyboard events
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