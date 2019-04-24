<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="green"
          flat
          full-width
          title="Players"
          text="Player Statistics"
        >
        <v-divider
        class="mx-2"
        inset
        vertical
        >
        </v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="green" dark class="mb-2" v-on="on">New Player</v-btn>
          </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.team" label="Team"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="number" v-model.number="editedItem.stats.single" label="Single"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="number" v-model.number="editedItem.stats.double" label="Double"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="number" v-model.number="editedItem.stats.triple" label="Triple"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="number" v-model.number="editedItem.stats.hr" label="Home Run"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="number" v-model.number="editedItem.stats.so" label="Strike Out"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
        </v-dialog>
          <v-data-table
            :headers="headers"
            :items="playerData"
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              v-slot:items="props"
            >
              <td>{{ props.item.firstName }}</td>
              <td>{{ props.item.lastName }}</td>
              <td>{{ props.item.team }}</td>
              <td>{{ props.item.stats.single }}</td>
              <td>{{ props.item.stats.double }}</td>
              <td>{{ props.item.stats.triple }}</td>
              <td>{{ props.item.stats.hr }}</td>
              <td>{{ props.item.stats.so }}</td>
              <td class="justify-center layout px-0">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(props.item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(props.item)"
                >
                  delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    playerData: [],
    pagination: {},
    headers: [
      { text: 'First Name', value: 'firstName' },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Team', value: 'team' },
      { text: 'Single', value: 'single' },
      { text: 'Double', value: 'double' },
      { text: 'Triple', value: 'double' },
      { text: 'Home Run', value: 'hr' },
      { text: 'Strike Out', value: 'so' }
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      firstName: '',
      lastName: '',
      team: '',
      stats: {
        single: 0,
        double: 0,
        triple: 0,
        hr: 0,
        so: 0
      }
    },
    defaultItem: {
      id: '',
      firstName: '',
      lastName: '',
      team: '',
      stats: {
        single: 0,
        double: 0,
        triple: 0,
        hr: 0,
        so: 0
      }
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
    this.$http.get('http://localhost:7071/api/players')
      .then(res => { this.playerData = res.data })
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.playerData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.playerData.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.playerData.splice(index, 1)
      this.$http.delete('http://localhost:7071/api/players/1/' + item.id)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.playerData[this.editedIndex], this.editedItem)
        this.sendFormData(this.editedItem)
      } else {
        let random = Math.floor(Math.random() * (+10 - +1)) + +1
        this.editedItem.id = this.editedItem.firstName[0] + this.editedItem.lastName + random
        this.playerData.push(this.editedItem)
        this.sendFormData(this.editedItem)
      }
      this.close()
    },
    sendFormData (item) {
      this.$http.post('http://localhost:7071/api/players/1/' + item.id, item)
    }
  }
}
</script>
