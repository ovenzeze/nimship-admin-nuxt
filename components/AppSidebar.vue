<script setup lang="ts">

const props = defineProps<{
  navItems: Array<{
    name: string;
    icon: string;
    href: string;
    active: boolean;
    requiresAuth: boolean;
  }>;
  user: {
    name: string;
    avatar: string;
  } | null;
  isAuthenticated: boolean;
}>();

const emit = defineEmits(['logout', 'login']);

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
];

const currentLanguage = ref(languages[0]);

const changeLanguage = (lang) => {
  currentLanguage.value = lang;
  // Implement language change logic here
};

const filteredNavItems = computed(() => {
  return props.navItems.filter(item => !item.requiresAuth || props.isAuthenticated);
});
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <!-- Mobile top bar -->
    <header class="fixed top-0 left-0 right-0 z-20 bg-background shadow-sm sm:hidden">
      <div class="flex items-center justify-between px-4 py-2">
        <button @click="toggleSidebar" class="text-muted-foreground">
          <Icon name="ph:list" class="h-6 w-6" />
        </button>
        <a href="/" class="flex items-center gap-2">
          <Icon name="ph:package-duotone" class="h-6 w-6 text-primary" />
          <span class="font-semibold">DETH</span>
        </a>
        <div v-if="isAuthenticated && user">
          <DropdownMenu>
            <DropdownMenuTrigger class="flex items-center">
              <img :src="user.avatar" :alt="user.name" class="h-8 w-8 rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{{ user.name }}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="emit('logout')">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button v-else @click="emit('login')" variant="ghost" size="sm">
          Login
        </Button>
      </div>
    </header>

    <!-- Desktop sidebar -->
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav class="flex flex-col items-center gap-4 px-2 py-5">
        <a href="/" class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          <Icon name="ph:package-duotone" class="h-4 w-4 transition-all group-hover:scale-110" />
          <span class="sr-only">DETH</span>
        </a>
        <TooltipProvider v-for="item in filteredNavItems" :key="item.name">
          <Tooltip>
            <TooltipTrigger as-child>
              <a :href="item.href" :class="[
                'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground',
                item.active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              ]">
                <Icon :name="item.icon" class="h-5 w-5" />
                <span class="sr-only">{{ item.name }}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">{{ item.name }}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <div class="mt-auto flex flex-col items-center gap-4 px-2 py-5">
        <DropdownMenu>
          <DropdownMenuTrigger class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
            <Icon name="ph:globe" class="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang)">
              {{ lang.name }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div v-if="isAuthenticated && user">
          <DropdownMenu>
            <DropdownMenuTrigger class="flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden">
              <img :src="user.avatar" :alt="user.name" class="h-full w-full object-cover" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{{ user.name }}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="emit('logout')">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button v-else @click="emit('login')" variant="ghost" size="sm" class="h-9 w-9 p-0">
          <Icon name="ph:sign-in" class="h-5 w-5" />
        </Button>
      </div>
    </aside>

    <!-- Mobile sidebar -->
    <Transition name="slide">
      <aside v-if="isSidebarOpen" class="fixed inset-0 z-30 flex flex-col bg-background p-4 sm:hidden">
        <button @click="toggleSidebar" class="self-end mb-4">
          <Icon name="ph:x" class="h-6 w-6" />
        </button>
        <nav class="flex flex-col gap-4">
          <a v-for="item in filteredNavItems" :key="item.name" :href="item.href" :class="[
            'flex items-center gap-2 p-2 rounded-lg transition-colors',
            item.active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
          ]" @click="toggleSidebar">
            <Icon :name="item.icon" class="h-5 w-5" />
            <span>{{ item.name }}</span>
          </a>
        </nav>
        <div class="mt-auto flex flex-col gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger class="flex items-center gap-2 p-2 rounded-lg text-muted-foreground hover:text-foreground">
              <Icon name="ph:globe" class="h-5 w-5" />
              <span>{{ currentLanguage.name }}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang)">
                {{ lang.name }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div v-if="isAuthenticated && user" class="flex items-center gap-2 p-2">
            <img :src="user.avatar" :alt="user.name" class="h-8 w-8 rounded-full" />
            <span>{{ user.name }}</span>
          </div>
          <Button v-else @click="emit('login')" class="w-full">
            Login
          </Button>
        </div>
      </aside>
    </Transition>

    <!-- Main content area -->
    <main class="flex-1 sm:pl-14 mt-14 sm:mt-0">
      <div class="container mx-auto p-2 sm:p-2 lg:p-4">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>