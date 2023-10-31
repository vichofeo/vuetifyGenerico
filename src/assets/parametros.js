//[label,editable,requerido]
const PARAMETROS = {
    ee_ss: {
        table: r_institucion_salud,
        campos: {
            codigo: ['Codigo Institucion', false, true],
            ente_gestor_id: ['Ente Gestor', false, true],
            tipo_red_id: ['Red', true, false],
            clase: ['Codigo Institucion', true, true],
            nivel_atencion: ['Nivel de Atencion', true, true],
            subsector: ['Sub Sector', false, true],
            urbano_rural: ['Area', true, true],
            nit: ['NIT', true, false],
            no_ra: ['No. Resolucion Administrativa', true, false],
            accesibilidad_eess: ['Accesibilidad', true, false],
            carretera_eess: ['Via de Acceso', true, false],
        },
        key: ['institucion_id'],
        update: []
    }
}