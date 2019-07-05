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
          title="Users"
          text="User Management"
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
            <v-btn color="green" dark class="mb-2" v-on="on">New User</v-btn>
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
                  <v-text-field v-model="editedItem.email" label="E-Mail Address"></v-text-field>
                </v-flex>
                <v-flex grow>
                  <v-select
                    :items="playerData.filter(o => o.id !== this.editedItem.roster.player2.name && o.id !== this.editedItem.roster.player3.name)"
                    item-text="`${ data.item.firstName } ${ data.item.lastName }`"
                    item-value='id'
                    full-width
                    v-model="editedItem.roster.player1.name"
                    label="Player 1"
                    >
                    <template
                      slot="selection"
                      slot-scope="data"
                    >
                    {{ data.item.firstName }} {{ data.item.lastName }}
                    </template>
                    <template slot="item" slot-scope="data">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="`${data.item.firstName} ${data.item.lastName}`">
                      </v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.id"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    </template>
                    </v-select>
                </v-flex>
                <v-flex grow>
                  <v-select
                    :items="playerData.filter(o => o.id !== this.editedItem.roster.player1.name && o.id !== this.editedItem.roster.player3.name)"
                    item-text="`${ data.item.firstName } ${ data.item.lastName }`"
                    item-value='id'
                    full-width
                    v-model="editedItem.roster.player2.name"
                    label="Player 2"
                    >
                    <template
                      slot="selection"
                      slot-scope="data"
                    >
                    {{ data.item.firstName }} {{ data.item.lastName }}
                    </template>
                    <template slot="item" slot-scope="data">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="`${data.item.firstName} ${data.item.lastName}`">
                      </v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.id"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    </template>
                    </v-select>
                </v-flex><v-flex grow>
                  <v-select
                    :items="playerData.filter(o => o.id !== this.editedItem.roster.player2.name && o.id !== this.editedItem.roster.player1.name)"
                    item-text="`${ data.item.firstName } ${ data.item.lastName }`"
                    item-value='id'
                    full-width
                    v-model="editedItem.roster.player3.name"
                    label="Player 3"
                    >
                    <template
                      slot="selection"
                      slot-scope="data"
                    >
                    {{ data.item.firstName }} {{ data.item.lastName }}
                    </template>
                    <template slot="item" slot-scope="data">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="`${data.item.firstName} ${data.item.lastName}`">
                      </v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.id"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    </template>
                    </v-select>
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
            :items="userData"
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
              <td>{{ props.item.email }}</td>
              <td>{{ props.item.roster.player1.name }}</td>
              <td>{{ props.item.roster.player2.name }}</td>
              <td>{{ props.item.roster.player3.name }}</td>
              <td> {{ totalScore(props.item) }}</td>
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
    userData: [],
    playerData: [],
    pagination: {},
    headers: [
      { text: 'First Name', value: 'firstName' },
      { text: 'Last Name', value: 'lastName' },
      { text: 'E-mail Address', value: 'email' },
      { text: 'Player 1', value: 'roster.player1.name' },
      { text: 'Player 2', value: 'roster.player2.name' },
      { text: 'Player 3', value: 'roster.player3.name' },
      { text: 'Total Score', value: 'total' }
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      total: 0,
      roster: {
        player1: {
          name: '',
          score: 0
        },
        player2: {
          name: '',
          score: 0
        },
        player3: {
          name: '',
          score: 0
        }
      }
    },
    defaultItem: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      total: 0,
      roster: {
        player1: {
          name: '',
          score: 0
        },
        player2: {
          name: '',
          score: 0
        },
        player3: {
          name: '',
          score: 0
        }
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
    this.$http.get(process.env.ROOT_API + '/api/users')
      .then(res => { this.userData = res.data })
    this.$http.get(process.env.ROOT_API + '/api/players')
      .then(res => { this.playerData = res.data })
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.userData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.userData.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.userData.splice(index, 1)
      this.$http.delete(process.env.ROOT_API + '/api/users/1/' + item.id)
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
        Object.assign(this.userData[this.editedIndex], this.editedItem)
        this.editedItem.roster.player1.score = this.$data.playerData.filter(o => o.id === this.editedItem.roster.player1.name)[0].total
        this.editedItem.roster.player2.score = this.$data.playerData.filter(o => o.id === this.editedItem.roster.player2.name)[0].total
        this.editedItem.roster.player3.score = this.$data.playerData.filter(o => o.id === this.editedItem.roster.player3.name)[0].total
        this.editedItem.total = this.totalScore(this.editedItem)
        this.sendFormData(this.editedItem)
      } else {
        let random = Math.floor(Math.random() * (+10 - +1)) + +1
        this.editedItem.id = this.editedItem.firstName[0] + this.editedItem.lastName + random
        this.editedItem.roster.player1.score = this.$data.playerData.filter(o => o.id === this.editedItem.roster.player1.name)[0].total
        this.editedItem.roster.player2.score = this.$data.playerData.filter(o => o.id === this.editedItem.roster.player2.name)[0].total
        this.editedItem.roster.player3.score = this.$data.playerData.filter(o => o.id === this.editedItem.roster.player3.name)[0].total
        this.editedItem.total = this.totalScore(this.editedItem)
        this.userData.push(this.editedItem)
        this.sendFormData(this.editedItem)
      }
      this.close()
    },
    sendFormData (item) {
      this.$http.post(process.env.ROOT_API + '/api/users/1/' + item.id, item)
    },
    totalScore (item) {
      return item.roster.player1.score +
        item.roster.player2.score +
        item.roster.player3.score
    }
  }
}
</script>
