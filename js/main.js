const newImageButton = document.getElementById('uploadImage');
const imageZone = document.getElementById('image-zone');
const userImages = localStorage.getItem('userImages') ? JSON.parse(localStorage.getItem('userImages')) : [];

const loadImages = () => {
    const documentBody = document.getElementsByTagName('body')[0];
    
    if(userImages.length > 0) {
        imageZone.innerHTML = "";
        for(let i = 0; i < userImages.length; i++) {
            imageZone.innerHTML += `<img src="${userImages[i]}" alt="">`;
            imageZone.classList.remove('noImages');
            imageZone.classList.add('imageZone');
        }
    }else{
        imageZone.innerHTML = '<h2>No images</h2>';
        imageZone.classList.remove('imageZone');
        imageZone.classList.add('noImages');
        documentBody.style.overflow = 'hidden';
    }
}

newImageButton.addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('load', () => {
            const image = fileReader.result;
            console.log(image);
            userImages.push(image);
            localStorage.setItem('userImages', JSON.stringify(userImages));
            loadImages();
        });
    });
});


loadImages();