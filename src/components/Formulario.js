import React, { useState } from 'react';
import Error from './Error'
import shortid from 'shortid'

function Formulario(props) {

    const { guardarGasto, guardarCrearGasto } = props;
    //state
    const [nombreGasto, guardarNombreGasto] = useState('')
    const [cantidadGasto, guardarCantidadGasto] = useState(0)
    const [error, guardarError] = useState(false)

    //cuando se agrega el gasto
    const agregarGasto = (e) => {
        e.preventDefault();

        //validar
        if (cantidadGasto < 1 || isNaN(cantidadGasto) || nombreGasto === '') {
            guardarError(true);
            return;
        }


        //construir el obj gasto
        const gasto = {
            nombreGasto,
            cantidadGasto,
            id: shortid.generate()
        }

        //pasar al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);
        guardarError(false);
        guardarNombreGasto('');  //reiniciar el frm
        guardarCantidadGasto('');
    }

    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos</h2>

            {error ? <Error mensaje='Ambos campos son obligatorios o El presupuesto es Incorrecto' /> : null}

            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Combustible"
                    onChange={e => guardarNombreGasto(e.target.value)}
                    value={nombreGasto} //para reiniciar el form
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 100"
                    onChange={e => guardarCantidadGasto(parseInt(e.target.value, 10))}
                    value={cantidadGasto}
                />
            </div>

            <input type="submit" className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    )
}

export default Formulario;