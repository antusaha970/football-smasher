const fetchInitialPlayers = async (key) => {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${key}`
    );
    const data = await response.json();
    showPlayersOnUi(data.player);
  } catch (error) {
    console.error(error);
  }
};

const getUserInput = () => {
  const form = document.getElementById("userInp");
  const input = document.getElementById("inpBox");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchInitialPlayers(input.value);
    input.value = "";
  });
};

const showPlayersOnUi = (playerArr) => {
  if (playerArr) {
    deleteOldBox();
    const container = document.getElementById("play-card-container");
    playerArr.forEach((player) => {
      let des = player.strDescriptionEN;
      if (des && des.length > 150) {
        des = des.slice(0, 145);
      }
      const div = document.createElement("div");
      div.classList.add("col-12", "col-sm-6", "col-md-5", "box-for-delete");
      div.innerHTML = `
        <div class="card" style="width: 100%">
        <img
            src="${player.strThumb}"
            class="card-img-top"
            alt="player"
        />
        <div class="card-body base-color-2-bg">
            <h2 class="card-title base-color-text fw-bold">
            ${player.strPlayer}
            </h2>
            <p class="card-text text-white-50">
            ${des}
            </p>
            <p class="text-white-50 mb-0">
            Nationality: <b>${player.strNationality}</b>
            </p>
            <p class="text-white-50">Gender: <b>${player.strGender}</b></p>
            <div class="social d-flex justify-content-center g-5 my-2">
            <a href="${player.strTwitter}">
                <i class="fa-brands fa-x-twitter player-icon"> </i
            ></a>
            <a href="${player.strInstagram}"
                ><i class="fa-brands fa-instagram player-icon"></i
            ></a>
            <a href="${player.strFacebook}"
                ><i class="fa-brands fa-facebook player-icon"></i
            ></a>
            </div>
            <a href="#" class="btn theme-btn">Add to team</a>
        </div>
        </div>
      `;
      container.appendChild(div);
    });
  }
};

const deleteOldBox = () => {
  const oldBoxCollection = document.getElementsByClassName("box-for-delete");
  const oldBoxArr = Array.from(oldBoxCollection);
  for (let i = 0; i < oldBoxArr.length; i++) {
    const element = oldBoxArr[i];
    element.remove();
  }
};

fetchInitialPlayers("n");
getUserInput();
