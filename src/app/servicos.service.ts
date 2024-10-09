import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from './principal/modelo/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  constructor(private http:HttpClient) { }

  obterPokemon(pokemon: string):Observable<Pokemon>{
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  }

  
}
