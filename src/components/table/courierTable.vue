<template>
  <section>
    <div class="my-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <b-form-input v-model="filter" type="search" style="width: 300px ;" placeholder="Search"></b-form-input>
        <router-link class="btn btn-primary" :to="{name: 'Add_Courier'}">Add Data</router-link>
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
        item-key="id"
        >
          <!-- A virtual column -->
          <template v-slot:cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <template v-slot:cell(status)="data">
            <section v-if="data.item.status == 'available'">
              <b-badge variant="success">
                {{ data.item.status }}
              </b-badge>
            </section>
            <section v-else-if="data.item.status == 'inactive' ">
              <b-badge variant="danger">
                {{ data.item.status }}
              </b-badge>
            </section>
            <section v-else-if="data.item.status == 'on working' ">
              <b-badge variant="warning">
                {{ data.item.status }}
              </b-badge>
            </section>
        </template>

          <template v-slot:cell(opsi)="data">
            <button class="btn-danger text-white btn-sm mr-2" @click.prevent="deleteData(data.item.id)">
              <span>
                <img :src="'/libraries/images/icons/dashboard/delete.svg'" alt="delete">
              </span>
            </button>
            <b-button v-b-modal.modal-edit class="btn-warning text-white btn-sm" @click.prevent="editData(data.item.id)">
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
          key: 'transportation.transportation_type',
          label: 'Transportation Type',
          sortable: true
        },
        {
          key: 'courier_name.first_name',
          label: 'Courier Name',
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
    this.getDataCourier();
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
    // GetData
    getDataCourier(){
      axios.get('/api/v1/courier', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        this.items = response.data[0].data
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
        axios.delete('/api/v1/courier/'+ id, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
            // Notification Success
            this.$notify({
              title: 'Data Has Been Deleted!!',
              type: 'success',
              text: response.data.message
            });
            this.getDataCourier();
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
    // Edit Data
    editData(id){
      this.$router.push({
        name: 'Edit_Courier',
        params: {
          id: id
        } 
      });
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 5px 12px;
}
  
</style>