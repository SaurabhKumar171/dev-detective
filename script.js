const searchedText = document.querySelector("[data-enterName]");
const searchForm= document.querySelector(".search-form");
const avtaar = document.querySelector("[data-userAvtaar]");
const userName = document.querySelector("[data-userName]");
const accountName = document.querySelector("[data-accountName]");
const joinDate = document.querySelector("[data-joinDate]");
const userBio = document.querySelector("[data-profileBio]");
const userRepo = document.querySelector("[data-repoCount]");
const userFollower = document.querySelector("[data-followersCount]");
const userFollowing = document.querySelector("[data-followingCount]");
const userlocation = document.querySelector("[data-location]");
const website = document.querySelector("[data-website]");
const twitter = document.querySelector("[data-userTwitter]");
const targetTech = document.querySelector("[data-targetTechnology]");
const noResults = document.querySelector("[data-userNoResult]");
const modetext =document.querySelector("#mode-text");

const themebtn = document.querySelector("[modeIcon]");
const modeicon = document.querySelector("#mode-icon");


// if(searchForm.value =='' || searchForm.value==null){
//     noResults.style.display = "none";
// }

// const inputField = document.querySelector("input[type='text']");


searchedText.addEventListener("input", function () {
    noResults.style.display = "none";
  });


function checkNull(text) {
     if(text === 'null' || text.length === 0){
        return false;
     }
     else{
        return true;
     }
}

var dark=false;


let oldUser='thepranaygupta';
fetchUserDetails(oldUser);
noResults.style.display = "none";


if(oldUser !== searchedText ){
    fetchUserDetails(searchedText);
}


searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    fetchUserDetails(searchedText.value);
});



function fetchUserDetails(name){
 fetch(`https://api.github.com/users/${name}`)
   .then(response => response.json())
   .then(data => {
      renderDetails(data);
   })
   .catch((error) => {
    throw error;
  });
}

function renderDetails(userInfo){
    // console.log(userInfo?.message);

    if(userInfo?.message !== 'Not Found'){
        noResults.style.display = "none";


        avtaar.src=`${userInfo?.avatar_url}`;
        userName.innerText = (checkNull(`${userInfo?.name}`))? `${userInfo?.name}`:'Not available';
        accountName.innerText = (checkNull(`${userInfo?.login}`))? ('@'+`${userInfo?.login}`):'Not available';
        accountName.href=`${userInfo?.html_url}`;
        
        
        //date
        let date = new Date(`${userInfo?.created_at}`);
        const options = { day: "numeric", month: "long", year: "numeric" };
        joinDate.innerText ="Joined "+date.toLocaleDateString("en-US", options);

        userBio.innerText =`${userInfo?.bio}`;
        userRepo.innerText =`${userInfo?.public_repos}`;
        userFollower.innerText =`${userInfo?.followers}`;
        userFollowing.innerText =`${userInfo?.following}`;

        userlocation.innerText =(checkNull(`${userInfo?.location}`))? `${userInfo?.location}`:'Not available';

        website.innerText =(checkNull(`${userInfo?.blog}`))? `${userInfo?.blog}`:'Not available';
        website.href= `${userInfo?.blog}`;

        twitter.innerText =(checkNull(`${userInfo?.twitter_username}`))? `${userInfo?.twitter_username}`:'Not available';
        twitter.href =`https://twitter.com/${userInfo.twitter_username}`;

        targetTech.innerText =(checkNull(`${userInfo?.company}`))? `${userInfo?.company}`:'Not available';

    }
    else{
        // alert('');
        noResults.style.display = "block";
    }
}
//lovebabbar


themebtn.addEventListener("click", function(){
   dark = !dark;
//    alert(dark);
   if(dark){
    darkMode();
   }
   else{
    lightMode();
   }
})

function darkMode(){
    document.documentElement.style.setProperty("--lm-bg", "#141D2F");
    document.documentElement.style.setProperty("--lm-bg-content", "#1E2A47");
    document.documentElement.style.setProperty("--lm-text", "white");
    document.documentElement.style.setProperty("--lm-text-alt", "white");
    document.documentElement.style.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
     searchedText.style.backgroundColor = "#1E2A47";
    // searchedText.style.color = "white";
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
     searchedText.classList.add("paleholderClass");
    //  searchedText.value.style.color="white";("color").value;
    // console.log(searchedText("color").value);

  searchedText.style.color="white";
}

function lightMode(){
    document.documentElement.style.setProperty("--lm-bg", "#F6F8FF");
    document.documentElement.style.setProperty("--lm-bg-content", "#FEFEFE");
    document.documentElement.style.setProperty("--lm-text", "#4B6A9B");
    document.documentElement.style.setProperty("--lm-text-alt", "#2B3442");
    document.documentElement.style.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
      searchedText.style.backgroundColor = "white";
    // searchedText.style.color = "#2B3442";
     modetext.innerText = "DARK";
     modeicon.src = "./assets/images/moon-icon.svg";
    //  searchedText.style.color = "#4b6a9b";
    searchedText.classList.remove("paleholderClass");
    searchedText.style.color="black";

}