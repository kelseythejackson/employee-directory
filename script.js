(()=>{
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Hello');
        let app = document.getElementById('app');
        fetch('https://randomuser.me/api/?results=12')
        .then(response => response.json())
        .then(data => {
            const employees = data.results
            console.log(employees);
             console.log(listRepos(app, employees));
            app.appendChild(listRepos(app, employees));
        })
        .catch(error => console.log('error is', error)) ;
    
        
    
        function listRepos(parentElement, employees) {
            const employeeList = document.createElement('ul');
            employeeList.id = 'employee-list';
            employees.forEach(employee => {
                const li = document.createElement('li'),
                img = document.createElement('img'),
                infoSpan = document.createElement('span');
                img.src = employee.picture.large;
                // console.log(employee.picture.large)
                li.appendChild(img);
                li.appendChild(infoSpan);
                employeeList.appendChild(li);
                
            });
        

            return employeeList;
            
        }

        
        
    });
    
})()