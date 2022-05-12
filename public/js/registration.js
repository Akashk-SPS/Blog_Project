const signUpBtn = document.getElementById('signup-btn');

const sendSignUpRequest = async (formDataJsonString) => {
  
  try {
    const result = await fetch('http://localhost:8000/registration', {
      method: 'POST',
      body: formDataJsonString,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
  
    signUpBtn.disabled = true
    const data = await result.json()
    console.log(result.status)
    if (result.status == 200) {
      window.location.href = 'http://localhost:8000/login'
    } else {
     // alert(data.error);
      window.location.reload();
    }
  } catch (error) {
    //console.log(error)
    window.location.reload();
  }
    
}


window.onload = function () {
  const form = document.getElementById('signUpForm')

  //submitting sign up form
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log("submit")
      signUpBtn.disabled = true
      const formData = new FormData()
      for (let i = 0; i < form.length; i++) {
        formData.append(form[i].name, form[i].value)
          }
          formData.delete('')

       const plainFormData = Object.fromEntries(formData.entries())
      const formDataJsonString = JSON.stringify(plainFormData)

      console.log(formDataJsonString)
      //sending ajax request
      sendSignUpRequest(formDataJsonString);
  })
}