/** @format */

const Render = new Renderer();

const getDataFromDb = async function () {
  const data = await $.get(`http://localhost:3000/cities`);
  return data;
};

const render = async function () {
  Render.renderer(await getDataFromDb());
};

$("#searchCityName").on("click", async function () {
  const cityName = $("#searchInput").val();
  const data = await $.get(`http://localhost:3000/cities/${cityName}`);
  Render.renderWithAppend([data]);
});

$("#container").on("click", "#addCity", async function () {
  const cityName = $(this).parent().find("span")[0].innerHTML;
  const data = await $.get(`http://localhost:3000/cities/${cityName}`);
  data["active"] = false;
  await $.post("http://localhost:3000/weather/", data);
  render();
});

$("#container").on("click", ".btn-close", function () {
  const cityName = $(this).parent().find("span")[0].innerHTML;
  $.ajax({
    url: `http://localhost:3000/cities/${cityName}`,
    type: "delete",
    success: function () {
      render();
    },
  });
});

render();
