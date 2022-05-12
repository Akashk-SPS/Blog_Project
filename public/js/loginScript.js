const loginBtn = document.getElementById('loginBtn')

const sendLoginRequest = async (formDataJsonString) => {
  try {
    const result = await fetch('http://localhost:8000/login', {
      method: 'POST',
      body: formDataJsonString,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    loginBtn.disabled = false
    if (result.status == 200) {
      window.location.href = 'http://localhost:8000/'
    } else {
      alert(data)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}



const sendForgotPasswordRequest = async (formDataJsonString) => {
  try {
    const result = await fetch('http://localhost:8000/forgotPassword', {
      method: 'POST',
      body: formDataJsonString,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()

    console.log(result)
    if (result.status == 200) {
      alert('Reset Password link sent to email')
      window.location.reload()
    } else {
      console.log('data', data)
      alert(data.error)
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

const handleForgotPassword = () => {
  const email = document.getElementById('email')
  console.log(email.value)
  if (!email.value) {
    return alert('please provide email')
  }
  // const isValidEmail = validateEmail(email.value)
  // if (!isValidEmail) {
  //   return alert('not a valid email')
  // }

  const formData = new FormData()
  formData.append('email', email.value)
  const plainFormData = Object.fromEntries(formData.entries())
  const formDataJsonString = JSON.stringify(plainFormData)
  sendForgotPasswordRequest(formDataJsonString)
}


window.onload = function () {
  const form = document.getElementById('loginForm')
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn')

  forgotPasswordBtn.addEventListener('click', handleForgotPassword)


  form.addEventListener('submit', function (e) {
    e.preventDefault()
    loginBtn.disabled = true
    
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