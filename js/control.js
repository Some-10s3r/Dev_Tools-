//color control:
const color = document.querySelector('#color')
color.addEventListener('input',e=>{
    const mainCol = e.target.value;
    const mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-bg');
    document.documentElement.style.setProperty('--main-bg',mainCol);
    setShadowColors(mainColor)
})
//darken and lighten functions:
const darken= (r,g,b)=>{
    return `rgb(${Math.round(r *0.8)},${Math.round(g*0.8)},${Math.round(b*0.8)})`
}
const Lighten = (r,g,b)=>{
    return `rgb(${Math.round(r *1.5)},${Math.round(g*1.5)},${Math.round(b*1.5)})`
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
