interface Supplier{
      id: number; 
      supplierName: string; 
      contactName: string; 
      phone: string; 
      category: string; 
      status: string;
}

export const useFilter = (suppliers: Ref<Supplier[]>) => {
  const search = ref("");
  const selectedStatus = ref("");

  // Combined Filter
  const filteredSuppliers = computed(() =>
    suppliers.value.filter((supplier) => {
      // Search filter
      const matchesSearch = supplier.supplierName
        .toLowerCase()
        .includes(search.value.toLowerCase());

      // Status filter
      const matchesStatus =
        !selectedStatus.value || supplier.status.toLowerCase() === selectedStatus.value.toLowerCase();

      return matchesSearch && matchesStatus;
    })
  );

  return { search, selectedStatus, filteredSuppliers };
};
