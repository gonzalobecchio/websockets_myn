const verifyFormChat = (formData) => {
    let errores = []
        if (!formData.get('email')) {
            errores.push({error: "Campo email vacio"})
        }
       
        if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(formData.get('email'))) {
            errores.push({error: 'Formato de email erroneo'})
        }

        if (!formData.get('mensaje')) {
            errores.push({error: 'Debe escribir un mensaje'})
        }

        return errores
}

window.onload = () => {
    const chat = document.getElementById('chat')
    const socket = io();
    
    chat.onsubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(chat)
        // let error = false
        // if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(formData.get('email'))) {
        //     document.getElementById('errorEmail').innerHTML = "Formato de email incorrecto"
        //     error = true
        // }  
        // if (!formData.get('email')) {
        //     document.getElementById('errorEmail').removeAttribute('hidden')
        //     document.getElementById('errorEmail').innerHTML = "Completar campo"
        //     error = true
        // }
        // if (!formData.get('mensaje')) {
        //     document.getElementById('errorMessage').removeAttribute('hidden')
        //     document.getElementById('errorMessage').innerHTML = "Completar campo"
        //     error = true
        // }
        
        // if (error) {return}

        // document.getElementById('errorEmail').setAttribute('hidden','hidden')
        // document.getElementById('errorMessage').setAttribute('hidden', 'hidden')

        
        const msge = Object.fromEntries(formData)
        // console.log(msge)
        socket.emit('fromClientChat', msge)
        chat.reset() 
    }

    socket.on('fromServerChat', async mensajes => {
        // console.log(mensajes)
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: mensajes
        })

        const contentChat = await response.text()
        document.getElementById('container-msg').innerHTML = contentChat
    }) 

    

}




