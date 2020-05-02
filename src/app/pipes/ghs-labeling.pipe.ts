import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ghsLabeling'
})
export class GhsLabelingPipe implements PipeTransform {

  transform(items: any[], searchGHSText: string): any[] { 
    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchGHSText) { return items; }

    // convert the searchCASText to lower case
    searchGHSText = searchGHSText.toLowerCase();
    console.log(searchGHSText);
      return items.filter(function(Product) {
        return Product.spec_Id.toLowerCase().includes(searchGHSText.toLowerCase()) ||
        Product.regulatory_Basis.toLowerCase().includes(searchGHSText.toLowerCase()) ||
        Product.usage.toLowerCase().includes(searchGHSText.toLowerCase()) ||
        Product.signal_Word.toLowerCase().includes(searchGHSText.toLowerCase()) ||
        Product.hazard_Statements.toLowerCase().includes(searchGHSText.toLowerCase()) ||
        Product.prec_Statements.toLowerCase().includes(searchGHSText.toLowerCase());
        //Product.additional_Information.toLowerCase().includes(searchGHSText.toLowerCase());
    })
   }}
