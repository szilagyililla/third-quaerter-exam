function createStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .person-card {
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            background-color: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: transform 0.2s ease-in-out;
        }
        .person-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .person-name {
            font-size: 1.4em;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 8px;
        }
        .person-age {
            color: #7f8c8d;
            font-size: 1.1em;
            margin: 8px 0;
        }
        .pets-list {
            margin-top: 15px;
        }
        .pet-item {
            display: inline-block;
            background-color: #3498db;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            margin-right: 8px;
            margin-bottom: 8px;
            font-size: 0.9em;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .pet-item:hover {
            background-color: #2980b9;
            transform: scale(1.05);
        }
        .form-container {
            margin-top: 40px;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .add-form {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 12px;
            border: 1px solid #e9ecef;
        }
        .form-title {
            color: #2c3e50;
            margin-bottom: 25px;
            font-size: 1.8em;
            text-align: center;
            font-weight: 600;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 600;
            font-size: 1.1em;
        }
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1em;
            box-sizing: border-box;
            transition: all 0.3s ease;
            background-color: white;
        }
        .form-group input:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 8px rgba(52,152,219,0.3);
        }
        .form-group input::placeholder {
            color: #95a5a6;
        }
        .submit-btn {
            background-color: #3498db;
            color: white;
            padding: 14px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.1em;
            font-weight: 600;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .submit-btn:hover {
            background-color: #2980b9;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .submit-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(styleElement);
}

function createPageStructure() {
    // Create title
    const title = document.createElement('h1');
    title.textContent = '👥 People and Their Pets 🐾';
    document.body.appendChild(title);

    // Create container for people
    const container = document.createElement('div');
    container.id = 'people-container';
    document.body.appendChild(container);

    // Create form container
    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    document.body.appendChild(formContainer);

    // Create form
    const form = document.createElement('form');
    form.className = 'add-form';
    form.innerHTML = `
        <h2 class="form-title">➕ Add New Person</h2>
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" required>
        </div>
        <div class="form-group">
            <label for="age">Age:</label>
            <input type="number" id="age" required min="0">
        </div>
        <div class="form-group">
            <label for="pets">Pets (comma-separated):</label>
            <input type="text" id="pets" placeholder="e.g., Cirmi, Kormi">
        </div>
        <button type="submit" class="submit-btn">Add Person</button>
    `;

    form.addEventListener('submit', handleFormSubmit);
    formContainer.appendChild(form);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const petsInput = document.getElementById('pets').value;
    const pets = petsInput ? petsInput.split(',').map(pet => pet.trim()) : [];

    const newPerson = {
        name,
        age,
        pets
    };

    try {
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newPerson)
        });

        if (response.ok) {
            // Clear form
            event.target.reset();
            // Show success message
            alert('Person added successfully!');
            // Refresh the data
            fetchData();
        } else {
            const errorData = await response.json();
            alert(`Error adding person: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding person. Please try again.');
    }
}

async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('people-container').innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}

function displayData(people) {
    const container = document.getElementById('people-container');
    if (!container) return; // Guard clause in case container doesn't exist
    
    // Clear only the people container
    container.innerHTML = '';
    
    people.forEach(person => {
        const personCard = document.createElement('div');
        personCard.className = 'person-card';
        
        const nameElement = document.createElement('div');
        nameElement.className = 'person-name';
        nameElement.textContent = `👤 ${person.name}`;
        
        const ageElement = document.createElement('div');
        ageElement.className = 'person-age';
        ageElement.textContent = `🎂 Age: ${person.age}`;
        
        const petsList = document.createElement('div');
        petsList.className = 'pets-list';
        
        if (person.pets.length > 0) {
            petsList.textContent = `🐾 Pets: ${person.pets.join(', ')}`;
        } else {
            petsList.textContent = '❌ No pets';
        }
        
        personCard.appendChild(nameElement);
        personCard.appendChild(ageElement);
        personCard.appendChild(petsList);
        
        container.appendChild(personCard);
    });
}

// Initialize the page
function init() {
    createStyles();
    createPageStructure();
    fetchData();
}

// Start the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 