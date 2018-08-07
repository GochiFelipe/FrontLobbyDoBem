<template>
  <div>
    <div class="upTableButton">
        <v-dialog class="divButton" v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <div class="divButton" slot="activator">
                <appButton 
                type="none"
                styleButton="none"
                alt="createActivity"
                title="Adicionar Registro" 
                class="button-component-create"
                :icon="false"
                >
                </appButton>
                <v-icon class="addIcon">add_circle</v-icon>
            </div>
            <v-card>
                <v-card-title class="cardHeader">
                    <span class="headline">Criar Atividade</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                    v-model="title"
                    label="Titulo"
                    required
                    :disabled="disabled"
                    ></v-text-field>
                    <v-textarea
                      v-model="description"
                      label="Descrição"
                      counter="255"
                      rows="3"
                      :disabled="disabled"
                    ></v-textarea>
                    <v-textarea
                      v-model="goals"
                      label="Metas"
                      required
                      counter="255"
                      rows="3"
                      :disabled="disabled"
                    ></v-textarea>
                    <div class="divTextCityAndState">
                    <v-select
                      :items="states"
                      v-model="state"
                      auto
                      label="Estado"
                      hide-details
                      prepend-icon="map"
                      single-line
                      class="stateText stateNome"
                      item-text="nome"
                      item-value="id"
                      :disabled="disabled"
                    ></v-select>
                    <v-select
                      :items="states"
                      v-model="state"
                      auto
                      label="Estado"
                      hide-details
                      prepend-icon="map"
                      single-line
                      class="stateText stateSigla"
                      item-text="sigla"
                      item-value="id"
                      :disabled="disabled"
                    ></v-select>
                    <v-text-field
                      v-model="city"
                      label="Cidade"
                      required
                      class="cityText"
                      :disabled="disabled"
                    ></v-text-field>
                    </div>
                    <v-select
                      :items="Candidateslist"
                      v-model="candidates"
                      label="Candidatos"
                      multiple
                      chips
                      hint="Escolha seus candidatos"
                      persistent-hint
                      item-text="nome"
                      return-object
                      :disabled="disabled"
                    ></v-select>
                    <v-text-field
                      v-model="typeRegister"
                      label="Tipos de Registro"
                      required
                      :disabled="disabled"
                    ></v-text-field>
                    <!---<v-select
                      :items="registerTypes"
                      v-model="typeRegister"
                      label="Tipos de Registro"
                      multiple
                      chips
                      hint="Escolha seus Registros"
                      persistent-hint
                    ></v-select>-->
                    <div class="divButtonsModal">
                      <appButton 
                        styleButton="save"
                        alt="createActivity"
                        title="Salvar" 
                        class="button-component-save"
                        :icon="false"
                        v-if="disabled == 0"
                        @click.native="saveActivity()"/>
                      <appButton 
                        styleButton="close"
                        alt="createActivity"
                        title="Fechar" 
                        class="button-component-close"
                        :icon="false"
                        @click.native="cleanActivity()"/>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
    <div class="table">
        <v-data-table
        class="dataTable"
        :headers="headers"
        :pagination.sync="pagination"
        :items="activitys"
        >
            <template slot="headers" slot-scope="props">
                <tr>
                    <th
                    v-for="header in props.headers"
                    :key="header.text"
                    :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                    @click="changeSort(header.value)"
                    >
                    <v-icon small>arrow_upward</v-icon>
                    {{ header.text }}
                    </th>
                </tr>
            </template>
            <template slot="items" slot-scope="props">
                <tr>
                    <td>{{ props.item.title }}</td>
                    <!---<td>{{ props.item.description }}</td>
                    <td>{{ props.item.goals }}</td>-->
                    <td>{{ props.item.city }}</td>
                    <td>{{ props.item.state }}</td>
                    <!---<td>{{ props.item.typeRegister }}</td>-->
                    <td class="candidatesTd">
                      <ul style="list-style:none;">
                        <li v-for="candidatos in props.item.candidates" 
                        :key="candidatos.id">
                          {{candidatos.nome}}
                        </li>
                      </ul>
                    </td>
                    <td class="tdIcons" @click="detailActivity(props.item)">
                        <v-icon class="icons">search</v-icon>
                    </td>
                    <td class="tdIcons" @click="editActivity(props.item)">
                        <v-icon class="icons">create</v-icon>
                    </td>
                    <td class="tdIcons" @click="deleteActivity(props.item)">
                        <v-icon class="icons">delete</v-icon>
                    </td>
                    <td class="tdIcons">
                        <v-icon class="icons">share</v-icon>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
  </div>
</template>
<script>
import Activity from '../domain/activity/Activity.js'
import ActivityService from '../domain/activity/ActivityService.js'
import button from './shared/button/button.vue'
import StateService from '../domain/state/StateService.js'
import CandidateService from '../domain/candidates/CandidateService.js'
import PersonService from '../domain/person/PersonService.js'
import UserService from '../domain/user/UserService.js'

export default {
  components: {
    appButton: button
  },
  data: () => ({
    personId: '',
    dialog: false,
    activitys: [],
    states: [],
    Candidateslist: [],
    candidates: '',
    candidateId: '',
    title: '',
    description: '',
    goals: '',
    state: '',
    city: '',
    dateCriation: '',
    dateUpdate: '',
    candadetes: [],
    typeRegister: '',
    pagination: {
      sortBy: 'name'
    },
    headers: [
      {
        text: 'Titulo',
        value: 'title'
      },
      /* {
        text: 'Descrição',
        value: 'description'
      },
      {
        text: 'Metas',
        value: 'goals'
      }, */
      {
        text: 'Cidade',
        value: 'city'
      },
      {
        text: 'Estado',
        value: 'state'
      },
      /* {
        text: 'Tipo de Registro',
        value: 'typeRegister'
      },  */
      {
        text: 'Candidatos',
        value: 'candidates'
      },
      {
        text: 'Visualizar',
        value: 'detail'
      },
      {
        text: 'Editar',
        value: 'edit'
      },
      {
        text: 'Deletar',
        value: 'delete'
      },
      {
        text: 'Compartilhar',
        value: 'share'
      }
    ],
    activity: new Activity(),
    disabled: false
  }),
  created () {
    this.servicePerson = new PersonService()
    this.serviceUser = new UserService()
    this.service = new ActivityService()
    this.serviceUser.findByEmailLocal().then((userPersonRes) => {
      console.log(userPersonRes)
      this.servicePerson.findPersonForUser(userPersonRes.data.id).then((personRes) => {
        this.personId = personRes.data.personId
        this.service.listForPersonAndEnable(personRes.data.personId).then((res) => {
          res.data.forEach(element => {
            this.activitys.push(element)
          })
        })
      })
    })
    this.stateService = new StateService()
    this.stateService.listStates().then((res) => {
      res.data.forEach(element => {
        this.states.push(element)
      })
    })
    this.candidateService = new CandidateService()
    this.candidateService.list().then((res) => {
      res.data.forEach(element => {
        this.Candidateslist.push(element)
      })
    })
  },
  methods: {
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    cleanActivity () {
      this.activityId = ''
      this.title = ''
      this.description = ''
      this.goals = ''
      this.city = ''
      this.state = ''
      this.typeRegister = ''
      this.candidates = []
      this.dialog = false
      this.disabled = false
    },
    detailActivity (item) {
      this.editActivity(item)
      this.disabled = true
    },
    saveActivity () {
      this.activity.activityId = this.activityId
      this.activity.title = this.title
      this.activity.description = this.description
      this.activity.goals = this.goals
      this.activity.city = this.city
      this.activity.state = this.state
      this.activity.typeRegister = this.typeRegister
      this.activity.candidates = this.candidates
      this.activity.dateCriation = this.dateCriation
      this.service.saveActivity(this.activity, this.personId).then((res) => {
        if (this.activity.activityId != null) {
          let object = this.activitys.find(obj => obj.activityId === this.activity.activityId)
          let index = this.activitys.indexOf(object)
          this.activitys.splice(index, 1)
          this.activitys.push(res.data)
        } else {
          this.activitys.push(res.data)
        }
        this.cleanActivity()
      })
    },
    deleteActivity (item) {
      this.service.deleteActivity(item.activityId).then((res) => {
        let index = this.activitys.indexOf(item)
        this.activitys.splice(index, 1)
      })
    },
    editActivity (item) {
      this.service.findById(item.activityId).then((res) => {
        this.activityId = res.data.activityId
        this.title = res.data.title
        this.description = res.data.description
        this.goals = res.data.goals
        this.city = res.data.city
        this.state = res.data.state
        this.typeRegister = res.data.typeRegister
        this.candidates = res.data.candidates
        this.dateCriation = res.data.dateCriation
        this.dateUpdate = res.data.dateUpdate
        this.dialog = true
      })
    }
  }

}
</script>
<style scoped>
@media (max-width: 425px) {
    .table{
      display: flex;
      flex-direction: column;
      overflow-x: auto;
      margin-bottom: 5%;

    }
    th, td {
      text-align: center;
      padding: 8px;
    }
    td .tdIcons{
      text-align: center;
    }
    .tdIcons{
      padding: 0px !important;
      width: 50px;
    }
    tr {
      border-top: 1px solid #CCCCCC;
      border-bottom: 1px solid #CCCCCC;
    }
    .trTableHeader{
      height: 70px;
    }
    .upTableButton{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 5%;
    }
    .divButton{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 20px;
    }
    .divButtonsModal{
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-content: flex-end;
      width: 100%;
    }
    .button-component-save, .button-component-close{
      width: 50%;
    }
    .button-component-save{
      margin-right: 10px;
    }
    .button-component-close{
      margin-left: 10px;
    }
    .cardHeader{
      background-color: #004D61;
      color: white;
    }
    .divTextCityAndState{
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 35% 65%;
      grid-column-gap: 15px;
      margin: 0px 5px;
    }
    .cityText{
      grid-column-start: 2;
      grid-column-end: 3;
    }
    .stateText{
      grid-column-start: 1;
      grid-column-end: 2;
    }
    .stateNome{
      display: none;
    }
    .candidatesTd{
      padding: 0px 10px !important;
    }
}
@media (min-width: 426px) and (max-width: 768px){
    .table{
        display: grid;
        flex-direction: column;
        grid-template-rows: 100%;
        grid-template-columns: 5% 90% 5%;
        overflow-x: auto;
        margin-bottom: 5%;
    }
    .dataTable{
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 2;
        grid-column-end: 3;
    }
    th, td {
      text-align: left;
      padding: 8px;
    }
    td .tdIcons{
      text-align: center;
    }
    tr {
      border-top: 1px solid #CCCCCC;
      border-bottom: 1px solid #CCCCCC;
    }
    .trTableHeader{
      height: 70px;
    }
    .upTableButton{
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 5% 90% 5%;
      margin-top: 5%;
    }
    .divButton{
      grid-column-start: 2;
      grid-column-end: 3;
      justify-content: center;
      justify-self: end;
      display: flex;
      flex-direction: row;
      cursor: pointer;
    }
    .divButtonsModal{
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-content: flex-end;
      width: 50%;
      margin-left: 50%;
    }
    .button-component-save, .button-component-close{
      width: 50%;
    }
    .button-component-save{
      margin-right: 10px;
    }
    .button-component-close{
      margin-left: 10px;
    }
    .cardHeader{
      background-color: #004D61;
      color: white;
    }
    .divTextCityAndState{
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 20% 80%;
      grid-column-gap: 15px;
      margin: 0px 5px;
    }
    .cityText{
      grid-column-start: 2;
      grid-column-end: 3;
    }
    .stateText{
      grid-column-start: 1;
      grid-column-end: 2;
    }
    .stateNome{
      display: none;
    }
    .candidatesTd{
      width: 15%;
    }
}
@media (min-width: 769px){
    .table{
        display: grid;
        flex-direction: column;
        grid-template-rows: 100%;
        grid-template-columns: 2.5% 95% 2.5%;
        overflow-x: auto;
        margin-bottom: 5%;
    }
    .dataTable{
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 2;
        grid-column-end: 3;
    }
    th, td {
      text-align: left;
      padding: 5px;
    }
    td.tdIcons{
      text-align: center;
    }
    
    .trTableHeader{
      height: 70px;
    }
    .upTableButton{
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 2.5% 95% 2.5%;
      margin-top: 5%;
    }
    .divButton{
      grid-column-start: 2;
      grid-column-end: 3;
      justify-content: center;
      justify-self: end;
      display: flex;
      flex-direction: row;
      cursor: pointer;
    }
    .divButtonsModal{
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-content: flex-end;
      width: 50%;
      margin-left: 50%;
    }
    .button-component-save, .button-component-close{
      width: 50%;
    }
    .button-component-save{
      margin-right: 10px;
    }
    .button-component-close{
      margin-left: 10px;
    }
    .cardHeader{
      background-color: #004D61;
      color: white;
    }

    .divTextCityAndState{
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 20% 80%;
      grid-column-gap: 15px;
      margin: 0px 5px;
    }
    .cityText{
      grid-column-start: 2;
      grid-column-end: 3;
    }
    .stateText{
      grid-column-start: 1;
      grid-column-end: 2;
    }
    .stateSigla{
      display: none;
    }
    .candidatesTd{
      width: 15%;
    }
}
.icons{
  cursor: pointer;
}
</style>

