$(function() {
  window.onscroll = function() {scrollFunction()};
  $('#selectBox').on('change', function(event) {
    $('.section').remove();
    $('html, body').animate({ scrollTop: $('#newsId') }, 1500);
    changeCSS('.loader','display','flex');
    const newDest = event.target.value;
    console.log(newDest);
    let url =
      'https://api.nytimes.com/svc/topstories/v2/' +
      newDest +
      '.json?' +
      $.param({ 'api-key': 'tFeVHVERlGPxHYbtVYT2ZxUMbpPloNg2' }); 
    $.ajax({
      url: url,
      method: 'GET'
    }).done((data) => {
      if (!data.results) {
        $('#selectBox').append('sorry no news today!');
      } else {
        console.log(data.results);
        changeCSS('header','height','300px');
        changeCSS('header','padding','5px');
        changeCSS('#headBox','height','100%');
        $('#newsId').empty().fadeIn(2000);
        let count = 0; 
        $.each(data.results, (index, v) => {
          if (v.multimedia[4] && count < 12) {
            count++;
            const source = v.multimedia[4].url;
            const caption = v.abstract;
            const read = v.short_url;
            $('#newsId').append(
              `<div class='show ${count} newsBox' style='background-image:url(${source});'>
                  <a href=' ${read} ' target='_blank'>
                    <p class='newsCaption'>  ${caption} </p>
                  </a>
              </div>`
            );
            changeCSS('.loader','display','none');
          } 
        });
      }
    }); 
  });
});

let scrollFunction = () => { document.body.scrollTop > 500 || document.documentElement.scrollTop > 500 ? 
  changeCSS('#myBtn','display','block') : changeCSS('#myBtn','display','none');
};

//--------------ScrollBackToTop--------------//
let topFunction = () => $("html").scrollTop(0); 


//--------------SelectBoxStyling-------------//
$(document).ready(function() {
  $('#selectBox').select2();
});


let changeCSS = (att,cssStyle, value) => {
  let styles = {};// obj = {}
  styles[`${cssStyle}`] = value;  // obj[`${name}`]
  $(att).css(styles);
} 


