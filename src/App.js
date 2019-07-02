import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta'
import Formulario from './components/Formulario'
import Listado from './components/Listado'
import ControlPresupuesto from './components/ControlPresupuest'


function App() {

  //state
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [preguntarPresupuesto, guardarPreguntarPresupuesto] = useState(true);
  const [gasto, guardarGasto] = useState({});
  const [gastos, guardarGastos] = useState([]);
  //para prevenir que el usestate meta un gasto vacio al inicio
  const [crearGasto, guardarCrearGasto] = useState(false);

  useEffect(() => {
    if (crearGasto) {
      const listadoGastos = [...gastos, gasto];
      guardarGastos(listadoGastos);

      //restar al pres
      const presupuestoRestante = restante - gasto.cantidadGasto;
      guardarRestante(presupuestoRestante);

      guardarCrearGasto(false);
    }
  }, [crearGasto, gasto, gastos, restante]) //para que mire si cambio creargasto


  return (
    <div className="App container">
      <header>
        <h1>Gastos Semanales</h1>

        <div className="contenido-principal contenido">
          {(preguntarPresupuesto)
            ?
            <Pregunta
              guardarPresupuesto={guardarPresupuesto}
              guardarPreguntarPresupuesto={guardarPreguntarPresupuesto}
              guardarRestante={guardarRestante}
            />
            : (
              <div className="row">
                <div className="one-half column">
                  <Formulario
                    guardarGasto={guardarGasto}
                    guardarCrearGasto={guardarCrearGasto}
                  />
                </div>
                <div className="one-half column">
                  <Listado
                    gastos={gastos}
                  />
                  <ControlPresupuesto
                    presupuesto={presupuesto}
                    restante={restante}
                  />
                </div>
              </div>
            )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
