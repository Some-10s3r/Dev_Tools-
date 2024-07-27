const Hamburger = document.getElementsByClassName('hamb')[0]
const HambLinks = document.getElementsByClassName('nav-links')[0]
Hamburger.addEventListener('click',()=>{
    HambLinks.classList.toggle('show');
    Hamburger.classList.toggle('show');
})

document.addEventListener('click',(event)=>{
    const target = event.target;
    const isNotClicked = !(Hamburger.contains(target) || HambLinks.contains(target)) 
    if(isNotClicked){
        Hamburger.classList.remove('show');
        HambLinks.classList.remove('show')
    }
})

const MoreBtn = document.getElementById('header-more-button')
const HeaderContent = document.getElementById('header-more-content')
MoreBtn.addEventListener('click',()=>{
    MoreBtn.classList.toggle('header-show');
    HeaderContent.classList.toggle('header-show');
})
