import React, { Component } from 'react';
import Buscador from './Buscador';
import Resultado from './Resultado';
import './App.css';
class App extends Component {
 
  state = {
    termino : '',
    imagenes : [],
    cargando : false
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi(); // agrega al state y una vez finalice se ejecuta la funcion
    });
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;
    if(pagina !== 1){
      pagina -= 1;
      this.setState({ 
        pagina : pagina
      }, () => {
        this.consultarApi();
        this.scroll();
      });
    }
  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina;
    pagina += 1;
    this.setState({ 
      pagina : pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  consultarApi = async () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=10316486-179444db2f494ba01b94ce7ac&q=${termino}
    &per_page=30&page=${pagina}`;
    await fetch(url)
      .then(respuesta => {
        this.setState({cargando : true})
        return respuesta.json()
      })
      .then(resultado => {
        setTimeout(() => {
          this.setState({
            imagenes : resultado.hits,
            cargando : false
          })
        }, 1000);

      })
  }
  
  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  render() {
    const cargando = this.state.cargando;
    let resultado;
    if(cargando === true){
      resultado = <div className="sk-fading-circle">
                    <div className="sk-circle1 sk-circle"></div>
                    <div className="sk-circle2 sk-circle"></div>
                    <div className="sk-circle3 sk-circle"></div>
                    <div className="sk-circle4 sk-circle"></div>
                    <div className="sk-circle5 sk-circle"></div>
                    <div className="sk-circle6 sk-circle"></div>
                    <div className="sk-circle7 sk-circle"></div>
                    <div className="sk-circle8 sk-circle"></div>
                    <div className="sk-circle9 sk-circle"></div>
                    <div className="sk-circle10 sk-circle"></div>
                    <div className="sk-circle11 sk-circle"></div>
                    <div className="sk-circle12 sk-circle"></div>
                  </div>
    }else{
        resultado = <Resultado 
                        imagenes = {this.state.imagenes}
                        paginaAnterior = {this.paginaAnterior}
                        paginaSiguiente = {this.paginaSiguiente} />
    }
    return (
      <div className="app container">
          <div className="jumbotron">
            <p className="lead text-center">Buscador de Imagenes</p>
            <Buscador 
              datosBusqueda = {this.datosBusqueda}/>
          </div>
          <div className="row justify-content-center">
            {resultado}
          </div>
      </div>
    );
  }
}

export default App;
