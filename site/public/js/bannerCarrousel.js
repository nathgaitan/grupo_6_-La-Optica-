if(document.querySelector('body.home') || document.querySelector('body.bannerList')) {

  new Glider(document.querySelector('.carousel-banner'), {
      // Mobile-first defaults
      slidesToShow: 1,
      slidesToScroll: 1,
      scrollLock: true,
      dots: '.b-dots',
      arrows: {
        prev: '.banner-prev',
        next: '.banner-next'
      }
    });

}
