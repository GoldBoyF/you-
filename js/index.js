$(document).ready(function() {

    $('#fullpage').fullpage({
        anchors: ['firstPage', 'myIntroduce', 'myFunction', 'myFunction2', 'myFunction3', 'myDownload', 'myTeam', 'myLink'],
        menu: '#menu',
        scrollingSpeed: 800
    });

    $('.my-iframe').height($(window).height() - 85);

    $('#myJoin').mouseover(function() {
        $('#myJoin').attr('src', 'img/joinusselect.png');
    }).mouseout(function() {
        $('#myJoin').attr('src', 'img/joinus.png');
    });
    $('#myIphone').mouseover(function() {
        $('#myIphone').attr('src', 'img/iphone-download-select.png');
    }).mouseout(function() {
        $('#myIphone').attr('src', 'img/iphone-download.png');
    });
    $('#myAndroid').mouseover(function() {
        $('#myAndroid').attr('src', 'img/android-download-select.png');
    }).mouseout(function() {
        $('#myAndroid').attr('src', 'img/android-download.png');
    });
    $('.people').bind('click',function(){
        $('#blk9 .detail').html($(this).attr("detail"));
        $('#blk9 .username').html($(this).attr("username"));
		$('#icon').attr('src',$(this).attr('src'));
    });

    var t9 = new PopupLayer({trigger:".people",popupBlk:"#blk9",closeBtn:"#close9",
        useOverlay:false,useFx:true,offsets:{x:0,y:0}
    });
    var t10 = new PopupLayer({trigger:"#myJoin",popupBlk:"#blk10",closeBtn:"#close10",
        useOverlay:false,useFx:true,offsets:{x:-260,y:0}
    });
        var effect=function(way){
        if(way == "open"){
            this.popupLayer.css({opacity:0.3}).show(400,function(){
                this.popupLayer.animate({
                    left:($(document).width() - this.popupLayer.width())/2,
                    top:(document.documentElement.clientHeight -
                        this.popupLayer.height())/2 + $(document).scrollTop(),
                    opacity:0.8
                },500,function(){this.popupLayer.css("opacity",0.8)}.binding(this));
            }.binding(this));
        }
        else{
            this.popupLayer.animate({
                left:this.trigger.offset().left,
                top:this.trigger.offset().top,
                opacity:0.1
            },{duration:500,complete:function(){
                this.popupLayer.css("opacity",1);this.popupLayer.hide()}.binding(this)});
        }
    };
    t9.doEffects =effect;
    t10.doEffects =effect;
});
