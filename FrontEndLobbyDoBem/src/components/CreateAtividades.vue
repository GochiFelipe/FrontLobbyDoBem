<template>
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
                <v-card-title class="cardHeader">
                    <span class="headline">Criar Atividade</span>
                </v-card-title>
                <v-card-text>
                  <v-form @submit="saveActivity">
                    <v-text-field
                    v-model="Title"
                    :rules="TitleRules"
                    label="Titulo"
                    required
                    ></v-text-field>
                    <v-textarea
                      v-model="description"
                      label="Descrição"
                      counter="255"
                      rows="3"
                    ></v-textarea>
                    <v-textarea
                      v-model="goals"
                      :rules="goalsRules"
                      label="Metas"
                      required
                      counter="255"
                      rows="3"
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
                      ></v-select>
                      <v-text-field
                        v-model="city"
                        :rules="cityRules"
                        label="Cidade"
                        required
                        class="cityText"
                      ></v-text-field>
                    </div>
                    <v-select
                      :items="candidates"
                      v-model="candadetes"
                      label="Candidatos"
                      multiple
                      chips
                      hint="Escolha seus candidatos"
                      persistent-hint
                    ></v-select>
                    <div class="divButtonsModal">
                      <appButton 
                        type="submit"
                        styleButton="save"
                        alt="createActivity"
                        title="Salvar" 
                        class="button-component-save"
                        :icon="false"
                        @click.native="dialog = false"/>
                      <appButton 
                        type="close"
                        styleButton="close"
                        alt="createActivity"
                        title="Fechar" 
                        class="button-component-close"
                        :icon="false"
                        @click.native="dialog = false"/>
                    </div>
                  </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    
}
</script>

