import { inject } from "@angular/core"
import { SpinnerService } from "../../service/spineer.service"
import { finalize } from "rxjs"
import { HttpInterceptorFn } from "@angular/common/http"

export const SpinnerInterceptor:HttpInterceptorFn = (req, nex) => {
    const spinner = inject(SpinnerService)
    spinner.show()
    return nex(req).pipe(
        finalize(() => spinner.hide())
    )

}