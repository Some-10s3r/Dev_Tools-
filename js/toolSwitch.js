let toolsLinks = document.querySelectorAll('.nav-links li');
let headerTitle = document.querySelector('.header-title p');
let headerContent = document.querySelector('.header-content');
let SetScreen = document.querySelector('.screen');
toolsLinks.forEach(toolLink=>{
    toolLink.addEventListener('click',()=>{
        document.body.classList.remove('NeuTool');
        document.body.classList.remove('BlobTool');
        document.body.classList.remove('GradTool');
        toolsLinks.forEach(e=>{e.style.scale = 1;e.style.textShadow='none'})
    })
});

toolsLinks[0].addEventListener('click',()=>{
    toolsLinks[0].style.scale=1.2;
    toolsLinks[0].style.textShadow= '2px 2px 15px var(--text-color)';
    document.body.classList.add('NeuTool');
    headerTitle.textContent = "Neumorphism";
    headerContent.textContent = "Create stylish UI elements effortlessly with our Neumorphism Generator.Customize shadows and highlights for a modern look and generate CSS instantly.";
    SetScreen.style.backgroundImage = 'none';
});
toolsLinks[1].addEventListener('click',()=>{
    toolsLinks[1].style.scale=1.2;
    toolsLinks[1].style.textShadow= '2px 2px 15px var(--text-color)';    
    document.body.classList.add('BlobTool');
    headerTitle.textContent = "Blob'Maker";
    SetScreen.style.backgroundImage = 'none';
    headerContent.textContent = "Create unique, organic shapes with our Blob Maker. Customize sides and colors to add a touch of whimsy to your UI. Generate and integrate css seamlessly.";
});
toolsLinks[2].addEventListener('click',()=>{
    toolsLinks[2].style.scale=1.2;
    toolsLinks[2].style.textShadow= '2px 2px 15px var(--text-color)';
    document.body.classList.add('GradTool');
    headerTitle.textContent = "Gradients'";
    headerContent.textContent = "Craft stunning, multi-color gradients with our Gradient Tool. Adjust colors, angle, and spread for the perfect blend. Get instant CSS code.";
    SetScreen.style.backgroundImage = 'linear-gradient(90deg, rgb(186, 37, 250) 14%, rgb(247, 202, 49))';
});