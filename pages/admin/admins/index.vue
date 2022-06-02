<template>
  <div class="page">
    <div class="flex justify-between">
      <span class="block font-semibold mb-5 text-2xl">Admins</span>

      <div>
        <v-btn color="primary" elevation="0" @click="inviteDialog = true">
          <v-icon left>mdi-plus</v-icon> Invite</v-btn
        >
      </div>
    </div>

    <v-data-table
      :headers="headers"
      disable-sort
      disable-pagination
      hide-default-footer
      :items="members"
      :loading="isLoadingMembers"
      class="elevation-0"
    >
      <template v-slot:[`item.fullname`]="{ item }">
        <div class="flex items-center gap-1">
          <span>{{ item.fullname }}</span>
          <span
            class="text-white bg-primary px-2 opacity-60 text-xs rounded-full"
            v-if="$profile.id === item.id"
            >you</span
          >
        </div>
      </template>
      <template v-slot:[`item.action`]="{ item }" >
        <v-menu open-on-hover offset-y bottom max-width="94vw"  v-if="$profile.id !== item.id">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon elevation="0" small>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div class="rounded" style="width: 250px">
            <v-list elevation="1">
              <v-list-item-group color="primary">
                <!-- <v-list-item @click="initiateChangeRole(item)">
                  <v-list-item-content>
                    <v-list-item-title> Change Role</v-list-item-title>
                  </v-list-item-content>
                </v-list-item> -->

                <v-list-item @click="initiateAdminRemoval(item)" v-if="item.id !== $profile.id">
                  <v-list-item-content>
                    <v-list-item-title> Remove</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-menu>
      </template>

      <template v-slot:loading>
        <div class="w-full flex items-center justify-center h-72">
          <div class="text-center text-flame">
            <v-icon size="40" color="primary"
              >mdi-format-list-bulleted-square</v-icon
            >
            <span class="block mt-2 font-semibold text-center"
              >Loading Admins...</span
            >
          </div>
        </div>
      </template>

      <template v-slot:no-data>
        <div
          class="w-full flex items-center justify-center h-60"
          v-if="!isLoadingMembers && members.length == 0 && !errorLoading"
        >
          <div class="text-center text-flame">
            <span class="block text-center">No Admin</span>
          </div>
        </div>

        <div
          class="w-full flex items-center justify-center h-60"
          v-if="!isLoadingMembers && errorLoading"
        >
          <div class="text-center text-flame">
            <v-icon size="50" color="primary"
              >mdi-format-list-bulleted-square</v-icon
            >
            <span class="block text-center">Error loading admins...</span>
            <v-btn color="primary" text @click="getAllAdmins">
              <v-icon left>mdi-refresh</v-icon> Retry</v-btn
            >
          </div>
        </div>
      </template>
    </v-data-table>

    <v-dialog
      v-model="changeRoleDialog"
      :persistent="isManagingRole"
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card>
        <div class="p-5 rounded">
          <span class="block font-semibold text-lg text-center">
            Manage Admin Role</span
          >

          <v-select
            block
            placeholder="Select Role"
            v-model="newRole"
            label="Role"
            class="mt-3 mb-6 pa-0"
            hide-details="auto"
            :items="roles"
            item-key="value"
            item-text="text"
            outlined
          />

          <div class="flex justify-between">
            <v-btn
              color="error"
              @click="changeRoleDialog = false"
              elevation="0"
              v-if="!isManagingRole"
              >Cancel</v-btn
            >

            <v-btn
              color="success"
              elevation="0"
              @click="changeRole"
              :loading="isManagingRole"
              >Procced</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- Invite Dialog -->
    <v-dialog
      v-model="inviteDialog"
      max-width="500px"
      :persistent="isInviting"
      transition="dialog-transition"
    >
      <div class="bg-white p-5 rounded-md shadow">
        <div class="flex mb-3 justify-between">
          <span class="font-semibold text-xl">Send Invite</span>
          <v-btn @click="inviteDialog = false" color="#908DAA" icon
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <div class="grid gap-5 mt-5 mb-5">
          <v-text-field
            label="Name"
            outlined
            v-model="inviteForm.fullname"
            hide-details="auto"
            placeholder="Full Name"
          ></v-text-field>

          <v-text-field
            label="Email"
            type="email"
            v-model="inviteForm.email"
            outlined
            hide-details="auto"
            placeholder="Email"
          ></v-text-field>

          <!-- <v-select
            label="Role"
            :items="roles"
            outlined
            v-model="inviteForm.role"
            hide-details="auto"
            item-key="value"
            item-text="text"
            placeholder="Select Role"
          ></v-select> -->
        </div>

        <v-btn
          color="primary"
          :loading="isInviting"
          :disabled="!canInvite"
          elevation="0"
          @click="sendInvite"
          >Continue</v-btn
        >
      </div>
    </v-dialog>

    <v-dialog
      v-model="removeAdminDialog"
      max-width="500px"
      :persistent="isRemoving"
      transition="dialog-transition"
    >
      <div class="bg-white p-5 rounded-md shadow">
        <div class="flex mb-3 justify-between">
          <span class="font-semibold text-xl">Remove Admin</span>
          <v-btn @click="removeAdminDialog = false" color="#908DAA" icon
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <div class="grid gap-5 my-6">
          <span class="text-xl"
            >Are you sure you want to remove
            <span class="font-semibold">{{
              selectedMember && selectedMember.fullname
            }}</span>
            from Administration?</span
          >
        </div>

        <v-btn
          color="primary"
          :loading="isRemoving"
          elevation="0"
          @click="removeAdmin"
          >Yes</v-btn
        >
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      inviteDialog: false,
      removeAdminDialog: false,
      // roles: [
      //   { text: 'Admin', value: 'admin' },
      //   { text: 'Super Admin', value: 'super-admin' },
      // ],
      headers: [
        {
          text: 'Name ',
          align: 'start',
          sortable: false,
          value: 'fullname',
        },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phone' },
        { text: 'Role', value: 'role.name' },
        { text: 'Actions', value: 'action' },
      ],
      members: [],
      isLoadingMembers: false,
      changeRoleDialog: false,
      errorLoading: false,
      selectedMember: null,
      newRole: null,
      isManagingRole: false,
      inviteForm: {
        fullname: '',
        email: '',
        //role: '',
      },
      isInviting: false,
      isRemoving: false,
    }
  },
  mounted() {
    this.getAllAdmins()
  },

  methods: {
    async getAllAdmins() {
      this.isLoadingMembers = true
      this.errorLoading = false
      try {
        const { data } = await this.$API.admin.fetchAllAdmins()
        this.members = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
        this.errorLoading = true
      } finally {
        this.isLoadingMembers = false
      }
    },

    initiateChangeRole(admin) {
      this.changeRoleDialog = true

      this.selectedMember = admin
      this.newRole =
        this.roles.find(
          (role) => role.text.toLowerCase() === admin.role.name.toLowerCase()
        )?.value ?? ''
    },

    async changeRole() {
      try {
        this.isManagingRole = true
        await this.$API.admin.manageAdminRole({
          user_id: this.selectedMember.id,
          role: this.newRole,
        })
        this.$store.dispatch('alert/setAlert', {
          message: 'Admin Role Updated!',
          color: 'success',
        })

        await this.getAllAdmins()
        this.changeRoleDialog = false
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isManagingRole = false
      }
    },

    initiateAdminRemoval(admin) {
      this.removeAdminDialog = true
      this.selectedMember = admin
    },

    async removeAdmin() {
      try {
        this.isRemoving = true
        await this.$API.admin.removeAdmin({
          user_id: this.selectedMember.id,
        })
        this.$store.dispatch('alert/setAlert', {
          message: 'Admin Removed!',
          color: 'success',
        })

        await this.getAllAdmins()
        this.removeAdminDialog = false
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isRemoving = false
      }
    },

    async sendInvite() {
      try {
        this.isInviting = true
        await this.$API.admin.inviteAdmin(this.inviteForm)
        this.$store.dispatch('alert/setAlert', {
          message: 'Invite sent!',
          color: 'success',
        })

        await this.getAllAdmins()
        this.inviteDialog = false
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isInviting = false
      }
    },
  },

  computed: {
    canInvite() {
      return (
        this.inviteForm.fullname &&
        this.inviteForm.email
        //this.inviteForm.role
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';

.page {
  min-height: 100%;
  padding: 10px;

  @include media-breakpoint-up(sm) {
    padding: 30px;
  }
}
</style>
