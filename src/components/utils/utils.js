import moment from "moment/moment";

export function formatFecha(fecha) {
  if (fecha) return moment(fecha).format("DD/MM/YYYY");
  else return "";
}

export function validaFechaIn(fecha) {
  return moment(fecha, "DD/MM/YYYY", true).isValid();
}

export function setPaletaEstados(datos) {
  //const results = datos;

  return { ...datos, ...configOpEstado(datos.codigo, datos) };
}

export function parseFechaYMDToSlashDMY(fecha) {
  try {
    const [aaaa, mm, dd] = fecha.split("-");
    return `${dd}/${mm}/${aaaa}`  
  } catch (error) {
    return fecha
  }
  
}
  /**
   * 
   * @param object datosObjFromParam 
   */
export function filterDataByModelParam(datosObjFromParam){
  const data = {};
  for (const objName in datosObjFromParam) {
    data[objName] = {}
    for (const key in datosObjFromParam[objName].valores) {
      if (datosObjFromParam[objName].valores[key] &&  typeof datosObjFromParam[objName].valores[key] == "object") {
        data[objName][key] = datosObjFromParam[objName].valores[key].selected.value;
      } else data[objName][key] = datosObjFromParam[objName].valores[key];
    }
  }
      return data
}

