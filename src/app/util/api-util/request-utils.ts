import { Inject } from "@angular/core"
import { Router } from "@angular/router"
import { CategoryComponent } from "src/app/components/category/category.component"
import { AuthGuard } from "src/app/guards/auth.guard"
import { Category } from "src/app/shared/models/category.model"
import { CategoryService } from "src/app/shared/services/category.service"

export function buildParams(searchParams): string {
    let paramsUrl: string = "?"

    searchParams.forEach((v, idx) => {
        paramsUrl += `${v[0]}=${v[1]}`

        if (searchParams.length - 1 !== idx) {
            paramsUrl += "&"
        }
    })

    return paramsUrl !== "?" ? paramsUrl : ""
}

export const BASE_URL =  'http://localhost:8080' 