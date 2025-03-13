const $UI = {
    partSlider: document.querySelector(".footer-slider-part"),
    partSliderText: document.querySelector(".footer-slider-part-text"),
    awardSlider: document.querySelector(".footer-slider-award"),
    awardSliderText: document.querySelector(".footer-slider-award-text"),
};

const createImageSwiper = ($elementImage, $elementText) => {
    const imageSwiper = new Swiper($elementImage, {
        effect: "creative",
        grabCursor: true,
        autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true,
            // reverseDirection: true,
        },
        speed: 1000,
        loop: true,
        // direction: "horizontal",
        // slidesPerView: 2,
        // initialSlide: 2,
        // rewind: false,
        // centeredSlides: true,
        // slidesPerGroup: 2,
        loopAdditionalSlides: 3,
        coverflowEffect: {
            rotate: 0,
            scale: 0.8,
            slideShadows: false,
        },
        cardsEffect: {
            rotate: false,
            slideShadows: false,
            perSlideOffset: 10,
            stretch: '40%',
        },
        creativeEffect: {
            prev: {
                shadow: false,
                translate: [0, 0, -400],
                scale: 0.7,
            },
            next: {
                translate: ["30%", '5%', 0],
                scale: 0.65,

            },
        },
    });

    const textSwiper = new Swiper($elementText, {
        effect: "fade",
        speed: 1000,
        centeredSlides: true,
        fadeEffect: {
            crossFade: true,
        },
        noSwiping: true,
        longSwipes: false,
        allowTouchMove: false,
        shortSwipes: false,
    });
    // textSwiper.controller.control = imageSwiper;
    // imageSwiper.controller.control = textSwiper;

    imageSwiper.on("slideChange", ({ activeIndex, realIndex }) => {
        // console.log(realIndex);
        textSwiper.slideTo(realIndex);
    });


    return { imageSwiper, textSwiper };
};

const createAwardSwiper = ($elementImage, $elementText) => {
    const imageSwiper = new Swiper($elementImage, {
        effect: "creative",
        grabCursor: true,
        autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true,
        },
        speed: 1500,
        loop: true,
        direction: "vertical",
        slidesPerView: 1,
        loopAdditionalSlides: 3,
        creativeEffect: {
            prev: {
                shadow: false,
                translate: [0, '-25px', 0],
                scale: 0.9,
            },
            next: {
                translate: [0, '100%', 0],
                scale: 0.9,
            },
        },
    });

    const textSwiper = new Swiper($elementText, {
        effect: "fade",
        speed: 1000,
        centeredSlides: true,
        fadeEffect: {
            crossFade: true,
        },
        noSwiping: true,
        longSwipes: false,
        allowTouchMove: false,
        shortSwipes: false,
    });

    imageSwiper.on("slideChange", ({ activeIndex, realIndex }) => {
        textSwiper.slideTo(realIndex);
    });
    return { imageSwiper, textSwiper };
};

const $SLIDERS = {
    part: createImageSwiper($UI.partSlider, $UI.partSliderText),
    award: createAwardSwiper($UI.awardSlider, $UI.awardSliderText),
};