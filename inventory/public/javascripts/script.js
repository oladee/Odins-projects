let itemButton = document.querySelector('#itemButton')

let itemImage = document.querySelector('#itemImage')
let itemInput = document.querySelector("#itemInput")

let form = document.querySelector('form')

itemButton.addEventListener('click',()=>{
    itemInput.click()
})

function fasterPreview(uploader){
    if(uploader.files && uploader.files[0]){
        itemImage.setAttribute('src', window.URL.createObjectURL(uploader.files[0]))
    }
}

itemInput.addEventListener('change',function(){
    fasterPreview(this)
})

form.addEventListener('submit',function(e){
    if(!this.files[0]){
        alert('please upload an image')
        e.preventDefault()
    }
})