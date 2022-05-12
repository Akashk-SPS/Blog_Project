const postBtn = document.getElementById('postBtn')
const file = document.getElementById('file');

const sendBlogRequest = async (formDataJsonString) => {
    console.log(formDataJsonString , "formdata");
  try {
    const result = await fetch('http://localhost:8000/addBlog', {
      method: 'POST',
      body: formDataJsonString,
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //  'Content-Type': 'multipart/form-data; boundary=---WebKitFormBoundary7MA4YWxkTrZu0g',
       
      // },
    })

    const data = await result.json()
   
    postBtn.disabled = false
    if (result.status == 200) {
       console.log(data)
      window.location.href = 'http://localhost:8000/addBlog'
    } else {
      alert(data)
     // window.location.reload()
    }
  } catch (error) {
    console.log(err)
    //window.location.reload()
  }
}


let imageUrl
let imgFile

file.addEventListener('change', (e) =>{
  console.log("func run")
  imgFile= e.currentTarget.files[0];
  console.log(imgFile , "imageFile")
  imageUrl = URL.createObjectURL(imgFile)
  console.log(imageUrl)
  
})

window.onload = function () {
  const form = document.getElementById('createBlogForm')
 console.log(form)
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log("listing on form")
    postBtn.disabled = true
    
    if(!imgFile){
      console.log("not found")
  }

      const formData = new FormData()
      for (let i = 0; i < form.length; i++) {
        formData.append(form[i].name, form[i].value)
        console.log(form[i].name)
       }
       formData.append('image',imgFile);
    console.log(formData)
    //formData.append('image',imgFile);   

   
      sendBlogRequest(formData)
  })
} 