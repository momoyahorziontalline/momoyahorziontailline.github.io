//中間文字
anime.timeline({ loop: true })
.add({
    targets: '.letter',
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: function (el, i) {
        return 70 * i;
    }
}).add({
    targets: '.letters',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
});
