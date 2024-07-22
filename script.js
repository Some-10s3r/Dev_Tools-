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

//knob logic
const knobs = document.querySelectorAll('.knob');



const knobControl = (knob) => (e) =>{
    const rect = knob.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const deltaX = centerX - mouseX;
    const deltaY = centerY - mouseY;

    let deg = Math.round(Math.atan2(deltaY, deltaX) * (180 / Math.PI))-80;
    if (deg < 0) {
        deg += 360;
    }
    
    knob.style.transform = `rotate(${deg}deg)`;

    return Math.max(Math.min(deg, 360), 0);
};

knobs.forEach(knob=>{
    let knobMouvement = knobControl(knob)
    knob.addEventListener('pointerdown',e=>{
        knob.addEventListener('mousemove', knobMouvement);
    })
    knob.addEventListener('pointerup',e=>{
        knob.removeEventListener('mousemove',knobMouvement)
    })
    
})