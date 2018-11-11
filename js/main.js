$(function() {
  $("#selectBox").on("change", function(event) {
    $("html, body").animate({ scrollTop: $('#newsId').offset().top-300 }, 1500);
    $(".loader").css({display:"flex"},5000);
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
        $("header").height('300px');
        $("header").css({padding: "5px"});
        $("#headBox").css({height: "100%"});
        $("#newsId").empty();
        var count = 0;
        $.each(data.results, function(index, v) {
          if (v.multimedia[4] && count < 12) {
            count++;
            let source = v.multimedia[4].url;
            let caption = v.abstract;
            let read = v.short_url;
            $('#newsId').append(
              '<div class="show'+ count +' newsBox" style="background-image:url(' + source + ');"><a href="'+ read+'" target="_blank"><p class="newsCaption">' + caption +'</p></a></div>'
            );
          }
        });
      } $(".loader").css({display:"none"});
    });
  });
});


