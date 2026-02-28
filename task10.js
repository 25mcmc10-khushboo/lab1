(function($){

    $.fn.customTabs = function(options){

        var settings = $.extend({
            activeClass: "active",
            animationSpeed: 300,
            defaultTab: 0
        }, options);

        return this.each(function(){

            var container = $(this);
            var tabs = container.find(".tab-links li");
            var panels = container.find(".tab-panel");

            function activateTab(index){

                tabs.removeClass(settings.activeClass);
                panels.stop(true,true).hide();

                tabs.eq(index).addClass(settings.activeClass);
                panels.eq(index).fadeIn(settings.animationSpeed);

                
                var tabId = tabs.eq(index).data("tab");
                window.location.hash = tabId;
            }

            
            tabs.on("click", function(){
                activateTab($(this).index());
            });

            
            tabs.attr("tabindex", "0");

            tabs.on("keydown", function(e){

                var currentIndex = $(this).index();

                if(e.key === "ArrowRight"){
                    var next = (currentIndex + 1) % tabs.length;
                    tabs.eq(next).focus().click();
                }

                if(e.key === "ArrowLeft"){
                    var prev = (currentIndex - 1 + tabs.length) % tabs.length;
                    tabs.eq(prev).focus().click();
                }
            });

        
            function checkHash(){

                var hash = window.location.hash.substring(1);

                if(hash){
                    tabs.each(function(i){
                        if($(this).data("tab") === hash){
                            activateTab(i);
                        }
                    });
                } else {
                    activateTab(settings.defaultTab);
                }
            }

            checkHash();
            $(window).on("hashchange", checkHash);

        });
    };

})(jQuery);