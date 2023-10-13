<template> 

  excel
  <div>

    <input type="file" id="file" ref="file" 
    @change="previewFiles" 
    accept=".XLSX, .CSV" 
    class="form-control">

    {{ items }}
    {{ hojas }}
  </div>
</template>

<script>
import  readXlsxFile  from "read-excel-file"

import * as XLSX from "xlsx"
import Vacunas from '@/components/generics/Vacunas.vue'
import Contactos from '@/components/generics/Contactos.vue'
import FrmOtherMaker from '@/components/formsUtils/FrmOtherMaker.vue'



export default {
  components: { Vacunas, Contactos, FrmOtherMaker, LugarInfeccion },


  data: () => ({
    items: [],
    hojas:[]
  }),
  methods: {
    handleFileUpload(){
      const input= document.getElementById("file")
      readXlsxFile(input.files[0],{getSheet:true}).then((datos) => {
        //var data= new Uint8Array(datos)        
        /*const libro = XSLX.read(datos, {type:Array})
        const hojas = libro.SheetNames[0]
        let hoja = libro.Sheets[hoja]*/
      this.hojas = datos//XSLX.utils.sheet_to_json(hoja)
    })
    console.log(this.hojas)
    },
    lee(){
      //const input= document.getElementById("file")
      const libro = XSLX.readFile("Libro1.xlsx")
      const hojas = libro.SheetNames
      const hoja = hojas[0]
      const dataExcel = XSLX.utils.sheet_to_json(libro.Sheets[hoja])
      console.log("por xlsxs",dataExcel)
    },
    previewFiles(e) {
          var files = e.target.files, f = files[0];
          var reader = new FileReader();
          reader.onload = (e) => {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, {type: 'array'});
            let sheetName = workbook.SheetNames[0]
            /* DO SOMETHING WITH workbook HERE */
           // console.log("libro",workbook);
            let worksheet = workbook.Sheets[sheetName];
            this.items = XLSX.utils.sheet_to_json(worksheet)
            console.log("jason",this.items);
          };
          reader.readAsArrayBuffer(f);
       },

       download : function() {
        const data = XLSX.utils.json_to_sheet(this.items)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, data, 'data')
        XLSX.writeFile(wb,'demo.xlsx')
      },
      onChange(event) {
      this.items = event.target.files ? event.target.files[0] : null;
      if (this.items) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          this.hojas = XLSX.utils.sheet_to_json(ws, { header: 1 });
        }

        reader.readAsBinaryString(this.items);
        console.log(this.items)
      }
    }
  },
  mounted (){
    //this.lee()
  }
}

</script>

<style></style>