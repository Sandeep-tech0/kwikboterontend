
$('.owl-carousel').owlCarousel({
   
    dot:false,     
   loop:true,
   margin:30,
   responsive:{
       0:{
           items:1
       },
       600:{
           items:1
       },
       1000:{
           items:2
       }
   }
})


$(document).ready(function() {
    const owl = $('.owl-carousel');
    const owlPrev = $('.owl-nav button.owl-prev');
    const owlNext = $('.owl-nav button.owl-next');
  
    owl.owlCarousel({
      // Your Owl Carousel options here
      // For example:
      items: 1,
      loop: true,
      onChanged: updateNavActiveState // Call the function to update active state on change
    });
  
    function updateNavActiveState(event) {
      // Get the current slide index and the total number of slides
      const currentSlideIndex = event.item.index;
      const slideCount = event.item.count;
  
      // Remove the 'disabled' class from both buttons
      owlPrev.removeClass('disabled');
      owlNext.removeClass('disabled');
  
      // Check if it's the first slide to disable the 'Prev' button
      if (currentSlideIndex === 0) {
        owlPrev.addClass('disabled');
      }
  
      // Check if it's the last slide to disable the 'Next' button
      if (currentSlideIndex === slideCount - 1) {
        owlNext.addClass('disabled');
      }
    }
  
    // Initial state on document load
    updateNavActiveState({ item: { index: 0, count: owl.find('.owl-item').length } });
  
    // Event listeners for navigation buttons
    owlPrev.on('click', function() {
      owl.trigger('prev.owl.carousel');
    });
  
    owlNext.on('click', function() {
      owl.trigger('next.owl.carousel');
    });
  });




  
$(document).ready(function() {
  
    $(".date__number").click(function() {
      $(".date__number").removeClass("date__number--true");
      $(this).addClass("date__number--true");
    });
    
    
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Monate beginnen bei 0, daher +1
    var day = date.getDate();
    
    $(".yer").each(function() {
      if ( Number($(this).text()) === (year) ) {
        $(this).prop("selected", true);
      }
    });
    
    $(".mon").each(function() {
      if ( $(this).attr("name") === String(month) ) {
        $(this).prop("selected", true);
      }
    });
    
    $(".date__number").each(function() {
      if ( Number($(this).text()) === day ) { // Number verwandelt den Text in eine Zahl --> Computer kann 123 als Zahl erkennen, aber 123 als Text nicht
        $(this).addClass("date__number--true");
      }
    });
    
    
    $(".choosen").text(day + '.' + month + '.' + year);
    
    
    $(".date").click(function() {
      
      day = $(".date__number--true").text();
      month = $(".month option:selected").attr("name");
      year = $(".year option:selected").text();
      
      $(".choosen").text(day + '.' + month + '.' + year);
      
    });
    
  
  });
  