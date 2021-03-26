import M from "materialize-css";

$(document).ready(() => {
  const main = document.querySelector(".main");

  class Card {
    constructor(data) {
      (function createCard() {
        $("input").val("");

        const card = document.createElement("div");
        card.className = "card blue-grey darken-1";

        data.provinces[0].deaths >= 100
          ? (document.body.style.backgroundColor = card.color = "gold")
          : data.provinces[0].deaths >= 500
          ? (document.body.style.backgroundColor = card.color = "darkred")
          : data.provinces[0].deaths >= 1000
          ? (document.body.style.backgroundColor = card.color = "orangered")
          : data.provinces[0].deaths >= 10000
          ? (document.body.style.backgroundColor = card.color = "crimson")
          : (document.body.style.backgroundColor = card.color = "aquamarine");

        card.addEventListener("mouseover", () => {
          document.body.style.backgroundColor = card.color;
        });

        card.addEventListener("mouseleave", () => {
          document.body.style.backgroundColor = "aquamarine";
        });

        card.innerHTML += `
            <div class="card-content white-text">
                <span class="card-title">${data.country} ${data.date}</span>
                <p>Confirmed: ${data.provinces[0].confirmed}</p>
                <p>Recovered: ${data.provinces[0].recovered}</p>
                <p>Active: ${data.provinces[0].active}</p>
                <p>Death: ${data.provinces[0].deaths}</p>
            </div>
      `;

        const footer = document.createElement("div");
        footer.className = "card-action";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn waves-effect";
        deleteBtn.textContent = "Remove";

        deleteBtn.addEventListener("click", function () {
          $(card).fadeOut(1000);
          setTimeout(() => {
            main.removeChild(card);
            document.body.style.backgroundColor = "aquamarine";
          }, 2000);
        });

        footer.appendChild(deleteBtn);

        card.appendChild(footer);

        main.appendChild(card);
      })();
    }
  }

  $("button").click(() => {
    if ($("input").val() == "") return M.toast({ html: "Input is empty" });

    const settings = {
      async: true,
      crossDomain: true,
      url: `https://covid-19-data.p.rapidapi.com/report/country/name?date=2020-04-01&name=${$(
        "input"
      ).val()}`,
      method: "GET",
      headers: {
        "x-rapidapi-key": "2ecc6a18f1msh149a8c93469a116p1ff3e3jsn92ea038f0326",
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      response.message
        ? M.toast({ html: response.message })
        : new Card(response[0]);
    });
  });
});
