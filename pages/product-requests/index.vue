<template>
    <main class="px-6 py-2">
        <div>
            <h1 class="text-sm text-[#626F86] font-normal">Product Requests</h1>
            <div class="mt-4">
                <Search v-model:modelValue="search" v-model:isAscending="isAscending" 
                    v-model:selectedStatus="selectedStatus" />
            </div>
        </div>

        <!-- Table Component -->
        <div class="mt-6">
            <PurchaseOrderTable :headers="headers" :data="paginatedItems">
                <template #action="{ row }">
                    <div class="relative" ref="dropdownRef">
                        <LucideEllipsisVertical
                            class="cursor-pointer text-gray-500 hover:text-gray-800 ml-2"
                            @click.stop="toggleDropdown(row.id)"
                        />
                        <!-- Dropdown Menu -->
                        <div
                            v-if="activeDropdown === row.id"
                            class="absolute right-0 mt-2 w-[10.5rem] bg-white border border-gray-300 rounded-lg shadow-md z-10"
                        >
                            <button class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                @click="viewRequest(row.id)">
                                <LucideEye class="mr-2 w-4 h-4" /> View Request
                            </button>
                            <button class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                @click="notifyRequester(row.id)">
                                <LucideBell class="mr-2 w-4 h-4" /> Notify Requester
                            </button>
                            <button class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full"
                                @click="deleteRequest(row.id)">
                                <LucideTrash2 class="mr-2 w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                </template>
            </PurchaseOrderTable>
        </div>
        
        <!-- Pagination Component -->
        <CustomPagination v-model:currentPage="page" :totalPages="totalPages" />
    </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { usePagination } from "@/composables/usePagination";
import { useRouter } from "vue-router";
import { LucideEllipsisVertical, LucideEye, LucideBell, LucideTrash2 } from "lucide-vue-next";

const router = useRouter();
const search = ref("");
const isAscending = ref(false);
const selectedStatus = ref("");
const activeDropdown = ref<string | number | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = (id: string | number) => {
    activeDropdown.value = activeDropdown.value === id ? null : id;
};

// **Handle clicking outside**
const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        activeDropdown.value = null;
    }
};

// Attach event listener when component mounts
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

// Remove event listener when component unmounts
onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

const viewRequest = (id: string | number) => {
    console.log("View Request:", id);
    activeDropdown.value = null;
};

const notifyRequester = (id: string | number) => {
    console.log("Notify Requester:", id);
    activeDropdown.value = null;
};

const deleteRequest = (id: string | number) => {
    console.log("Delete Request:", id);
    activeDropdown.value = null;
};

interface TableHeader {
    label: string;
    value: keyof TableRow;
    sortable?: boolean;
}

interface TableRow {
    id: string | number;
    itemRequest: string;
    requesterName: string;
    date: string;
    action?: string;
}

const headers: TableHeader[] = [
    { label: "ID", value: "id" },
    { label: "Item Request", value: "itemRequest", sortable: true },
    { label: "Requester’s Name", value: "requesterName", sortable: true },
    { label: "Date Requested", value: "date", sortable: true },
    { label: "Action", value: "action" },
];

const tableData: TableRow[] = [
    { id: "87", itemRequest: "Sivocid", requesterName: "Oluwatosin Adegboye", date: "16/01/2025" },
    { id: "54", itemRequest: "Augmentin 228 syrup", requesterName: "Janet Adeajayi", date: "16/01/2025" },
    { id: "25", itemRequest: "Sivocid", requesterName: "Henry Christopher", date: "16/01/2025" },
    { id: "30", itemRequest: "Augmentin 228 syrup", requesterName: "Oluwatosin Adegboye", date: "16/01/2025" },
    { id: "51", itemRequest: "Sivocid", requesterName: "Janet Adeajayi", date: "16/01/2025" },
    { id: "21", itemRequest: "Augmentin 228 syrup", requesterName: "Henry Christopher", date: "16/01/2025" },
    { id: "35", itemRequest: "Sivocid", requesterName: "Oluwatosin Adegboye", date: "16/01/2025" },
    { id: "23", itemRequest: "Augmentin 228 syrup", requesterName: "Janet Adeajayi", date: "16/01/2025" },
    { id: "33", itemRequest: "Sivocid", requesterName: "Henry Christopher", date: "16/01/2025" },
    { id: "87", itemRequest: "Augmentin 228 syrup", requesterName: "Oluwatosin Adegboye", date: "16/01/2025" },
    { id: "88", itemRequest: "Sivocid", requesterName: "Janet Adeajayi", date: "16/01/2025" },
    { id: "81", itemRequest: "Bunto", requesterName: "Henry Christopher", date: "16/01/2025" },
    { id: "80", itemRequest: "Sivocid", requesterName: "Oluwatosin Adegboye", date: "16/01/2025" },
    { id: "05", itemRequest: "Bunto", requesterName: "Janet Adeajayi", date: "16/01/2025" },
    { id: "55", itemRequest: "Sivocid", requesterName: "Henry Christopher", date: "16/01/2025" }
];

const filteredData = computed(() => {
    if (!search.value) return tableData;
    return tableData.filter(row =>
        row.itemRequest.toLowerCase().includes(search.value.toLowerCase())
    );
});

const { page, paginatedItems, totalPages } = usePagination(filteredData, 10);
</script>