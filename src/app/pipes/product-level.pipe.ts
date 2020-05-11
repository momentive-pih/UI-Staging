import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productLevel'
})
export class ProductLevelPipe implements PipeTransform {

  transform(items: any[], searchProductText: string): any[] { 
    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchProductText) { return items; }

    // convert the searchProductText to lower case
    searchProductText = searchProductText.toLowerCase();
      return items.filter(function(Product) {
        return Product.real_Spec_Id.toString().toLowerCase().includes(searchProductText.toString().toLowerCase()) ||
        Product.namprod.toString().toLowerCase().includes(searchProductText.toString().toLowerCase()) ||
        Product.synonyms.toString().toLowerCase().includes(searchProductText.toString().toLowerCase()) ;
    })

   }
}
