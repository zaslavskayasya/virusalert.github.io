console.log('js+');

const menuShow = document.querySelector('#menu_show');
menuShow.addEventListener('click', function () {
  let nemu = document.querySelector('#menu')
  nemu.classList.toggle('active')
  console.log('click')
  // body...
})
// var divElement = document.getElementById('viz1586989902560');
// var vizElement = divElement.getElementsByTagName('object')[0]; 
// if ( divElement.offsetWidth > 800 ) 
//     { vizElement.style.width='1024px';vizElement.style.height='795px';} 
// else if ( divElement.offsetWidth > 500 )
//  { vizElement.style.width='1024px';vizElement.style.height='795px';} 
// else { vizElement.style.width='100%';vizElement.style.height='1427px';}      
//  var scriptElement = document.createElement('script');        
// scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';         
//  vizElement.parentNode.insertBefore(scriptElement, vizElement);
// находим элемент который обертка
// let visibleBlock = document.querySelector('#visibleBlock');
// // находим его положение относительно топа страницы
// let topPositionOfBlock = visibleBlock.getBoundingClientRect().top ;


// let childrensArray = document.querySelectorAll('.elemToShow');
// console.log(childrensArray);

// let timeDelay = 1.3;

// let showFunction = function(){
//   visibleBlock.classList.add('makeVisible');
//     console.log('more'); 

//     childrensArray.forEach(function(item, index, array) {
//         item.style.transitionDelay =  1 * 1.5 + 'ms';
//     });
//     // console.log(childrensArray[1]);

//     // for (let i = 0; i < childrensArray.length; i++) {
//     //   childrensArray[i].style.transitionDelay =  1 * 1.5 + 'ms';
//     //   console.log(childrensArray[i]);
//     //   // copy.push(items[i])
//     // }
// }

// // слушаем скролл странцы
// window.addEventListener('scroll', function() {    
//   //если проскроллено от верха больше высоты элемента, то
//   if( window.pageYOffset >=  topPositionOfBlock ){
//     // добавляем класс о том, что есть совпадение 
//        showFunction();
//   }
// });


var shows = document.getElementsByClassName('show_on_scroll');
for (var i = shows.length - 1; i >= 0; i--) {
    var els = shows[i].getElementsByClassName('in ');
    // console.log("элементы " + els);
    for (var i1 = els.length - 1; i1 >= 0; i1--) {
        // console.log("один " + els);
        els[i1].style.transitionDelay = i1 * 400 + 'ms';
    }
}

// show steps effects
var show = new Array();
for (var i = shows.length - 1; i >= 0; i--) {
    show.push(shows[i]);
}

function showFunc() {
    if (show.length > 0) {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        var scrolled_n = scrolled + window.innerHeight - (window.innerHeight / 4);
        for (var i = 0; i < show.length; i++) {
            if (scrolled_n > show[i].getBoundingClientRect().top + scrolled) {
                show[i].classList.add('visible');
                show.splice(i, 1);
            }
        }
    }
}
window.onscroll = function() {
    showFunc()
}



