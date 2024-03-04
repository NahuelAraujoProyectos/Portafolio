import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
//Importamos interfaz Empleados
import { Empleados } from '../interface/empleados';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Titulo
  title= "CRUD con Angular"

  // Arreglo de empleados
  empleadosArray: Empleados[] = [
    {
      id: 1,
      nombre: 'Nahuel',
      pais: 'Argentina'
    },
    {
      id: 2,
      nombre: 'Elisa',
      pais: 'Argentina'
    },
    {
      id: 3,
      nombre: 'Alexis',
      pais: 'Venezuela'
    },
    {
      id: 4,
      nombre: 'Melany',
      pais: 'Venezuela'
    }
  ];

  //Nuevo objeto vacío del tipo Empleados
  empleadoseleccionado: Empleados = {} as Empleados; 

  //Método para Editar o Agregar
  agregarOEditar(){
    if(this.empleadoseleccionado.id === 0){
      this.empleadoseleccionado.id= this.empleadosArray.length+1;
      this.empleadosArray.push(this.empleadoseleccionado);
    }
    this.empleadoseleccionado = {} as Empleados;
  }

  //Método para recuperar datos de empleado seleccionado
  abrirEditar(empleado: Empleados){
    this.empleadoseleccionado = empleado;
  }

  //Método para eliminar empleado
  eliminar(){
    if(confirm("Seguro de eliminarlo?")){
      this.empleadosArray = this.empleadosArray.filter(x => x != this.empleadoseleccionado);
      this.empleadoseleccionado = {} as Empleados
    }
  }
}
