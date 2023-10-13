import moment from "moment/moment";
export function getFechaEstadoAfiliado(obj) {
  if(obj.codigo!=null){
    if (obj.codigo == "100") return formatFecha(obj.fecha_afiliacion);
    if (obj.codigo == "101") return formatFecha(obj.fecha_cesantia); //formatFecha(obj.fecha_baja);
    if (obj.codigo == "102") return formatFecha(obj.fecha_ampliacion);
    if (obj.codigo == "103") return formatFecha(obj.fecha_cesantia); //formatFecha(obj.fecha_cesantia);
    if (obj.codigo == "104") return formatFecha(obj.fecha_baja);
    if (obj.codigo == "105") return formatFecha(obj.fecha_baja);
    if (obj.codigo == "106") return formatFecha(obj.fecha_baja);
  }  
  return "--";
}

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
  
const configOpEstado = (codEstado, datos) => {
  const obj = {};

  switch (codEstado) {
    case 100:
      obj.color = "green";
      obj.texto = datos.descripcion;
      obj.icono = "mdi-account-check-outline";
      obj.iconColor = "green darken-2";
      break;
    case 101:
      obj.color = "green";
      obj.texto = datos.descripcion;
      obj.icono = "mdi-account-check-outline";
      obj.iconColor = "primary darken-2";
      break;
    case 102:
      obj.color = "red";
      obj.texto = datos.descripcion;
      obj.icono = "mdi-account-off-outline";
      obj.iconColor = "teal darken-2";
      break;
    case 103:
      obj.color = "red";
      obj.texto = datos.descripcion;
      obj.icono = "mdi-account-off-outline";
      obj.iconColor = "error darken-2";
      break;
    case 104:
      obj.color = "red";
      obj.texto = datos.descripcion;
      obj.icono = "mdi-account-off-outline";
      obj.iconColor = "blue-grey";
      break;
    case 105:
        obj.color = "#732A6A";
        obj.texto = datos.descripcion;
        obj.icono = "mdi-account-off-outline";
        obj.iconColor = "blue-grey";
        break;
    case 106:
          obj.color = "#188133";
          obj.texto =datos.descripcion;
          obj.icono = "mdi-account-off-outline";
          obj.iconColor = "blue-grey";
        break;
    default:
      obj.texto = "xxxx";
      break;
  }
  return obj;
};

export const seteoBandaEstados = () => {
  let banda = [];
  banda[8] = {
    bMainIcon: "mdi-badge-account-outline",
    bColor: "primary",
    bText: "Detalles",
  };

  banda[4] = {
    bMainIcon: "mdi-account-remove-outline",
    bColor: "error",
    bText: "Baja",
  };

  banda[44] = {
    bMainIcon: "mdi-account-cancel-outline",
    bColor: "error darken-1",
    bText: "Baja",
  };

  banda[2] = {
    bMainIcon: "mdi-account-details-outline",
    bColor: "teal",
    bText: "Ampliacion",
  };

  banda[1] = {
    bMainIcon: "mdi-account-group-outline",
    bColor: "#EC945C",
    bText: "Beneficiarios",
  };
  banda[5] = {
    bMainIcon: "mdi-account-group-outline",
    bColor: "#EC945C",
    bText: "DERECHOHABIENTE",
  };
  banda[6] = {
    bMainIcon: "mdi-update",
    bColor: "#EC945C",
    bText: "DERECHOHABIENTE",
  };
  banda[10] = {
    bMainIcon: "mdi-pencil",
    bColor: "#EC945C",
    bText: "Actualizar",
  };
  return banda;
};

export function getDisabledButtom(datos) {
  const results = datos;
  let codEstado = datos.codigo;
  let v = [];
  let e = seteoBandaEstados();  
  if (codEstado == 100 || codEstado == 101) {
    v[8] = v[4] = v[1] =v[9]= true;
    v[2]=v[9] = false;
  } else if (codEstado == 102) {
    v[8] = v[4] = true;
    v[2] = v[1] =v[9]= false;
    e[4] = e[44];
  } else if (codEstado == 103) {
    v[8] = v[4] = v[2] = true;
    v[1] = v[9]= false;
    e[4] = e[44];
  }else if (codEstado == 104)  {
    v[8] = true;
    v[4] = v[2] = v[1] =v[9]= false;
  }else if (codEstado == 105)  {    
    v[9] =v[8] = true;
    v[4] =v[1] = v[2] = false;
    
  }

  return [e, v];
}
