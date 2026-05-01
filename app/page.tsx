

import React from "react"

export default function Home() {
  return (
    <>
    <section className="conteiner">
    <div className="pa1">
      <h1>Cadastre seu animalzinho!!</h1>
    </div>
    <br/>
    <br/>
    <br/>

    <div className="infpet">
      <div className="ftpet">
        Foto do pet
      </div>

      <form className="meuform">
        <label htmlFor="npet" id="nomepet">Nome do animal</label>
        <input type="text" value="" placeholder="ex: Max" name="nomepet"></input>
        <br/>
        <label htmlFor="idade" id="idade">idade</label>
        <select className="idade">
          <option> Filhote</option>
          <option> Adulto</option>
          <option> Senior</option>
        </select>
        <br/>
        <label htmlFor="porte" id="porte">Porte do animal (apenas para cães)</label>
        <select id="porte">
          <option>Pequeno</option>
          <option> Médio</option>
          <option> Grande</option>
        </select>
      </form>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>



    {/* <!--formulario 2--> */}
    <section id="boxformulario2">
      <div className="todas">
        <div className="grupo1">
          <span className="titulo">Espécie</span>
          <label className="radio">
            <input type="radio" name="especie" value="felino" />
            <span className="bolinha"></span>
            Felino
          </label>

          <label className="radio">
            <input type="radio" name="especie" value="canino" />
            <span className="bolinha"></span>
            Canino
          </label>
        </div>

        <div className="grupo2">
          <span className="titulo">Sexo</span>
          <label className="radio">
            <input type="radio" name="sexo" value="macho"/>
            <span className="bolinha"></span>
            Macho
          </label>

          <label className="radio">
            <input type="radio" name="sexo" value="femea"/>
            <span className="bolinha"></span>
            Fêmea
          </label>
        </div>

        <div className="grupo3">
          <span className="titulo">Castrado</span>
          <label className="radio">
            <input type="radio" name="castrado" value="sim"/>
            <span className="bolinha"></span>
            Sim
          </label>

          <label className="radio">
            <input type="radio" name="castrado" value="nao"/>
            <span className="bolinha"></span>
            Não
          </label>
        </div>

        <div className="grupo4">
          <span className="titulo">É microchipado?</span>
          <label className="radio">
            <input type="radio" name="micro" value="sim"/>
            <span className="bolinha"></span>
            Sim
          </label>

          <label className="radio">
            <input type="radio" name="micro" value="nao"/>
            <span className="bolinha"></span>
            Não
          </label>

          <input className="microchip-input" type="text" placeholder="Número do microchip"/>
        </div>
      </div>
    </section>
    <br/>
    <br/>
    <div className="adPet">
      <p> +</p>
    </div>
    <div className="adPet">
      <p> +</p>

    </div>
    <div className="adPet">
      <p> +</p>

    </div>
    <div className="adPet">
      <p> +</p>

    </div>
    <button id="submit">Cadastrar</button>
    <br/>
    <br/>
  </section>
  </>
  );
}
