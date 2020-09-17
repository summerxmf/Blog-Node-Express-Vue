export const debounce = (func, delay = 200) => {
  let timer = null
  return function(...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// var img =
//   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=508387608,2848974022&fm=26&gp=0.jpg' //imgurl 就是你的图片路径

// export const getBase64Image = (img) => {
//   var canvas = document.createElement('canvas')
//   canvas.width = img.width
//   canvas.height = img.height
//   var ctx = canvas.getContext('2d')
//   ctx.drawImage(img, 0, 0, img.width, img.height)
//   var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
//   var dataURL = canvas.toDataURL('image/' + ext)

//   return dataURL
// }

// var image = new Image()
// image.src = img
// image.setAttribute('crossOrigin', 'Anonymous')
// image.onload = function() {
//   var base64 = getBase64Image(image)
//   console.log(base64)

//   document.getElementById('img').src = base64

//   var formData = new FormData()

//   //转换base64到file
//   var file = btof(base64, 'test')
//   formData.append('imageName', file)
// }

// function btof(data, fileName) {
//   const dataArr = data.split(',')
//   const byteString = atob(dataArr[1])

//   const options = {
//     type: 'image/jpeg',
//     endings: 'native',
//   }
//   const u8Arr = new Uint8Array(byteString.length)
//   for (let i = 0; i < byteString.length; i++) {
//     u8Arr[i] = byteString.charCodeAt(i)
//   }
//   return new File([u8Arr], fileName + '.jpg', options)
// }
