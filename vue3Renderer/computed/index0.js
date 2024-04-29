const a = ref(1);
const b = ref(2);
const c = computed(() => a.value + b.value);
console.log(c.value); // 3
a.value = 2;
console.log(c.value); // 4