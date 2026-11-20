import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';


type NotificacionType = 'info' | 'success' | 'warning' | 'error' | 'question';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

    mostrarInformacion(message: string, icono: NotificacionType = 'info'){
        Swal.fire({
            icon: icono,
            text: message,
            timer: 3000
        })
    }
}