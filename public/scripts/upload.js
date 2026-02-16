const uploadForm = document.querySelector('.upload-form')

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  let formData = new FormData(uploadForm)
  try {
    const response = await fetch("/artist/upload-song", {
      method: "POST",
      body: formData
    })

    if(!response.ok){
      console.log('Response not ok')
    } else {
      let data = response.json()
      console.log(data)
      return data
    }
    
  } catch (error) {
    console.error("Fetch error", error)
  }

})

