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