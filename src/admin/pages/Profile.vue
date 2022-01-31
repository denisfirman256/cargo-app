<template>
  <section v-if="user">
    <dashboard-component :key="reload"></dashboard-component>
    <div class="wrapper-main mt-5">
      <div class="dashboard">
        <!-- row -->
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 mb-3">
            <!-- Photo Profile -->
            <div class="card">
              <div class="card-body my-4">
                <div class="d-block">
                  <h5 class="card-title">Foto Profile</h5>
                </div>
                <div class="d-flex justify-content-center my-4 ">
                  <span v-if="url+user.photo">
                    <b-avatar variant="dark" :src="url+previewImage" size="10rem"></b-avatar>
                  </span>
                  <span v-else-if="!user.photo">
                    <b-avatar></b-avatar>
                  </span>
                </div>
                <!-- etc -->
                <small>
                  <center class="mb-3">
                    Ukuran file foto tidak boleh melebihi dari 2mb atau
                    kerapatan pixel melebihi 300px. Ekstensi berkas yang
                    diperbolehkan JPG, JPEG, dan PNG
                  </center>
                </small>
                <!-- /Etc -->
                <!-- Uploading -->
                <b-progress :max="max_upload" class="mb-3">
                  <b-progress-bar variant="success" :value="uploading" animated show-progress></b-progress-bar>
                </b-progress>
                <!-- /Uploading -->
                <!-- File Profile Upload -->
                <b-form-file placeholder="Upload Here.." drop-placeholder="Drop file here..." @change="onFileSelected" name="photo" class="mb-4">
                </b-form-file>

                <div class="d-flex justify-content-center mt-3">
                  <button @click="onUpload" class="btn w-100">Ubah Foto</button>
                </div>
                <!-- <div class="error" v-if="errors.no_telp">
                  {{ errors.no_telp[0] }}
                </div> -->
                <!-- /File Profile Upload -->
              </div>
            </div>
            <!-- /Photo Profile -->
          </div>
          <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 mb-3">
            <!-- Bio Data -->
            <div class="container-fluid">
              <h5 class="mb-5">
                Bio Data
              </h5>
              <div class="profile-detail mx-3">
                <!-- Name -->
                <div class="mb-3">
                  <div class="font-weight-bold mb-3">Nama :</div>
                  <div class="text-capitalized d-flex align-items-center detail">
                    <span>
                      <img :src="'/libraries/images/icons/user-octagon.svg'" width="28px" alt="name" class="mr-2">
                    </span>
                    <span v-if="user.first_name && user.last_name">
                      {{ user.first_name }} {{ user.last_name }}
                    </span>
                  </div>
                </div>
                <!-- /Name -->
                <!-- Email -->
                <div class="mb-3">
                  <div class="font-weight-bold mb-3">Email :</div>
                  <div class="d-flex align-items-center detail">
                    <span>
                      <img :src="'/libraries/images/icons/directbox-notif.svg'" width="28px" alt="name" class="mr-2">
                    </span>
                    <span v-if="user.email">
                      {{ user.email }}
                    </span>
                  </div>
                </div>
                <!-- /Email -->

                <!-- Gender -->
                <div class="mb-3">
                  <div class="font-weight-bold mb-3">Gender :</div>
                  <div class="d-flex align-items-center detail">
                    <span>
                      <img :src="'/libraries/images/icons/directbox-notif.svg'" width="28px" alt="name" class="mr-2">
                    </span>
                    <span v-if="user.gender">
                      {{ user.gender }}
                    </span>
                  </div>
                </div>
                <!-- /Email -->

                <!-- No HP -->
                <div class="mb-3">
                  <div class="font-weight-bold mb-3">No Handphone :</div>
                  <div class="d-flex align-items-center detail">
                    <span>
                      <img :src="'/libraries/images/icons/call.svg'" width="28px" alt="name" class="mr-2">
                    </span>
                    <span v-if="user.no_telp">
                      {{ user.no_telp }}
                    </span>
                  </div>
                </div>
                <!-- /No HP -->
                <!-- Level -->
                <div class="mb-5">
                  <div class="font-weight-bold mb-3">Level :</div>
                  <div class="d-flex align-items-center detail">
                    <span>
                      <img :src="'/libraries/images/icons/office.svg'" width="28px" alt="name" class="mr-2">
                    </span>
                    <span v-if="user.level">
                      {{ user.level }}
                    </span>
                  </div>
                </div>
                <!-- /Level -->
              </div>
               <b-button v-b-modal.modal-edit variant="success">Edit Data</b-button>
            </div>
            <!-- /Bio Data -->
          </div>
        </div>
        <!-- /row -->
      </div>
    </div>

    <!-- Modal ADD -->
    <b-modal size="lg" id="modal-edit" ref="modal" title="Edit Bio Data" @ok="handleOk" @show="resetModal"
      @hidden="resetModal">
      <b-form @submit.prevent="editData">
        <b-container>
          <!-- First & Last Name Form Edit -->
          <b-row>
            <b-col>
              <b-form-group label="First Name">
                <b-form-input
                  class="mb-2 mr-sm-2 mb-sm-0"
                  id="first_name"
                  v-model="user.first_name"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Last Name">
                <b-form-input
                  class="mb-2 mr-sm-2 mb-sm-0"
                  id="last_name"
                  v-model="user.last_name"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- /First & Last Name Form Edit -->
          <!-- Gender -->
          <b-form-group label="Jenis Kelamin">
            <b-form-select v-model="user.gender" :options="options"></b-form-select>
          </b-form-group>
          <!-- /Gender -->
          <!-- Email -->
          <b-form-group label="Email">
            <b-form-input id="email" v-model="user.email"></b-form-input>
            <!-- <div class="error" v-if="errors.email">
              {{ errors.email[0] }}
            </div> -->
          </b-form-group>
          <!-- /Email -->
          <!-- Handphone -->
          <b-form-group label="No Handphone">
            <b-form-input id="handphone" v-model="user.no_telp"></b-form-input>
            <!-- <div class="error" v-if="errors.no_telp">
              {{ errors.no_telp[0] }}
            </div> -->
          </b-form-group>
          <!-- Handphone -->
        </b-container>
      </b-form>
    </b-modal>
    <!-- Modal AD -->

  </section>
</template>

<script>
import axios from 'axios'

export default {
  // Child Data
  props: ["first_name"],

  data() {
    return {
      // URL
      url: 'http://localhost:8002',
      // State User
      user: {},
      // State Error
      errors: {},
      // Re-render
      reload : 0,
      // Uploading
      uploading: null,
      // Max Upload
      max_upload: 100,
      // Photo
      selectedFile: null,
      // Preview Image
      previewImage: null,
      // State Gender
      selected: null,
      options: [
        { value: 'Laki - laki', text: 'Laki - laki'},
        { value: 'Perempuan', text: 'Perempuan'}
      ]
    }
  },
  // Mounted
  mounted() {
    this.getAdmin();
  },
  methods : {
    // Get Data
    getAdmin(){
      axios.get('/api/v1/auth/me', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        this.user = response.data.authme
        this.previewImage = response.data.authme.photo
      }).catch((error) => {
        if(error.response.status) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
    },
    // Edit Data
    editData(){
      axios.post('/api/v1/auth/edit/me/', this.user, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}} ).then((response) => {
        // Modal Close When Submit
        this.$nextTick(() => {
          this.$bvModal.hide('modal-edit')
        })
        // Reload when edit
        this.reload++;
        // Notification
        this.$notify({
          title: 'Data Has Been Changed!!',
          type: 'success',
          text: response.data.message
        });
        // If Error
      }).catch((error) => {
        if(error.response.data.status_code == 422)
        {
          this.$notify({
          title: 'Failed Edit Data!!',
          type: 'error',
          text: error.response.data.message
        });
        }
      })
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.editData()
    },
    // Reset data when close modal
    resetModal() {
      axios.get('/api/v1/auth/me', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        this.user = response.data.authme
      }).catch((error) => {
        if(error.response.status) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
    },

    // Selected File Upload
    onFileSelected(e){
      this.selectedFile = e.target.files[0]
      this.url = ''
      this.previewImage = URL.createObjectURL(this.selectedFile)
    },
    onUpload()
    {
      if (this.selectedFile) {
        const fd = new FormData()
        fd.append('photo', this.selectedFile, this.selectedFile.name)
        axios.post('api/v1/auth/edit/photo_me/', fd, 
        {
          headers : {
            Authorization : 'Bearer ' + localStorage.getItem('token'),
            'Content-Type' : 'multipart/form-data'
  
          },
          onUploadProgress: uploadEvent => {
            this.uploading = Math.round(uploadEvent.loaded / uploadEvent.total * 100)
  
          }
        }).then((response) => {
          this.reload++
          this.$notify({
            title: 'Upload Photo Successful!!',
            type: 'success',
            text: response.data.message
          });
          setTimeout(()=> this.uploading = null, 4500)
        }).catch((error) => {
          console.log(error.response)
        })
      } else if (!this.selectedFile) {
        this.$notify({
          title: 'Upload Photo Unsuccessful!!',
          type: 'error',
          text: 'Try to input your image'
        });
      }
    },
    img_button()
    {
      document.getElementById("fileUpload").click()
    }
  }
}
</script>

<style scoped>
  .btn {
    padding: 8px 42px;
    border-radius : 36px;
    box-shadow: -6px -6px 20px rgba(255, 255, 255, 0.8), 6px 6px 20px rgba(0, 0, 0, 0.2);
  }
</style>
