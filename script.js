(() => {
    
        console.log('Hello');
        const app = document.getElementById('app'),
        body = document.querySelector('body'),
        header = document.createElement('h1'),
        modal = document.createElement('div');

        header.textContent = 'Awesome Startup Employee Directory';

        app.appendChild(header);

        fetch('https://randomuser.me/api/?results=12')
            .then(response => response.json())
            .then(data => {
                const employees = data.results
                console.log(employees);
                console.log(listRepos(employees));
                app.appendChild(listRepos(employees));
            })
            .catch(error => console.log('error is', error));
        function createModalElement(element, className, attr, content) {
            const el = document.createElement(element);
            el.classList.add(className);
            el[attr] = content;
            return el;
        }

        function buildModal() {
            const overlay = createModalElement('div', 'overlay'),
            modal = createModalElement('div', 'modal'),
            modalClose = createModalElement('div', 'modal-close'),
            modalAvatar = createModalElement('img', 'modal-avatar', 'src', 'http://via.placeholder.com/170x170'),
            modalName = createModalElement('p', 'modal-name', 'textContent', 'name'),
            modalEmail = createModalElement('p', 'modal-email', 'textContent', 'email'),
            modalCity = createModalElement('p', 'modal-city', 'textContent', 'city'),
            modalDivider = createModalElement('div', 'modal-divider'),
            modalPhoneNumber = createModalElement('p', 'modal-number', 'textContent', '(000)-000-0000'),
            modalAddress = createModalElement('p', 'modal-address', 'textContent', 'address'),
            modalBirthday = createModalElement('p', 'modal-birthday', 'textContent', 'birthday');

            modalClose.classList.add('fa', 'fa-times', 'fa-2x');
    
            
            modal.appendChild(modalClose);
            modal.appendChild(modalAvatar);
            modal.appendChild(modalName);
            modal.appendChild(modalEmail);
            modal.appendChild(modalCity);
            modal.appendChild(modalDivider);
            modal.appendChild(modalPhoneNumber);
            modal.appendChild(modalAddress);
            modal.appendChild(modalBirthday);
            overlay.appendChild(modal);
            return overlay; 
        } 

        function showModal() {
            body.appendChild(buildModal());
        }

        function createDiv(className, content) {
            const div = document.createElement('div');
            div.classList.add(`employee-${className}`);
            div.textContent = content;
            return div;
        }

        function listRepos(employees) {
            const employeeList = document.createElement('ul');
            employeeList.id = 'employee-list';
            employeeList.classList.add('employee-list');
            employees.forEach(employee => {
                const li = document.createElement('li'),
                fullName = employee.name.first + ' ' + employee.name.last;
                    img = document.createElement('img'),
                    infoSpan = document.createElement('span'),
                    nameDiv = createDiv('name', fullName);
                    emailDiv = createDiv('email', employee.email);
                    cityDiv = createDiv('city', employee.location.city);
                    img.classList = 'employee-img';
                img.src = employee.picture.large;
                infoSpan.classList.add('employee-info');
                infoSpan.appendChild(nameDiv);
                infoSpan.appendChild(emailDiv);
                infoSpan.appendChild(cityDiv);
                li.appendChild(img);
                li.appendChild(infoSpan);
                employeeList.appendChild(li);
                // console.log(nameDiv);
                // console.log(emailDiv);
                // console.log(cityDiv);
            });
            return employeeList;
        }



  
        showModal();
})()