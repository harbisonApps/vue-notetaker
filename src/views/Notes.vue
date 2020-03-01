<template>
  <div id="notes-page">
    <h1>Notes</h1>
    <div class="container">
        <div>
          <CreateNoteModal @createNote="createNote"/>
          <div>
            <NoteItem v-for="(note, index) in notes" 
              :note="note" :key="index" 
              @deleteNote="deleteNote" 
              @updateNote="updateNote"/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateNoteModal from '@/components/Notes/CreateNoteModal'
import NoteItem from '@/components/Notes/NoteItem'
import { getNotes } from '@/services/NoteService'
export default {
  name: 'app',
  components: { NoteItem, CreateNoteModal  },
  data(){
    return {
      notes: []
    }
  },
  methods: {
    deleteNote(id){
      let notes = this.notes.filter(note => note._id != id)
      this.notes = notes;
    },
    updateNote(note){
      this.deleteNote(note._id);
      this.createNote(note);
    },
    createNote(note){
        this.notes = [note, ...this.notes];
    },
  },
  mounted(){
    getNotes()
      .then(data => this.notes = data.notes)
      .catch((err =>alert(err)));
  }
}
</script>