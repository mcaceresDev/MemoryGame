class ModalCreator {

    getInstance(modalKey, modalSettings){
        let modalTypes = Object.values(modalStore)
        let modal

        modalTypes.forEach((modalType)=>{
            if (modalType == modalStore[modalKey]) {
                modal = new modalType()
            }
        })
        return modal.render(modalSettings)
    }

}

class ModalSuccess{
    
    modalSettings = {
        title: "¡Lo lograste!",
        texto: "¿Que deseas hacer?"
    }

    render(settings)   {
        return `<div class="modal">
        <h2>${settings == undefined ? this.modalSettings.title : settings.title}</h2>
        <p>${settings == undefined ? this.modalSettings.texto : settings.texto}</p>
        <button id="avanzar" class="btn" type="button" name="button">Siguiente Nivel</button>
        <button class="btn salir" type="button" name="button">Abandonar Juego</button>
      </div>`
    }
}

class ModalFailed{
    
    modalSettings = {
        title: "Tiempo agotado",
        texto: "Has sobrepasado el tiempo límite"
    }

    render(settings){
        `<div class="modal">
        <span class="content">
            <h2>${settings == undefined ? this.modalSettings.title : settings.title}</h2>
            <br>
            <p>${settings == undefined ? this.modalSettings.texto : settings.texto}</p>
        </span>
        <button class="btn reintenta" type="button" name="button">Reintentar</button>
        <button class="btn reinicia" type="button" name="button">Reiniciar</button>
        <button class="btn salir" type="button" name="button">Salir</button>
      </div>`
    }
}

class ModalEnd{
    
    modalSettings = {
        title: "Juego completado",
        texto: "¡ Felicidades ! </br> Has completado todos los niveles"
    }

    render(settings){
        `<div class="modal">
        <h2>${settings == undefined ? this.modalSettings.title : settings.title}</h2>
        <p>${settings == undefined ? this.modalSettings.texto : settings.texto}</p>
    
        <button class="btn reinicia" type="button" name="button">Reiniciar</button>
        <button class="btn salir" type="button" name="button">Salir</button>
      </div>`
    }
    
}

const modalStore = {
    success: ModalSuccess,
    failed: ModalFailed,
    end: ModalEnd
}