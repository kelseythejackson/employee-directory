(() => {
    // Get the elements
    const app = document.getElementById('app'),
        body = document.querySelector('body'),
        header = document.createElement('h1');

    header.textContent = 'Awesome Startup Employee Directory'; // Populate the header
    const filterInput = createEl('input', 'filter-input', 'type', 'text'); // create the input
    filterInput.placeholder = 'filter by name';

    fetch('https://randomuser.me/api/?results=12') // grab 12 employees from the api
        .then(response => response.json())
        .then(data => {
            const employees = data.results
            app.appendChild(header); // adds the header to the app div
            app.appendChild(filterInput); // adds the input to the app div
            app.appendChild(listEmployees(employees)); // adds the employees to the app div
            setTimeout(() => { //puts a focus on the input in .75 seconds
                filterInput.focus();
            }, 750);

            const employeeList = app.children[2].children; // gets the employees in the DOM

            filterInput.addEventListener('keyup', () => {// filter functionality
                for (let i = 0; i < employeeList.length; i++) {
                    const employee = employeeList[i];
                    const newList = [];

                    if (employee.dataset.name.includes(filterInput.value.toLowerCase())) {
                        employee.classList.remove('hide');

                    } else {
                        employee.classList.add('hide');
                    }
                }
            });
 
            for (let i = 0; i < employeeList.length; i++) { // iterates over the the employees list
                const employee = employeeList[i];

                employee.addEventListener('click', () => { // adds a click handler to each employee
                    buildModal(); // appends the modal to the DOM
                    const overLay = document.querySelector('.overlay'); // gets the overlay
                    overLay.classList.add('show'); // shows the the Modal
                    activateClose(); // removes the modal from the DOM

                    // Gets the left and Right arrows
                    const leftArrow = document.querySelector('.left');
                    const rightArrow = document.querySelector('.right');
                    
                    employee.classList.add('current'); //Adds the class of current to the clicked employee

                    leftArrow.addEventListener('click', () => { //cycles through the employees and from the left
                        const modalList = document.querySelector('.modal-list').children;
                        for (let i = 0; i < modalList.length; i++) {
                            const element = modalList[i];
                            if (!element.previousElementSibling && element.classList.contains('current')) {
                                element.parentNode.lastElementChild.classList.add('current');
                                element.classList.remove('current');
                                break;
                            } else if (element.previousElementSibling && element.classList.contains('current')) {
                                element.previousElementSibling.classList.add('current');
                                element.classList.remove('current');
                                break;
                            }
                        }
                    });
                    rightArrow.addEventListener('click', () => { //cycles through the employees and from the left
                        const modalList = document.querySelector('.modal-list').children;
                        for (let i = 0; i < modalList.length; i++) {
                            const element = modalList[i];
                            if (element.nextElementSibling && element.classList.contains('current')) {
                                element.classList.remove('current');
                                element.nextElementSibling.classList.add('current');
                                element.parentNode.appendChild(element.parentNode.removeChild(element.parentNode.firstElementChild));
                                break;
                            } else {
                                element.classList.remove('current');
                                element.parentNode.firstElementChild.classList.add('current');
                            }
                        }

                    });
                    function buildModal() {// Creates the modal and appends it to the DOM
                        const overlay = createEl('div', 'overlay'),
                            modal = createEl('div', 'modal'),
                            modalClose = createEl('div', 'modal-close'),
                            modalLeftArrow = createEl('div', 'modal-arrow'),
                            modalRightArrow = createEl('div', 'modal-arrow');

                        modalLeftArrow.classList.add('left', 'fa', 'fa-caret-left', 'fa-3x');
                        modalRightArrow.classList.add('right', 'fa', 'fa-caret-right', 'fa-3x');
                        modalClose.classList.add('fa', 'fa-times', 'fa-2x');

                        modal.appendChild(modalClose);
                        modal.appendChild(listEmployees(employees, true)); // appends the employee list to the modal
                        const modalList = modal.children[1].children;
                        for (let i = 0; i < modalList.length; i++) {
                            const modalDetail = modalList[i];
                            if (employee.dataset.name === modalDetail.dataset.name) { // shows the clicked employee in the modal
                                modalDetail.classList.add('current')
                            }
                        }

                        modal.appendChild(modalLeftArrow);
                        modal.appendChild(modalRightArrow);
                        overlay.appendChild(modal);
                        body.appendChild(overlay);
                    }
                });
            }

            function activateClose() { // Closes the modal
                const close = document.querySelector('.modal-close');
                close.addEventListener('click', () => {
                    body.removeChild(body.lastElementChild);
                });
            }
        })
        .catch(error => console.log('error is', error));

    function createEl(element, className, attr, content) { // Creates an element with a class, attribute and content for the attribute
        const el = document.createElement(element);
        el.classList.add(className);
        el[attr] = content;
        return el;
    }

    function createDiv(className, content) { // creates a div with class name and content
        const div = document.createElement('div');
        div.classList.add(`employee-${className}`);
        div.textContent = content;
        return div;
    }

    function listEmployees(employees, detail = false) { // builds the employee list
        const employeeList = document.createElement('ul');

        if (detail) {
            employeeList.id = 'modal-list';
            employeeList.classList.add('modal-list');
        } else {
            employeeList.id = 'employee-list';
            employeeList.classList.add('employee-list');
        }

        employees.forEach((employee) => {

            const li = document.createElement('li'),
                dob = new Date(employee.dob),
                infoSpan = document.createElement('span'),
                fullName = employee.name.first + ' ' + employee.name.last,
                employeeAvatar = createEl('img', 'employee-img', 'src', employee.picture.large),
                employeeName = createEl('div', 'employee-name', 'textContent', fullName),
                employeeEmail = createEl('div', 'employee-email', 'textContent', employee.email),
                employeeCity = createEl('div', 'employee-city', 'textContent', employee.location.city),
                employeeDivider = createEl('div', 'employee-divider'),
                employeePhoneNumber = createEl('div', 'employee-number', 'textContent', employee.cell),
                employeeAddress = createEl('div', 'employee-address', 'textContent', `${employee.location.street}, ${employee.location.state}, ${employee.location.postcode} `),
                employeeBirthday = createEl('div', 'employee-birthday', 'textContent', `${dob.getDate()}/${dob.getDay()}/${dob.getFullYear()}`);
            if (detail) {
                infoSpan.classList.add('modal-info');
            } else {
                infoSpan.classList.add('employee-info');
            }

            infoSpan.appendChild(employeeName);
            infoSpan.appendChild(employeeEmail);
            infoSpan.appendChild(employeeCity);
            if (detail) {
                infoSpan.appendChild(employeeDivider);
                infoSpan.appendChild(employeePhoneNumber);
                infoSpan.appendChild(employeeAddress);
                infoSpan.appendChild(employeeBirthday);
            }
            li.appendChild(employeeAvatar);
            li.appendChild(infoSpan);
            li.dataset.name = fullName;
            employeeList.appendChild(li);
        });
        return employeeList;
    }
})()