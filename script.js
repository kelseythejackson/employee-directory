(() => {
    
        console.log('Hello');
        const app = document.getElementById('app'),
        header = document.createElement('h1');

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



  

})()