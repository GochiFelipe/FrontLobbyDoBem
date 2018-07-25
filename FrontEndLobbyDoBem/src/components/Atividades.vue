<template>
  <div>
    <div class="upTableButton">
        <v-dialog class="divButton" v-model="dialog" persistent max-width="80%">
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
                <v-card-title>
                    <span class="headline">Criar Atividade</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="10"
                    label="Name"
                    required
                    ></v-text-field>
                    <div class="divButtonsModal">
                        <appButton 
                        type="none"
                        styleButton="success"
                        alt="createActivity"
                        title="Salvar" 
                        class="button-component-create"
                        :icon="false"
                        @click.native="dialog = false"/>
                        <appButton 
                        type="none"
                        styleButton="none"
                        alt="createActivity"
                        title="Fechar" 
                        class="button-component-create"
                        :icon="false"
                        @click.native="dialog = false"/>
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
                <tr v-for="activity in activitys" :key="activity.id">
                    <td>{{ activity.title }}</td>
                    <td>{{ activity.description }}</td>
                    <td>{{ activity.goals }}</td>
                    <td>{{ activity.city }}</td>
                    <td>{{ activity.state }}</td>
                    <td>{{ activity.typeRegister }}</td>
                    <td>{{ activity.candidates }}</td>
                    <td class="tdIcons">
                        <v-icon class="icons">create</v-icon>
                    </td>
                    <td class="tdIcons">
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
// import Activity from '../domain/activity/Activity.js'
import ActivityService from '../domain/activity/ActivityService.js'
import button from './shared/button/button.vue'

export default {
  components: {
    appButton: button
  },
  data: () => ({
    dialog: false,
    activitys: [],
    pagination: {
      sortBy: 'name'
    },
    headers: [
      {
        text: 'Titulo',
        value: 'title'
      },
      {
        text: 'Descrição',
        value: 'description'
      },
      {
        text: 'Metas',
        value: 'goals'
      },
      {
        text: 'Cidade',
        value: 'city'
      },
      {
        text: 'Estado',
        value: 'state'
      },
      {
        text: 'Tipo de Registro',
        value: 'typeRegister'
      },
      {
        text: 'Candidatos',
        value: 'candidates'
      },
      {
        text: '',
        value: 'create'
      },
      {
        text: '',
        value: 'delete'
      },
      {
        text: '',
        value: 'share'
      }
    ]
  }),
  created () {
    this.service = new ActivityService()
    this.service.listForPerson().then((res) => {
      this.activitys = res.data
      console.log(this.activitys)
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
    createActivity () {
      console.log('teste')
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
}
@media (min-width: 426px) and (max-width: 768px){
    .table{
        display: grid;
        flex-direction: column;
        grid-template-rows: 100%;
        grid-template-columns: 5% 90% 5%;
        overflow-x: auto;
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
}
@media (min-width: 769px){
    .table{
        display: grid;
        flex-direction: column;
        grid-template-rows: 100%;
        grid-template-columns: 2.5% 95% 2.5%;
        overflow-x: auto;
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
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: flex-end;
    }
}
</style>

