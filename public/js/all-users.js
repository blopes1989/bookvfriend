
var usersContainer = $(".users-container");
var searchedUser = $(".searchedUser");
usersContainer.hide();
var currentUserID = localStorage.getItem("user");
getAuthors()


function getAuthors() {
  $.get("/api/authors", function (data) {
    usersContainer.empty();

    for (var i = 0; i < data.length; i++) {
      if (data[i].id != currentUserID) {
        usersContainer.show();
        console.log(data[i]);
        // authorContainer.append(createAuthorRow(data[i]));
        // authorContainer.append("<br>");
        var friendDiv = $("<li>");
        friendDiv.addClass("list-group-item");
        console.log("1")
        var userName = "&nbsp" + data[i].name;
        var userImg = $("<img>");
        userImg.css("height", "80px");
        userImg.css("width", "80px");
        userImg.attr("src", data[i].profileImage);
        userImg.attr("profileID", data[i].id)
        var btnFollow = $("<button>");
        btnFollow.addClass("follow-button btn-primary btn-lg");
        btnFollow.css("cursor", "pointer");
        btnFollow.text("Follow");
        btnFollow.attr("profileID", data[i].id)
        var btnProfile = $("<button>");
        console.log("2.5")
        btnProfile.addClass("profile-button btn-primary btn-lg");
        btnProfile.css("cursor", "pointer");
        btnProfile.text("Profile");
        console.log("2")
        btnProfile.attr("profileID", data[i].id)
        friendDiv.append(userImg);
        friendDiv.append(userName + "<br>" + "<br>");
        friendDiv.append(btnFollow);
        friendDiv.append(btnProfile);
        usersContainer.append(friendDiv);
        console.log("3")
      }
    }

  });
}

// function searchBar() {
//   var searchInput = $("#serachBarInput").val().trim();
//   $("#searchBarSubmit").on("click", function(event){
//     event.preventDefault();
//     console.log(searchInput);
//   })

// }

// searchBar();
var searchInput;
function getSearchUser() {
  var searchInput = $("#searchBarInput").val().trim();
  $.get("/api/authors/checkID/" + searchInput, function (data) {
    if (!data) {
      $("#searchBarModal").html("This user Doesn't exist!");
      $("#search-modal").modal("toggle");
    } else {
      usersContainer.hide();
      console.log(data);
      // authorContainer.append(createAuthorRow(data[i]));
      // authorContainer.append("<br>");
      var friendDiv = $("<li>");
      friendDiv.addClass("list-group-item");
      var userName = "&nbsp" + data.name;
      var userImg = $("<img>");
      userImg.css("height", "80px");
      userImg.css("width", "80px");
      userImg.attr("src", data.profileImage);
      var btnFollow = $("<button>");
      btnFollow.addClass("btn-primary btn-lg");
      btnFollow.css("cursor", "pointer");
      btnFollow.text("Follow");
      var btnProfile = $("<button>");
      btnProfile.addClass("btn-primary btn-lg");
      btnProfile.css("cursor", "pointer");
      btnProfile.text("Profile");
      // btnProfile.css("margin-left", "5px");
      // friendDiv.append("Name: "+realName + "<br>");
      friendDiv.append(userImg);
      friendDiv.append(userName + "<br>" + "<br>");
      friendDiv.append(btnFollow);
      friendDiv.append(btnProfile);
      searchedUser.html(friendDiv);
    }

  });
}

$("#searchBarSubmit").on("click", getSearchUser);


$(document).on("click", ".follow-button", function () {
  event.preventDefault();
  var followID = $(this).attr("profileID");
  var newFollow = {
    currentUser: currentUserID,
    followedUser: followID,
  };
  console.log("you clicked it")
  console.log(newFollow)
  followUser(newFollow);
});


function followUser(follow){
  $.post("/api/friends", follow)
    .then(function (res) {
    getAuthors()
    console.log("test2")
  });

  
}

$(document).on("click", ".profile-button", function () {
  event.preventDefault();
  var followID = $(this).attr("profileID");
  localStorage.setItem("other-user", followID)
  console.log("you clicked it!!!")
  // console.log(newFollow)
  window.location ="/other-user/"+ followID; 
}); 