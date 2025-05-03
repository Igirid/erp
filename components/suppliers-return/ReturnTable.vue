<script setup lang="ts">
const props = defineProps<{
  returns: Array<Return>;
  search: string;
  selectedStatus: string;
  page: number;
}>();

const emit = defineEmits([
  "update:search",
  "update:selectedStatus",
  "update:page",
]);

const listStyle = ref("list");
const isAscending = ref(true);
const specificSort = ref<keyof typeof props.returns | null>(null);
const router = useRouter();

// Methods
const handleListStyleChanges = (name: string) => {
  listStyle.value = name;
};

const toggleSortOrder = () => {
  isAscending.value = !isAscending.value;
};

const updateSpecificSort = (name: any | null) => {
  toggleSortOrder();
  specificSort.value = name;
};

const sortedReturns = computed(() => {
  return [...props.returns].sort((a: any, b: any) => {
    const key = specificSort.value as keyof typeof props.returns;

    const aValue = a[key];
    const bValue = b[key];
    if (key) {
      return isAscending.value
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return isAscending.value ? a.id - b.id : b.id - a.id;
  });
});
const isModalOpen = ref(false);
const selectedReturn = ref<Return>();
const selectedId = ref<number>();

const openModal = (id?: number) => {
  if (id) {
    selectedReturn.value = sortedReturns.value[id];
    isModalOpen.value = true;
  }
};

const handleDelete = () => {
  console.log("Deleting", selectedReturn.value);
  isModalOpen.value = false;
};

const isDropdownOpen = ref(false);

const handleSelection = (action: string) => {
  console.log("Selected action:", action);
  if (action == "delete") {
    openModal(selectedReturn.value?.id);
  } else if (action == "view") {
    router.push(`/suppliers-return/${selectedReturn.value?.id}`);
  }
};
// const isFilterOpen = ref(false);

// const handleFilterSelection = (filter: string) => {
//   console.log("Selected filter:", filter);
// };

const isFilterModalOpen = ref(false);

const handleFilterApply = (filters: any) => {
  console.log("Filters Applied:", filters);
};
const selectSupplier = (id: number, supplierId: number) => {
  isDropdownOpen.value = true;
  selectedReturn.value = sortedReturns.value[id];
  selectedId.value = id;
};
</script>

<template>
  <!-- <div class="flex justify-between items-center mb-6 w-full">
      <div class="text-lightBlack flex justify-end items-center gap-[10px] w-[80%]">
        <div class="relative w-[140px]">
          <ChevronDown class="absolute top-[10px] right-[10px] pointer-events-none"/>
          <SelectBox :values="['1','2']" default-value="Page No 1/6" 
          :modelValue="props.page" 
          @update:modelValue="$emit('update:page', $event)" 
          />
        </div>
        <div class="w-[200px] relative">
          <Search class="absolute top-[50%] left-[15px] -translate-y-[50%]" :size="18"/>
          <InputBox :model-value="props.search" @update:model-value="$emit('update:search', $event)" placeholder="Search"/>
        </div>
        <div class="relative w-[180px]">
          <ListFilter class="absolute top-[10px] left-[10px]"/>
          <SelectBox :values="['Active','Inactive']" :status="true" default-value="Filter By Status" :modelValue="props.selectedStatus" @update:model-value="$emit('update:selectedStatus', $event)"
          variant="bg-transparent pl-[40px] w-full font-semibold flex items-center gap-[10px] border-2 border-ashGray px-2 py-2 rounded-md"
          />
        </div>
        <ButtonDiv name="Sort By" :handle-click="toggleSortOrder" more-stylings="border-2 border-ashGray w-fit">
          <ArrowDownUp />
        </ButtonDiv>
        <div class="p-3 flex items-center gap-[10px]">
          <div class="p-2 cursor-pointer" :class="listStyle === 'list' ? 'bg-lightBlue text-darkBlue rounded-md' : ''" @click="handleListStyleChanges('list')">
            <AlignJustify />
          </div>
          <div class="p-2 cursor-pointer" :class="listStyle === 'grid' ? 'bg-lightBlue text-darkBlue rounded-md' : ''" @click="handleListStyleChanges('grid')">
            <LayoutGrid />
          </div>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        + New Supplier
      </button>
      </div>
    </div> -->

  <div
    class="bg-white border text-lightBlack border-[#091E4224] rounded-xl shadow-sm overflow-x-auto"
    v-if="listStyle === 'list'"
  >
    <table class="w-full">
      <thead>
        <tr class="bg-gray-100 text-center text-xs font-semibold text-gray-600">
          <th class="p-3 font-semibold">ID</th>
          <th
            class="p-3 font-semibold"
            @click="updateSpecificSort('supplierName')"
          >
            Supplier Name <ChevronsUpDown class="inline w-[12px]" />
          </th>
          <th
            class="p-3 font-semibold"
            @click="updateSpecificSort('contactName')"
          >
            Invoice No <ChevronsUpDown class="inline w-[12px]" />
          </th>
          <th class="p-3 font-semibold" @click="updateSpecificSort('category')">
            Date <ChevronsUpDown class="inline w-[12px]" />
          </th>
          <th class="p-3 font-semibold" @click="updateSpecificSort('status')">
            Total <ChevronsUpDown class="inline w-[12px]" />
          </th>
          <th class="p-3 font-semibold" @click="updateSpecificSort('status')">
            Admin <ChevronsUpDown class="inline w-[12px]" />
          </th>
          <th class="p-3 font-semibold">Action</th>
        </tr>
      </thead>
      <tbody class="text-xs font-medium">
        <tr
          v-for="(ret, id) in sortedReturns"
          :key="ret.id"
          class="border-b text-gray-500 hover:bg-gray-50 text-center relative"
        >
          <td class="p-3">
            <NuxtLink :to="`suppliers-return/${ret.id}`">
              {{ ret.id }}
            </NuxtLink>
          </td>
          <td class="p-3">
            <NuxtLink :to="`suppliers-return/${ret.id}`">
              {{ ret.supplierName }}
            </NuxtLink>
          </td>
          <td class="p-3">
            <NuxtLink :to="`suppliers-return/${ret.id}`">
              {{ ret.invoiceNo }}
            </NuxtLink>
          </td>
          <td class="p-3">
            <NuxtLink :to="`suppliers-return/${ret.id}`">
              {{ ret.date }}
            </NuxtLink>
          </td>

          <td class="p-3">
            <NuxtLink :to="`suppliers-return/${ret.id}`">
              {{ ret.total }}
            </NuxtLink>
          </td>
          <td class="p-3">
            <NuxtLink :to="`suppliers-return/${ret.id}`">
              <div class="flex gap-2 justify-center">
                <img :src="ret.avatar" class="h-5 w-5"/>
                <span :class="['px-2 py-1 rounded-md font-semibold text-xs']">
                  {{ ret.adminName }}
                </span>
              </div>
            </NuxtLink>
          </td>
          <td class="p-3 flex justify-center">
            <LucideEllipsisVertical
              @click="selectSupplier(id, ret.id)"
              class="cursor-pointer text-gray-500 h-5 w-5 hover:text-gray-800"
            />
          </td>
          <!-- <td class="p-3 text-center">
            <LucideEllipsisVertical
              class="cursor-pointer text-gray-500 text-sm text-center hover:text-gray-800"
            />
          </td> -->

          <!-- v-if="id" -->
          <SuppliersDropdownMenu
            v-if="selectedReturn?.id == ret.id"
            :isOpen="isDropdownOpen"
            @close="isDropdownOpen = false"
            @select="handleSelection"
          />
        </tr>
      </tbody>
    </table>
  </div>
  <!-- <div v-else class="grid sm:grid-cols-2 lg:grid-cols-4 gap-[30px] h-auto">
    <div v-for="supplier in props.returns" :key="supplier.id">
      <div
        class="bg-white rounded-md shadow-md p-6 hover:scale-[1.05] hover:border-lightBlue border h-full transition-all"
      >
        <p class="font-semibold">Name: {{ supplier.supplierName }}</p>
        <p>Contact: {{ supplier.contactName }}</p>
        <p>Phone: {{ supplier.phone }}</p>
        <p
          :class="['mt-2 px-2 max-w-[200px] w-[40%] text-center py-1 rounded-full text-xs', statuses[supplier.status as keyof typeof statuses]]"
        >
          {{ supplier.status }}
        </p>
      </div>
    </div>
  </div> -->
  <!-- <button @click="openModal(1)" class="btn-delete">Open Delete Modal</button> -->

  <SuppliersReturnDeleteModal
    :isOpen="isModalOpen"
    :supplierName="selectedReturn?.supplierName"
    @close="isModalOpen = false"
    @confirm="handleDelete"
  />

  <!-- <button @click="isDropdownOpen = true" class="btn-dropdown">Open Menu</button>

  <SuppliersDropdownMenu
    :isOpen="isDropdownOpen"
    @close="isDropdownOpen = false"
    @select="handleSelection"
  /> -->

  <!-- <button @click="isFilterOpen = true" class="btn-dropdown">Open Filter</button>

  <UiFilterDropdown
    :isOpen="isFilterOpen"
    @close="isFilterOpen = false"
    @select="handleFilterSelection"
  /> -->

  <!-- <button @click="isFilterModalOpen = true" class="btn">Open Filter</button>

  <UiFilterModal
    :isOpen="isFilterModalOpen"
    @close="isFilterModalOpen = false"
    @apply="handleFilterApply"
  /> -->
</template>

<style>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  outline: none;
}
</style>
