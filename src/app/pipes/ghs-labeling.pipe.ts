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
        return Product.spec_Id.toString().toLowerCase().includes(searchGHSText.toString().toLowerCase()) ||
        Product.regulatory_Basis.toString().toLowerCase().includes(searchGHSText.toString().toLowerCase()) ||
        Product.usage.toString().toLowerCase().includes(searchGHSText.toString().toLowerCase()) ||
        Product.signal_Word.toString().toLowerCase().includes(searchGHSText.toString().toLowerCase()) ||
        Product.hazard_Statements.toString().toLowerCase().includes(searchGHSText.toString().toLowerCase()) ||
        Product.prec_Statements.toString().toLowerCase().includes(searchGHSText.toString().toLowerCase());
        //Product.additional_Information.toLowerCase().includes(searchGHSText.toLowerCase());
    })
   }}
