/*
 * Author: HondaDai
 * 2014/03/09
 */ 



;(function($) {
  
  $.photowall = function(args) {
    //var args = Array.prototype.slice.call(arguments);
    /*var args = [
      "http://pic.pimg.tw/zeroyaking/1384841067-786048168_s.jpg"
      "http://localhost:1337/images/temp/post-img-1.jpg",
      "http://localhost:1337/images/temp/post-img-2.jpg",
      "http://localhost:1337/images/temp/post-img-3.jpg",
      "http://localhost:1337/images/temp/post-img-4.jpg",
      "http://localhost:1337/images/temp/post-img-5.jpg",
      "http://localhost:1337/images/temp/post-img-7.jpg",
      "http://localhost:1337/images/temp/post-img-10.jpg",
      "http://localhost:1337/images/temp/post-img-11.jpg"];*/
    var minphoto = 100;
    var col_num = 10;
    var bleed_size = 1;
    var images = [];
    var content_width = $(document).width()*1.5;
    var content_height = $(document).height()*1.5;

    var cover_layer = $("<div />").css({
      background: 'rgba(0, 0, 0, 0.6)',
      position: 'fixed',
      overflow: 'hidden',
      width: content_width,
      height: content_height,
      padding: 0,
      margin: 0,
      top: 0
    });

    var img_item = $("<img />").css({
      width: '100%',
      padding: 0,
      margin: 0
    });

    var img_containter = $("<div class='animated filpInY'/>").css({
      position: 'absolute',
      width: content_width/col_num,
      padding: 0,
      margin: 0,
    });

    $("body").append(cover_layer);
    
    while (images.length <= minphoto) {
      for (var i in args) {
        var img = args[i];
        var ic = img_containter.clone();
        var ii = img_item.clone();
        ii.attr("src", img);
        ic.append(ii);

        images.push(ic);
      }
    }


    images.forEach(function(ic, i){
      if (i - col_num < 0) {
        ic.css({
          top: 0,
          left: i%col_num * content_width/col_num
        })
      } else {
        var upper = images[i - col_num];
        var update = function(){
          //console.log(i - col_num, upper.offset().top , upper.height())
          ic.css({
            top: upper.offset().top + upper.height() - bleed_size,
            left: i%col_num * content_width/col_num
            //opacity: 0
          })
          //.transition({ opacity: 0.5, rotateY: 180}).transition({ opacity: 1, rotateY: 360})
          //.show()
          .trigger('move');

        };

        upper.children("img").on({
          load: update
        })
        upper.on({
          move: update
        })
        
        
      }

        cover_layer.append(ic);
    });
        //var img = args[i];
        

    var animation = function() {
      console.log("animation");
      cover_layer.css({
        x: 0,
        y: 0
      }).transition({
        y: -content_height*0.2,
        x: -content_width*0.2
      }, 50000, 'linear', animation);
    };

    animation();

    window.animation = animation;

    //window.images = images;
  }

  //$.photowall();


})(jQuery);