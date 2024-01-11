/** @format */

const Render = new Renderer();

const getDataFromDb = function () {
  return $.get(`https://weather-app-px36.onrender.com/cities`);
};

const render = async function () {
  Render.renderer(await getDataFromDb());
};

$("#searchCityName").on("click", async function () {
  const cityName = $("#searchInput").val();
  const data = await $.get(`https://weather-app-px36.onrender.com/cities/${cityName}`);
  Render.renderWithAppend([data]);
});

$("#container").on("click", "#addCity", async function () {
  const cityName = $(this).parent().find("span")[0].innerHTML;
  const data = await $.get(`https://weather-app-px36.onrender.com/cities/${cityName}`);
  data["active"] = false;
  await $.post("https://weather-app-px36.onrender.com/weather/", data);
  render();
});

$("#container").on("click", ".btn-close", function () {
  const cityName = $(this).parent().find("span")[0].innerHTML;
  $.ajax({
    url: `/cities/${cityName}`,
    type: "delete",
    success: function () {
      render();
    },
  });
});

render();
