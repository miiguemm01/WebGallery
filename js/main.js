const newImageButton = document.getElementById('uploadImage');
const imageZone = document.getElementById('image-zone');
const fileInput = document.getElementById('fileInput');
const userImages = localStorage.getItem('userImages') ? JSON.parse(localStorage.getItem('userImages')) : [];

const loadImages = () => {
    const documentBody = document.getElementsByTagName('body')[0];
    imageZone.innerHTML = "";
    if(userImages.length > 0) {
        for(let i = 0; i < userImages.length; i++) {
            imageZone.innerHTML += `<img src=${userImages[i]} alt="User Image">`;
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
    fileInput.click();
    fileInput.addEventListener('input', () => {
        const file = fileInput.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('loadend', () => {
            const image = fileReader.result;
            if(!userImages.includes(image)) {
                userImages.push(image);
                localStorage.setItem('userImages', JSON.stringify(userImages));
            }
            loadImages();
        });
    });
});


loadImages();