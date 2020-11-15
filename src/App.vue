<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Escola Dev</a>
      </div>
    </nav>

    <div class="container">
     <h4>Listagem de cursos</h4>
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>
      <form @submit.prevent="salvar">
          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="curso.nome" required >   
          <label>Valor</label>         
           <money v-model="curso.valor" v-bind="money" required></money> 
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
      </form>
      <table>
        <thead>
          <tr>
            <th>NOME</th>        
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="curso of cursos" :key="curso.id">
            <td>{{ curso.nome }}</td>            
            <td>{{ formatPrice(curso.valor) }}</td>
            <td>
              <button @click="editar(curso)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(curso)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>      
      </table>
    </div>
  </div>
</template>
<script>

import Cursos from './services/cursos'

export default {
  name: 'app',
  data () {
    return {
      curso:{
        id: '',
        nome: '',
        valor: '',
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
      
        precision: 2,
        masked: false
      },
      cursos: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
   
    formatPrice(valor) {
        let val = (valor/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    listar(){
      Cursos.listar().then(resposta => {
        this.cursos = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.curso.id){

        Cursos.salvar(this.curso).then(resposta => {
          this.curso = {}
          this.$swal('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

        Cursos.atualizar(this.curso).then(resposta => {
          this.curso = {}
          this.errors = {}          
           this.$swal('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }
      

    },

    editar(curso){
      this.curso = curso
    },
    excluir (curso) {
        Cursos.apagar(curso).then(resposta => {
            this.$swal(
          'Deletado!',
          'Curso excluído com sucesso',
          'success') 
            this.listar()
            this.errors = {}
          }).catch(e => {
            this.errors = e.response.data.errors
            this.$swal(
          'Ops!',
          'Erro ao excluir',
          'error') 
          })
    },

    remover(curso){

      this.$swal({
        title: 'Você tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir curso!'
      }).then((result) => {
      if (result.isConfirmed) {
        this.excluir(curso)
      }
      });
    }
  }

}
</script>

<style>



</style>
