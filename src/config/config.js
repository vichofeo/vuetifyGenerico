 export const urlbase = "/"; 
//export const urlbase = "http://esalud.asuss.gob.bo/";


export const getHeader = function () {
    try {
        const auth = JSON.parse(atob(localStorage.getItem("token")));

        const headers = {
            'Accept': 'application/json',
            'Authorization': 'bearer ' + auth.access_token
        }
        return headers
    } catch (error) {
        localStorage.removeItem("token")
        //window.location.replace("/")
    }

}

//Para envio de archivos imagenes al servidor

export const getHeaderFile = function () {
    try {
        const auth = JSON.parse(atob(localStorage.getItem("token")));

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'bearer ' + auth.access_token
        }
        return headers
    } catch (error) {
        localStorage.removeItem("token")
        //window.location.replace("/")
    }

}