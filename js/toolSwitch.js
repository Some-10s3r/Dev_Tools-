let toolsLinks = document.querySelectorAll('.nav-links li');
console.log(toolsLinks);

toolsLinks.forEach(toolLink=>{
    toolLink.addEventListener('click',()=>{
        document.body.classList.remove('BlobTool');
        document.body.classList.remove('GradTool');
    })
})

toolsLinks[1].addEventListener