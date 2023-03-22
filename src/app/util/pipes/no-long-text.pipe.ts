import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'noLongText'
})
export class NoLongTextPipe implements PipeTransform {
    transform(value: string, ...args: any[]): string {
        const initIn = args[0] ? args[0] : 0
        const truncateIn = args[1] ? args[1] : 15
        
        return value.length > truncateIn ? value.substring(initIn, truncateIn) + "..." : value
    }
}