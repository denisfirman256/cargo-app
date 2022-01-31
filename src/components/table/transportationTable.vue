<template>
  <section>
    <div class="my-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <b-form-input v-model="filter" type="search" style="width: 300px ;" placeholder="Search"></b-form-input>
        <router-link class="btn btn-primary" :to="{name: 'Add_Transportation'}">Add Data</router-link>
      </div>
      <!-- Table -->
      <b-table 
      striped 
      hover 
      :busy.sync="isBusy" 
      :items="items" 
      :fields="fields"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
      >
        <!-- A virtual column -->
        <template v-slot:cell(index)="data">
          {{ data.index + 1 }}
        </template>

        <template v-slot:cell(status)="data">
          <section v-if="data.item.status == 'used'">
            <b-badge variant="success">
              {{ data.item.status }}
            </b-badge>
          </section>
          <section v-else>
            <b-badge variant="danger">
              {{ data.item.status }}
            </b-badge>
          </section>
        </template>

        <template v-slot:cell(opsi)="data">
          <button class="btn btn-danger btn-sm mr-2" @click.prevent="deleteData(data.item.id)">
            <span>
              <img :src="'/libraries/images/icons/dashboard/delete.svg'" alt="delete">
            </span>
          </button>
          <b-button v-b-modal.modal-edit class="btn btn-warning text-white btn-sm" @click.prevent="editData(data.item.id)">
            <span>
              <img :src="'/libraries/images/icons/dashboard/edit.svg'" alt="edit">
            </span>
          </b-button>
        </template>
      </b-table>
      <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      // State Field as key object in axios
      fields: [
        'index',
        {
          key: 'transportation_type',
          label: 'Transportation Type',
          sortable: true
        },
        {
          key: 'capacity',
          label: 'Capacity',
          sortable: true
        },
        {
          key: 'unit_weight',
          label: 'Unit Weight',
          sortable: true
        },
        {
          key: 'license_plate',
          label: 'License Plate',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        },
        {
          key: 'opsi',
          label: 'Opsi'
        }
      ],
      // Filter Search
      filter: "",
      // Items
      items: [],
      number: '',
      isBusy: false,

      // Pagination
      perPage: 10,
      currentPage: 1,
    }
  },
  mounted() {
    this.getDataTransportation();
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
    // GetData
    getDataTransportation(){
      axios.get('/api/v1/transportation', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        if (response.status == 200) {
          this.items = response.data[0].data
        } else {
          // Notification Success
          this.$notify({
            title: 'Data Error!!',
            type: 'info',
            text: 'Please Try Again!!'
          });
        }
      }).catch((error) => {
        if(error.response.status) {
          this.$router.push({
            name: 'Dashboard'
          })
        }
      })
    },
    // Delete Data
    deleteData(id){
      if (confirm('Apakah Ingin Dihapus')) {
        axios.delete('/api/v1/transportation/'+ id, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
            // Notification Success
            this.$notify({
              title: 'Data Has Been Deleted!!',
              type: 'success',
              text: response.data.message
            });
            this.getDataCategory();
        }).catch((error) => {
          // Notification Error
          this.$notify({
            title: 'Problem Issues!!',
            type: 'danger',
            text: error.response.data.message
          });
        })
      }
    },
    editData(id){
      this.$router.push({
        name: 'Edit_Transportation',
        params: {
          id: id
        } 
      });
    },
  }
}
</script>

<style scoped>
.btn {
  padding: 5px 12px;
}
  
</style>