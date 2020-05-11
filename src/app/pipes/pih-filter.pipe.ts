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
    // searchMaterialText = searchMaterialText.toLowerCase();
    // console.log(searchMaterialText);


      return items.filter(function(Product) {
        return Product.real_Spec_Id.toString().toLowerCase().includes(searchMaterialText.toString().toLowerCase()) ||
         Product.material_Number.toString().toLowerCase().includes(searchMaterialText.toString().toLowerCase()) ||
         Product.description.toString().toLowerCase().includes(searchMaterialText.toString().toLowerCase()) ||
         Product.bdt.toString().toLowerCase().includes(searchMaterialText.toString().toLowerCase()) ;
    })

   }
}
