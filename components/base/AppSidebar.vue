<script setup lang="ts">

const route = useRoute();

const props = defineProps<{
  navItems: Array<{
    name: string;
    icon: string;
    href: string;
    requiresAuth: boolean;
    children?: Array<{
      name: string;
      href: string;
    }>;
  }>;
  user: {
    name: string;
    avatar: string;
  } | null;
  isAuthenticated: boolean;
}>();

const emit = defineEmits(['logout', 'login']);

const isSidebarOpen = ref(false);
const colorMode = useColorMode();

const toggleSidebar = async () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  await nextTick();
  // 如果这里有其他逻辑，确保不会立即将 isSidebarOpen 设置回 false
};

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
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
  return props.navItems.filter(item => !item.requiresAuth || props.isAuthenticated).map(item => ({
    ...item,
    active: isActiveRoute(item.href)
  }));
});

function isActiveRoute(href: string): boolean {
  return route.path === href || route.path.startsWith(href + '/');
}

const isMenuOpen = ref(false);
const activeMenuItem = ref(null);

const toggleMenu = (item) => {
  if (activeMenuItem.value === item) {
    activeMenuItem.value = null;
  } else {
    activeMenuItem.value = item;
  }
  isMenuOpen.value = !!activeMenuItem.value;
};
</script>

<template>
  <ClientOnly>
    <div class="flex min-h-screen w-full flex-col">
      <!-- Mobile top bar -->
      <header class="fixed top-0 left-0 right-0 z-20 bg-background shadow-sm sm:hidden">
        <div class="flex items-center justify-between px-4 py-0">
          <Button @click="toggleSidebar" class="text-muted-foreground" variant="ghost">
            <Icon name="ph:list" class="h-5 w-6" />
          </Button>
          <a href="/" class="flex items-center justify-centergap-2">
            <img src="/images/deth_logo_transparent.png" alt="DETH" class=" w-10 h-10" />
            <!-- <span class="font-semibold text-lg">DETH</span> -->
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
          <NuxtLink to="/login" v-else variant="ghost" size="sm" class="flex items-center content-center mr-2">
            <Icon name="ph:signature" class="h-4 w-4 mr-1 text-foreground" />Login
          </NuxtLink>
        </div>
      </header>

      <!-- Desktop sidebar -->
      <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav class="flex flex-col items-center gap-4 py-5">
          <a href="/"
            class="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full filter drop-shadow-lg dark:brightness-200 dark:invert">
            <!-- <Icon name="ph:package-duotone" class="h-4 w-4 transition-all group-hover:scale-105" /> -->
            <img src="/images/deth_logo_transparent.png" alt="DETH" class="w-full " />
            <span class="sr-only">DETH</span>
          </a>
          <div v-for="item in filteredNavItems" :key="item.name" class="relative group w-full  z-50">
            <div class="flex items-center">
              <a :href="item.href" :class="[
                'flex h-9 w-full items-center justify-center transition-colors hover:text-foreground hover:bg-background hover:border-y hover:border-l',
                item.active ? 'bg-accent text-accent-foreground scale-105 text-accent-primary' : 'text-muted-foreground'
              ]">
                <Icon :name="item.icon" class="h-5 w-5" />
                <div
                  class="absolute left-[40px] top-0 h-9 hidden group-hover:flex items-center bg-background border-y border-r rounded-r-lg cursor-pointer min-w-[100px]">
                  <div
                    class="animate-in slide-in-from-left-5 duration-300 whitespace-nowrap pl-2 pr-6 py-1 text-foreground text-sm">
                    {{ item.name }}
                  </div>
                </div>
              </a>
            </div>
            <div v-if="item.children" class="absolute left-full top-9 hidden group-hover:block">
              <div class="animate-in slide-in-from-left-5 duration-300 bg-background border rounded-r-lg shadow-lg">
                <ul class="py-1">
                  <li v-for="child in item.children" :key="child.name">
                    <a :href="child.href"
                      class="block px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">
                      {{ child.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div class="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button @click="toggleTheme" variant="ghost" size="icon" class="h-9 w-9">
                  <Icon v-if="colorMode.value === 'dark'" name="ph:sun" class="h-5 w-5" />
                  <Icon v-else name="ph:moon" class="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Toggle theme</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger
              class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground">
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
      <Transition name="slide-fade">
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
            <Button @click="toggleTheme" variant="outline" class="w-full">
              <Icon v-if="colorMode.value === 'dark'" name="ph:sun" class="h-5 w-5 mr-2" />
              <Icon v-else name="ph:moon" class="h-5 w-5 mr-2" />
              {{ colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                class="flex items-center gap-2 p-2 rounded-lg text-muted-foreground hover:text-foreground">
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
      <main class="flex-1 sm:pl-14 mt-10 md:mt-4 ">
        <div class="mx-auto p-2 sm:p-2 lg:p-4 h-svh max-h-svh ">
          <slot></slot>
        </div>
      </main>
    </div>
  </ClientOnly>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>