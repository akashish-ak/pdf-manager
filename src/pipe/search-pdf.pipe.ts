import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPDF'
})
export class SearchFiltedPDF implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(item => item?.title?.toLowerCase().includes(searchText));
    }
}
