import { Component } from '@angular/core';
import { ServicosService } from '../servicos.service';
import { Pokemon } from './modelo/Pokemon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {


  constructor(private servico: ServicosService){}

  pokemomModule: Pokemon | null = null
  pokemonInput:string = ''
  errorMessage:string = ''
  isLoading: boolean = true

  onInputChange(): void {
    this.errorMessage = ''
    console.clear()
  }

  obterPokemons():void{
      
          if(this.pokemonInput){
            this.isLoading = false
            this.pokemomModule = null; 
            this.errorMessage = '';
            const pokemonName =this.pokemonInput.toLowerCase()
            this.servico.obterPokemon(pokemonName).subscribe(obj =>{
              this.pokemomModule = obj,
              this.isLoading = false
              this.pokemonInput =''

            },
              error =>{
                  console.error('Erro ao encontrar pokemon', error)
                  this.errorMessage = `Erro ao encontrar o pokemon`
                  this.pokemonInput = ''
                  this.isLoading = true
                }
            )
          } 
          else{
            this.pokemonInput = `Erro ao consultar API`
          }

  }

  
  procurarPokemon(event : Event):void{
    
    event.preventDefault()
    
    this.isLoading = true
    
    setTimeout(() => {
      
      this.obterPokemons()
      
    }, 4000);
    this.pokemomModule = null
    
  }
  
  clearInput(): void{
    if(this.errorMessage){
      this.pokemonInput = ''
      this.errorMessage = ''
    }
  }
  
  clickPrev(): void {
    if (this.pokemomModule && Number(this.pokemomModule.id) > 1) {
      const prevPokemonId = Number(this.pokemomModule.id) - 1;
      this.servico.obterPokemon(prevPokemonId.toString()).subscribe(
        obj => this.pokemomModule = obj,
        error => {
          console.error('Erro ao encontrar o pokemon anterior', error);
          this.errorMessage = `Erro ao encontrar o pokemon anterior.`;
          this.pokemomModule = null
        }
      );
    }
    
  }
  
  clickNext(): void {
    if (this.pokemomModule && this.pokemomModule.id) {
      const nextPokemonId = this.pokemomModule.id + 1;
      this.servico.obterPokemon(nextPokemonId.toString()).subscribe(
        obj => this.pokemomModule = obj,
        error => {
          console.error('Erro ao encontrar o próximo pokemon', error);
          this.errorMessage = `Erro ao encontrar o próximo pokemon.`;
        }
      );
    }
  }


  
}
