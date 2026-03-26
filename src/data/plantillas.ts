import type { Momento } from '@/types';

export const plantillaInicio = (): Momento => ({
  id: 'inicio',
  nombre: 'Inicio',
  subMomentos: [
    {
      id: 'inicio-motivacion',
      nombre: 'Motivación Anclaje',
      actividades: [
        {
          id: 'act-exploramos',
          nombreFase: 'Exploramos',
          descripcion: '',
          tiempos: '',
          evaluacion: '',
          evidencias: '',
          materiales: ''
        },
        {
          id: 'act-identificacion',
          nombreFase: 'Identificación',
          descripcion: '',
          tiempos: '',
          evaluacion: '',
          evidencias: '',
          materiales: ''
        }
      ]
    },
    {
      id: 'inicio-finalidad',
      nombre: 'Finalidad',
      actividades: [
        {
          id: 'act-recuperacion',
          nombreFase: 'Recuperación',
          descripcion: '',
          tiempos: '',
          evaluacion: '',
          evidencias: '',
          materiales: ''
        },
        {
          id: 'act-acercamiento',
          nombreFase: 'Acercamiento',
          descripcion: '',
          tiempos: '',
          evaluacion: '',
          evidencias: '',
          materiales: ''
        }
      ]
    }
  ]
});

export const plantillaDesarrollo = (): Momento => ({
  id: 'desarrollo',
  nombre: 'Desarrollo',
  subMomentos: [
    {
      id: 'desarrollo-andamiaje',
      nombre: 'Andamiaje Consolidación',
      actividades: [
        {
          id: 'act-planificacion',
          nombreFase: 'Planificación',
          descripcion: '',
          tiempos: '',
          evaluacion: '',
          evidencias: '',
          materiales: ''
        },
        {
          id: 'act-comprension',
          nombreFase: 'Comprensión y Producción',
          descripcion: '',
          tiempos: '',
          evaluacion: '',
          evidencias: '',
          materiales: ''
        },
        {
          id: 'act-reconocimiento',
          nombreFase: 'Reconocimiento',
          descripcion: '',
          tiempos: '',
          evaluacion: '',
          evidencias: '',
          materiales: ''
        }
      ]
    }
  ]
});

export const plantillaCierre = (): Momento => ({
  id: 'cierre',
  nombre: 'Cierre',
  subMomentos: [
    {
      id: 'cierre-evaluacion',
      nombre: 'Evaluación',
      actividades: [
        {
          id: 'act-integracion',
          nombreFase: 'Integración',
          descripcion: '',
          tiempos: '',
          evaluacion: '',
          evidencias: '',
          materiales: ''
        },
        {
          id: 'act-difusion',
          nombreFase: 'Difusión',
          descripcion: '',
          tiempos: '',
          evaluacion: '',
          evidencias: '',
          materiales: ''
        },
        {
          id: 'act-consideracion',
          nombreFase: 'Consideración y Avances',
          descripcion: '',
          tiempos: '',
          evaluacion: '',
          evidencias: '',
          materiales: ''
        }
      ]
    }
  ]
});
