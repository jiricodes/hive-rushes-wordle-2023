const gridContainer = document.querySelector('.grid-container');
let selectedBox = null;
var isItValid;

const boxElements = document.querySelectorAll('.box');
const rowContainers = document.querySelectorAll('.grid-row');
let keyboardButtons;

async function sendRowData(rowContainer) {
    const boxElementsInRow = rowContainer.querySelectorAll('.box');
    const rowData = [];

    boxElementsInRow.forEach((box) => {
        const input = box.querySelector('input');
        const value = input.value.toUpperCase();
        rowData.push(value);
    });

    // Wait for the response from the server using await
    const validRow = await sendRowDataToServer(rowData, rowContainer);
    console.log("validRow is: " + validRow);

    return validRow;
}

async function sendRowDataToServer(rowData, rowContainer) {
    try {
        const response = await fetch('/api/v1/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guess: rowData }),
        });

        const data = await response.json();
        console.log(data);
        updateBoxes(rowContainer, data.valid, data.state, data.stage);
        return data.valid;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// Rest of the code remains the same

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

function updateBoxes(rowContainer, isValid, stringsFromPython, stage) {
    // Get all the boxes in the row
    const boxElementsInRow = rowContainer.querySelectorAll('.box');
	console.log(boxElementsInRow);
    // Loop through the box elements and apply the colors based on the numbers received
    if (isValid) {
		const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'none';
        // Loop through the box elements and apply the colors based on the numbers received
        boxElementsInRow.forEach((box, index) => {
            const string = stringsFromPython[index];
            if (string === 'yellow') {
                box.style.backgroundColor = 'rgb(177, 159, 77)';
            } else if (string === 'green') {
                box.style.backgroundColor = 'rgb(97, 139, 85)';
            } else if (string === 'gray') {
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

async function moveToNextRow(currentRowContainer) {
	const nextRowContainer = currentRowContainer.nextElementSibling;
	let validRow;
	if (nextRowContainer) {
		validRow = await sendRowData(currentRowContainer);
		console.log("now we are cheking if row is valid " + validRow);
		if (validRow == true) {
		selectedBox.classList.remove('selected-box');
		selectedBox = nextRowContainer.querySelector('.box');
		selectedBox.classList.add('selected-box');
		selectedBox.querySelector('input').focus();}
	} else {
		if (isRowFilled(currentRowContainer)) {
			sendRowData(currentRowContainer);
		}
	}
}

async function moveToNextRowIfFilled(currentRowContainer) {
	const boxElementsInRow = currentRowContainer.querySelectorAll('.box');
	const lastBox = boxElementsInRow[boxElementsInRow.length - 1];
	if (isRowFilled(currentRowContainer) && lastBox.classList.contains('selected-box')) {
		await moveToNextRow(currentRowContainer);
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
