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
    deleteOldBox("box-for-delete");
    const container = document.getElementById("play-card-container");
    playerArr.forEach((player) => {
      let des = player.strDescriptionEN;
      if (des && des.length > 150) {
        des = des.slice(0, 145);
      }
      const div = document.createElement("div");
      div.classList.add("col-12", "col-sm-6", "col-md-6", "box-for-delete");
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
            <button onclick="addToTeam('${player.strCutout}','${player.strPlayer}')"  class="btn theme-btn">Add to team</button>
            <!-- Button trigger modal -->
            <button type="button" class="btn theme-btn" data-bs-toggle="modal" data-bs-target="#${player.idPlayer}">
              Details
            </button>

            <!-- Modal -->
            <div class="modal fade" id="${player.idPlayer}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog ">
                <div class="modal-content base-color-2-bg">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5 text-white-50 fw-bold" id="exampleModalLabel">Name: ${player.strPlayer}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <p class="text-white-50 fn-18">Nationality: <b> ${player.strNationality} </b> </p>
                    <p class="text-white-50 fn-18">Birth-location: <b> ${player.strBirthLocation} </b> </p>
                    <p class="text-white-50 fn-18">Status: <b> ${player.strStatus} </b> </p>
                    <p class="text-white-50 fn-18">Description: <b> ${player.strDescriptionEN} </b> </p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn theme-btn" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

        </div>
        </div>
      `;
      container.appendChild(div);
    });
  }
};

const deleteOldBox = (custom) => {
  const oldBoxCollection = document.getElementsByClassName(custom);
  const oldBoxArr = Array.from(oldBoxCollection);
  for (let i = 0; i < oldBoxArr.length; i++) {
    const element = oldBoxArr[i];
    element.remove();
  }
};

const myTeam = [];
const addToTeam = (img, name) => {
  myTeam.push({ name, img });
  deleteOldBox("team-player-for-delete");
  const parent = document.getElementById("my-team");
  myTeam.forEach((player) => {
    const div = document.createElement("div");
    div.classList.add("col-12", "team-player-for-delete");
    div.innerHTML = `
          <div
          class="team-box d-flex justify-content-between align-items-center py-2 px-3 base-color-2-bg rounded-2"
        >
          <div>
            <img
              src="${player.img}"
              alt="Player photo"
              class="img-cutout"
            />
          </div>
          <div>
            <p class="base-color-text fw-bold fs-1">${player.name}</p>
          </div>
        </div>
    `;
    parent.appendChild(div);
  });
};

fetchInitialPlayers("n");
getUserInput();
