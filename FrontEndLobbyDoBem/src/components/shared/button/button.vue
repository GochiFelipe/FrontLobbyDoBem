<template>
    <div class="div-button">
        <i v-if="icon" class="icon" :class="iconClass"></i>
        <button :class="styleButton" :type="type" :title="title">
            {{ title }}
        </button>
    </div>
</template>
<script>
export default {
  props: {
    'type': {
      type: String
    },
    'styleButton': {
      type: String,
      required: true
    },
    'title': {
      type: String,
      required: true
    },
    'icon': {
      type: Boolean,
      required: true
    },
    'iconClass': {
      type: String
    }

  }
}
</script>
<style scoped>
.div-button{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.none{
    background-color: white;
    color:gray;
}
.close{
    background-color: #cacaca;
    color: white;
}
.save{
    background-color: #4AB6D3;
    color: white;
}
.danger{
    background-color: red;
}
.login{
    background-color: #4AB6D3;
}
.facebook{
    background-color: #4267B2;
    text-align: center;
}
.google{
    background-color: #D14836;
    text-align: center;
}
button{
    height: 50px;
    width: 100%;
    padding: 13.5px;
    font-size: 16px;
    color: white;
}

i{
    position: absolute;
    margin-left: 20px;
}
</style>
