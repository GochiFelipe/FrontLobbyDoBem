<template>
    <div class="frameDashboard">
        <iframe :src="mountName($route.path)"></iframe>
    </div>
</template>
<script>
export default {
  methods: {
    getHostName (url) {
      var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
      if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2]
      } else {
        return null
      }
    },

    mountName (route) {
      let host = this.getHostName(window.location.href)
      switch (route) {
        case '/vereadores':
          return 'http://' + host + ':8080/pentaho/api/repos/%3Apublic%3ADashboards%3Apainel_vereadores.wcdf/generatedContent?userid=admin&password=password'
        case '/candidatos':
          return 'http://' + host + ':8080/pentaho/api/repos/%3Apublic%3ADashboards%3Acongresso_candidato.wcdf/generatedContent?userid=admin&password=password'
        case '/votemap':
          return 'http://' + host + ':8080/pentaho/api/repos/%3Apublic%3ADashboards%3AvoteMap_candidato.wcdf/generatedContent?userid=admin&password=password'
        case '/geolocalizacao':
          return 'http://' + host + ':8080/pentaho/api/repos/%3Apublic%3ADashboards%3AvoteMap_geo_lob.wcdf/generatedContent?userid=admin&password=password'
        case '/correlacao':
          return 'http://' + host + ':8080/pentaho/api/repos/%3Apublic%3ADashboards%3AvoteMap_Correlacao_lob.wcdf/generatedContent?userid=admin&password=password'
      }
    }
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


