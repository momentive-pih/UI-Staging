import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'svtCompositionFilter'
})
export class SvtCompositionFilterPipe implements PipeTransform {

  transform(items: any[], svtCompositionText: string): any[] { 

    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!svtCompositionText) { return items; }

    // convert the svtCompositionText to lower case
    // svtCompositionText = svtCompositionText.toLowerCase();
    // console.log(svtCompositionText);
   

      return items.filter(function(Product) {
        return Product.pure_spec_Id.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.SVT_LV_eight.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.SVT_LV_twenty.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.SVT_LV_nine.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.amount_limit_SVT_LV.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.SVT_TE_eight.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.SVT_TE_nine.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ;
         Product.SVT_TE_Twenty.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.amount_limit_SVT_TE.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.SVT_AN_eight.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.SVT_AN_nine.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.SVT_AN_twenty.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase()) ||
         Product.amount_limit_SVT_AN.toString().toLowerCase().includes(svtCompositionText.toString().toLowerCase())
    })

   }

}
