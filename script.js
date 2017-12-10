(() => {
        console.log('Hello');
        const app = document.getElementById('app'),
        body = document.querySelector('body'),
        header = document.createElement('h1'),
        modal = document.createElement('div');

        header.textContent = 'Awesome Startup Employee Directory';
        const filterInput = createEl('input', 'filter-input', 'type', 'text');
        filterInput.placeholder = 'filter by name';
        console.log(filterInput);
 
        

        fetch('https://randomuser.me/api/?results=12')
            .then(response => response.json())
            .then(data => {
                const employees = data.results
                console.log(employees);
                console.log(listRepos(employees));
                app.appendChild(header);
                app.appendChild(filterInput);
                app.appendChild(listRepos(employees));
                setTimeout(() => {
                    filterInput.focus();  
                }, 750);
                

                const employeeList = app.children[2].children;

                for (let i = 0; i < employeeList.length; i++) {
                    
                    const employee = employeeList[i];
                    
                    employee.addEventListener('click', () => {
                        buildModal(employee.dataset.avatar, employee.dataset.name, employee.dataset.email, employee.dataset.city, employee.dataset.cell, employee.dataset.address, employee.dataset.dob);
                        const overLay = document.querySelector('.overlay');
                        overLay.classList.add('show');
                        activateClose();
                    });
                }
                function activateClose() {
                    const close = document.querySelector('.modal-close');
                    close.addEventListener('click', () => {
                        body.removeChild(body.lastElementChild);
                    });
                }
                
            })
            .catch(error => console.log('error is', error));
        function createEl(element, className, attr, content) {
            const el = document.createElement(element);
            el.classList.add(className);
            el[attr] = content;
            return el;
        }

        function buildModal(avatar, name, email, city, cell, address, dob) {
            const overlay = createEl('div', 'overlay'),
            modal = createEl('div', 'modal'),
            modalClose = createEl('div', 'modal-close'),
            modalAvatar = createEl('img', 'modal-avatar', 'src', avatar),
            modalName = createEl('p', 'modal-name', 'textContent', name),
            modalEmail = createEl('p', 'modal-email', 'textContent', email),
            modalCity = createEl('p', 'modal-city', 'textContent', city),
            modalDivider = createEl('div', 'modal-divider'),
            modalPhoneNumber = createEl('p', 'modal-number', 'textContent', cell),
            modalAddress = createEl('p', 'modal-address', 'textContent', address),
            modalBirthday = createEl('p', 'modal-birthday', 'textContent', `Birthday: ${dob}`);

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
            body.appendChild(overlay);
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
                    img.classList = 'employee-img',
                    dob = new Date(employee.dob);
                li.dataset.avatar = employee.picture.large;
                li.dataset.name = employee.name.first + ' ' + employee.name.last;
                li.dataset.email = employee.email; 
                li.dataset.city = employee.location.city;
                li.dataset.cell = employee.cell;
                li.dataset.address = employee.location.street + ', ' + employee.location.state + ', ' + employee.location.postcode;
                li.dataset.dob = `${dob.getDate()}/${dob.getDay()}/${dob.getFullYear()}`;
                img.src = employee.picture.large;
                infoSpan.classList.add('employee-info');
                infoSpan.appendChild(nameDiv);
                infoSpan.appendChild(emailDiv);
                infoSpan.appendChild(cityDiv);
                li.appendChild(img);
                li.appendChild(infoSpan);
                employeeList.appendChild(li);
            });
            return employeeList;
        }



  
        
})()