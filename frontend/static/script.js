const fetchData = async () => {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('people-container')?.remove();
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error loading data.';
        document.body.appendChild(errorMessage);
    }
};

const displayData = (data) => {
    if (!document.getElementById('title')) {
        const title = document.createElement('h1');
        title.id = 'title';
        title.textContent = 'People and Their Pets';
        document.body.insertBefore(title, document.body.firstChild);
    }
    let container = document.getElementById('people-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'people-container';
        document.body.appendChild(container);
    }
    container.innerHTML = '';

    data.forEach(person => {
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
        petsList.textContent = '🐾 ';

        if (person.pets.length > 0) {
            person.pets.forEach(pet => {
                const petElement = document.createElement('div');
                petElement.className = 'pet-item';
                petElement.textContent = `${pet} `;
                petsList.appendChild(petElement);
            });
        } else {
            petsList.textContent = '❌ No pets';
        }
        personCard.appendChild(nameElement);
        personCard.appendChild(ageElement);
        personCard.appendChild(petsList);

        container.appendChild(personCard);
    });
};

const createForm = () => {
    const form = document.createElement('form');
    form.className = 'add-form';
    form.innerHTML = `
    <h2 class="form-title"> Add new</h2>
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Name" required>
    </div>
    <div class="form-group">
        <label for="age">Age</label>
        <input type="number" id="age" placeholder="Age" required>
    </div>
    <div class="form-group">
        <label for="pets">Pets</label>
        <input type="text" id="pets" placeholder="Pets" required>
    </div>
    <button type="submit">Add Person</button>
   `;

    form.addEventListener('submit', handleSubmit)
    document.body.appendChild(form);
}

const handleSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const pets = document.getElementById('pets').value
        .split(',')
        .map(p => p.trim())
        .filter(Boolean);

    const newPerson = { name, age, pets }

    try {
        const response = await fetch('/api/data/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newPerson)
        });

        if (!response.ok) throw new Error('Failed to add person');

        await fetchData();
        event.target.reset();
    } catch (error) {
        console.error('Error adding person:', error);
        alert('could not add new person.');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    createForm();
    fetchData();
});

