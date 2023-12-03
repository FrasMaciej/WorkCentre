import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'recursiveFilter',
    pure: false
})
export class RecursiveFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any {
        if (!items || !searchText) {
            return items;
        }

        return this.filterItems(items, searchText.toLowerCase());
    }

    private filterItems(items: any[], searchText: string): any {
        return items.filter(item => {
            if (typeof item === 'object') {
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        const value = item[key];

                        if (typeof value === 'object') {
                            if (this.filterItems([value], searchText).length > 0) {
                                return true;
                            }
                        } else if (typeof value === 'string' && value.toLowerCase().includes(searchText)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
    }
}