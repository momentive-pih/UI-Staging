import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pihFilter'
})
export class PihFilterPipe implements PipeTransform {

  transform(items: any[], searchMaterialText: string): any[] { 

    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchMaterialText) { return items; }

    // convert the searchMaterialText to lower case
    searchMaterialText = searchMaterialText.toLowerCase();
    console.log(searchMaterialText);


      return items.filter(function(Product) {
        return Product.real_Spec_Id.toLowerCase().includes(searchMaterialText.toLowerCase()) ||
         Product.material_Number.toLowerCase().includes(searchMaterialText.toLowerCase()) ||
         Product.description.toLowerCase().includes(searchMaterialText.toLowerCase()) ||
         Product.bdt.toLowerCase().includes(searchMaterialText.toLowerCase()) ;
    })

   }
}
