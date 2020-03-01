<template>
  <div id="facts-page">
    <h1>Facts Page</h1>
    <div class="container">
      <div>
        <FactItem v-for="(fact, index) in facts" :fact="fact" :key="index"/>  
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FactItem from '@/components/Facts/FactItem'
import { getFacts } from '@/services/FactService'
export default {
  name: 'facts-page',
  components: { FactItem },
  data() {
    return {
      facts: []
    }
  },
  mounted(){
    getFacts()
      .then(data => this.facts = data.facts)
      .catch((err =>alert(err)));
  }
}
</script>