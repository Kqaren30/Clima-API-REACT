import React, { Fragment,useState } from "react";
import Errores from './Error';
import PropTypes from 'prop-types';

const Formulario = ({busqueda,guardarBusqueda, guardarConsultar}) => {

    //state del formulario

    const [error, guardarError]= useState(false);

    //Extraer ciudad y pais
    const {ciudad,pais}= busqueda;

    //funcion que coloca los elemntos en el state
    const handleChange = e => {
        //actualizar el state
        //copia del state, valor actualizado
        guardarBusqueda({...busqueda, [e.target.name] : e.target.value});
    }

    //Cuando el usuario da submit al form
    const handleSubmit = e => {
        e.preventDefault();

        //validar
        if(ciudad.trim()==='' || pais.trim()===''){
            guardarError(true);
            return;
        }

        guardarError(false);

        //pasarlo al componente principal
        //De esta forma solo consultaremos cuando se haga submit
        guardarConsultar(true); 
    }
  return (
    <Fragment>
    <form onSubmit={handleSubmit}>
    {error ? <Errores mensaje="Ambos campos son obligatorios"/> : null}
      <div className="input-field col s12">
        <input type="text" name="ciudad" id="ciudad" value={ciudad}
        onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>

      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} 
        onChange={handleChange}
        >
          <option value="">-- Seleccione un país --</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País: </label>
      </div>

      <div className="input-field col s12">
                <button
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
                >Buscar Clima</button>
    </div>
      </form>
    </Fragment>
  );
};

 
Formulario.propTypes= { 
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}
export default Formulario;
