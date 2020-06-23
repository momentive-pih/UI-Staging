import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriesText'
})
export class CategoriesPipe implements PipeTransform {

    transform(values: any[], searchValue: any): any {
      if (searchValue == null) { return values; }
      return values.filter(v => this.filterFn(v, searchValue));
    }
  
    filterFn(value: any, searchValue) {
      let flag = this.testSearchCondition(value.name, searchValue);
      if (!flag && value.tab_content) {
        flag = value.tab_content.filter(v => this.nxtfilterFn(v, searchValue)).length > 0;
      }
      return flag;
    }

    nxtfilterFn(value: any, searchValue) {
      let flag = this.testSearchCondition(value.name, searchValue);
      if (!flag && value.sub) {
        flag = value.sub.filter(v => this.testSearchCondition(v.name, searchValue)).length > 0;
      }
      return flag;
    }

    testSearchCondition(name: string, searchValue: string): boolean {
      return name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    }







  //   if (!items) return [];
  //   if (!searchText) return items;
  //   console.log(items);
  //   this.val = [];
  //   items.forEach(element => {
  //   console.log(element.searchField);
  //     element.searchField.forEach(ele => {
  //       if (ele.toLowerCase().includes(searchText.toLowerCase())) {
  //         console.log('**********');
  //         this.val.push(element);
  //       }
  //     });
  //   })
  //   return this.val
  
}
