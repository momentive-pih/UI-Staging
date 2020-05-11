import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'synonymsFilter'
})
export class SynonymsFilterPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined) return items;

    return items.filter(function(Product) {
        return Product.key.toLowerCase().includes(term.toLowerCase()) ||
         Product.synonyms.toLowerCase().includes(term.toLowerCase()) ||
         Product.key_Category.toLowerCase().includes(term.toLowerCase()) ||
         Product.created_By.toLowerCase().includes(term.toLowerCase()) ||
         Product.created_Date.toLowerCase().includes(term.toLowerCase())||
         Product.updated_Date.toLowerCase().includes(term.toLowerCase());
    })
}

}
