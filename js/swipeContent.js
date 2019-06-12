/* 滑动内容 */
;(function($, window, document, undefined) {
	function sliderResize($slider) {
			var $sliderParent = $slider.parent();
			var height = $sliderParent.get(0).offsetHeight;
			$sliderParent.height(height);
			$slider.find(".swipe-wrap").height($slider.height());
		}
	$.fn.swipeContent = function(options) {
		var $slider = this;
		var $sliderParent = $slider.parent();
		$sliderParent.addClass("swipe-adaptation");
		sliderResize($slider);
		$(window).resize(function() {
			sliderResize($slider);
		});
		Swipe($slider[0], options);
	};
})(jQuery, window, document); 


