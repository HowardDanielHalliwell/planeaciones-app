export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  token: string;
}

export interface ActividadFase {
  id: string;
  nombreFase: string;
  descripcion: string;
  tiempos: string;
  evaluacion: string;
  evidencias: string;
  materiales: string;
}

export interface SubMomento {
  id: string;
  nombre: string;
  actividades: ActividadFase[];
}

export interface Momento {
  id: string;
  nombre: string;
  subMomentos: SubMomento[];
}

export interface PlaneacionData {
  id?: string;
  mes: string;
  grado: '1°' | '2°' | '3°';
  grupo: string;
  contenido: string;
  nivelLiteral: string;
  nivelInferencial: string;
  nivelCritico: string;
  procesosAprendizaje: string;
  momentoInicio: Momento;
  momentoDesarrollo: Momento;
  momentoCierre: Momento;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

export interface DatosFijos {
  nombreDocente: string;
  camposFormativos: string;
  ejesArticuladores: string;
  competenciasPerfil: string;
  nombreProyecto: string;
  bibliografia: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
