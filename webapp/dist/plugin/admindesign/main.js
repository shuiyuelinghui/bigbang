'use strict';
/*! main.js - v0.1.1
 * http://admindesigns.com/
 * Copyright (c) 2013 Admin Designs;*/

/* Core theme functions required for
 * most of the themes vital functionality */
var Core = function(options) {

   // Variables
   var Body = $('body');

   // jQuery Helper Functions
   var runHelpers = function() {

      // Disable selection
      $.fn.disableSelection = function() {
         return this
            .attr('unselectable', 'on')
            .css('user-select', 'none')
            .on('selectstart', false);
      };

      // Test for IE, Add body class if version 9
      function msieversion() {
           var ua = window.navigator.userAgent;
           var msie = ua.indexOf("MSIE ");
           if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) { 
              var ieVersion = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
              if (ieVersion === 9) {$('body').addClass('no-js ie' + ieVersion);}
              return ieVersion;
           }
           else { return false; }
      }
      msieversion();

      // Clean up helper that removes any leftover
      // animation classes on the primary content container
      // If left it can cause z-index and visibility problems
      setTimeout(function() {
         $('#content').removeClass('animated fadeIn');
      },500);

   }

   // Delayed Animations
   var runAnimations = function() {

      // Add a class after load to prevent css animations
      // from bluring pages that have load intensive resources
      setTimeout(function() {
         $('body').addClass('onload-check');
      }, 100);

      // Delayed Animations
      // data attribute accepts delay(in ms) and animation style
      // if only delay is provided fadeIn will be set as default
      // eg. data-animate='["500","fadeIn"]'
      $('.animated-delay[data-animate]').each(function() {
         var This = $(this)
         var delayTime = This.data('animate');
         var delayAnimation = 'fadeIn';

         // if the data attribute has more than 1 value
         // it's an array, reset defaults 
         if (delayTime.length > 1 && delayTime.length < 3) {
            delayTime = This.data('animate')[0];
            delayAnimation = This.data('animate')[1];
         }

         var delayAnimate = setTimeout(function() {

            This.removeClass('animated-delay').addClass('animated ' + delayAnimation)
               .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                  This.removeClass('animated ' + delayAnimation);
               });

         }, delayTime);
      });

      // "In-View" Animations
      // data attribute accepts animation style and offset(in %)
      // eg. data-animate='["fadeIn","40%"]'
      $('.animated-waypoint').each(function(i, e) {
         var This = $(this);
         var Animation = This.data('animate');
         var offsetVal = '35%';

         // if the data attribute has more than 1 value
         // it's an array, reset defaults 
         if (Animation.length > 1 && Animation.length < 3) {
            Animation = This.data('animate')[0];
            offsetVal = This.data('animate')[1];
         }

         var waypoint = new Waypoint({
            element: This,
            handler: function(direction) {
               console.log(offsetVal)
               if (This.hasClass('animated-waypoint')) {
                  This.removeClass('animated-waypoint').addClass('animated ' + Animation)
                     .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                        This.removeClass('animated ' + Animation);
                     });
               }
            },
            offset: offsetVal
         });
      });

   }

   // Header Functions
   var runHeader = function() {

      // Searchbar - Mobile modifcations
      $('.navbar-search').on('click', function(e) {
         var This = $(this);
         var searchForm = This.find('input');
         var searchRemove = This.find('.search-remove');

         // Don't do anything unless in mobile mode
         if (!$('body.mobile-view').length) { return; }

         // Open search bar and add closing icon if one isn't found
         This.addClass('search-open');
         if (!searchRemove.length) {
            This.append('<div class="search-remove"></div>'); 
         }

         // Fadein remove btn and focus search input on animation complete
         setTimeout(function() {
            This.find('.search-remove').fadeIn();
            searchForm.focus();
            searchForm.one('keydown', function() {
               $(this).val('');
            });
         },330)

         // If remove icon clicked close search bar
         if ($(e.target).attr('class') == 'search-remove') {
            This.removeClass('search-open'); 
            This.find('.search-remove').remove();
         }

      });

      // custom animation for header content dropdown
      if ($('.dropdown-item-slide').length) {
         $('.dropdown-item-slide').on('shown.bs.dropdown', function() {
            var This = $(this);
            setTimeout(function() {
               This.addClass('slide-open');
            }, 20);
         });
         $('.dropdown-item-slide').on('hidden.bs.dropdown', function() {
            $(this).removeClass('slide-open');
         });
      }

      // Init jQuery Multi-Select for navbar user dropdown
      if ($("#user-status").length) {
         $('#user-status').multiselect({
            buttonClass: 'btn btn-default btn-sm',
            buttonWidth: 100,
            dropRight: false
         });
      }
      if ($("#user-role").length) {
         $('#user-role').multiselect({
            buttonClass: 'btn btn-default btn-sm',
            buttonWidth: 100,
            dropRight: true
         });
      }

      // Persistent tooltips. Use this class to prevent a menu
      // dropdown from closing when clicking content inside of it
      if ($('.dropdown-menu.dropdown-persist').length) {
         $('.dropdown-menu.dropdown-persist').on('click', function(e) {
            e.stopPropagation();
            var Target = $(e.target);

            // stopping event propagation will also disable multiselects from working
            // in areas such as the user menu dropdown. This helps correct that
            function closeMulti() {
               Target.parents('.dropdown-persist').find('.btn-group').each(function() {
                  if ($(this).children('.multiselect').length) {
                     $(this).removeClass('open');
                  }
               });
            };

            if (Target.hasClass('multiselect') || Target.parent().hasClass('multiselect')) {
               closeMulti();
               Target.parents('.btn-group').toggleClass('open');
            } else {
               closeMulti()
            }
         });
      }

      // Sliding Topbar Metro Menu
      var menu = $('#topbar-dropmenu');
      var items = menu.find('.metro-tile');
      var metroBG = $('.metro-modal');

      // Toggle menu and active class on icon click
      $('.topbar-menu-toggle').on('click', function() {

         menu.slideToggle(230).toggleClass('topbar-menu-open');
         $(items).addClass('animated animated-short fadeInDown').css('opacity', 1);

         // Create Modal for hover effect
         if (!metroBG.length) {
            metroBG = $('<div class="metro-modal"></div>').appendTo('body');
         }
         setTimeout(function() {
            metroBG.fadeIn();
         }, 380);

      });

      // If modal is clicked close menu
      $('body').on('click', '.metro-modal', function() {
         metroBG.fadeOut('fast');
         setTimeout(function() {
            menu.slideToggle(150).toggleClass('topbar-menu-open');
         }, 250);
      });
   }

   // SideMenu Functions
   var runSideMenu = function(options) {

      // If Nano scrollbar exist and sidebar is fixed init plugin
      if ($('.nano.affix').length) {
          $(".nano").nanoScroller({
             preventPageScrolling: true
          });
      }

      // Sidebar state naming conventions:
      // "sb-l-o" - SideBar Left Open
      // "sb-l-c" - SideBar Left Closed
      // "sb-l-m" - SideBar Left Minified
      // Same naming convention applies to right sidebar

      // SideBar Left Toggle Function
      var sidebarLeftToggle = function() {

         // We check to see if the the user has closed the entire
         // leftside menu. If true we reopen it, this will result
         // in the menu resetting itself back to a minified state.
         // A second click will fully expand the menu.
         if (Body.hasClass('sb-l-c') && options.collapse === "sb-l-m") {
            Body.removeClass('sb-l-c');
         }

         // Toggle sidebar state(open/close)
         Body.toggleClass(options.collapse).removeClass('sb-r-o').addClass('sb-r-c');
         
         triggerResize();
      };

      // SideBar Right Toggle Function
      var sidebarRightToggle = function() {

         // toggle sidebar state(open/close)
         if (options.siblingRope === true && !Body.hasClass('mobile-view') && Body.hasClass('sb-r-o')) {
            Body.toggleClass('sb-r-o sb-r-c').toggleClass(options.collapse);
         }
         else {
            Body.toggleClass('sb-r-o sb-r-c').addClass(options.collapse);
         }

         triggerResize();
      };

      // Sidebar Left Collapse Entire Menu event
      $('.sidebar-toggle-mini').on('click', function(e) {
         e.preventDefault();

         // Close Menu
         Body.addClass('sb-l-c');
         triggerResize();

         // After animation has occured we toggle the menu.
         // Upon the menu reopening the classes will be toggled
         // again, effectively restoring the menus state prior
         // to being hidden 
         if (!Body.hasClass('mobile-view')) {
            setTimeout(function() {
               Body.toggleClass('sb-l-m sb-l-o');
            }, 250);
         }
      });

      // Check window size on load
      // Adds or removes "mobile-view" class based on window size
      var sbOnLoadCheck = function() {
         // Check Body for classes indicating the state of Left and Right Sidebar.
         // If not found add default sidebar settings(sidebar left open, sidebar right closed).
         if (!$('body.sb-l-o').length && !$('body.sb-l-m').length && !$('body.sb-l-c').length) {
            $('body').addClass(options.sbl);
         }
         if (!$('body.sb-r-o').length && !$('body.sb-r-c').length) {
            $('body').addClass(options.sbr);
         }

         // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
         if ($(window).width() < 1080) {
            Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
         }
      };

      // Check window size on resize
      // Adds or removes "mobile-view" class based on window size
      var sbOnResize = function() {
         // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
         if ($(window).width() < 1080 && !Body.hasClass('mobile-view')) {
            Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
         } else if ($(window).width() > 1080) {
            Body.removeClass('mobile-view');
         } else {
            return;
         }
      };

      // Most CSS menu animations are set to 300ms. After this time
      // we trigger a single global window resize to help catch any 3rd 
      // party plugins which need the event to resize their given elements
      var triggerResize = function() {
         // setTimeout(function() {
            $(window).trigger('resize');
         // }, 300)
      };

      // Functions Calls
      sbOnLoadCheck();
      $("#toggle_sidemenu_l").click(sidebarLeftToggle);
      $("#toggle_sidemenu_r").click(sidebarRightToggle);

      // Attach debounced resize handler
      var rescale = function() {
         sbOnResize();
      }
      var lazyLayout = $.debounce(rescale, 300);
      $(window).resize(lazyLayout);


      // 2. LEFT USER MENU TOGGLE

      // Find user menu item length 
      var usermenuItems = $('.user-menu').find('a');

      // Toggle open the user menu
      $('.sidebar-menu-toggle').click(function(e) {
         e.preventDefault();

         // Toggle Class to signal state change
         $('.user-menu').toggleClass('usermenu-open').slideToggle('fast');

         // If menu is closed apply animation    
         if ($('.user-menu').hasClass('usermenu-open')) {
            usermenuItems.addClass('animated fadeIn');
         }

      });

      // 3. LEFT MENU LINKS TOGGLE
      $('.sidebar-menu li a.accordion-toggle').click(function(e) {
         if($(this).next().children('li').length == 0 && $(this).hasClass('menu-open')) return;

         // Any menu item with the accordion class is a dropdown submenu. Thus we prevent default actions
         e.preventDefault();

         // Any menu item with the accordion class is a dropdown submenu. Thus we prevent default actions
         if ($('body').hasClass('sb-l-m') && !$(this).parents('ul.sub-nav').length) {
            return;
         }

         // Any menu item with the accordion class is a dropdown submenu. Thus we prevent default actions
         if (!$(this).parents('ul.sub-nav').length) {
            $('a.accordion-toggle.menu-open').next('ul').slideUp('fast', 'swing', function() {
               $(this).attr('style', '').prev().removeClass('menu-open');
            });
         }
         // Any menu item with the accordion class is a dropdown submenu. Thus we prevent default actions
         else {
            var activeMenu = $(this).next('ul.sub-nav');
            var siblingMenu = $(this).parent().siblings('li').children('a.accordion-toggle.menu-open').next('ul.sub-nav')

            activeMenu.slideUp('fast', 'swing', function() {
               $(this).attr('style', '').prev().removeClass('menu-open');
            });
            siblingMenu.slideUp('fast', 'swing', function() {
               $(this).attr('style', '').prev().removeClass('menu-open');
            });
         }

         // Now we expand targeted menu item, add the ".open-menu" class
         // and remove any left over inline jQuery animation styles
         if (!$(this).hasClass('menu-open')) {
            $(this).next('ul').slideToggle('fast', 'swing', function() {
               $(this).attr('style', '').prev().toggleClass('menu-open');
            });
         }


      });
   }

   // Tray related Functions
   var runTrays = function() {

      // Match height of tray with the height of body
      var trayMatch = $('.tray[data-tray-height="match"]');
      if (trayMatch.length) {

         // Loop each tray and set height to match body
         trayMatch.each(function() {
            var Height = $('body').height();
            $(this).height(Height);
         });

      };

      // Debounced resize handler
      var rescale = function() {
         if ($(window).width() < 1000) {
            Body.addClass('tray-rescale');
         }
         else {Body.removeClass('tray-rescale tray-rescale-left tray-rescale-right');}
      }
      var lazyLayout = $.debounce(rescale, 300);

      if (!Body.hasClass('disable-tray-rescale')) {
         // Rescale on window resize
         $(window).resize(lazyLayout);

         // Rescale on load
         rescale();
      }

   }

   // Form related Functions
   var runFormElements = function() {

      // Init Jquery Sortable, if present
      if ($(".sortable").length) {
         $(".sortable").sortable();
         $(".sortable").disableSelection();
      }

      var Tooltips = $("[data-toggle=tooltip]");

      // Init Bootstrap tooltips, if present 
      if (Tooltips.length) {
         if (Tooltips.parents('#sidebar_left')) {
            Tooltips.tooltip({
               container: $('body'),
               template: '<div class="tooltip tooltip-white" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
            });
         } else {
            Tooltips.tooltip();
         }
      }

      // Init Bootstrap Popovers, if present 
      if ($("[data-toggle=popover]").length) {
         $('[data-toggle=popover]').popover();
      }

      // Init Bootstrap persistent tooltips. This prevents a
      // popup from closing if a checkbox it contains is clicked
      $('.dropdown-menu .dropdown-persist').click(function(event) {
         event.stopPropagation();
      });

      // Prevents a dropdown menu from closing when a navigation
      // menu it contains is clicked (panel/tab menus)
      $('.dropdown-menu .nav-tabs li a').click(function(event) {
         event.preventDefault();
         event.stopPropagation();
         $(this).tab('show')
      });

      // if btn has ".btn-states" class we monitor it for user clicks. On Click we remove
      // the active class from its siblings and give it to the button clicked.
      // This gives the button set a menu like feel or state
      if ($('.btn-states').length) {
         $('.btn-states').click(function() {
            $(this).addClass('active').siblings().removeClass('active');
         });
      }
   }
   return {
      init: function(options) {

         // Set Default Options
         var defaults = {
            sbl: "sb-l-o", // sidebar left open onload 
            sbr: "sb-r-c", // sidebar right closed onload

            collapse: "sb-l-m", // sidebar left collapse style
            siblingRope: true
            // Setting this true will reopen the left sidebar
            // when the right sidebar is closed
         };

         // Extend Default Options.
         var options = $.extend({}, defaults, options);

         // Call Core Functions
         runHelpers();
         runAnimations();
         runSideMenu(options);
         runTrays();
         runFormElements();
         runHeader();
      }

   }
}();

// Global Library of Theme colors for Javascript plug and play use  
var bgPrimary = '#4a89dc',
   bgPrimaryL = '#5d9cec',
   bgPrimaryLr = '#83aee7',
   bgPrimaryD = '#2e76d6',
   bgPrimaryDr = '#2567bd',
   bgSuccess = '#70ca63',
   bgSuccessL = '#87d37c',
   bgSuccessLr = '#9edc95',
   bgSuccessD = '#58c249',
   bgSuccessDr = '#49ae3b',
   bgInfo = '#3bafda',
   bgInfoL = '#4fc1e9',
   bgInfoLr = '#74c6e5',
   bgInfoD = '#27a0cc',
   bgInfoDr = '#2189b0',
   bgWarning = '#f6bb42',
   bgWarningL = '#ffce54',
   bgWarningLr = '#f9d283',
   bgWarningD = '#f4af22',
   bgWarningDr = '#d9950a',
   bgDanger = '#e9573f',
   bgDangerL = '#fc6e51',
   bgDangerLr = '#f08c7c',
   bgDangerD = '#e63c21',
   bgDangerDr = '#cd3117',
   bgAlert = '#967adc',
   bgAlertL = '#ac92ec',
   bgAlertLr = '#c0b0ea',
   bgAlertD = '#815fd5',
   bgAlertDr = '#6c44ce',
   bgSystem = '#37bc9b',
   bgSystemL = '#48cfad',
   bgSystemLr = '#65d2b7',
   bgSystemD = '#2fa285',
   bgSystemDr = '#288770',
   bgLight = '#f3f6f7',
   bgLightL = '#fdfefe',
   bgLightLr = '#ffffff',
   bgLightD = '#e9eef0',
   bgLightDr = '#dfe6e9',
   bgDark = '#3b3f4f',
   bgDarkL = '#424759',
   bgDarkLr = '#51566c',
   bgDarkD = '#2c2f3c',
   bgDarkDr = '#1e2028',
   bgBlack = '#283946',
   bgBlackL = '#2e4251',
   bgBlackLr = '#354a5b',
   bgBlackD = '#1c2730',
   bgBlackDr = '#0f161b';


//以下方法从underscore抄到jquery

// 如果用手指一直按住一个弹簧，它将不会弹起直到你松手为止。
// 也就是说当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。
// 接口定义：
/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
 * @param idle   {number}    空闲时间，单位毫秒
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @return {function}    返回客户调用函数
 */
$.debounce = function(func, wait, immediate) {
   // immediate默认为false
   var timeout, args, context, timestamp, result;

   var later = function() {
      // 当wait指定的时间间隔期间多次调用debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
      var last = new Date().getTime() - timestamp;

      if (last < wait && last >= 0) {
         timeout = setTimeout(later, wait - last);
      } else {
         timeout = null;
         if (!immediate) {
            result = func.apply(context, args);
            if (!timeout) context = args = null;
         }
      }
   };

   return function() {
      context = this;
      args = arguments;
      timestamp = new Date().getTime();
      // 第一次调用该方法时，且immediate为true，则调用func函数
      var callNow = immediate && !timeout;
      // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
         result = func.apply(context, args);
         context = args = null;
      }

      return result;
   };
};



// 如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出。
// 也就是会说预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。
// 接口定义：
/**
 * 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
 * @param delay  {number}    延迟时间，单位毫秒
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @return {function}    返回客户调用函数
 */

$.throttle = function(func, wait, options) {
   /* options的默认值
    *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
    *  options.leading = true;
    * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
    *  options.trailing = true;
    * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
    */
   var context, args, result;
   var timeout = null;
   var previous = 0;
   if (!options) options = {};
   var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
   };
   return function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 当到达wait指定的时间间隔，则调用func函数
      // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
      if (remaining <= 0 || remaining > wait) {
         // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
         if (timeout) {
            clearTimeout(timeout);
            timeout = null;
         }
         previous = now;
         result = func.apply(context, args);
         if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
         // options.trailing=true时，延时执行func函数
         timeout = setTimeout(later, remaining);
      }
      return result;
   };
};