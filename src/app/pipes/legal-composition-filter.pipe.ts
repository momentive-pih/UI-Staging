import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'legalCompositionFilter'
})
export class LegalCompositionFilterPipe implements PipeTransform {

  transform(items: any[], legalCompositionText: string): any[] { 

    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!legalCompositionText) { return items; }

    // convert the legalCompositionText to lower case
    // legalCompositionText = legalCompositionText.toLowerCase();
    // console.log(legalCompositionText);

      return items.filter(function(Product) {
        return Product.pure_spec_Id.toString().toLowerCase().includes(legalCompositionText.toString().toLowerCase()) ||
         Product.cas_Number.toString().toLowerCase().includes(legalCompositionText.toString().toLowerCase()) ||
         Product.ingredient_Name.toString().toLowerCase().includes(legalCompositionText.toString().toLowerCase()) ||
         Product.legal_Componant_Type.toString().toLowerCase().includes(legalCompositionText.toString().toLowerCase()) ||
         Product.legal_unit.toString().toLowerCase().includes(legalCompositionText.toString().toLowerCase()) ||
         Product.legal_value.toString().toLowerCase().includes(legalCompositionText.toString().toLowerCase())
       
    })

   }

}
