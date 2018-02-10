const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const myFunction = () => {
    const x = document.getElementById("myFile")
    if (x.files && x.files[0]) {
        const fr = new FileReader();
        fr.onload = e => {
            const img = new Image()
            img.addEventListener('load', () => {
                ctx.drawImage(img, 0, 0)
            })
            img.src = e.target.result
        }
        fr.readAsDataURL(x.files[0])


        console.log(x.files)
        ctx.drawImage(x.files[0], 0, 0)
    }
}