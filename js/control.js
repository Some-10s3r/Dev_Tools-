const spans = document.querySelectorAll('.code p span');
const knobs = document.querySelectorAll('.knob');
const insetBtns = document.querySelectorAll('.control-buttons');
const res = document.querySelector('.final-element');
let copyText = document.querySelector('.code').textContent;
//color control:
const color = document.querySelector('#color')
color.addEventListener('input',e=>{
    const mainCol = e.target.value;
    const mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-bg');
    document.documentElement.style.setProperty('--main-bg',mainCol);
    setShadowColors(mainColor)
    spans[0].innerHTML = getComputedStyle(document.documentElement).getPropertyValue('--main-bg');
    spans[8].innerHTML = toHex(getComputedStyle(document.documentElement).getPropertyValue('--shadows'));
    spans[15].innerHTML = toHex(getComputedStyle(document.documentElement).getPropertyValue('--highlights'));
    res.style.boxShadow = `${spans[2].innerHTML}${spans[3].innerHTML}${spans[4].innerHTML}${spans[5].innerHTML}${spans[6].innerHTML}${spans[7].innerHTML}${spans[8].innerHTML},${spans[9].innerHTML}${spans[10].innerHTML}${spans[11].innerHTML}${spans[12].innerHTML}${spans[13].innerHTML}${spans[14].innerHTML}${spans[15].innerHTML}`;
})
//darken and lighten functions:
const darken= (r,g,b)=>{
    return `rgb(${Math.round(r *0.8)},${Math.round(g*0.8)},${Math.round(b*0.8)})`
}
const Lighten = (r,g,b)=>{
    return `rgb(${Math.round(r *1.1)},${Math.round(g*1.1)},${Math.round(b*1.1)})`
}
//set secondary colors:
const SecColor = (r,g,b) =>{
    return `rgb(${Math.round(r *1.25)},${Math.round(g*1.25)},${Math.round(b*1.25)})`
}

//set boxshadow colors:
const setShadowColors = mainColor =>{
    const r = parseInt(mainColor.substring(1,3),16);
    const g = parseInt(mainColor.substring(3,5),16);
    const b = parseInt(mainColor.substring(5,7),16);
    
    const luma = (r*0.3 + g*0.5 + b*0.1)/255
    const textCol = luma <= 0.5 ? '#fff' : '#000' 
    const lowShad = darken(r,g,b); 
    const highShad = Lighten(r,g,b);
    const SecCol = SecColor(r,g,b);
    const DarkSecCol = darken(parseInt(SecCol.substring(1,3),16),parseInt(SecCol.substring(3,5),16),parseInt(SecCol.substring(5,7),16))
    document.documentElement.style.setProperty('--text-color',textCol)
    document.documentElement.style.setProperty('--shadows',lowShad);
    document.documentElement.style.setProperty('--highlights',highShad);
    document.documentElement.style.setProperty('--sec-bg',SecCol);
    document.documentElement.style.setProperty('--dark-sec-bg',DarkSecCol);
}
//control inset:(span[2,6])

const updateSpans = (text) => {
    spans[2].innerHTML = text;
    spans[9].innerHTML = text;
};
insetBtns[0].addEventListener('click', () => {
    updateSpans('inset ');
    res.style.boxShadow = `${spans[2].innerHTML}${spans[3].innerHTML}${spans[4].innerHTML}${spans[5].innerHTML}${spans[6].innerHTML}${spans[7].innerHTML}${spans[8].innerHTML},${spans[9].innerHTML}${spans[10].innerHTML}${spans[11].innerHTML}${spans[12].innerHTML}${spans[13].innerHTML}${spans[14].innerHTML}${spans[15].innerHTML}`;
});
insetBtns[1].addEventListener('click', () =>{
    updateSpans('');
    res.style.boxShadow = `${spans[2].innerHTML}${spans[3].innerHTML}${spans[4].innerHTML}${spans[5].innerHTML}${spans[6].innerHTML}${spans[7].innerHTML}${spans[8].innerHTML},${spans[9].innerHTML}${spans[10].innerHTML}${spans[11].innerHTML}${spans[12].innerHTML}${spans[13].innerHTML}${spans[14].innerHTML}${spans[15].innerHTML}`;
});

//rgb to Hex 
const toHex= (colRGB)=>{
    const rgb = colRGB.substring(4,colRGB.length-1).split(',');
    let r = parseInt(rgb[0].trim(),10);
    let g = parseInt(rgb[1].trim(),10);
    let b = parseInt(rgb[2].trim(),10);
    
    let hexR = r.toString(16).padStart(2,'0');
    let hexG = g.toString(16).padStart(2,'0');
    let hexB = b.toString(16).padStart(2,'0');

    return `#${hexR}${hexG}${hexB}`
}
//set operators for box-shadow:

//knob logic
const knobControl = (knob) => (e) =>{
    const screenHeight = document.querySelector('.screen').offsetHeight;
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
    let contDeg =Math.max(Math.min(deg, 360), 0) > 320 ? 360: Math.max(Math.min(deg, 360), 0);
    const prop = knob.id;
    if(prop == "Size"){
        res.style.height = `${Math.floor(contDeg/360*80)<=40?'40':Math.floor(contDeg/360*80)*screenHeight/100}px`
    }else if(prop == "Radius"){
        let Radius = `${Math.floor(contDeg/360*100)==100?'50%':Math.floor(contDeg/360*100)+'px'}`;
        spans[1].innerHTML = Radius;
        res.style.borderRadius = Radius;
    }else if(prop == "Distance") {
        let Distance = `${Math.floor(contDeg/360*20)}px `
        spans[4].innerHTML= Distance;
        spans[6].innerHTML= Distance;
        spans[11].innerHTML= Distance;
        spans[13].innerHTML= Distance;
    }else{
        let Blur = `${Math.floor(contDeg/360*60)}px `;
        spans[7].innerHTML = Blur;
        spans[14].innerHTML = Blur;
    }
    copyText = document.querySelector('.code').textContent;
    res.style.boxShadow = `${spans[2].innerHTML}${spans[3].innerHTML}${spans[4].innerHTML}${spans[5].innerHTML}${spans[6].innerHTML}${spans[7].innerHTML}${spans[8].innerHTML},${spans[9].innerHTML}${spans[10].innerHTML}${spans[11].innerHTML}${spans[12].innerHTML}${spans[13].innerHTML}${spans[14].innerHTML}${spans[15].innerHTML}`;
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


//the copy btns logic:
let btns = [document.querySelector('.copyBtn'),document.querySelector('.copyBtn2')]


btns.forEach(btn =>{
    btn.addEventListener('click',()=>{
        navigator.clipboard.writeText(copyText)      
    })
})

//side-buttons logic:
let sideBtns = document.querySelectorAll('.side');
let sideSpans = [spans[3],spans[5],spans[10],spans[12]];

sideBtns.forEach(sideBtn=>{
    sideBtn.addEventListener('click',()=>{
        sideBtns.forEach(sideBtnRm=>{sideBtnRm.classList.remove('side-clicked')});
        sideSpans.forEach(span=>{span.innerHTML= '';});
        sideBtn.classList.add('side-clicked');
    })
})
//side spns are the(4,6,11,13)th
sideBtns[0].addEventListener('click',()=>{
    sideSpans[2].innerHTML='-';
    sideSpans[3].innerHTML='-';
    res.style.boxShadow = `${spans[2].innerHTML}${spans[3].innerHTML}${spans[4].innerHTML}${spans[5].innerHTML}${spans[6].innerHTML}${spans[7].innerHTML}${spans[8].innerHTML},${spans[9].innerHTML}${spans[10].innerHTML}${spans[11].innerHTML}${spans[12].innerHTML}${spans[13].innerHTML}${spans[14].innerHTML}${spans[15].innerHTML}`;    
});
sideBtns[1].addEventListener('click',()=>{
    sideSpans[0].innerHTML='-';
    sideSpans[3].innerHTML='-';
    res.style.boxShadow = `${spans[2].innerHTML}${spans[3].innerHTML}${spans[4].innerHTML}${spans[5].innerHTML}${spans[6].innerHTML}${spans[7].innerHTML}${spans[8].innerHTML},${spans[9].innerHTML}${spans[10].innerHTML}${spans[11].innerHTML}${spans[12].innerHTML}${spans[13].innerHTML}${spans[14].innerHTML}${spans[15].innerHTML}`;    
});
sideBtns[2].addEventListener('click',()=>{
    sideSpans[0].innerHTML='-';
    sideSpans[1].innerHTML='-';
    res.style.boxShadow = `${spans[2].innerHTML}${spans[3].innerHTML}${spans[4].innerHTML}${spans[5].innerHTML}${spans[6].innerHTML}${spans[7].innerHTML}${spans[8].innerHTML},${spans[9].innerHTML}${spans[10].innerHTML}${spans[11].innerHTML}${spans[12].innerHTML}${spans[13].innerHTML}${spans[14].innerHTML}${spans[15].innerHTML}`;    
});
sideBtns[3].addEventListener('click',()=>{
    sideSpans[1].innerHTML='-';
    sideSpans[2].innerHTML='-';
    res.style.boxShadow = `${spans[2].innerHTML}${spans[3].innerHTML}${spans[4].innerHTML}${spans[5].innerHTML}${spans[6].innerHTML}${spans[7].innerHTML}${spans[8].innerHTML},${spans[9].innerHTML}${spans[10].innerHTML}${spans[11].innerHTML}${spans[12].innerHTML}${spans[13].innerHTML}${spans[14].innerHTML}${spans[15].innerHTML}`;    
})