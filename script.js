// time displayed on the screen
function startClock() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    let time = hours + ":" + minutes + ":" + seconds;
    setTimeout("startClock()", 500);

    document.getElementById('localTime').innerHTML = time;
};

// declare variable for searchButton
let searchButton = document.getElementById('searchButton');

// add event lister for search button
searchButton.addEventListener('click', function () {
    let searchItem = document.getElementById('search').value;
    // execute retrieveData function
    retrieveData(searchItem);
});

// function to retrieve the user input data
function retrieveData(searchItem) {
    console.log(searchItem);
    // data fetch API with key d33cb5f2
    let url = "http://www.omdbapi.com/?apikey=d33cb5f2&s=";
    // fetch(url).then parse data from API
    fetch(url + searchItem)
        .then(response => response.json())
        .then(data => {
            // console.log(data.Search);
            getSearch(data)
            // showModal(data)
        });
};

// funtion to display the recieved search results
function getSearch(data) {
    data.Search.forEach(element => {
        document.getElementById("display").innerHTML +=
            `<div class="col-md-4 col-sm-6 d-inline-block p-s-3"><div class="bg-dark text-white p-auto text-center p-2 m-1 rounded-3 h-100"><h6 class="text-wrap">${element.Title}</h6><img class="img-fluid" src="${element.Poster}"><h5>(${element.Year})</h5>
        <button data-bs-toggle="modal" data-bs-target="#myModal" class="btn btn-light" onClick="getDetails('${element.imdbID}')">Details</button><br></div></div>`
    });
};

// function to display the details of the search results in the modal
function getDetails(id) {
    let modal = document.getElementById("myModal");
    let url = "http://www.omdbapi.com/?apikey=d33cb5f2&plot=full&i=";
    // fetch(url) and innerHTML the details in a modal window
    fetch(url + id)
        .then(response => response.json())
        .then(data => {
            console.log(data.Plot, data.Actors, data.Released);
            modal.style.display = "block";
            document.getElementById("myModal").innerHTML +=
                `<div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">            
                        <h4 class="modal-title d-inline-block m-auto">${data.Title}</h4>
                        </div>
                        <div class="modal-body p-md-5 p-sm-4">
                            <p><b>Plot: </b></p>
                            <p>${data.Plot}</p>
                            <p><b>Actors: </b></p>
                            <p>${data.Actors}</p>
                            <h5><b>Release date: </b>${data.Released}</h5>
                        </div>
                    </div>
                </div>`
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    location.reload();
                }
            }
        });
}

// function to toggle dark mode
function changeStyle() {
    let element = document.body;
    element.classList.toggle("dark-mode");
}
// variable for logout button/ binding with id
let logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', function () {
    // clear the local storage
    localStorage.clear();
    // clear the session storage
    sessionStorage.clear();
    // redirect to the login page
    window.location.href = 'login_nepflix.html';
});

let local = JSON.parse(localStorage.getItem('loginObject'));
let session = JSON.parse(sessionStorage.getItem('loginObject'));

if (local == null && session == null) {
    window.location.href = 'login_nepflix.html';
}

let userinfo = document.getElementById('userinfo');
userinfo.innerHTML = local ? local.username : session.username;
