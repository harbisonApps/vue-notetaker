<template>
  <div id="dashboard">
    <h1>Admin Dashboard</h1>
    <div class="container">
        <div>
            <CreateFact @factCreate="factCreate"/>
            <br>
            <div>
                <AdminFact v-for="(fact, index) in facts" 
                    :fact="fact" :key="index" 
                    @deleteFact="deleteFact" 
                    @updateFact="updateFact"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import AdminFact from '@/components/Facts/AdminFact'
//import CreateFact from '@/components/Facts/CreateFact'
import { getFacts } from '@/services/FactService'

export default {
  name: 'dashboard',
  components: { 
    AdminFact: require('@/components/Facts/AdminFact').default, 
    CreateFact: require('@/components/Facts/CreateFact').default
  },
  data() {
    return {
      facts: []
    }
  },
   methods: {
    deleteFact(id){
      let facts = this.facts.filter(fact => fact._id != id)
      this.facts = facts;
    },
    updateFact(fact){
      this.deleteFact(fact._id);
      this.factCreate(fact);
    },
    factCreate(fact){
        this.facts = [fact, ...this.facts];
    },
  },
  mounted(){
    getFacts()
      .then(data => this.facts = data.facts)
      .catch((err =>alert(err)));
  }
}
</script>