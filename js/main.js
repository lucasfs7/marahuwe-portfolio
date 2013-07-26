(function() {
  $(document).ready(function() {
    var $window = $(window);
    var $appHeader = $('#app-header');
    var $appNav = $('#app-navigation');
    var $work = $('#work');

    var animationTime = 500;
    var headerOriginalTop = $appHeader.position().top;

    var updateHeader = _.throttle(function() {
      var scrollTop = $window.scrollTop();
      if (scrollTop >= headerOriginalTop) {
        $appHeader.addClass('fixed');
      } else {
        $appHeader.removeClass('fixed');
      }
    }, 300);

    $appNav.find('a').smoothScroll({
      preventDefault: false,
      offset: -100
    });

    $work.find('.work-list .item a').on('click', function(e) {
      e.preventDefault();
      var t = e.target;

      while (t.nodeName.toLowerCase() != 'a') {
        t = t.parentNode;
      }

      var $t = $(t);
      var $item = $t.parents('.item');
      var oldHeight = $t.height();

      $item.addClass('open');

      var updateHeight = _.debounce(function() {
        $t.animate({
          height: $window.innerHeight() - 12
        }, animationTime);
      }, 300);

      var closeItem = function(e) {
        e.preventDefault();

        $t.animate({
          height: oldHeight
        }, animationTime, function() {
          $item.removeClass('open');
        });
      }

      updateHeight();
      $window.on('resize', updateHeight);
    });

    $window.on('scroll', updateHeader);
  });
}());