<template>
  <div>
    <div class="flex justify-between">
      <span class="font-semibold text-xl block mb-5" style="color: #211a55"
        >{{ members.length }} Team Member{{ members.length > 1 ? 's' : '' }}
      </span>

      <div>
        <!-- <v-btn color="primary" small text>
          <v-icon left>mdi-cog</v-icon> Manage Roles</v-btn
        > -->
        <v-btn color="primary" small elevation="0" @click="initiateInvite">
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
      <template v-slot:[`item.action`]="{ item }">
        <v-menu open-on-hover offset-y bottom max-width="94vw">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon elevation="0" small>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div class="rounded" style="width: 250px">
            <v-list elevation="1">
              <v-list-item-group color="primary">
                <v-list-item @click="changeRole(item.id)">
                  <v-list-item-content>
                    <v-list-item-title> Change Role</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="removeMember(item.id)">
                  <v-list-item-content>
                    <v-list-item-title> Remove</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-menu>
      </template>
    </v-data-table>

    <v-dialog
      v-model="changeRoleDialog"
      v-if="changeIndex != -1"
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card>
        <div class="p-5 rounded">
          <span class="block font-semibold text-lg text-center">
            Editing Role</span
          >

          <v-select
            block
            placeholder="Select Role"
            v-model="members[changeIndex].role"
            label="Role"
            class="mt-3 mb-6 pa-0"
            hide-details="auto"
            :items="roles"
            item-key="name"
            item-text="text"
            outlined
          />

          <div class="flex justify-between">
            <v-btn color="error" elevation="0">Cancel</v-btn>

            <v-btn color="success" elevation="0">Remove</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

<!-- Invite Dialog -->
    <v-dialog
      v-model="inviteDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <div class="bg-white p-5 rounded-md shadow">
        <div class="flex mb-3 justify-between">
          <span class="font-semibold text-xl">Send Invite</span>
          <v-btn @click="cancelInvite" color="#908DAA" icon
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <div class="grid gap-5 mt-5 mb-5">
          <v-text-field
            label="Name"
            outlined
            hide-details="auto"
            placeholder="Name"
          ></v-text-field>

          <v-text-field
            label="Email"
            type="email"
            outlined
            hide-details="auto"
            placeholder="Email"
          ></v-text-field>

          <v-select
            label="Role"
            :items="role"
            outlined
            hide-details="auto"
            placeholder="Select Role"
          ></v-select>
        </div>

        <v-btn color="primary" elevation="0" @click="sendInvite"
          >Continue</v-btn
        >
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inviteDialog: false,
      roles: [
        { text: 'Investor', value: 'investor' },
        { text: 'Admin', value: 'admin' },
        { text: 'Super Admin', value: 'superadmin' },
      ],
      headers: [
        {
          text: 'Name ',
          align: 'start',
          sortable: false,
          value: 'fullname',
        },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phone' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'action' },
      ],
      members: [
        {
          id: 0,
          fullname: 'John Doe',
          email: 'johndoe@gmail.com',
          phone: '09037889592',
          status: 'active',
          role: 'Super Admin',
        },
        {
          id: 1,
          fullname: 'John Doe',
          email: 'johndoe@gmail.com',
          phone: '09037889592',
          status: 'active',
          role: 'Admin',
        },
        {
          id: 2,
          fullname: 'John Doe',
          email: 'johndoe@gmail.com',
          phone: '09037889592',
          status: 'active',
          role: 'Admin',
        },
      ],
      isLoadingMembers: false,
      changeRoleDialog: false,
      changeIndex: -1,
    }
  },

  methods: {
    changeRole(id) {
      this.changeRoleDialog = true

      this.changeIndex = this.members.findIndex((member) => member.id === id)
    },

    removeMember(id) {},

    initiateInvite() {
      this.inviteDialog = true
    },

    cancelInvite() {
      this.inviteDialog = false
    },

    sendInvite() {
      this.inviteDialog = false
    },
  },
}
</script>

<style></style>
