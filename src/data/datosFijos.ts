import type { DatosFijos } from '@/types';

const INFO_BASE = {
  nombreDocente: 'Daniel Exelente Hernández',
  camposFormativos: 'Ética, Naturaleza y Sociedad',
  ejesArticuladores: 'Inclusión; Pensamiento crítico; Interculturalidad crítica; Igualdad de género; Vida saludable; Apropiación de las culturas a través de la lectura y la escritura',
  competenciasPerfil: '3. Búsqueda de la Verdad, 4. Afectividad Sana y Constructiva, 8. Pensamiento Crítico y Autónomo, 9. Responsabilidad Social e Interculturalidad, 10. Liderazgo Cristiano de Servicio',
};

const BIBLIOGRAFIA = {
  '1°': `Huerta Rosas, A., & Barrera Sánchez, O. (s. f.). La Guía Santillana 1. Formación Cívica y Ética. Secundaria (Primera Edición). Diana Angélica Gasca González. https://es.scribd.com/document/672125340/FORMACION-1-LA-GUIA-SANTILLANA

Cielo Canales, S. (s. f.). Formación Cívica y Ética 1. Cuaderno de trabajo. Secundaria (Primera Edición). Ríos de Tinta. https://es.scribd.com/document/671222785/Cdt-Formacion-Civica-y-Etica-1`,
  
  '2°': `Castillo Castillo, G., & Chilapa Rivas, N. (s. f.). La Guía Santillana 2. Formación Cívica y Ética. Secundaria (Primera Edición). Diana Angélica Gasca González. https://es.scribd.com/document/681907138/Fcye-Segundo-Guia-Santillana

Madrigal Mexía, C. (s. f.). Formación Cívica y Ética 2. Cuaderno de trabajo. Secundaria (Primera Edición). Ríos de Tinta. https://es.scribd.com/document/672179748/CDT-FORMACION-CIVICA-Y-ETICA-2`,
  
  '3°': `Castañón García, A., & Toledo Campos, M. (s. f.). La Guía Santillana 3. Formación Cívica y Ética. Secundaria (Primera Edición). Diana Angélica Gasca González. https://es.scribd.com/document/672801025/FCYE-TERCERO-GUIA-SANTILLANA

Juárez Hernández, A., & Cruz Ramos, L. (s. f.). Formación Cívica y Ética 3. Cuaderno de trabajo. Secundaria (Primera Edición). Ríos de Tinta. https://es.scribd.com/document/677486501/CDT-FORMACION-CIVICA-Y-ETICA-3`
};

const PROYECTOS = {
  '1°': 'Cambio Climático',
  '2°': 'Redes Sociales',
  '3°': 'Cohesión Social'
};

export function getDatosFijos(grado: '1°' | '2°' | '3°'): DatosFijos {
  return {
    ...INFO_BASE,
    nombreProyecto: PROYECTOS[grado],
    bibliografia: BIBLIOGRAFIA[grado]
  };
}

export const MESES = [
  'Enero 2026', 'Febrero 2026', 'Marzo 2026', 'Abril 2026',
  'Mayo 2026', 'Junio 2026', 'Julio 2026', 'Agosto 2026',
  'Septiembre 2026', 'Octubre 2026', 'Noviembre 2026', 'Diciembre 2026'
];

export const GRADOS: Array<'1°' | '2°' | '3°'> = ['1°', '2°', '3°'];
export const GRUPO = 'A y B';
