(function() {
  $(document).ready(function() {
    var $window = $(window);
    var $appHeader = $('#app-header');
    var $appHeaderSideA = $appHeader.find('.side-a');
    var $appHeaderSideB = $appHeader.find('.side-b');
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

    $appNav.find('a.scroll').smoothScroll({
      preventDefault: false,
      offset: -100
    });

    $appNav.find('a.flip').on('click', function(e) {
      e.preventDefault();
      $appHeaderSideB.flip({
        direction:'bt',
        color: '#fff',
        onBefore: function() {
          $appHeaderSideA.hide();
        }
      });
    });

    $appHeaderSideB.find('a.revert-flip').on('click', function(e) {
      e.preventDefault();
      $appHeaderSideB.flip({
        direction:'tb',
        color: '#fff',
        onEnd: function() {
          $appHeaderSideA.show();
        }
      });
    });

    $work.find('.work-list .work-item .open-work').on('click', function(e) {
      e.preventDefault();
      var t = e.target;

      while (t.nodeName.toLowerCase() != 'a') {
        t = t.parentNode;
      }

      var $t = $(t);
      var $item = $t.parents('.work-item');
      var oldHeight = $item.height();

      $item.addClass('open');

      var updateHeight = function() {
        $item.animate({
          height: $window.innerHeight() - 12
        }, animationTime);
      };
      
      var updateHeightOnResize = _.debounce(updateHeight, 300);

      var closeItem = function(e) {
        e.preventDefault();
        $item.animate({
          height: oldHeight
        }, animationTime, function() {
          $item.removeClass('open');
        });
      }

      $item.find('.content .options .close a').on('click', closeItem);
      updateHeight();
      $window.on('resize', updateHeightOnResize);
    });

    $window.on('scroll', updateHeader);
  });
}());