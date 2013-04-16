



function getXScale(totalWidth,d){

    var xValue = totalWidth / d.length;
    return xValue;
}

function getYScale(totalHeight,d){
    var max = Array.max(d);

    var yValue = totalHeight / max;
    return yValue;
}




var it;
$(function(){

    // it     = {};
    // it.$el = $('#chart');
    // it.w   = it.$el.width();
    // it.h   = it.$el.height();
    // it.padding = 10;
    // it.scaleX = getXScale(it.w,data);

    // it.scaleY = getYScale(it.h,data);





    // function getXY(x,y){
    //     var x = x * it.scaleX ;
    //     var y = it.h - (it.scaleY * y);

    //     return {'x': x, 'y': y};
    // }



    // var paper = Raphael(it.$el.get(0), it.w, it.h);


    // $.each(data, function(i,v){
    //     var c = getXY(i,v);

    //     paper.circle(c.x,c.y,5);
    // });



});







