import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stdCompositionFilter'
})
export class StdCompositionFilterPipe implements PipeTransform {

  transform(items: any[], standardCompositionText: string): any[] { 

    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!standardCompositionText) { return items; }

    // convert the standardCompositionText to lower case
    // standardCompositionText = standardCompositionText.toLowerCase();
    // console.log(standardCompositionText);


      return items.filter(function(Product) {
        return Product.pure_spec_Id.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ||
         Product.cas_Number.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ||
         Product.ingredient_Name.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ||
         Product.std_Componant_Type.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ||
         Product.std_value.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ||
         Product.std_unit.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ||
         Product.hundrd_Componant_Type.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ||
         Product.hundrd_value.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ||
         Product.hundrd_unit.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ||
         Product.inci_Componant_Type.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ||
         Product.inci_value_unit.toString().toLowerCase().includes(standardCompositionText.toString().toLowerCase()) ;
    })

   }
}
