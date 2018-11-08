$(function() {
  $("#selectBox").on("change", function(event) {
    // var selectedNews = $('#selectBox').val();
    // console.log(selectedNews);
    var newDest = event.target.value;
    var url = "https://api.nytimes.com/svc/topstories/v2/" + newDest + ".json?" + 
      $.param(
        {"api-key": "0cad7e5308a34f87945a0fd6a004bd9f"}
        );
      $.ajax({
          url: url,
          method: 'GET'
        }).done(function(data) {
          console.log(data);
        if (!data.results) {
          $("#selectBox").append("sorry no news today!");
        } else {
          $("#newsId").empty();
          // console.log(selectedNews);
          var df = new DocumentFragment();
          $.each(data.results, function(index, v) {
            // console.log(v.section);
            // console.log(selectedNews);
              if (v.multimedia.length !== 0) {
                var list = document.createElement("li");
                let imgUrl = document.createElement("img");
                let figCap = document.createElement("figcaption");
                imgUrl.src = v.multimedia[4].url;
                figCap.textContent = v.abstract;
                list.appendChild(imgUrl);
                list.appendChild(figCap);
                df.appendChild(list);
              }
              $("#newsId").append(df);
          });
        }
      });
  });
});

// var url = 'https://api.nytimes.com/svc/topstories/v2/home.json';
// url +=
//   '?' +
//   $.param({
//     'api-key': '0cad7e5308a34f87945a0fd6a004bd9f'
//   });
// $.ajax({
//   url: url,
//   method: 'GET'
// }).done(function(data) {
//   var results = data.results;
//   var sectionName = results.map(function(v) {
//     return v.section;
//   });

//   var filteredSection = sectionName.filter((v, i) => sectionName.indexOf(v) === i);
//   $.each(filteredSection, function(key, value) {
//     $('#selectBox').append(
//       '<option' + ' class=' + value + '>' + value + '</option>'
//     );
//   });
// }
