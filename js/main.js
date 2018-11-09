$(function() {
  $("#selectBox").on("change", function(event) {
    var newDest = event.target.value;
    var url =
      "https://api.nytimes.com/svc/topstories/v2/" +
      newDest +
      ".json?" +
      $.param({ "api-key": "0cad7e5308a34f87945a0fd6a004bd9f" });
    $.ajax({
      url: url,
      method: "GET"
    }).done(function(data) {
      console.log(data);
      if (!data.results) {
        $("#selectBox").append("sorry no news today!");
      } else {
        $("#newsId").empty();
        var count = 0;
        $.each(data.results, function(index, v) {
          if (v.multimedia[4] && count < 12) {
            count++;
            let source = v.multimedia[4].url;
            let caption = v.abstract;
            $('#newsId').append(
              '<div class="newsBox" style="background-image:url(' + source + ');"><a href="url" class="newsCaption"><p >' + caption +' </p></a></div>'
            );
          }
        });
      }
    });
  });
});



// var selectedNews = $('#selectBox').val();
// console.log(selectedNews);
// var newDest = event.target.value;

// console.log(selectedNews);
// var df = new DocumentFragment();

// let imgUrl = document.createElement("img");
// let figCap = document.createElement("figcaption");
// let source = v.multimedia[4].url
// let list = document.createElement("li");
// let soClassy = newDest + count;
// list.className = soClassy;                 // console.log(source); Printing background source
// imgUrl.src = source;
// figCap.textContent = v.abstract;
// list.appendChild(figCap);
// df.appendChild(list);
// $(soClassy).css("background-image", 'url("' + source + '")');
// console.log(soClassy);
// console.log("background-image", 'url("' + source + '")');
