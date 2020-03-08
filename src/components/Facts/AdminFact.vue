<template>
    <div class="row">
        <span>
            <span class="name">{{fact.name}} | </span>
            <span>updated: {{ fact.updatedAt }}</span>
            <EditFact :fact="fact" @updateFact="updateFact" :key="fact._id"/>
            <button @click="deleteFact" class="delete">delete</button>
        </span>
    </div>
</template>
<script>
import EditFact from '@/components/Facts/EditFact'
import { deleteFact} from '@/services/FactService'
import swal from "sweetalert";
export default {
    name: 'admin-fact',
    props: [ 'fact' ],
    components: {EditFact},
    methods: {
        deleteFact(e){
            e.preventDefault();
            deleteFact(this.fact._id)
            // .then(() => )
            .catch(err => swal(err, "", "error") )
            swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                swal(`Poof ${this.fact.name} is gone`, "", {
                icon: "success",
                });
                this.$emit('deleteFact', this.fact._id)
            } else {
                swal(`${this.fact.name} is still there`, "","info");
            }
            });
        },
        updateFact(fact){
            this.$emit('updateFact', fact)
        }
    }
}
</script>
<style scoped>
.row{
    padding-bottom: 7px
}
.delete{
    font-size: 1.2rem;
    background: white;
    color: red;
    margin-left: 7px;
}
</style>