<template>
    <ProfileContainer header="User Roles">
        <div class="px-6 pt-6 pb-20">
            <UserRoleTable :users="userList" />
        </div>
    </ProfileContainer>
</template>

<script setup lang="ts">
import UserRoleTable from '../../components/profile/userRoleTable.vue';
import femiAvater from "../../assets/images/femiImg.png"
import joshAvater from "../../assets/images/joshImg.png"
import janeAvater from "../../assets/images/janeImg.png"
import kaneAvater from "../../assets/images/kaneImg.png"

const userList = [
  { name: "Esther Joel", email: "adabali@remedialhealth.com", status: "Active", role: "manager" },
  { name: "Femi Babalola", email: "femibabs@remedialhealth.com", status: "Active", role: "manager", image: femiAvater },
  { name: "Josh Michael", email: "adabali@remedialhealth.com", status: "Active", role: "officer", image: joshAvater },
  { name: "Jane Rotanson", email: "jane@remedialhealth.com", status: "Inactive", role: "officer", image: janeAvater },
  { name: "Kingsley Emeka", email: "adabali@remedialhealth.com", status: "Inactive", role: "officer", image: kaneAvater },
];
</script>