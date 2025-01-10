const searchBar = document.getElementById('search-bar');
const clearBtn = document.getElementById('clear-btn');
const suggestionsContainer = document.getElementById('suggestions-container');
const noResultsMessage = document.getElementById('no-results');
const errorMessage = document.getElementById('error-message');

let debounceTimeout;
let currentFocus = -1; // Track currently focused suggestion

// Mock API data
const mockData = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'zebra'
];

// Debounce function
function debounce(func, delay) {
    return (...args) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func(...args), delay);
    };
}

// Updated Validation Check for Special Characters
function validateInput(query) {
    const specialCharRegex = /[^a-zA-Z0-9\s]/; // Matches any non-alphanumeric character
    if (specialCharRegex.test(query)) {
        // Show special character error message
        errorMessage.textContent = "Please enter a valid input (no special characters allowed)";
        errorMessage.classList.remove('d-none');
        return false; // Invalid input
    }
    errorMessage.classList.add('d-none');
    return true; // Valid input
}

// Updated fetchSuggestions to include input validation
async function fetchSuggestions(query) {
    try {
        suggestionsContainer.innerHTML = '';
        noResultsMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');

        if (!query) return;

        if (!validateInput(query)) {
            return; // Stop further execution if the input is invalid
        }

        // Simulating an API call
        const results = mockData.filter(item => item.toLowerCase().includes(query.toLowerCase()));

        if (results.length === 0) {
            noResultsMessage.classList.remove('d-none');
            return;
        }

        results.forEach((result, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = highlightMatch(result, query);
            listItem.setAttribute('data-index', index);

            listItem.addEventListener('click', () => {
                searchBar.value = result;
                suggestionsContainer.innerHTML = '';
            });

            suggestionsContainer.appendChild(listItem);
        });
    } catch (error) {
        errorMessage.classList.remove('d-none');
        console.error('Error fetching suggestions:', error);
    }
}


// Highlight matching text
function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
    const items = suggestionsContainer.getElementsByTagName('li');
    if (items.length === 0) return;

    if (event.key === 'ArrowDown') {
        currentFocus++;
        if (currentFocus >= items.length) currentFocus = 0;
        updateFocus(items);
    } else if (event.key === 'ArrowUp') {
        currentFocus--;
        if (currentFocus < 0) currentFocus = items.length - 1;
        updateFocus(items);
    } else if (event.key === 'Enter') {
        event.preventDefault();
        if (currentFocus > -1) {
            items[currentFocus].click();
        }
    }
}

// Update focused suggestion
function updateFocus(items) {
    Array.from(items).forEach(item => item.classList.remove('active'));
    if (currentFocus > -1) {
        items[currentFocus].classList.add('active');
        items[currentFocus].scrollIntoView({ block: 'nearest' });
    }
}

// Reset focus when input changes
searchBar.addEventListener('input', debounce((event) => {
    const query = event.target.value.trim();
    currentFocus = -1; // Reset focus
    fetchSuggestions(query);
}, 300));

searchBar.addEventListener('keydown', handleKeyboardNavigation);

clearBtn.addEventListener('click', () => {
    searchBar.value = '';
    suggestionsContainer.innerHTML = '';
    noResultsMessage.classList.add('d-none');
    errorMessage.classList.add('d-none');
    currentFocus = -1; // Reset focus
});
