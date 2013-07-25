(function() {
  $(document).ready(function() {
    var $window = $(window);
    var $appHeader = $('#app-header');
    var headerOriginalTop = $appHeader.position().top;

    var updateHeader = _.throttle(function() {
      var scrollTop = $window.scrollTop();
      if (scrollTop >= headerOriginalTop) {
        $appHeader.addClass('fixed');
      } else {
        $appHeader.removeClass('fixed');
      }
    }, 300);

    $window.on('scroll', updateHeader);
  });
}());