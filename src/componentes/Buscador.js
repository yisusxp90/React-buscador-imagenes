import React, { Component } from 'react';

class Buscador extends Component {

    busquedaRef = React.createRef();
    obtenerDatos = (e) => {
        e.preventDefault();
        const termino = this.busquedaRef.current.value;
        this.props.datosBusqueda(termino);
    }
    render() { 
        return ( 
            <form onSubmit={this.obtenerDatos}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input className="form-control form-control-lg" 
                            type="text" placeholder="busca tu imagen" ref={this.busquedaRef}/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar"/>
                    </div>
                </div>
            </form>
         );
    }
}
 
export default Buscador;