import { Component, signal } from "@angular/core";
import { Prediccion, PrediccionService } from "../services/prediccion.service";
import { NotificationService } from "../../../share/service/notification.service";

@Component({
    templateUrl: './subirArchivo.component.html'
})

export class SubirArchivo {
    selectedFile: File | null = null
    imagePreview: string | ArrayBuffer | null = null
    isResultAvailable = signal<boolean>(false)
    prediccion = signal<Prediccion>({
        status: '',
        message: '',
        tipo_de_tumor: '',
        confianza: '' 
    });


    constructor(private prediccionService: PrediccionService, private notificationService: NotificationService){}
    
    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if(file){
            this.selectedFile = file;
            this.imagePreview = URL.createObjectURL(this.selectedFile)
        }
    }

    getPrediccion(): void {
        if(!this.selectedFile){
            this.notificationService.mostrarInformacion('Por favor, seleccione un archivo antes de continuar', 'error');
            return
        }

        this.prediccionService.getPrediccion(this.selectedFile).subscribe({
            next: (response) => {
                this.isResultAvailable.set(true)
                this.prediccion.set(response)

            },
            error: (err) => {
                this.notificationService.mostrarInformacion(err.error.detail, "error");
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