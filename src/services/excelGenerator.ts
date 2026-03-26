// ============================================
// GENERADOR DE EXCEL - Usando ExcelJS para formato profesional
// ============================================

import type { PlaneacionData, DatosFijos, Momento } from '@/types';
import { getDatosFijos } from '@/data/datosFijos';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export async function generarExcel(planeacion: PlaneacionData): Promise<void> {
  const datosFijos = getDatosFijos(planeacion.grado);
  
  const workbook = new ExcelJS.Workbook();
  workbook.creator = datosFijos.nombreDocente;
  workbook.created = new Date();
  workbook.title = `Planeación ${planeacion.mes} - ${planeacion.grado}`;

  await createPortadaSheet(workbook, planeacion, datosFijos);
  await createMomentoSheet(workbook, planeacion.momentoInicio);
  await createMomentoSheet(workbook, planeacion.momentoDesarrollo);
  await createMomentoSheet(workbook, planeacion.momentoCierre);

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const filename = `SD_${planeacion.grado}SEC_${planeacion.mes.replace(' ', '_')}.xlsx`;
  
  saveAs(blob, filename);
}

async function createPortadaSheet(
  workbook: ExcelJS.Workbook,
  planeacion: PlaneacionData,
  datosFijos: DatosFijos
): Promise<void> {
  const sheet = workbook.addWorksheet('Portada');
  
  sheet.getColumn('A').width = 35;
  sheet.getColumn('B').width = 80;

  const titleRow = sheet.addRow(['COLEGIO MANO AMIGA CHALCO']);
  titleRow.font = { bold: true, size: 14 };
  titleRow.alignment = { horizontal: 'center' };
  sheet.mergeCells('A1:B1');

  const subtitleRow = sheet.addRow([`Plan Mensual: ${planeacion.mes}`]);
  subtitleRow.font = { bold: true, size: 14 };
  subtitleRow.alignment = { horizontal: 'center' };
  sheet.mergeCells('A2:B2');

  sheet.addRow(['', '']);

  const headerRow = sheet.addRow(['Rubro', 'Descripción']);
  headerRow.font = { bold: true };
  headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };

  const datos = [
    ['Nombre del Docente', datosFijos.nombreDocente],
    ['Grado y Grupo', `${planeacion.grado} ${planeacion.grupo}`],
    ['Nombre del Proyecto', datosFijos.nombreProyecto],
    ['Metodología activa a desarrollar', 'Aprendizaje Basado en Centros Colaborativos'],
    ['Campo(s) Formativo(s)', datosFijos.camposFormativos],
    ['Ejes Articuladores', datosFijos.ejesArticuladores],
    ['Uso de Libros', datosFijos.bibliografia],
    ['Contenido', planeacion.contenido || 'Por definir'],
    ['Fases del Pensamiento Crítico a Desarrollar', ''],
    ['Nivel literal (Percepción – Observación)', planeacion.nivelLiteral || 'Por definir'],
    ['Nivel inferencial (Comparar – Contrastar / Analizar)', planeacion.nivelInferencial || 'Por definir'],
    ['Nivel crítico (Evaluar – Reflexionar – Valorar)', planeacion.nivelCritico || 'Por definir'],
    ['Procesos de Desarrollo de Aprendizaje', planeacion.procesosAprendizaje || 'Por definir'],
    ['Competencias del Perfil de Egreso', datosFijos.competenciasPerfil]
  ];

  datos.forEach(([label, value]) => {
    const row = sheet.addRow([label, value]);
    row.getCell(1).font = { bold: true };
    row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { vertical: 'top', wrapText: true };
    });
  });
}

async function createMomentoSheet(workbook: ExcelJS.Workbook, momento: Momento): Promise<void> {
  const sheet = workbook.addWorksheet(momento.nombre);
  
  sheet.getColumn('A').width = 18;
  sheet.getColumn('B').width = 15;
  sheet.getColumn('C').width = 40;
  sheet.getColumn('D').width = 15;
  sheet.getColumn('E').width = 20;
  sheet.getColumn('F').width = 18;
  sheet.getColumn('G').width = 15;

  const headers = [
    'MOMENTOS\nSECUENCIA DIDÁCTICA',
    'FASES',
    'DESCRIPCIÓN DE ACTIVIDADES (PDA)',
    'TIEMPOS DE\nAPLICACIÓN',
    'EVALUACIÓN /\nINSTRUMENTOS DE EVALUACIÓN',
    'EVIDENCIAS DE\nAPRENDIZAJE',
    'MATERIALES'
  ];

  const headerRow = sheet.addRow(headers);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF333333' } };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  
  headerRow.eachCell((cell) => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

  momento.subMomentos.forEach((subMomento) => {
    const startRow = sheet.rowCount + 1;
    
    subMomento.actividades.forEach((act, index) => {
      const rowData = [
        index === 0 ? `${momento.nombre}:\n${subMomento.nombre}` : '',
        act.nombreFase,
        act.descripcion || 'Por definir',
        act.tiempos || 'Por definir',
        act.evaluacion || 'Por definir',
        act.evidencias || 'Por definir',
        act.materiales || 'Por definir'
      ];
      
      const row = sheet.addRow(rowData);
      
      if (index === 0) {
        row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE7E6E6' } };
        row.getCell(1).font = { bold: true };
      }
      
      row.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };
      
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.alignment = { vertical: 'top', wrapText: true };
      });
    });
    
    const endRow = sheet.rowCount;
    if (endRow > startRow) {
      sheet.mergeCells(startRow, 1, endRow, 1);
    }
  });
}
