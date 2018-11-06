var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
url += '?' + $.param({
  'api-key': "0cad7e5308a34f87945a0fd6a004bd9f"
});
$.ajax({
  url: url,
  method: 'GET',
  
}).done(function(data) {
    let results = data.results;
    console.log(results);

    let sectionName = results.map(function(section){
      return section.section});console.log(sectionName);
    
    if(data.results === 0) {
      console.log("sorry no news today!");
    }else {
      function removeDuplicate(arr){
        let unique_array = arr.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });
        return unique_array
    }
    console.log(removeDuplicate(sectionName));  
        $.each(removeDuplicate(sectionName), function(key, value){
        $('#selections').append('<option'+ ' class='+ value +'>' + value  + '</option>');
      }); 
    }
});
