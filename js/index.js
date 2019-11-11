const projects = [
    {
      id: 1,
      title: "Reforma residencial",
      info: "julho 2019",
      img: "https://www.simplesdecoracao.com.br/wp-content/uploads/2018/01/habitissimocuba-de-sobrepor-1529743.jpg",
      imgs: [
        "https://www.simplesdecoracao.com.br/wp-content/uploads/2018/01/habitissimocuba-de-sobrepor-1529743.jpg",
        "https://www.simplesdecoracao.com.br/wp-content/uploads/2018/01/habitissimocuba-de-sobrepor-1529743.jpg",
        "https://www.simplesdecoracao.com.br/wp-content/uploads/2018/01/habitissimocuba-de-sobrepor-1529743.jpg"
      ]
    },
    {
      id: 2,
      title: "Fachada empresarial",
      info: "janeiro 2019",
      img: "https://www.simplesdecoracao.com.br/wp-content/uploads/2018/01/habitissimocuba-de-sobrepor-1529743.jpg"
    },
    {
      id: 3,
      title: "Design de interiores",
      info: "dezembro 2018",
      img: "https://www.simplesdecoracao.com.br/wp-content/uploads/2018/01/habitissimocuba-de-sobrepor-1529743.jpg"
    },
    
    {
      id: 4,
      title: "Design de interiores",
      info: "dezembro 2018",
      img: "https://www.simplesdecoracao.com.br/wp-content/uploads/2018/01/habitissimocuba-de-sobrepor-1529743.jpg"
    },
    
    {
      id: 5,
      title: "Design de interiores",
      info: "dezembro 2018",
      img: "https://www.simplesdecoracao.com.br/wp-content/uploads/2018/01/habitissimocuba-de-sobrepor-1529743.jpg"
    },
    
    {
      id: 6,
      title: "Design de interiores",
      info: "dezembro 2018",
      img: "https://www.simplesdecoracao.com.br/wp-content/uploads/2018/01/habitissimocuba-de-sobrepor-1529743.jpg"
    }
  ];

$(document).ready(function() {
  
  insertProjects(projects);
  
  $('.list-of-projects').masonry({
    // set itemSelector so .grid-sizer is not used in layout
    itemSelector: '.each-project-container',
    // use element for option
    columnWidth: '.grid-sizer',
    percentPosition: true
  });


  $('.scrollTo').on('click', scrollTo);
  
  $(window).scroll(function() {
    let scroll = $(window).scrollTop();
    if(scroll >= window.innerHeight - 300) {
      $('nav').addClass('scrolled');
    }
    else {
      $('nav').removeClass('scrolled');

      if($('nav').find('.collapse.show').length) {
        $('.navbar-toggler').click();
      }
    }
  });


  // $(document).on('click', '.each-project', openProject);
});


function scrollTo(e) {
  e.preventDefault();

  let href = $(e.target).attr('href');
  let topMargin = 0;

  if(href == "#AboutUs") topMargin = 180;

  $([document.documentElement, document.body]).animate({
    scrollTop: $(href).offset().top - topMargin
  }, 800);

  if($('nav').find('.collapse.show').length) {
    $('.navbar-toggler').click();
  }
}

function insertProjects(projects) {
  let cont = 0;
  let height;

  projects.forEach(element => {
    cont += 1;

    let mock = $('.each-project-container#mock').clone();
    mock.attr('data-project-id', element.id);
    mock.find('.img').css('backgroundImage', `url(${element.img})`);
    mock.find('.title').html(element.title);
    mock.find('.info').html(element.info);

    if(cont % 2 === 0) 
      height = 300;
    else 
      height = 500;

      mock.find('.img').css('height', height)

    $('.list-of-projects').append(mock.removeAttr('id'));
  });

  $("#mock").remove();
}


function openProject(e) {
  let projectId = parseInt($(e.target).parents('.each-project-container').attr('data-project-id'));

  let project = projects.map(function(item) {
    if(item.id == projectId) return item;
  })[0];

  let modal = $("#ModalMock").clone();

  modal.find('.modal-title').html(project.title);
  
  //imgs
  project.imgs.forEach(function(img) {
    let eachCarouselItem = $("#ModalMock").find('#CarouselItemMock').clone();
    eachCarouselItem.find('img').attr('src', img).removeAttr('id');
    modal.find('.carousel-inner').append(eachCarouselItem.removeAttr('id'));
  });
  modal.find("#CarouselItemMock").remove();
  modal.find('.carousel-item').eq(0).addClass('active');
  //end imgs

  modal.find("#carouselExampleIndicators").attr('id', `carouselExampleIndicators${project.id}`).find('.carousel-indicators').find('li').attr('data-target', `carouselExampleIndicators${project.id}`);




  modal.modal({
    backdrop: 'static'
  });
}