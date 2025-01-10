# Real-Time Search with Auto-Suggestions

## Repository Name
**real-time-search-autosuggestions**

---

## **Feature Overview**
This project implements a Real-Time Search with Auto-Suggestions feature that dynamically fetches and displays suggestions based on user input. The feature includes:
- Real-time search with dynamic dropdown suggestions.
- Highlighting of matching text in suggestions for better usability.
- Keyboard navigation support for suggestions (arrow keys and Enter).
- Friendly error handling and informative empty states.
- Fully responsive design for desktop and mobile devices.

---

## How to View the Project
### Live Demo
Visit the live website here:[ (https://harshjadhav84.github.io/real-time-search-autosuggestions/)](https://harshjadhav84.github.io/real-time-search-autosuggestions/)

## **How It Works**
1. **User Interaction**:
   - The user types a query into the search bar.
   - Suggestions are displayed dynamically based on the input.

2. **Dynamic Suggestions**:
   - Matching results are displayed in a dropdown beneath the search bar.
   - The matched portion of the text is highlighted.

3. **Keyboard Navigation**:
   - Users can navigate through the suggestions using the `ArrowUp` and `ArrowDown` keys and select a suggestion with the `Enter` key.

4. **Error and Empty States**:
   - If no matches are found, a "No results found!" message is displayed.
   - If an error occurs a user-friendly error message is shown.

---

## **How to Configure the Data Source** ##
### Using Mock Data
- The project uses a predefined array (`mockData`) in the `script.js` file as the data source.
- This is ideal for testing without connecting to a live API.

```
// Mock data array (currently used)
const mockData = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Zebra'
];

```

### Replacing Mock Data with a Real API (Example: Unsplash API)
- To use a real API instead of the mock data, follow these steps:
  - Step 1: Sign Up for an API Key at Unsplash
    - Go to the Unsplash Developer Portal.
    - Sign in or create an account if you don't have one.
    - Click Your Applications from the menu.
    - Click on New Application to create a new app.
    - Fill out the required details (name, description, etc.).
    - After you submit, you will be provided with an Access Key and a Secret Key. You only need the Access Key for making API requests.
    - Example Access Key: YOUR_ACCESS_KEY (Replace this with your actual key).
   
  - Step 2: Update Your JavaScript Code to Use Unsplash API
    - Now Replace the mock data fetching with the Unsplash API call means replace // Fetch suggestions from the Unsplash API based on the search query code to below code,
      ```
      // Fetch suggestions from the Unsplash API based on the search query
      async function fetchSuggestions(query) {
          try {
          suggestionsContainer.innerHTML = ''; // Clear the previous suggestions
          noResultsMessage.classList.add('d-none');
          errorMessage.classList.add('d-none');

        if (!query) return;

        if (!validateInput(query)) {
            return; // Stop further execution if the input is invalid
        }

        // Replace the mock data array with an API call
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=YOUR_ACCESS_KEY`);
        const data = await response.json(); // Parse the JSON response

        // Check if no results are returned
        if (data.results.length === 0) {
            noResultsMessage.classList.remove('d-none');
            return;
        }

        data.results.forEach((result, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = highlightMatch(result.alt_description, query); // Highlight matching text
            listItem.setAttribute('data-index', index);

            listItem.addEventListener('click', () => {
                searchBar.value = result.alt_description; // Set the selected result as the search input value
                suggestionsContainer.innerHTML = ''; // Clear suggestions
            });

            suggestionsContainer.appendChild(listItem); // Add the suggestion to the container
        });
       } catch (error) {
        errorMessage.classList.remove('d-none');
        console.error('Error fetching suggestions:', error);
       }
      }

      ```
      

## Local Setup
To run the project locally on your computer, follow these steps:

1. **Clone the Repository**:
   - Open your terminal or command prompt.
   - Clone this repository using the following command:
   ```bash
   git clone https://github.com/harshjadhav84/real-time-search-autosuggestions.git
   ```

2. **Navigate to the Project Directory**:
   - Change your working directory to the project folder:
   ```bash
   cd real-time-search-autosuggestions
   ```

3. **Open the Project in a Code Editor (Optional)**:
   - If you'd like to view or edit the code, open the project in your preferred code editor:
     ```bash
     code .  # For Visual Studio Code
     ```

4. **Run the Project**:
   - Open the `index.html` file in your web browser:
     - **Option 1**: Double-click the `index.html` file in your file explorer.
     - **Option 2**: Use the terminal:
       ```bash
       open index.html       # macOS
       start index.html      # Windows
       xdg-open index.html   # Linux
       ```
---

## **File Structure**
```
real-time-search-autosuggestions/
├── index.html       # Main HTML file
├── styles.css       # CSS file for styling
├── script.js        # JavaScript file for functionality
└── README.md        # Project documentation
```

---

## **Key Features and Technologies**
- **Technologies Used**: HTML, CSS, JavaScript, Bootstrap
- **Debouncing**: Reduces API calls while typing (300ms delay).
- **Responsive Design**: Ensures compatibility with all devices.
- **Error Handling**: Displays user-friendly messages for no results or network errors.

---

## **Testing**
1. Ensured the feature works on all major browsers (Chrome, Firefox, Safari, Edge).
2. Tested responsiveness on both desktop and mobile devices.
3. Validate performance with a large dataset (mock or real).

---
