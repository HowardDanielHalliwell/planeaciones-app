import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { PlaneacionData, Momento, ActividadFase } from '@/types';
import { generarExcel } from '@/services/excelGenerator';
import { MESES, GRADOS, GRUPO, getDatosFijos } from '@/data/datosFijos';
import { plantillaInicio, plantillaDesarrollo, plantillaCierre } from '@/data/plantillas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  FileDown, 
  Save, 
  GraduationCap, 
  Calendar, 
  BookOpen,
  CheckCircle,
  LogOut,
  ChevronDown,
  Layers,
  Library
} from 'lucide-react';

const crearEstadoInicial = (): PlaneacionData => ({
  mes: MESES[2],
  grado: '1°',
  grupo: GRUPO,
  contenido: '',
  nivelLiteral: '',
  nivelInferencial: '',
  nivelCritico: '',
  procesosAprendizaje: '',
  momentoInicio: plantillaInicio(),
  momentoDesarrollo: plantillaDesarrollo(),
  momentoCierre: plantillaCierre(),
});

export function PlaneacionForm() {
  const { usuario, logout } = useAuth();
  const [planeacion, setPlaneacion] = useState<PlaneacionData>(crearEstadoInicial());
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('planeacion_borrador');
    if (saved) {
      setPlaneacion(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('planeacion_borrador', JSON.stringify(planeacion));
      setSavedMessage('Guardado automático');
      setTimeout(() => setSavedMessage(''), 2000);
    }, 30000);
    return () => clearInterval(interval);
  }, [planeacion]);

  const updateField = (field: keyof PlaneacionData, value: string) => {
    setPlaneacion(prev => ({ ...prev, [field]: value }));
  };

  const updateMomento = (tipo: 'inicio' | 'desarrollo' | 'cierre', momento: Momento) => {
    const field = tipo === 'inicio' ? 'momentoInicio' : 
                  tipo === 'desarrollo' ? 'momentoDesarrollo' : 'momentoCierre';
    setPlaneacion(prev => ({ ...prev, [field]: momento }));
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generarExcel(planeacion);
    } catch (error) {
      console.error('Error generando Excel:', error);
      alert('Error al generar el archivo. Intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    localStorage.setItem('planeacion_borrador', JSON.stringify(planeacion));
    setSavedMessage('¡Guardado!');
    setTimeout(() => setSavedMessage(''), 2000);
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro? Se perderán los datos no guardados.')) {
      setPlaneacion(crearEstadoInicial());
      localStorage.removeItem('planeacion_borrador');
    }
  };

  const datosFijos = getDatosFijos(planeacion.grado);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Generador de Planeaciones</h1>
              <p className="text-sm text-gray-500">Colegio Mano Amiga Chalco</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {savedMessage && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3" />
                <span>{savedMessage}</span>
              </Badge>
            )}
            <span className="text-sm text-gray-600 hidden md:inline">{usuario?.nombre}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-1" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="pensamiento">Pensamiento Crítico</TabsTrigger>
            <TabsTrigger value="inicio">Inicio</TabsTrigger>
            <TabsTrigger value="desarrollo">Desarrollo</TabsTrigger>
            <TabsTrigger value="cierre">Cierre</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Información General</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div>
                    <Label className="text-blue-600 text-xs uppercase">Docente</Label>
                    <p className="font-medium text-gray-800">{datosFijos.nombreDocente}</p>
                  </div>
                  <div>
                    <Label className="text-blue-600 text-xs uppercase">Proyecto</Label>
                    <p className="font-medium text-gray-800">{datosFijos.nombreProyecto}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-blue-600 text-xs uppercase">Campos Formativos</Label>
                    <p className="font-medium text-gray-800">{datosFijos.camposFormativos}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mes">Mes</Label>
                    <Select 
                      value={planeacion.mes} 
                      onValueChange={(v) => updateField('mes', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MESES.map(m => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grado">Grado</Label>
                    <Select 
                      value={planeacion.grado} 
                      onValueChange={(v: '1°' | '2°' | '3°') => updateField('grado', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {GRADOS.map(g => (
                          <SelectItem key={g} value={g}>{g} de Secundaria</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grupo">Grupo</Label>
                    <Input value={GRUPO} disabled className="bg-gray-100" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contenido">Contenido (Tema a abordar)</Label>
                  <Textarea
                    id="contenido"
                    placeholder="Escribe aquí el tema que vas a trabajar..."
                    value={planeacion.contenido}
                    onChange={(e) => updateField('contenido', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="procesos">Procesos de Desarrollo de Aprendizaje</Label>
                  <Textarea
                    id="procesos"
                    placeholder="Describe los procesos de aprendizaje..."
                    value={planeacion.procesosAprendizaje}
                    onChange={(e) => updateField('procesosAprendizaje', e.target.value)}
                    rows={3}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Library className="h-5 w-5 text-amber-600" />
                    <Label className="text-amber-700 font-semibold">
                      Bibliografía (seleccionada automáticamente según el grado)
                    </Label>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {datosFijos.bibliografia}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Esta bibliografía se incluirá automáticamente en el Excel según el grado seleccionado ({planeacion.grado})
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pensamiento">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Fases del Pensamiento Crítico</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="literal" className="text-blue-700 font-semibold">
                    Nivel Literal (Percepción – Observación)
                  </Label>
                  <Textarea
                    id="literal"
                    placeholder="¿Qué harás en el nivel literal? (identificar, describir, observar...)"
                    value={planeacion.nivelLiteral}
                    onChange={(e) => updateField('nivelLiteral', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inferencial" className="text-blue-700 font-semibold">
                    Nivel Inferencial (Comparar – Contrastar / Analizar)
                  </Label>
                  <Textarea
                    id="inferencial"
                    placeholder="¿Qué harás en el nivel inferencial? (comparar, clasificar, analizar...)"
                    value={planeacion.nivelInferencial}
                    onChange={(e) => updateField('nivelInferencial', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="critico" className="text-blue-700 font-semibold">
                    Nivel Crítico (Evaluar – Reflexionar – Valorar)
                  </Label>
                  <Textarea
                    id="critico"
                    placeholder="¿Qué harás en el nivel crítico? (evaluar, reflexionar, proponer...)"
                    value={planeacion.nivelCritico}
                    onChange={(e) => updateField('nivelCritico', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inicio">
            <MomentoPanel
              titulo="Inicio"
              momento={planeacion.momentoInicio}
              onUpdate={(momento) => updateMomento('inicio', momento)}
            />
          </TabsContent>

          <TabsContent value="desarrollo">
            <MomentoPanel
              titulo="Desarrollo"
              momento={planeacion.momentoDesarrollo}
              onUpdate={(momento) => updateMomento('desarrollo', momento)}
            />
          </TabsContent>

          <TabsContent value="cierre">
            <MomentoPanel
              titulo="Cierre"
              momento={planeacion.momentoCierre}
              onUpdate={(momento) => updateMomento('cierre', momento)}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-6">
          <Button variant="ghost" onClick={handleReset} className="text-gray-500">
            Reiniciar
          </Button>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Guardar Borrador
            </Button>
            <Button 
              onClick={handleDownload} 
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <FileDown className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generando...' : 'Descargar Excel'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

interface MomentoPanelProps {
  titulo: string;
  momento: Momento;
  onUpdate: (momento: Momento) => void;
}

function MomentoPanel({ titulo, momento, onUpdate }: MomentoPanelProps) {
  const updateSubMomento = (subMomentoId: string, actividades: ActividadFase[]) => {
    onUpdate({
      ...momento,
      subMomentos: momento.subMomentos.map(sub =>
        sub.id === subMomentoId ? { ...sub, actividades } : sub
      )
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Layers className="h-5 w-5" />
          <span>{titulo}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Accordion type="multiple" defaultValue={momento.subMomentos.map(s => s.id)} className="space-y-4">
            {momento.subMomentos.map((subMomento) => (
              <AccordionItem 
                key={subMomento.id} 
                value={subMomento.id}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-2 text-left">
                    <ChevronDown className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-gray-800">{subMomento.nombre}</span>
                    <Badge variant="outline" className="text-xs">
                      {subMomento.actividades.length} fases
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pb-4">
                    {subMomento.actividades.map((actividad, index) => (
                      <ActividadForm
                        key={actividad.id}
                        actividad={actividad}
                        numero={index + 1}
                        onUpdate={(field, value) => {
                          const nuevasActividades = subMomento.actividades.map(act =>
                            act.id === actividad.id ? { ...act, [field]: value } : act
                          );
                          updateSubMomento(subMomento.id, nuevasActividades);
                        }}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface ActividadFormProps {
  actividad: ActividadFase;
  numero: number;
  onUpdate: (field: keyof ActividadFase, value: string) => void;
}

function ActividadForm({ actividad, numero, onUpdate }: ActividadFormProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="font-medium text-blue-700">
          Fase {numero}: {actividad.nombreFase}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-gray-500">Tiempos de Aplicación</Label>
          <Input
            value={actividad.tiempos}
            onChange={(e) => onUpdate('tiempos', e.target.value)}
            placeholder="Ej: del 2 al 6 de marzo 2026"
            className="bg-white"
          />
        </div>
        <div>
          <Label className="text-xs text-gray-500">Evaluación / Instrumentos</Label>
          <Input
            value={actividad.evaluacion}
            onChange={(e) => onUpdate('evaluacion', e.target.value)}
            placeholder="Ej: Revisión de cuaderno..."
            className="bg-white"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs text-gray-500">Descripción de Actividades (PDA)</Label>
        <Textarea
          value={actividad.descripcion}
          onChange={(e) => onUpdate('descripcion', e.target.value)}
          placeholder="Describe la actividad detalladamente..."
          rows={4}
          className="bg-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-gray-500">Evidencias de Aprendizaje</Label>
          <Input
            value={actividad.evidencias}
            onChange={(e) => onUpdate('evidencias', e.target.value)}
            placeholder="Ej: Tabla comparativa..."
            className="bg-white"
          />
        </div>
        <div>
          <Label className="text-xs text-gray-500">Materiales</Label>
          <Input
            value={actividad.materiales}
            onChange={(e) => onUpdate('materiales', e.target.value)}
            placeholder="Ej: Pizarrón, marcadores..."
            className="bg-white"
          />
        </div>
      </div>
    </div>
  );
}
