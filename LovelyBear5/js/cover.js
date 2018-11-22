//cover
var cover = new TimelineMax();
cover.to("#cover", 0, { center: 0 })
.to("#cover", 5.0, { opacity: 0, scale: 1 }, 0.4)
.to("#section_cover", 5.0, { height: 0 }, 2)
.to("#cover", 5.0, { height: 0 }, 1.5);
