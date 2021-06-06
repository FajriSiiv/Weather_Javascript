const apiKey = "1d43881008bd12157a3cf8015a67c4b1";
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".msg");
const list = document.querySelector(".ajax-section .cities");
const form = document.querySelector(".top-banner form");
$(".form-top-banner").submit(function (e) {
  e.preventDefault();
  let inpValue = input.value;
  const listItemsArray = Array.from($(".ajax-section .city"));
  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = "";
      if (inpValue.includes(",")) {
        if (inpValue.split(",")[1].length > 2) {
          inpValue = inpValue.split(","[0]);
          content = el.querySelector(".city-name span").textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inpValue.toLowerCase();
    });
    if (filteredArray.length > 0) {
      msg.textContent = `${
        filteredArray[0].querySelector(".city-name span").textContent
      } sudah ada dalam pencarian`;
      // alert(`${filteredArray[0].querySelector("city-name span")} Sudah dalam daftar pencarian`);
      form.reset();
      input.focus();
      return;
    }
  }

  //ajax
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inpValue}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
          <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
          </h2>
          <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
          <figure>
            <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
            <figcaption>${weather[0]["description"]}</figcaption>
          </figure>
        `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Kota tidak valid";
    });
  //   $.ajax({
  //     type: "POST",
  //     url: "https://api.openweathermap.org/data/2.5/weather?q=${inpValue}&appid=${apiKey}&units=metric",
  //     dataType: "json",
  //     success: function (result, status, xhr) {
  //       const markup = `
  //         <h2 class="city-name" data-name="${name},${sys.country}">
  //           <span>${name}</span>
  //           <sup>${sys.country}</sup>
  //         </h2>
  //         <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
  //         <figure>
  //           <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
  //           <figcaption>${weather[0]["description"]}</figcaption>
  //         </figure>
  //       `;
  //     },
  //     error: (msg.textContent = "Please search for a valid city 😩"),
  //   });
  msg.textContent = "";
  form.reset();
  input.focus();
});
