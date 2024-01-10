/** @format */

class Renderer {
  renderer = function (cards) {
    let source = $("#Weather_templates").html();
    let template = Handlebars.compile(source);
    let newHtml = template({ cards });
    $("#cards").empty();
    $("#cards").append(newHtml);
  };

  renderWithAppend = function (cards) {
    let source = $("#Weather_templates").html();
    let template = Handlebars.compile(source);
    let newHtml = template({ cards });
    $("#cards").append(newHtml);
  };
}
