const getUsers = (e) => {
    e.preventDefault();

    const usersNumber = document.querySelector('[name = "users-number"]').value;
    const usersGender = document.querySelector('[name = "gender"]').value;
    const userNationality = document.querySelector("[name = 'nat']").value

    const url = `https://randomuser.me/api/?results=${usersNumber}&gender=${usersGender === "both" ? "male,female":usersGender}&nat=${userNationality}`
    fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw Error('This is not status 200')
            } else {
                return response.json()
            }

        })
        .then(json => showUsers(json.results))
        .catch(err => console.log(err))


}

const showUsers = (users) => {
    const resultArea = document.querySelector('.user-list');
    resultArea.textContent = "";
    users.forEach(user => {
        const item = document.createElement('div');
        item.className = "user";
        item.innerHTML = `<div class="user__data">
        <strong>
        <div class="user__name">${user.name.title} ${user.name.first} ${user.name.last.toUpperCase()}</div></strong> 
        <div class="user__age">age: ${user.dob.age}</div>
        <div class="user__phone">Phone: ${user.phone} </div> 
        <div class = "user__country">City and Country: ${user.location.city} ${user.nat}</div>
        </div>
        <img class = "user__image" src=${user.picture.medium}>`
        resultArea.appendChild(item);

    });
}

document.querySelector('.generator').addEventListener('submit', getUsers);