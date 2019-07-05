<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md12
        sm12
        lg5
      >
        <material-chart-card
          :data="topPlayerChart.chartData"
          :options="topPlayerChart.options"
          :responsive-options="topPlayerChart.responsiveOptions"
          color="green"
          type="Bar"
        >
          <h4 class="title font-weight-light">Top 5 Players</h4>
          <p class="category d-inline-flex font-weight-light">Live Stats</p>
        </material-chart-card>
      </v-flex>
            <v-flex
        md12
        lg6
      >
        <material-card
          color="orange"
          title="Top 3 Users"
        >
          <v-data-table
            :headers="topUsersChart.headers"
            :items="topUsersChart.items"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.id }}</td>
              <td>{{ item.total }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
export default {
  data: () => ({
    homeRunLeader: [],
    topPlayerChart: {
      chartData: {
        labels: [],
        series: [[]]
      },
      options: {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 300,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      },
      responsiveOptions: [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0]
            }
          }
        }]
      ]},
      topUsersChart: {
        headers:[
          {
            sortable: false,
            text: 'Position',
            value: 'number'
          },
          {
            sortable: false,
            text: 'ID',
            value: 'id'
          },
          {
            sortable: false,
            text: 'Score',
            value: 'total'
          }
        ],
        items: []

      }
  }),

  mounted () {
    const API_PLAYERS_URL = rootApi + '/api/players';
    const API_USERS_URL = rootApi + '/api/users';
    this.$http.get(API_PLAYERS_URL)
      .then( res => { 
        this.topPlayerChart.chartData.labels = _.orderBy(res.data, ['total'], ['desc']).splice(0,5).map((k) => { return k.id }) 
        this.topPlayerChart.chartData.series = [_.orderBy(res.data, ['total'], ['desc']).splice(0,5).map((k) => { return k.total })]
        this.homeRunLeader = _.orderBy(res.data, ['stats.hr'], ['desc']).splice(0,1).map((k) => { return { name: k.id, value: k.stats.hr }})
        })
    this.$http.get(API_USERS_URL)
      .then( res => {
        this.topUsersChart.items = _.orderBy(res.data, ['total'], ['desc']).splice(0,3)
        })
  },
  computed: {
    chartLabels: function () {
      return this.playerData.id
    },
    chartSeries: function () {
      return this.playerData.total
    }
  }
}
</script>
