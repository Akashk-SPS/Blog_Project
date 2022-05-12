const reset = document.getElementById('reset')

const sendLoginRequest = async (formDataJsonString) => {
  try {
    const result = await fetch('http://localhost:8000/ResetPassword', {
      method: 'POST',
      body: formDataJsonString,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    reset.disabled = false
    if (result.status == 200) {
      window.location.href = 'http://localhost:8000/login'
    } else {
      alert(data)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}



window.onload = function () {
  const form = document.getElementById('resetPasswordForm')

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    reset.disabled = true
    
      const formData = new FormData()
      for (let i = 0; i < form.length; i++) {
        formData.append(form[i].name, form[i].value)
            
    }
    formData.delete('')
    const plainFormData = Object.fromEntries(formData.entries())
      const formDataJsonString = JSON.stringify(plainFormData)
        console.log(formDataJsonString)
      //sending ajax request
      sendLoginRequest(formDataJsonString)
  })
}