import axios from "axios";
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

// const followersArray = [tetondan, dustinmyers, justsml];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
const cards = document.querySelector(".cards");

function gitCardMaker(user) {
  //destructuring
  // Instantiating the elements
  const card = document.createElement("div");
  const gitImg = document.createElement("img");
  const cardInfo = document.createElement("div");
  const gitName = document.createElement("h3");
  const gitUserName = document.createElement("p");
  const gitLocation = document.createElement("p");
  const gitProfile = document.createElement("p");
  const gitLink = document.createElement("a");
  const gitFollower = document.createElement("p");
  const gitFollowing = document.createElement("p");
  const gitBio = document.createElement("p");
  // setting class names, attributes and text
  gitImg.src = user.avatar_url;
  gitName.textContent = `${user.name}`;
  gitUserName.textContent = `${user.login}`;
  gitLocation.textContent = `Location: ${user.location}`;
  gitLink.href = user.html_url;
  gitLink.textContent = user.html_url;
  gitProfile.textContent = `Profile: `;
  gitFollower.textContent = `Followers: ${user.followers}`;
  gitFollowing.textContent = `Following: ${user.following}`;
  gitBio.textContent = `Bio: ${user.bio}`;
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  gitName.classList.add("name");
  gitUserName.classList.add("username");
  // Creating the hierarchy
  card.appendChild(gitImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(gitName);
  cardInfo.appendChild(gitUserName);
  cardInfo.appendChild(gitLocation);
  cardInfo.appendChild(gitProfile);
  cardInfo.appendChild(gitLink);
  cardInfo.appendChild(gitFollower);
  cardInfo.appendChild(gitFollowing);
  cardInfo.appendChild(gitBio);
  gitProfile.appendChild(gitLink);
  // return card
  return card;
}

function gitCard(gitUser, func) {
  axios
    .get(`https://api.github.com/users/${gitUser}`)
    .then((res) => {
      cards.append(func(res.data));
    })
    .catch((err) => console.log(err));
}
gitCard("therealkraytonian", gitCardMaker);

axios
  .get(`https://api.github.com/users/therealkraytonian/following`)
  .then((res) => {
    const users = res.data;

    users.forEach((user) => {
      gitCard(user.login, gitCardMaker);
      axios
        .get(`https://api.github.com/users/${user.login}/following`)
        .then((res) => {
          const followingUsers = res.data;
          followingUsers.forEach((d) => {
            gitCard(d.login, gitCardMaker);
          });
        });
    });
  });
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
