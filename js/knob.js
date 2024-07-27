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

knobs.forEach((knob,index)=>{
    let knobMouvement = knobControl(knob)
    knob.addEventListener('pointerdown',(e)=>{
        knobMouvement;
        knob.setPointerCapture(e.pointerId)
        knob.addEventListener('pointermove', knobMouvement);
    });
    knob.addEventListener('pointerup',()=>{
        knob.removeEventListener('pointermove',knobMouvement)
    });
    knob.addEventListener('pointerleave',()=>{
        knob.removeEventListener('pointermove',knobMouvement)
    });
    
})
