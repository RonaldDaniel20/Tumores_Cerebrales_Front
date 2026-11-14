import { Component, signal, Signal } from "@angular/core";
import { Prediccion, PrediccionService } from "../prediccionService";

@Component({
    templateUrl: './subirArchivo.component.html'
})

export class SubirArchivo {
    selectedFile: File | null = null
    imagePreview: string | ArrayBuffer | null = null
    message = signal('')
    isResultAvailable = signal<boolean>(false)
    prediccion = signal<Prediccion>({
        status: '',
        message: '',
        tipo_de_tumor: '',
        confianza: '' 
    });

    tipo_tumor = signal<string>('')
    confianza = signal<string>('')


    constructor(private prediccionService: PrediccionService){}
    
    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if(file){
            this.selectedFile = file;
            this.imagePreview = URL.createObjectURL(this.selectedFile)
        }
    }

    getPrediccion(): void {
        if(!this.selectedFile){
            this.message.set('No ha seleccionado ningún archivo')
            return
        }

        this.message.set('')

        this.prediccionService.getPrediccion(this.selectedFile).subscribe({
            next: (response) => {
                this.isResultAvailable.set(true)
                this.prediccion.set(response)

            },
            error: (err) => {
                console.error(err)
                this.limpiarCampos()
            }
        })
    }

    limpiarCampos(): void {
        this.selectedFile = null
        this.imagePreview = null
        this.prediccion.set({
            status: '',
            message: '',
            tipo_de_tumor: '',
            confianza: '' 
        })
        this.isResultAvailable.set(false)

        const input = document.getElementById('dropzone-file') as HTMLInputElement
        if(input){
            input.value = ''
        }
    }
}