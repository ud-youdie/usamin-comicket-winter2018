$(function(){

    $("<div id='waiting'>" +
        "<p>" +
          "Loading… <span id='count'></span><br><br>" +
          "<strong>※最初の読み込み時にいっぱいダウンロードするので5分以上かかる場合があります</strong><br>" +
          "<strong>約180MBくらいあるので通信容量に気を付けてください</strong><br>" +
        "</p>" +
    "</div>").css({
        "position": "fixed",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "text-align": "center",
        "background-color": "#ffffff"
    }).appendTo("body");

    const danceImgPath = "./src/img/dance/usamin-dance_{0}.png";
    const danceFrameCount = 509;

    const touchImgPath = "./src/img/touch/usamin-touch_{0}.png";
    const touchFrameCount = 209;

    var loadCounter = 0;

    let appendView = "#view";
    let appendImgPath = danceImgPath;
    let idPrefix = "usamin-dance_";
    let idCount = 0;
    let idTemplate;
    for (let i = 0; i <= danceFrameCount + touchFrameCount + 1; i++) {
        if(danceFrameCount < i) {
            appendView = "#touchView";
            appendImgPath = touchImgPath;
            idPrefix = "usamin-touch_";
            idCount = i - danceFrameCount - 1;
        }else{
            idCount = i;
        }
        idTemplate = ('000' + idCount).slice( -3 );
        $("<img />").attr({
            "id": idPrefix + idTemplate,
            "src": appendImgPath.replace("{0}", idTemplate)
        }).one("load",()=>{
            loadCounter += 1;
            $("#count").text(Math.round(loadCounter / (danceFrameCount + touchFrameCount + 2) * 100) + "%");
        }).appendTo(appendView);
    }

    var $danceImages = $("#view").children();
    $danceImages.hide();
    $danceImages.eq(0).show();

    var $touchImages = $("#touchView").children();
    $touchImages.hide();
    $touchImages.eq(0).show();
    $("#touchView").hide();

    var itv = setInterval(()=>{
        if (danceFrameCount + touchFrameCount  + 1< loadCounter) {
            clearInterval(itv);
            $("#waiting").hide();
        }
    }, 10);

    var $danceRange = $("#danceRange");
    let danceFrame = 0;
    const defaultLoop = ()=>{
        $danceRange.val(danceFrame).trigger("input");
        danceFrame++;
        if(danceFrameCount < danceFrame) danceFrame = 0;
    }

    var defitv = setInterval(defaultLoop, 30);

    //let isTouchAnimating = false;
    let touchFrame= 0;
    let touchLoop;
    var $touchRange = $("#touchRange");
    $("#parentView").on("click",()=>{
        //if(isTouchAnimating) return;
        clearInterval(touchLoop);
        danceFrame = 0;
        $danceRange.val(danceFrame).trigger("input");

        touchFrame = 0;
        $("#view").hide();
        $("#touchView").show();
        clearInterval(defitv);
        touchLoop = setInterval(()=>{
            //isTouchAnimating = true;
            $touchRange.val(touchFrame).trigger("input");
            touchFrame++;
            if(touchFrameCount < touchFrame){
                clearInterval(touchLoop);
                //isTouchAnimating = false;
                defitv = setInterval(defaultLoop, 30);
                $("#view").show();
                $("#touchView").hide();
            }
        }, 30);
    });

    $danceRange.attr("max", danceFrameCount
    ).css({
        "width": "500px"
    }).on("input", ()=>{
        var val = $danceRange.val();
        var id = "usamin-dance_" + ('000' + val).slice( -3 );
        $danceImages.hide();
        $danceImages.filter("#" + id).show();
    });

    $touchRange.attr("max", touchFrameCount
    ).css({
        "width": "500px"
    }).on("input", ()=>{
        var val = $touchRange.val();
        var id = "usamin-touch_" + ('000' + val).slice( -3 );
        $touchImages.hide();
        $touchImages.filter("#" + id).show();
    });

});

$(function() {
    var ripple, ripples, RippleEffect,loc, cover, coversize, style, x, y, i, num;
    
    ripples = document.querySelectorAll('.ripple');
  
    RippleEffect = function(e) {
        ripple = this;//クリックされたボタンを取得
        cover = document.createElement('span');//span作る
        coversize = ripple.offsetWidth;//要素の幅を取得
        loc = ripple.getBoundingClientRect();//絶対座標の取得
        x = e.pageX - loc.left - window.pageXOffset - (coversize / 2);
        y = e.pageY - loc.top - window.pageYOffset - (coversize / 2);
        pos = 'top:' + y + 'px; left:' + x + 'px; height:' + coversize + 'px; width:' + coversize + 'px;';
    
        //spanを追加
        ripple.appendChild(cover);
        cover.setAttribute('style', pos);
        cover.setAttribute('class', 'rp-effect');//クラス名追加
        
        //しばらくしたらspanを削除
        setTimeout(()=>{
            var list = document.getElementsByClassName( "rp-effect" ) ;
            for(var i =list.length-1;i>=0; i--){//末尾から順にすべて削除
                list[i].parentNode.removeChild(list[i]);
            }
        }, 2000)
    };

    for (i = 0, num = ripples.length; i < num; i++) {
      ripple = ripples[i];
      ripple.addEventListener('mousedown', RippleEffect);
    }
  });
  