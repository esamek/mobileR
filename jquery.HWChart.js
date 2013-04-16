

Array.max = function( array ){
    return Math.max.apply( Math, array );
};
Array.min = function( array ){
    return Math.min.apply( Math, array );
};



(function($){

    var defaultOptions = {
        'series': [30,23,29,54,298,232,11, 98, 800],
        'padding': 10,
        'type': 'bar',
        'style': {
            'stroke' : '#0085ca'
        },
        'xAxis': 'auto',
        'yAxis': 5
    };


    function HWChart(el,options){
        this.$el = $(el);
        this.options = options || {};

        this.init();
        return this;
    }

    var methods = {


        init: function(){
            var that = this;
            this.options = $.extend(defaultOptions,that.options);
            this.w   = this.$el.width() - (this.options.padding * 2);
            this.h   = this.$el.height() - (this.options.padding * 2);
            this.paper = Raphael(that.$el.get(0));
            this._data_ = this.options.series;

            this.draw();

        },

        draw: function(){

            var type = this.options.type;

            switch(type){
                case 'bar':

                this.barGraph();
                break;
            }

            this.drawAxis();



        },

        getXScale: function(){
            var space = this.w / this.options.series.length;
            this.barWidth = this.options.type == 'bar' ? space / 4 : 0;
            return this.w / this.options.series.length + this.barWidth;
        },

        getYScale: function(){
            var that = this;
            var max = Array.max(that.options.series);

            return this.h / max;
        },

        getX: function(x){
            return x * this.getXScale();
        },
        getY : function(y){
            return this.h - y * this.getYScale() ;
        },

        // single array
        getXY: function(x,y){
            var x = this.getX(x);
            var y = this.getY(y);

            return {'x': x, 'y': y};
        },

        drawAxis: function(){
            var that   = this,
                d      = this._data_,
                yScale = this.getYScale(),
                count  = this.options.yAxis,
                h      = this.h ,
                interval = h / count;



            function pathStringY(y){
                var start = that.getXY(0,y);
                var end = that.getXY(that.w,y);
                var path = [
                    ['M', start.x, start.y],
                    ['L', end.x, end.y]
                ];
                return path;
            }



            var alpha = 0;
            for(var i = 1; i <= count ;i++){


                var p = pathStringY(alpha);
                var axe = this.paper.path(p);

                var v = Math.floor(that.getYScale() * alpha );
                var labelX = axe.getBBox().x + this.options.padding;
                var labelY = axe.getBBox().y + this.options.padding;
                var label = this.paper.text(labelX, labelY,v).attr('text-anchor','start');
                console.log(alpha,interval,v);
                alpha +=  i * interval;
            }





        },






        // draw barGraph

        barGraph: function(){
            var that = this,
                   d = this._data_;

            function pathString(i,v){
                var zeX = (i+1) * v;
                var start = that.getXY(i,0);
                var end = that.getXY(i,v);

                var path = [
                    ['M', start.x, start.y],
                    ['L', end.x, end.y]
                ];
                return path;
            }


            $.each(d, function(i,v){

                that.paper.path(pathString(i,v)).attr(that.options.style)
                                                .attr('stroke-width',that.barWidth);


            });







        }




    };

    $.extend(HWChart.prototype,methods);

    $.fn.HWChart = function(options){
        return new HWChart(this,options);
    };





})(jQuery);


var it;
$(function(){
    it = $('#chart').HWChart();
});