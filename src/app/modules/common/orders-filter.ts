import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "ordersFilter"
})
export class OrdersFilterPipe implements PipeTransform {
    
    ngOnInit() {
        console.log('lodash version:', _.VERSION);
      }

    transform(array: any[], query1: string, query2: string, query3: string, query4: string, query5: string, query6: string, query7: string): any {
   

    if (query1 && array) {
        return _.filter(array, row=>row._id.toLocaleLowerCase().indexOf(query1.toLocaleLowerCase()) > -1);
    }
    if (query2 && array) {
        return _.filter(array, row=>row.roleTitle && row.roleTitle.toLocaleLowerCase().indexOf(query2.toLocaleLowerCase()) > -1);
    }
    if (query3 && array) {
        return _.filter(array, row=>row.cli_Id && row.cli_Id.indexOf(query3) > -1);
    }
    if (query4 && array) {
        return _.filter(array, row=>row.o_count && row.o_count.toString().indexOf(query4) > -1);
    }
    if (query5 && array) {
        return _.filter(array, row=>row.jobStartDate && row.jobStartDate.indexOf(query5) > -1);
    }
    if (query6 && array) {
        return _.filter(array, row=>row.daysOfJob && row.daysOfJob.indexOf(query6) > -1);
    }
    if (query7 && array) {
        return _.filter(array, row=>row.o_pay_scale && row.o_pay_scale.toString().indexOf(query7) > -1);
    }
    return array;
        
    }
}

            //return _.filter(array, row=>row.name.indexOf(query) > -1);
            
            // var results = _.filter(array, function (obj) {
            //     return _.values(obj).some(function (el) {
            //        // console.log(el)
            //         return el.toString().indexOf(query1) > -1;
            //     });
            // });

           

        // return array;