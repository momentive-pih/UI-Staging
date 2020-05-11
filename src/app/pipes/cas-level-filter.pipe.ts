import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'casLevelFilter'
})
export class CasLevelFilterPipe implements PipeTransform {

  transform(items: any[], searchCASText: string): any[] { 
    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchCASText) { return items; }

    // convert the searchCASText to lower case
    searchCASText = searchCASText.toLowerCase();
    console.log(searchCASText);


      return items.filter(function(Product) {
        return Product.pure_Spec_Id.toString().toLowerCase().includes(searchCASText.toString().toLowerCase()) ||
        Product.chemical_Name.toString().toLowerCase().includes(searchCASText.toString().toLowerCase()) ||
        Product.cas_Number.toString().toLowerCase().includes(searchCASText.toString().toLowerCase()) ;
    })

   }

}
