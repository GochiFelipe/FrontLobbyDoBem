<template>
    <div class="frameDashboard">
        <div id="content1"></div>
    </div>
</template>
<script>
export default {
  created () {
    var requirejs = require('requirejs')
    requirejs.config({
      nodeRequire: require
    })
    requirejs([
      'http://192.168.10.126:8080/pentaho/plugin/pentaho-cdf-dd/api/renderer/getDashboard?path=/public/testes/dashboard_vereadores_1.wcdf'
    ], function (SampleDash) {
      (new SampleDash('content1')).render()
      console.log(SampleDash)
    })
  }
}
</script>

<style scoped>
.frameDashboard{
    height: 100%;
    width: 100%;
}
iframe {
    overflow: hidden; 
    height: 100%;
    width: 100%;
}
</style>


