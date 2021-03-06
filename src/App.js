import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Errores from './components/Error';

function App() {
 //state del formulario
  const [busqueda, guardarBusqueda]=useState({
    ciudad:'',
    pais:''
}); 

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError]=useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(()=>{
    const consultarAPI = async () => {
     
      if(consultar){
        const appId = 'bc2b860d5d65ea31ae49f89e32278407';
      
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
  
        guardarResultado(resultado);

        //para poder hacer mas consultas regreso el estado
        guardarConsultar(false);

        //Detecta si hubo datos correctos en la consulta
        if(resultado.cod==="404"){
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    }
    consultarAPI();
    //resuelve problemas con ciudad y pais: error de dependencia
    //eslint-disable-next-line
  },[consultar]);

  //Carga condicional de componentes

  let componente;

  if(error){
    componente= <Errores mensaje="No hay resultados"/>
  } else { 
    componente=<Clima resultado={resultado}/>
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
            <Formulario
            busqueda={busqueda}
            guardarBusqueda={guardarBusqueda}
            guardarConsultar={guardarConsultar}
            /></div>
            <div className="col m6 s12">
             {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
