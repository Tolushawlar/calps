// select html elements
const form = document.getElementById("commentForm");
const formInput = document.getElementById("commentInputField");
const commentList = document.getElementById("commentList");
const buttonBtn = document.getElementById("commentBtn");
const reorder = document.getElementById("reorder");
const newest = document.getElementById("newest");
const oldest = document.getElementById("oldest");

// handle the form submission logic
form.addEventListener("submit", function saveCom(event) {
  event.preventDefault();
  const commentWord = formInput.value;
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth();
  const day = currentTime.getDay();
  const commentTime = `${hours}:${minutes} | ${day}-${month}-${year} `;

  // creat object to store comment information
  const commentData = {
    commentWord,
    commentTime,
  };

  // localstorage operation for comments
  const commentArray = JSON.parse(localStorage.getItem("comments")) || [];
  commentArray.push(commentData);
  localStorage.setItem("comments", JSON.stringify(commentArray));
  form.reset();
  window.location.reload();
});

// fetch and display comments component
localComment = localStorage.getItem("comments");
const arrayComment = localComment ? JSON.parse(localComment) : [];
function fetchDisplay() {
  // looping through fetched array object
  arrayComment.forEach((item, index) => {
    var commentCard = document.createElement("div");
    var commentDel = document.createElement("button");
    var commentUpd = document.createElement("button");
    commentCard.classList.add("com-card");
    commentDel.classList.add("com-del");
    commentDel.textContent = "Delete";
    commentUpd.classList.add("com-upd");
    commentUpd.textContent = "Update";

    commentCard.innerHTML = `
    <h3>${item.commentWord}</h3>
    <p>Posted: ${item.commentTime}</p>
    `;

    // deleting the comments
    commentDel.addEventListener("click", () => {
      const storedData = JSON.parse(localStorage.getItem("comments"));
      delete storedData[index];
      localStorage.setItem("comments", JSON.stringify(storedData));
    });

    // updating the comment
    commentUpd.addEventListener("click", () => {
      formInput.value = item.commentWord;
      buttonBtn.innerHTML = "Update";
      reorder.style.display = "none";

      commentBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const storedData = JSON.parse(localStorage.getItem("comments"));
        // updating the comment information
        storedData[index].commentWord = formInput.value;

        // creating updated time for updated comment
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const year = currentTime.getFullYear();
        const month = currentTime.getMonth();
        const day = currentTime.getDay();
        const commentTime = `${hours}:${minutes} | ${day}-${month}-${year} `;

        // restore comment in localstorage
        storedData[index].commentTime = commentTime;
        localStorage.setItem("comments", JSON.stringify(storedData));
        window.location.reload();
      });
    });

    commentList.appendChild(commentCard);
    commentCard.appendChild(commentDel);
    commentCard.appendChild(commentUpd);
  });
}

fetchDisplay();

//sorting the displayed comment
newest.addEventListener("click", () => {
  commentList.innerHTML = "";
  const storedData = JSON.parse(localStorage.getItem("comments"));
  const reversedArray = Object.entries(storedData).reverse();
  const arrayLen = Object.keys(storedData).length;

  var commentCard = document.createElement("div");
  var commentDel = document.createElement("button");
  var commentUpd = document.createElement("button");
  commentCard.classList.add("com-card");
  commentDel.classList.add("com-del");
  commentDel.textContent = "Delete";
  commentUpd.classList.add("com-upd");
  commentUpd.textContent = "Update";

  sortedObj = {};
  for (i = 0; i <= arrayLen; i++) {
    console.log(array.keys(reversedArray));
  }
});

oldest.addEventListener("click", () => {
  window.location.reload();
});
