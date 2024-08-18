# api-examples.md

---
outline: deep
---

# Runtime API Examples

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).

kick


# blocks.md

---
title: Building Blocks
---

<script setup>
import Blocks from "../../.vitepress/theme/components/Blocks.vue"
</script>

<Blocks />


# blocks

## renderer.md

---
title: Blocks - shadcn-vue
layout: false
---

<script setup>
import BlockPage from "../../../.vitepress/theme/components/BlockPage.vue"
</script>

<BlockPage />


# docs.md



# docs

## about.md

---
title: About
description: Powered by amazing open source projects.
---

## About

[shadcn-vue](https://shadcn-vue.com) is a port of [shadcn/ui](https://ui.shadcn.com) for Vue/Nuxt. It's maintained by [radix-vue](https://github.com/radix-vue).

## Credits

- [shadcn](https://twitter.com/shadcn) - The brilliant mind behind the designs, methodology, and implementation of the original [shadcn/ui](https://ui.shadcn.com).
- [Radix Vue](https://radix-vue.com) - The headless components that power this project.
- [Radix UI](https://radix-ui.com) - The headless components and examples that the original [shadcn/ui](https://ui.shadcn.com) was built on.
- [Shu Ding](https://shud.in) - The typography style is adapted from his work on Nextra.
- [Cal](https://cal.com) - Where shad copied the styles for the first component: the `Button`.

## License

MIT © [shadcn](https://shadcn.com) & [radix-vue](https://github.com/radix-vue)


# docs

## changelog.md

---
title: Changelog
description: Latest updates and announcements.
---

## June 2024

### New Component - Number Field
A new component has been added to the project [`NumberField`](/docs/components/number-field.html).

A number field allows a user to enter a number and increment or decrement the value using stepper buttons.

<ComponentPreview name="NumberFieldDemo" class="max-w-[180px]" />

## May 2024

### New Component - Charts
Several kinds of chart components has been added to the project.

Charts are versatile visualization tools, allowing users to represent data using various options for effective analysis.

1. [`Area Chart`](/docs/charts/area) - An area chart visually represents data over time, displaying trends and patterns through filled-in areas under a line graph.

<ComponentPreview name="AreaChartDemo"  />

2. [`Bar Chart`](/docs/charts/bar) - A line chart visually represents data using rectangular bars of varying lengths to compare quantities across different categories or groups.

<ComponentPreview name="BarChartDemo"  />

3. [`Donut Chart`](/docs/charts/donut) - A line chart visually represents data in a circular form, similar to a pie chart but with a central void, emphasizing proportions within categories.

<ComponentPreview name="DonutChartDemo"  />

4. [`Line Chart`](/docs/charts/line) - A line chart  visually displays data points connected by straight lines, illustrating trends or relationships over a continuous axis.

<ComponentPreview name="LineChartDemo"  />

### New Component - Auto Form

[`Auto Form`](/docs/components/auto-form.html) is a drop-in form builder for your internal and low-priority forms with existing zod schemas.

For example, if you already have zod schemas for your API and want to create a simple admin panel to edit user profiles, simply pass the schema to AutoForm and you're done.

The following form has been created by passing a `zod` schema object to our `AutoForm` component.

<ComponentPreview name="AutoFormBasic" />

## April 2024

### Component Updated - Calendar

The [`Calendar`](/docs/components/calendar.html) component has been updated and is now built on top of the [RadixVue Calendar](https://www.radix-vue.com/components/calendar.html) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

If you're looking for a range calendar, check out the [`Range Calendar`](/docs/components/range-calendar.html) component.

And if you're looking for a date picker input, check out the [`Date Picker`](/docs/components/date-picker.html) component.

<ComponentPreview name="CalendarDemo" />

<ComponentPreview name="RangeCalendarDemo" />

<ComponentPreview name="DatePickerDemo" />

### Building Blocks for the Web

[`Blocks`](/blocks) are composed of different components that can be used to build your apps, with each block being a standalone section of your application. These blocks are fully responsive, accessible, and composable, and are built using the same principles as the other components in `shadcn-vue`.

<div>
    <image
        src="/examples/block-dark.png"
        :width="1280"
        :height="727"
        alt="Building Blocks"
        class="hidden dark:block"
    />
    <image
        src="/examples/block-light.png"
        :width="1280"
        :height="727"
        alt="Building Blocks"
        class="block dark:hidden"
    />
</div>

## March 2024

### New Component - Breadcrumb

[`Breadcrumb`](/docs/components/breadcrumb.html) displays the path to the current resource using a hierarchy of links.

<ComponentPreview name="BreadcrumbDemo" />

### New Component - Pin Input (OTP Input)

[`Pin Input`](/docs/components/pin-input.html) allows users to input a sequence of one-character alphanumeric inputs.

<ComponentPreview name="PinInputDemo" />

### New Component - Resizable

[`Resizable`](/docs/components/resizable.html) - Accessible resizable panel groups and layouts with keyboard support.

<ComponentPreview name="ResizableDemo" />

### New Component - Drawer

[`Drawer`](/docs/components/drawer.html) - A drawer component for vue that is built on top of [Vaul Vue](https://github.com/radix-vue/vaul-vue).

<ComponentPreview name="DrawerDemo" />

## February 2024

### New Component - Tag Inputs

[`Tag inputs`](/docs/components/tags-input.html) render tags inside an input, followed by an actual text input.

<ComponentPreview name="TagsInputDemo" />

## January 2024

### New Component - Sonner

[`Sonner`](/docs/components/sonner.html) is an opinionated toast component for Vue.

The Sonner component is provided by [vue-sonner](https://vue-sonner.vercel.app/), which is a Vue port of Sonner, originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

<ComponentPreview name="SonnerDemo" />

### New Component - Toggle Group

[`Toggle Group`](/docs/components/toggle-group.html) - A set of two-state buttons that can be toggled on or off.

<ComponentPreview name="ToggleGroupDemo" />

### New Component - Carousel

[`Carousel`](/docs/components/carousel.html) - A carousel with motion and swipe built using [Embla](https://www.embla-carousel.com/) library.

<ComponentPreview name="CarouselDemo" />


# docs

## charts.md

---
title: Charts
description: Versatile visualization tool, allowing users to represent data using various types of charts for effective analysis.
label: Alpha
---

<script setup>
import Area from '~icons/gravity-ui/chart-area-stacked'
import Bar from '~icons/gravity-ui/chart-column'
import Line from '~icons/gravity-ui/chart-line'
import Pie from '~icons/gravity-ui/chart-pie'
</script>

<Callout>
  Only works with Vue >3.3
</Callout>

`Charts` components were built on top of [Unovis](https://unovis.dev/) (a modular data visualization framework), and inspired by [tremor](https://www.tremor.so).

## Chart type

<div class="grid gap-4 mt-8 sm:grid-cols-2 sm:gap-6 not-docs">
  <LinkedCard href="/docs/charts/area">
    <Area class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Area</p>
  </LinkedCard>

  <LinkedCard href="/docs/charts/line">
    <Line class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Line</p>
  </LinkedCard>

  <LinkedCard href="/docs/charts/bar">
    <Bar class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Bar</p>
  </LinkedCard>

  <LinkedCard href="/docs/charts/donut">
    <Pie class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Donut</p>
  </LinkedCard>
</div>

## Installation

<Steps>

### Update `css`

Add the following tooltip styling to your `tailwind.css` file:

```css
@layer base {
  :root {
    /* ... */
    --vis-tooltip-background-color: none !important;
    --vis-tooltip-border-color: none !important;
    --vis-tooltip-text-color: none !important;
    --vis-tooltip-shadow-color: none !important;
    --vis-tooltip-backdrop-filter: none !important;
    --vis-tooltip-padding: none !important;

    --vis-primary-color: var(--primary);
    /* change to any hsl value you want */
    --vis-secondary-color: 160 81% 40%;
    --vis-text-color: var(--muted-foreground);
  }
```

If you are not using `css-variables` for your component, you need to update the `--vis-primary-color` and `--vis-text-color` to your desired hsl value.

You may use [this tool](https://redpixelthemes.com/blog/tailwindcss-colors-different-formats/) to help you find the hsl value for your primary color and text color. Be sure to provide `dark` mode styling as well.

</Steps>

## Colors

By default, we construct the primary theme color, and secondary (`--vis-secondary-color`) color with different opacity for the graph.

However, you can always pass in the desired `color` into each chart.

```vue
<template>
  <AreaChart
    :data="data"
    :colors="['blue', 'pink', 'orange', 'red']"
  />
</template>
```

## Custom tooltip

If you want to customize the `Tooltip` for the chart, you can pass `customTooltip` prop with a custom Vue component.
The custom component would receive `title` and `data` props, check out [ChartTooltip.vue component](https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/lib/registry/default/ui/chart/ChartTooltip.vue) for example.

The expected prop definition would be:

```ts
defineProps<{
  title?: string
  data: {
    name: string
    color: string
    value: any
  }[]
}>()
```


# docs

## charts

### area.md

---
title: Area
description: An area chart visually represents data over time, displaying trends and patterns through filled-in areas under a line graph.
source: apps/www/src/lib/registry/default/ui/chart-area
label: Alpha
---

<ComponentPreview name="AreaChartDemo"  />

## Installation

<Callout>
  Only works with Vue >3.3
</Callout>

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add chart-area
```

### Setup

Follow the [guide](/docs/charts.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/AreaChart.md -->

## Example

### Sparkline

We can turn the chart into sparkline chart by hiding axis, gridline and legends.

<ComponentPreview name="AreaChartSparkline"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/docs/charts.html#custom-tooltip).

<ComponentPreview name="AreaChartCustomTooltip"  />


# docs

## charts

### bar.md

---
title: Bar
description: A line chart visually represents data using rectangular bars of varying lengths to compare quantities across different categories or groups.
source: apps/www/src/lib/registry/default/ui/chart-bar
label: Alpha
---

<ComponentPreview name="BarChartDemo"  />

## Installation

<Callout>
  Only works with Vue >3.3
</Callout>

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add chart-bar
```

### Setup

Follow the [guide](/docs/charts.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/BarChart.md -->

## Example

### Stacked

You can stack the bar chart by settings prop `type` to `stacked`.

<ComponentPreview name="BarChartStacked"  />

### Rounded

<ComponentPreview name="BarChartRounded"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/docs/charts.html#custom-tooltip).

<ComponentPreview name="BarChartCustomTooltip"  />


# docs

## charts

### donut.md

---
title: Donut
description: A line chart visually represents data in a circular form, similar to a pie chart but with a central void, emphasizing proportions within categories.
source: apps/www/src/lib/registry/default/ui/chart-donut
label: Alpha
---

<ComponentPreview name="DonutChartDemo"  />

## Installation

<Callout>
Only works with Vue >3.3
</Callout>

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add chart-donut
```

### Setup

Follow the [guide](/docs/charts.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/DonutChart.md -->

## Example

### Pie Chart

If you want to render pie chart instead, pass `type` as `pie`.

<ComponentPreview name="DonutChartPie"  />

### Color

We generate colors automatically based on the primary and secondary color and assigned them accordingly. Feel free to pass in your own array of colors.

<ComponentPreview name="DonutChartColor"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/docs/charts.html#custom-tooltip).

<ComponentPreview name="DonutChartCustomTooltip"  />


# docs

## charts

### line.md

---
title: Line
description: A line chart  visually displays data points connected by straight lines, illustrating trends or relationships over a continuous axis.
source: apps/www/src/lib/registry/default/ui/chart-line
label: Alpha
---

<ComponentPreview name="LineChartDemo"  />

## Installation

<Callout>
  Only works with Vue >3.3
</Callout>

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add chart-line
```

### Setup

Follow the [guide](/docs/charts.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/LineChart.md -->

## Example

### Sparkline

We can turn the chart into sparkline chart by hiding axis, gridline and legends.

<ComponentPreview name="LineChartSparkline"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/docs/charts.html#custom-tooltip).

<ComponentPreview name="LineChartCustomTooltip"  />


# docs

## cli.md

---
title: CLI
description: Use the CLI to add components to your project.
---

## init

Use the `init` command to initialize configuration and dependencies for a new project.

The `init` command installs dependencies, adds the `cn`, `useEmitsAsProps` utils, configures `tailwind.config.cjs`, and creates CSS variables for the project.

```bash
npx shadcn-vue@latest init
```

You will be asked a few questions to configure `components.json`:

```txt:line-numbers
Would you like to use TypeScript (recommended)? no / yes
Which framework are you using? Vite / Nuxt / Laravel
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › src/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
```

### Options

```txt
Usage: shadcn-vue init [options]

initialize your project and install dependencies

Options:
  -y, --yes        skip confirmation prompt. (default: false)
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command
```

## add

Use the `add` command to add components and dependencies to your project.

```bash
npx shadcn-vue@latest add [component]
```

You will be presented with a list of components to choose from:

```txt
Which components would you like to add? › Space to select. Return to submit.

◯  accordion
◯  alert
◯  alert-dialog
◯  aspect-ratio
◯  avatar
◯  badge
◯  button
◯  card
◯  checkbox
◯  collapsible
```

### Options

```txt
Usage: shadcn-vue add [options] [components...]

add components to your project

Arguments:
  components         name of components

Options:
  --nodep            disable adding & installing dependencies (advanced) (default: false)
  -y, --yes          Skip confirmation prompt. (default: false)
  -o, --overwrite    overwrite existing files. (default: false)
  -c, --cwd <cwd>    the working directory. (default: the current directory)
  -p, --path <path>  the path to add the component to.
  -h, --help         display help for command
```

## update

Use the `update` command to update components in your project. This will overwrite any modifications you've made to the components, so be sure to commit your changes before running this command.

We plan on improving this command in the future to improve the update experience.

```txt
Usage: shadcn-vue update [options] [components...]

update components in your project

Arguments:
  components       name of components

Options:
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command
```


# docs

## components-json.md

---
title: components.json
description: Configuration for your project.
---

The `components.json` file holds configuration for your project.

We use it to understand how your project is set up and how to generate components customized for your project.

<Callout class="mt-6">

  Note: The `components.json` file is optional and **only required if you're using the CLI** to add components to your project. If you're using the copy
  and paste method, you don't need this file.

</Callout>

You can create a `components.json` file in your project by running the following command:

```bash
npx shadcn-vue@latest init
```

See the [CLI section](/docs/cli) for more information.

## $schema

You can see the JSON Schema for `components.json` [here](https://shadcn-vue.com/schema.json).

```json title="components.json"
{
  "$schema": "https://shadcn-vue.com/schema.json"
}
```

## style

The style for your components. **This cannot be changed after initialization.**

<!-- eslint-skip -->
```json title="components.json"
{
  "style": "default" | "new-york"
}
```

<ComponentPreview name="CardWithForm" />

## Tailwind

Configuration to help the CLI understand how Tailwind CSS is set up in your project.

See the [installation section](/docs/installation) for how to set up Tailwind CSS.

### tailwind.config

Path to where your `tailwind.config.js` file is located.

<!-- eslint-skip -->
```json title="components.json"
{
  "tailwind": {
    "config": "tailwind.config.js" | "tailwind.config.ts"
  }
}
```

### tailwind.css

Path to the CSS file that imports Tailwind CSS into your project.

```json title="components.json"
{
  "tailwind": {
    "css": "src/assets/index.css"
  }
}
```

### tailwind.baseColor

This is used to generate the default color palette for your components. **This cannot be changed after initialization.**

<!-- eslint-skip -->
```json title="components.json"
{
  "tailwind": {
    "baseColor": "gray" | "neutral" | "slate" | "stone" | "zinc"
  }
}
```

### tailwind.cssVariables

You can choose between using CSS variables or Tailwind CSS utility classes for theming.

To use utility classes for theming set `tailwind.cssVariables` to `false`. For CSS variables, set `tailwind.cssVariables` to `true`.

<!-- eslint-skip -->
```json title="components.json"
{
  "tailwind": {
    "cssVariables": `true` | `false`
  }
}
```

For more information, see the [theming docs](/docs/theming).

**This cannot be changed after initialization.** To switch between CSS variables and utility classes, you'll have to delete and re-install your components.

## aliases

The CLI uses these values and the `paths` config from your `tsconfig.json` or `jsconfig.json` file to place generated components in the correct location.

Path aliases have to be set up in your `tsconfig.json` or `jsconfig.json` file.

> A fallback to `tsconfig.app.json` if no `paths` were found in `tsconfig.json`

<Callout class="mt-6">

 **Important:** If you're using the `src` directory, make sure it is included
  under `paths` in your `tsconfig.json` or `jsconfig.json` file.

</Callout>

### aliases.utils

Import alias for your utility functions.

```json title="components.json"
{
  "aliases": {
    "utils": "@/lib/utils"
  }
}
```

### aliases.components

Import alias for your components.

```json title="components.json"
{
  "aliases": {
    "components": "@/components"
  }
}
```

### aliases.ui

Import alias for `ui` components.

The CLI will use the `aliases.ui` value to determine where to place your `ui` components. Use this config if you want to customize the installation directory for your `ui` components.

```json title="components.json"
{
  "aliases": {
    "ui": "@/app/ui"
  }
}
```


# docs

## components.md

<script setup>
import { useRouter } from 'vitepress'

const router = useRouter()
router.go('/docs/components/accordion')
</script>


# docs

## components

### accordion.md

---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
source: apps/www/src/lib/registry/default/ui/accordion
primitive: https://www.radix-vue.com/components/accordion.html
---

<ComponentPreview name="AccordionDemo" class="sm:max-w-[70%]" />

## Installation

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add accordion
```

### Update `tailwind.config.js`

Add the following animations to your `tailwind.config.js` file:

```js title="tailwind.config.js" {5-18}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
}
```

</Steps>

## Usage

```vue
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```


# docs

## components

### alert-dialog.md

---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
source: apps/www/src/lib/registry/default/ui/alert-dialog
primitive: https://www.radix-vue.com/components/alert-dialog.html
---

<ComponentPreview name="AlertDialogDemo" />

## Installation

```bash
npx shadcn-vue@latest add alert-dialog
```

## Usage

```vue
<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>Open</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```


# docs

## components

### alert.md

---
title: Alert
description: Displays a callout for user attention.
---

<ComponentPreview name="AlertDemo"  />

## Installation

```bash
npx shadcn-vue@latest add alert
```

## Usage

```vue
<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
```

## Examples

### Default

<ComponentPreview name="AlertDemo"  />

### Destructive

<ComponentPreview name="AlertDestructiveDemo"  />


# docs

## components

### aspect-ratio.md

---
title: Aspect Ratio
description: Displays content within a desired ratio.
source: apps/www/src/lib/registry/default/ui/aspect-ratio
primitive: https://www.radix-vue.com/components/aspect-ratio.html
---

<ComponentPreview name="AspectRatioDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add aspect-ratio
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project:

<<< @/lib/registry/default/ui/aspect-ratio/AspectRatio.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio'
</script>

<template>
  <div class="w-[450px]">
    <AspectRatio :ratio="16 / 9">
      <img src="..." alt="Image" class="rounded-md object-cover">
    </AspectRatio>
  </div>
</template>
```


# docs

## components

### auto-form.md

---
title: AutoForm
description: Automatically generate a form from Zod schema.
primitive: https://vee-validate.logaretm.com/v4/guide/overview/
---

<Callout class="mt-6">

Credit: Heavily inspired by [AutoForm](https://github.com/vantezzen/auto-form) by Vantezzen

</Callout>

## What is AutoForm

AutoForm is a drop-in form builder for your internal and low-priority forms with existing zod schemas. For example, if you already have zod schemas for your API and want to create a simple admin panel to edit user profiles, simply pass the schema to AutoForm and you're done.

## Installation

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest update form
npx shadcn-vue@latest add auto-form
```

</Steps>

## Field types

Currently, these field types are supported out of the box:

- boolean (checkbox, switch)
- date (date picker)
- enum (select, radio group)
- number (input)
- string (input, textfield)
- file (file)

You can add support for other field types by adding them to the `INPUT_COMPONENTS` object in `auto-form/constants.ts`.

## Zod configuration

### Validations

Your form schema can use any of zod's validation methods including refine.

<Callout>

⚠️ However, there's a known issue with Zod’s `refine` and `superRefine` not executing whenever some object keys are missing.
[Read more](https://github.com/logaretm/vee-validate/issues/4338)

</Callout>

### Descriptions

You can use the `describe` method to set a label for each field. If no label is set, the field name will be used and un-camel-cased.

```ts
const formSchema = z.object({
  username: z.string().describe('Your username'),
  someValue: z.string(), // Will be "Some Value"
})
```

You can also configure the label with [`fieldConfig`](#label) too.

### Optional fields

By default, all fields are required. You can make a field optional by using the `optional` method.

```ts
const formSchema = z.object({
  username: z.string().optional(),
})
```

### Default values

You can set a default value for a field using the `default` method.

```ts
const formSchema = z.object({
  favouriteNumber: z.number().default(5),
})
```

If you want to set default value of date, convert it to Date first using `new Date(val)`.

### Sub-objects

You can nest objects to create accordion sections.

```ts
const formSchema = z.object({
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),

    // You can nest objects as deep as you want
    nested: z.object({
      foo: z.string(),
      bar: z.string(),

      nested: z.object({
        foo: z.string(),
        bar: z.string(),
      }),
    }),
  }),
})
```

Like with normal objects, you can use the `describe` method to set a label and description for the section:

```ts
const formSchema = z.object({
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      zip: z.string(),
    })
    .describe('Your address'),
})
```

### Select/Enums

AutoForm supports `enum` and `nativeEnum` to create select fields.

```ts
const formSchema = z.object({
  color: z.enum(['red', 'green', 'blue']),
})

enum BreadTypes {
  // For native enums, you can alternatively define a backed enum to set a custom label
  White = 'White bread',
  Brown = 'Brown bread',
  Wholegrain = 'Wholegrain bread',
  Other,
}
// Keep in mind that zod will validate and return the enum labels, not the enum values!
const formSchema = z.object({
  bread: z.nativeEnum(BreadTypes),
})
```

### Arrays

AutoForm supports arrays _of objects_. Because inferring things like field labels from arrays of strings/numbers/etc. is difficult, only objects are supported.

```ts
const formSchema = z.object({
  guestListName: z.string(),
  invitedGuests: z
    .array(
      // Define the fields for each item
      z.object({
        name: z.string(),
        age: z.number(),
      })
    )
    // Optionally set a custom label - otherwise this will be inferred from the field name
    .describe('Guests invited to the party'),
})
```

Arrays are not supported as the root element of the form schema.

You also can set default value of an array using .default(), but please make sure the array element has same structure with the schema.

```ts
const formSchema = z.object({
  guestListName: z.string(),
  invitedGuests: z
    .array(
      // Define the fields for each item
      z.object({
        name: z.string(),
        age: z.number(),
      })
    )
    .describe('Guests invited to the party')
    .default([
      { name: 'John', age: 24, },
      { name: 'Jane', age: 20, },
    ]),
})
```

## Field configuration

As zod doesn't allow adding other properties to the schema, you can use the `fieldConfig` prop to add additional configuration for the UI of each field.

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        // fieldConfig
      },
    }"
  />
</template>
```

### Label

You can use the `label` property to customize label if you want to overwrite the pre-defined label via [Zod's description](#descriptions).

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        label: 'Custom username',
      },
    }"
  />
</template>
```

### Description

You can use the `description` property to add a description below the field.

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        description: 'Enter a unique username. This will be shown to other users.',
      },
    }"
  />
</template>
```

### Input props

You can use the `inputProps` property to pass props to the input component. You can use any props that the HTML component accepts.

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        inputProps: {
          type: 'text',
          placeholder: 'Username',
        },
      },
    }"
  />
</template>

// This will be rendered as:
<input type="text" placeholder="Username" />
```

Disabling the label of an input can be done by using the `showLabel` property in `inputProps`.

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        inputProps: {
          type: 'text',
          placeholder: 'Username',
          showLabel: false,
        },
      },
    }"
  />
</template>
```

### Component

By default, AutoForm will use the Zod type to determine which input component to use. You can override this by using the `component` property.

```vue
<template>
  <AutoForm
    :field-config="{
      acceptTerms: {
        // Booleans use a checkbox by default, use a switch instead
        component: 'switch',
      },
    }"
  />
</template>
```

The complete list of supported field types is typed. Current supported types are:

- `checkbox` (default for booleans)
- `switch`
- `date` (default for dates)
- `select` (default for enums)
- `radio`
- `textarea`

Alternatively, you can pass a Vue component to the `component` property to use a custom component.

In `CustomField.vue`

```vue
<script setup lang="ts">
import { computed } from 'vue'
import AutoFormLabel from './AutoFormLabel.vue'
import type { FieldProps } from './interface'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/ui/form'
import { Input } from '@/ui/input'
import { AutoFormLabel } from '@/ui/auto-form'

const props = defineProps<FieldProps>()
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label }}
      </AutoFormLabel>
      <FormControl>
        <CustomInput v-bind="slotProps" />
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
```

Pass the above component in `fieldConfig`.

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        component: CustomField,
      },
    }"
  />
</template>
```

### Named slot

You can use Vue named slot to customize the rendered `AutoFormField`.

```vue
<template>
  <AutoForm
    :field-config="{
      customParent: {
        label: 'Wrapper',
      },
    }"
  >
    <template #customParent="slotProps">
      <div class="flex items-end space-x-2">
        <AutoFormField v-bind="slotProps" class="w-full" />
        <Button type="button">
          Check
        </Button>
      </div>
    </template>
  </AutoForm>
</template>
```

### Accessing the form data

There are two ways to access the form data:

### @submit

The preferred way is to use the `submit` emit. This will be called when the form is submitted and the data is valid.

```vue
<template>
  <AutoForm
    @submit="(data) => {
      // Do something with the data
    }"
  />
</template>
```

### Controlled form

By passing the `form` as props, you can control and use the method provided by `Form`.

```vue
<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const schema = z.object({
  username: z.string(),
})
const form = useForm({
  validationSchema: toTypedSchema(schema),
})

form.setFieldValue('username', 'bar')
</script>

<template>
  <AutoForm :form="form" :schema="schema" />
</template>
```

### Submitting the form

You can use any `button` component to create a submit button. Most importantly is to add attributes `type="submit"`.

```vue
<template>
  <AutoForm>
    <CustomButton type="submit">
      Send now
    </CustomButton>
  </AutoForm>

  // or
  <AutoForm>
    <button type="submit">
      Send now
    </button>
  </AutoForm>
</template>
```

### Adding other elements

All children passed to the `AutoForm` component will be rendered below the form.

```vue
<template>
  <AutoForm>
    <Button>Send now</Button>
    <p class="text-gray-500 text-sm">
      By submitting this form, you agree to our
      <a href="#" class="text-primary underline">
        terms and conditions
      </a>.
    </p>
  </AutoForm>
</template>
```

### Dependencies

AutoForm allows you to add dependencies between fields to control fields based on the value of other fields. For this, a `dependencies` array can be passed to the `AutoForm` component.

```vue
<template>
  <AutoForm
    :dependencies="[
      {
        // 'age' hides 'parentsAllowed' when the age is 18 or older
        sourceField: 'age',
        type: DependencyType.HIDES,
        targetField: 'parentsAllowed',
        when: age => age >= 18,
      },
      {
        // 'vegetarian' checkbox hides the 'Beef Wellington' option from 'mealOptions'
        // if its not already selected
        sourceField: 'vegetarian',
        type: DependencyType.SETS_OPTIONS,
        targetField: 'mealOptions',
        when: (vegetarian, mealOption) =>
          vegetarian && mealOption !== 'Beef Wellington',
        options: ['Pasta', 'Salad'],
      },
    ]"
  />
</template>
```

The following dependency types are supported:

- `DependencyType.HIDES`: Hides the target field when the `when` function returns true
- `DependencyType.DISABLES`: Disables the target field when the `when` function returns true
- `DependencyType.REQUIRES`: Sets the target field to required when the `when` function returns true
- `DependencyType.SETS_OPTIONS`: Sets the options of the target field to the `options` array when the `when` function returns true

The `when` function is called with the value of the source field and the value of the target field and should return a boolean to indicate if the dependency should be applied.

Please note that dependencies will not cause the inverse action when returning `false` - for example, if you mark a field as required in your zod schema (i.e. by not explicitly setting `optional`), returning `false` in your `REQURIES` dependency will not mark it as optional. You should instead use zod's `optional` method to mark as optional by default and use the `REQURIES` dependency to mark it as required when the dependency is met.

Please note that dependencies do not have any effect on the validation of the form. You should use zod's `refine` method to validate the form based on the value of other fields.

You can create multiple dependencies for the same field and dependency type - for example to hide a field based on multiple other fields. This will then hide the field when any of the dependencies are met.

## Example

### Basic

<ComponentPreview name="AutoFormBasic" />

### Input Without Label
This example shows how to use AutoForm input without label.

<ComponentPreview name="AutoFormInputWithoutLabel" />

### Sub Object
Automatically generate a form from a Zod schema.

<ComponentPreview name="AutoFormSubObject" />

### Controlled
This example shows how to use AutoForm in a controlled way.

<ComponentPreview name="AutoFormControlled" />

### Confirm Password
Refined schema to validate that two fields match.

<ComponentPreview name="AutoFormConfirmPassword" />

### API Example
The form select options are fetched from an API.

<ComponentPreview name="AutoFormApi" />

### Array support
You can use arrays in your schemas to create dynamic forms.

<ComponentPreview name="AutoFormArray" />

### Dependencies
Create dependencies between fields.

<ComponentPreview name="AutoFormDependencies" />


# docs

## components

### avatar.md

---
title: Avatar
description: An image element with a fallback for representing the user.
source: apps/www/src/lib/registry/default/ui/avatar
primitive: https://www.radix-vue.com/components/avatar.html
---

<ComponentPreview name="AvatarDemo" />

## Installation

```bash
npx shadcn-vue@latest add avatar
```

## Usage

```vue
<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
```


# docs

## components

### badge.md

---
title: Badge
description: Displays a badge or a component that looks like a badge.
---

<ComponentPreview name="BadgeDemo"  />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add badge
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project

```vue
<script setup lang="ts">
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

defineProps<Props>()

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface BadgeVariantProps extends VariantProps<typeof badgeVariants> {}

interface Props {
  variant?: BadgeVariantProps['variant']
}
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), $attrs.class ?? '')">
    <slot />
  </div>
</template>
```

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Badge>Badge</Badge>
</template>
```

## Examples

### Default

<ComponentPreview name="BadgeDemo"  />

### Secondary

<ComponentPreview name="BadgeSecondaryDemo" />

### Outline

<ComponentPreview name="BadgeOutlineDemo" />

### Destructive

<ComponentPreview name="BadgeDestructiveDemo" />


# docs

## components

### breadcrumb.md

---
title: Breadcrumb
description: Displays the path to the current resource using a hierarchy of links.
---

<ComponentPreview name="BreadcrumbDemo" class="[&_.preview]:p-2" />

## Installation

```bash
npx shadcn-vue@latest add breadcrumb
```

## Usage

```vue
<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">
          Components
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

## Examples

### Custom separator

Use a custom component as `slot` for `<BreadcrumbSeparator />` to create a custom separator.

<ComponentPreview name="BreadcrumbSeparatorDemo" />

```vue showLineNumbers {2,20-22}
<script setup lang="ts">
import { Slash } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <Slash />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">
          Components
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

---

### Dropdown

You can compose `<BreadcrumbItem />` with a `<DropdownMenu />` to create a dropdown in the breadcrumb.

<ComponentPreview name="BreadcrumbDropdown" class="[&_.preview]:p-2" />

```vue showLineNumbers {2-7,16-26}
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/components/ui/dropdown-menu'

import { BreadcrumbItem } from '@/components/ui/breadcrumb'

import ChevronDownIcon from '~icons/radix-icons/chevron-down'
</script>

<template>
  <BreadcrumbItem>
    <DropdownMenu>
      <DropdownMenuTrigger class="flex items-center gap-1">
        Components
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Documentation</DropdownMenuItem>
        <DropdownMenuItem>Themes</DropdownMenuItem>
        <DropdownMenuItem>GitHub</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </BreadcrumbItem>
</template>
```

---

### Collapsed

We provide a `<BreadcrumbEllipsis />` component to show a collapsed state when the breadcrumb is too long.

<ComponentPreview name="BreadcrumbEllipsisDemo" class="[&_.preview]:p-2" />

```vue showLineNumbers {3,15}
<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <!-- ... -->
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <!-- ... -->
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

---

### Link component

To use a custom link component from your routing library, you can use the `asChild` prop on `<BreadcrumbLink />`.

<ComponentPreview name="BreadcrumbLinkDemo" />

```vue showLineNumbers {15-19}
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <RouterLink to="/">
            Home
          </RouterLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <!--  -->
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

---

### Responsive

Here's an example of a responsive breadcrumb that composes `<BreadcrumbItem />` with `<BreadcrumbEllipsis />`, `<DropdownMenu />`, and `<Drawer />`.

It displays a dropdown on desktop and a drawer on mobile.

<ComponentPreview name="BreadcrumbResponsive" class="[&_.preview]:p-2" />


# docs

## components

### button.md

---
title: Button
description: Displays a button or a component that looks like a button.
---

<ComponentPreview name="ButtonDemo"  />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add button
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project

```vue
<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  as?: string
}

// eslint-disable-next-line vue/define-macros-order
withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <component
    :is="as"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <slot />
  </component>
</template>
```

</Steps>
</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button>Button</Button>
</template>
```

## Examples

### Primary

<ComponentPreview name="ButtonDemo"  />

### Secondary

<ComponentPreview name="ButtonSecondaryDemo" />

### Destructive

<ComponentPreview name="ButtonDestructiveDemo" />

### Outline

<ComponentPreview name="ButtonOutlineDemo" />

### Ghost

<ComponentPreview name="ButtonGhostDemo" />

### Link

<ComponentPreview name="ButtonLinkDemo" />

### Icon

<ComponentPreview name="ButtonIconDemo" />

### With Icon

<ComponentPreview name="ButtonWithIconDemo" />

### Loading

<ComponentPreview name="ButtonLoadingDemo" />

### As Child

<ComponentPreview name="ButtonAsChildDemo" />


# docs

## components

### calendar.md

---
title: Calendar
description: A date field component that allows users to enter and edit date.
source: apps/www/src/lib/registry/default/ui/calendar
primitive: https://www.radix-vue.com/components/calendar.html
---

<ComponentPreview name="CalendarDemo" />

<Callout class="text-base mt-12">

If you're looking for **previous** Calendar implementation, checkout to <span class="font-bold underline">[VCalendar](/docs/components/v-calendar)</span> component

</Callout>

## About

The `<Calendar />` component is built on top of the [RadixVue Calendar](https://www.radix-vue.com/components/calendar.html) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

If you're looking for a range calendar, check out the [Range Calendar](/docs/components/range-calendar) component.

## Installation

```bash
npx shadcn-vue@latest add calendar
```
::: tip
The component depends on the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package, which solves a lot of the problems that come with working with dates and times in JavaScript.
Check [Dates & Times in Radix Vue](https://www.radix-vue.com/guides/dates.html) for more information and installation instructions.
:::

## Datepicker

You can use the `<Calendar />` component to build a date picker. See the [Date Picker](/docs/components/date-picker) page for more information.

## Examples

### Form

<ComponentPreview name="CalendarForm" />

## Advanced Customization

### Month & Year Selects

<ComponentPreview name="CalendarWithSelect" />


# docs

## components

### card.md

---
title: Card
description: Displays a card with header, content, and footer.
---

<ComponentPreview name="CardFormDemo"  />

## Installation

```bash
npx shadcn-vue@latest add card
```

## Usage

```vue
<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      Card Content
    </CardContent>
    <CardFooter>
      Card Footer
    </CardFooter>
  </Card>
</template>
```

## Examples

<ComponentPreview name="CardDemo"  />


# docs

## components

### carousel.md

---
title: Carousel
description: A carousel with motion and swipe built using Embla.
source: apps/www/src/lib/registry/default/ui/carousel
primitive: https://www.embla-carousel.com/api
---

<ComponentPreview name="CarouselDemo"  />

## About

The carousel component is built using the [Embla Carousel](https://www.embla-carousel.com/) library.

## Installation

```bash
npx shadcn-vue@latest add carousel
```

## Usage

```vue
<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
</script>

<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
```

## Examples

### Sizes

To set the size of the items, you can use the `basis` utility class on the `<CarouselItem />`.

<ComponentPreview name="CarouselSize" />

Example

```vue:line-numbers title="Example" {4-6}
// 33% of the carousel width.
<Carousel>
  <CarouselContent>
    <CarouselItem class="basis-1/3">...</CarouselItem>
    <CarouselItem class="basis-1/3">...</CarouselItem>
    <CarouselItem class="basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

Responsive

```vue:line-numbers title="Responsive" {4-6}
// 50% on small screens and 33% on larger screens.
<Carousel>
  <CarouselContent>
    <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

### Spacing

To set the spacing between the items, we use a `pl-[VALUE]` utility on the `<CarouselItem />` and a negative `-ml-[VALUE]` on the `<CarouselContent />`.

<Callout class="mt-6">

**Why:** I tried to use the `gap` property or a `grid` layout on the `
CarouselContent` but it required a lot of math and mental effort to get the
spacing right. I found `pl-[VALUE]` and `-ml-[VALUE]` utilities much easier to
use.
<br/><br/>
You can always adjust this in your own project if you need to.

</Callout>

<ComponentPreview name="CarouselSpacing" />

Example

```vue:line-numbers /-ml-4/ /pl-4/
<template>
  <Carousel>
    <CarouselContent class="-ml-4">
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

Responsive

```vue:line-numbers /-ml-2/ /pl-2/ /md:-ml-4/ /md:pl-4/
<template>
  <Carousel>
    <CarouselContent class="-ml-2 md:-ml-4">
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

### Orientation

Use the `orientation` prop to set the orientation of the carousel.

<ComponentPreview name="CarouselOrientation" />

```vue
<Carousel orientation="vertical | horizontal">
  ...
</Carousel>
```

### Thumbnails

<ComponentPreview name="CarouselThumbnails" />

## Options

You can pass options to the carousel using the `opts` prop. See the [Embla Carousel docs](https://www.embla-carousel.com/api/options/) for more information.

```vue:line-numbers {3-6}
<template>
  <Carousel
    :opts="{
      align: 'start',
      loop: true,
    }"
  >
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

## API

### Method 1

Use the `@init-api` emit method on `<Carousel />` component to set the instance of the API.

<ComponentPreview name="CarouselApi" />

### Method 2

You can access it through setting a template ref on the `<Carousel />` component.

```vue:line-numbers {2,5,9}
<script setup>
const carouselContainerRef = ref<InstanceType<typeof Carousel> | null>(null)

function accessApi() {
  carouselContainerRef.value?.carouselApi.on('select', () => {})
}
</script>

<template>
  <Carousel ref="carouselContainerRef">
    ...
  </Carousel>
</template>
```

## Events

You can listen to events using the API. To get the API instance use the `@init-api` emit method on the `<Carousel />` component

```vue:line-numbers {5,7-9,25}
<script setup>
import { nextTick, ref, watch } from 'vue'
import { useCarousel } from '@/components/ui/carousel'

const api = ref<CarouselApi>()

function setApi(val: CarouselApi) {
  api.value = val
}

const stop = watch(api, (api) => {
  if (!api)
    return

  // Watch only once or use watchOnce() in @vueuse/core
  nextTick(() => stop())

  api.on('select', () => {
    // Do something on select.
  })
})
</script>

<template>
  <Carousel @init-api="setApi">
    ...
  </Carousel>
</template>
```

See the [Embla Carousel docs](https://www.embla-carousel.com/api/events/) for more information on using events.

## Slot Props

You can get the reactive slot props like `carouselRef, canScrollNext..Prev, scrollNext..Prev` using the `v-slot` directive in the `<Carousel v-slot="slotProps" />` component to extend the functionality.

```vue:line-numbers {2}
<template>
  <Carousel v-slot="{ canScrollNext, canScrollPrev }">
    ...
    <CarouselPrevious v-if="canScrollPrev" />
    <CarouselNext v-if="canScrollNext" />
  </Carousel>
</template>
```

## Plugins

You can use the `plugins` prop to add plugins to the carousel.

```bash
npm i embla-carousel-autoplay
```

```vue:line-numbers {2,8-10}
<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
</script>

<template>
  <Carousel
    class="w-full max-w-xs"
    :plugins="[Autoplay({
      delay: 2000,
    })]"
  >
    ...
  </Carousel>
</template>
```

<ComponentPreview name="CarouselPlugin" />

See the [Embla Carousel docs](https://www.embla-carousel.com/api/plugins/) for more information on using plugins.


# docs

## components

### checkbox.md

---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
source: apps/www/src/lib/registry/default/ui/checkbox
primitive: https://www.radix-vue.com/components/checkbox.html
---

<ComponentPreview name="CheckboxDemo"  />

## Installation

```bash
npx shadcn-vue@latest add checkbox
```

## Usage

```vue
<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <Checkbox id="terms" />
</template>
```

## Examples

### With text

<ComponentPreview name="CheckboxWithText" />

### Disabled

<ComponentPreview name="CheckboxDisabled"  />

### Form

Please first read `vee-validate` section for [Checkbox and Radio Inputs](https://vee-validate.logaretm.com/v4/examples/checkboxes-and-radio/)

<ComponentPreview name="CheckboxFormSingle" />

<ComponentPreview name="CheckboxFormMultiple" />


# docs

## components

### collapsible.md

---
title: Collapsible
description: An interactive component which expands/collapses a panel.
source: apps/www/src/lib/registry/default/ui/collapsible
primitive: https://www.radix-vue.com/components/collapsible.html
---

<ComponentPreview name="CollapsibleDemo" />

## Installation

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add collapsible
```

### Update `tailwind.config.js`

Add the following animations to your `tailwind.config.js` file:

```js title="tailwind.config.js" {5-18}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
      },
    },
  },
}
```

</Steps>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const isOpen = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
    <CollapsibleContent>
      Yes. Free to use for personal and commercial projects. No attribution
      required.
    </CollapsibleContent>
  </Collapsible>
</template>
```


# docs

## components

### combobox.md

---
title: Combobox
description: Autocomplete input and command palette with a list of suggestions.
---

<ComponentPreview name="ComboboxDemo" />

<br>
<Callout title="Note" class="bg-destructive">

[Radix Vue](https://github.com/radix-vue/radix-vue/releases/tag/v1.2.0) introduced a breaking change. You will need to wrap `ComboboxGroup` and `ComboboxItem` inside of `ComboboxList` now.

</Callout>

## Installation

The Combobox is built using a composition of the `<Popover />` and the `<Command />` components.

See installation instructions for the [Popover](/docs/components/popover#installation) and the [Command](/docs/components/command#installation) components.

## Usage

```vue
<script setup lang="ts">
import { Check, ChevronsUpDown } from 'lucide-vue-next'

import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const open = ref(false)
const value = ref('')
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{ value ? frameworks.find((framework) => framework.value === value)?.label : 'Select framework...' }}

        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command v-model="value">
        <CommandInput placeholder="Search framework..." />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework"
              @select="open = false"
            >
              <Check
                :class="cn(
                  'mr-2 h-4 w-4',
                  value === framework.value ? 'opacity-100' : 'opacity-0',
                )"
              />
              {{ framework.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
```

## Examples

### Combobox

<ComponentPreview name="ComboboxDemo" />

### Popover

<ComponentPreview name="ComboboxPopover" />

### Dropdown menu

<ComponentPreview name="ComboboxDropdownMenu" />

### Responsive

You can create a responsive combobox by using the `<Popover />` on desktop and the `<Drawer />` components on mobile.

<ComponentPreview name="ComboboxResponsive" />

### Form

<ComponentPreview name="ComboboxForm" />


# docs

## components

### command.md

---
title: Command
description: Fast, composable, unstyled command menu.
source: apps/www/src/lib/registry/default/ui/command
primitive: https://www.radix-vue.com/components/combobox.html
---

<ComponentPreview name="CommandDemo" />

## Installation

```bash
npx shadcn-vue@latest add command
```
## Usage

```vue
<script setup lang="ts">
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
</script>

<template>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="calendar">
          Calendar
        </CommandItem>
        <CommandItem value="search-emoji">
          Search Emoji
        </CommandItem>
        <CommandItem value="calculator">
          Calculator
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem value="profile">
          Profile
        </CommandItem>
        <CommandItem value="billing">
          Billing
        </CommandItem>
        <CommandItem value="settings">
          Settings
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```

## Examples

### Dialog

<ComponentPreview name="CommandDialogDemo" />

To show the command menu in a dialog, use the `<CommandDialog />` component.

```vue
<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

import { ref, watch } from 'vue'

const open = ref(false)

const keys = useMagicKeys()
const CmdJ = keys['Cmd+J']

function handleOpenChange() {
  open.value = !open.value
}

watch(CmdJ, (v) => {
  if (v)
    handleOpenChange()
})
</script>

<template>
  <div>
    <p class="text-sm text-muted-foreground">
      Press
      <kbd
        class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
      >
        <span class="text-xs">⌘</span>J
      </kbd>
    </p>
    <CommandDialog :open="open" @update:open="handleOpenChange">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            Calendar
          </CommandItem>
          <CommandItem value="search-emoji">
            Search Emoji
          </CommandItem>
          <CommandItem value="calculator">
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            Profile
          </CommandItem>
          <CommandItem value="billing">
            Billing
          </CommandItem>
          <CommandItem value="settings">
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
```

### Combobox

You can use the `<Command />` component as a combobox. See the [Combobox](/docs/components/combobox) page for more information.


# docs

## components

### context-menu.md

---
title: Context Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
source: apps/www/src/lib/registry/default/ui/context-menu
primitive: https://www.radix-vue.com/components/context-menu.html
---

<ComponentPreview name="ContextMenuDemo"  />

## Installation

```bash
npx shadcn-vue@latest add context-menu
```

## Usage

```vue
<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Profile</ContextMenuItem>
      <ContextMenuItem>Billing</ContextMenuItem>
      <ContextMenuItem>Team</ContextMenuItem>
      <ContextMenuItem>Subscription</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```


# docs

## components

### data-table.md

---
title: Data Table
description: Powerful table and datagrids built using TanStack Table.
primitive: https://tanstack.com/table/v8/docs/guide/introduction
---

<ComponentPreview name="DataTableDemo" />

## Introduction

Every data table or datagrid I've created has been unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.

It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that [headless UI](https://tanstack.com/table/v8/docs/guide/introduction#what-is-headless-ui) provides.

So instead of a data-table component, I thought it would be more helpful to provide a guide on how to build your own.

We'll start with the basic `<Table />` component and build a complex data table from scratch.

<Callout class="mt-4">

**Tip:** If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.

</Callout>

## Table of Contents

This guide will show you how to use [TanStack Table](https://tanstack.com/table/v8) and the `<Table />` component to build your own custom data table. We'll cover the following topics:

- [Basic Table](#basic-table)
- [Row Actions](#row-actions)
- [Pagination](#pagination)
- [Sorting](#sorting)
- [Filtering](#filtering)
- [Visibility](#visibility)
- [Row Selection](#row-selection)
- [Reusable Components](#reusable-components)

## Installation

1. Add the `<Table />` component to your project:

```bash
npx shadcn-vue@latest add table
```

2. Add `tanstack/vue-table` dependency:

```bash
npm install @tanstack/vue-table
```

## Examples

### Column Pinning

<ComponentPreview name="DataTableColumnPinningDemo" />

## Prerequisites

We are going to build a table to show recent payments. Here's what our data looks like:

```ts:line-numbers
interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  // ...
]
```

## Project Structure

Start by creating the following file structure:

```txt
 components
    └── payments
          ├── columns.ts
          ├── data-table.vue
          ├── data-table-dropdown.vue
└── app.vue
```

I'm using a Nuxt example here but this works for any other Vue framework.

- `columns.ts` It will contain our column definitions.
- `data-table.vue` It will contain our `<DataTable />` component.
- `data-table-dropdown.vue` It will contain our `<DropdownAction />` component.
- `app.vue` This is where we'll fetch data and render our table.

## Basic Table

Let's start by building a basic table.

<Steps>

### Column Definitions

First, we'll define our columns in the `columns.ts` file.

```ts:line-numbers
import { h } from 'vue'

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }
]
```

<Callout class="mt-4">

**Note:** Columns are where you define the core of what your table
will look like. They define the data that will be displayed, how it will be
formatted, sorted and filtered.

</Callout>

### `<DataTable />` component

Next, we'll create a `<DataTable />` component to render our table.

```vue
<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
```

<Callout>

**Tip**: If you find yourself using `<DataTable />` in multiple places, this is the component you could make reusable by extracting it to `components/ui/data-table.vue`.

`<DataTable :columns="columns" :data="data" />`

</Callout>

### Render the table

Finally, we'll render our table in our index component.

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns } from './components/columns'
import type { Payment } from './components/columns'
import DataTable from './components/DataTable.vue'

const data = ref<Payment[]>([])

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
```

</Steps>

## Cell Formatting

Let's format the amount cell to display the dollar amount. We'll also align the cell to the right.

<Steps>

### Update columns definition

Update the `header` and `cell` definitions for amount as follows:

```ts
import { h } from 'vue'

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }
]
```
You can use the same approach to format other cells and headers.
</Steps>

## Row Actions

Let's add row actions to our table. We'll use a `<Dropdown />` component for this.

<Steps>

### Add the following into your `DataTableDropDown.vue` component

```vue
<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

defineProps<{
  payment: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Update columns definition

Update our columns definition to add a new `actions` column. The `actions` cell returns a `<Dropdown />` component.

```ts
import { ColumnDef } from '@tanstack/vue-table'
import DropdownAction from '@/components/DataTableDropDown.vue'

export const columns: ColumnDef<Payment>[] = [
  // ...
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
      }))
    },
  },
]
```

You can access the row data using `row.original` in the `cell` function. Use this to handle actions for your row eg. use the `id` to make a DELETE call to your API.

</Steps>

## Pagination

Next, we'll add pagination to our table.

<Steps>

### Update `<DataTable>`

```ts:line-numbers {4,12}
import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useVueTable,
} from "@tanstack/vue-table"

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
})
```

This will automatically paginate your rows into pages of 10. See the [pagination docs](https://tanstack.com/table/v8/docs/api/features/pagination) for more information on customizing page size and implementing manual pagination.

### Add pagination controls

We can add pagination controls to our table using the `<Button />` component and the `table.previousPage()`, `table.nextPage()` API methods.

```vue
<script lang="ts" generic="TData, TValue">
import { Button } from '@/components/ui/button'

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})
</script>

<template>
  <div>
    <div class="border rounded-md">
      <Table>
        { // .... }
      </Table>
    </div>
    <div class="flex items-center justify-end py-4 space-x-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>
```

See [Reusable Components](#reusable-components) section for a more advanced pagination component.

</Steps>

## Sorting

Let's make the email column sortable.

<Steps>

### Add the following into your `utils` file

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function'
    ? updaterOrValue(ref.value)
    : updaterOrValue
}
```

The `valueUpdater` function updates a Vue `ref` object's value. It handles both direct assignments and transformations using a function. If `updaterOrValue` is a function, it's called with the current `ref` value, and the result is assigned to `ref.value`. If it's not a function, it's directly assigned to `ref.value`. This utility enhances flexibility in updating `ref` values. While Vue `ref` can manage reactive state directly, `valueUpdater` simplifies value updates, improving code readability and maintainability when the new state can be a direct value or a function generating it based on the current one.

### Update `<DataTable>`

```vue:line-numbers {4,14,17,33,40-44}
<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  SortingState,
} from '@tanstack/vue-table'

import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { h, ref } from 'vue'

import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { valueUpdater } from '@/lib/utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() { return sorting.value },
  },
})
</script>

<template>
  <div>
    <div class="border rounded-md">
      <Table>{ ... }</Table>
    </div>
  </div>
</template>
```

### Make header cell sortable

We can now update the `email` header cell to add sorting controls.

```ts:line-numbers {5,10-17}
// components/payments/columns.ts
import type {
  ColumnDef,
} from '@tanstack/vue-table'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
    },
]
```

This will automatically sort the table (asc and desc) when the user toggles on the header cell.

</Steps>

## Filtering

Let's add a search input to filter emails in our table.

<Steps>

### Update `<DataTable>`

```vue:line-numbers {4,11,19,39,48-49,52,60-64}
<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/vue-table'

import { valueUpdater } from '@/lib/utils'

import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { h, ref } from 'vue'

import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useVueTable,
} from "@tanstack/vue-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
    },
})

</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input class="max-w-sm" placeholder="Filter emails..."
                :model-value="table.getColumn('email')?.getFilterValue() as string"
                @update:model-value=" table.getColumn('email')?.setFilterValue($event)" />
        </div>
        <div class="border rounded-md">
            <Table>{ ... }</Table>
        </div>
    </div>
</template>

```

Filtering is now enabled for the `email` column. You can add filters to other columns as well. See the [filtering docs](https://tanstack.com/table/v8/docs/guide/filters) for more information on customizing filters.

</Steps>

## Visibility

Adding column visibility is fairly simple using `@tanstack/vue-table` visibility API.

<Steps>

### Update `<DataTable>`

```vue:line-numbers {6,9-14,48,59,63,75-91}
<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { valueUpdater } from '@/lib/utils'

import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { h, ref } from 'vue'

import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useVueTable,
} from "@tanstack/vue-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
        get columnVisibility() { return columnVisibility.value },
    },
})

</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input class="max-w-sm" placeholder="Filter emails..."
                :model-value="table.getColumn('email')?.getFilterValue() as string"
                @update:model-value=" table.getColumn('email')?.setFilterValue($event)" />
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="ml-auto">
                        Columns
                        <ChevronDown class="w-4 h-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        v-for="column in table.getAllColumns().filter((column) => column.getCanHide())" :key="column.id"
                        class="capitalize" :checked="column.getIsVisible()" @update:checked="(value) => {
                            column.toggleVisibility(!!value)
                        }">
                        {{ column.id }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div class="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                            :data-state="row.getIsSelected() ? 'selected' : undefined">
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colSpan="columns.length" class="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
    </div>
</template>

```

This adds a dropdown menu that you can use to toggle column visibility.

</Steps>

## Row Selection

Next, we're going to add row selection to our table.

<Steps>

### Update column definitions

```ts:line-numbers {3,6-20}
import type { ColumnDef } from '@tanstack/vue-table'

import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Payment>[] = [
    {
        id: 'select',
        header: ({ table }) => h(Checkbox, {
            'checked': table.getIsAllPageRowsSelected(),
            'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
            'ariaLabel': 'Select all',
        }),
        cell: ({ row }) => h(Checkbox, {
            'checked': row.getIsSelected(),
            'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
            'ariaLabel': 'Select row',
        }),
        enableSorting: false,
        enableHiding: false,
    },
]
```

### Update `<DataTable>`

```vue:line-numbers {10,22,27}
<script setup lang="ts" generic="TData, TValue">
const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
        get columnVisibility() { return columnVisibility.value },
        get rowSelection() { return rowSelection.value },
    },
})

</script>

<template>
  <div>
    <div class="border rounded-md">
        <Table />
    </div>
  </div>
</template>

```

This adds a checkbox to each row and a checkbox in the header to select all rows.

### Show selected rows

You can show the number of selected rows using the `table.getFilteredSelectedRowModel()` API.

```vue:line-numbers {8-11}
<template>
  <div>
    <div class="border rounded-md">
        <Table />
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <PaginationButtons />
      </div>
    </div>
  </div>
</template>

```

</Steps>

<Steps>

## Expanding

Let's make rows expandable.

### Update `<DataTable>`

```vue:line-numbers {7,30,43,52,57,63,103-116}
<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  ExpandedState,
} from '@tanstack/vue-table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { valueUpdater } from '@/lib/utils'

import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { h, ref } from 'vue'

import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    useVueTable,
} from "@tanstack/vue-table"

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
        get columnVisibility() { return columnVisibility.value },
        get rowSelection() { return rowSelection.value },
        get expanded() { return expanded.value },
    },
})
</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input class="max-w-sm" placeholder="Filter emails..."
                :model-value="table.getColumn('email')?.getFilterValue() as string"
                @update:model-value=" table.getColumn('email')?.setFilterValue($event)" />
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="ml-auto">
                        Columns
                        <ChevronDown class="w-4 h-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        v-for="column in table.getAllColumns().filter((column) => column.getCanHide())" :key="column.id"
                        class="capitalize" :checked="column.getIsVisible()" @update:checked="(value) => {
                            column.toggleVisibility(!!value)
                        }">
                        {{ column.id }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div class="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                      <template v-for="row in table.getRowModel().rows" :key="row.id">
                        <TableRow :data-state="row.getIsSelected() ? 'selected' : undefined">
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                        <TableRow v-if="row.getIsExpanded()">
                          <TableCell :colspan="row.getAllCells().length">
                            {{ JSON.stringify(row.original) }}
                          </TableCell>
                        </TableRow>
                      </template>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colSpan="columns.length" class="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
```

### Add the expand action to the `DataTableDropDown.vue` component

```vue:line-numbers {12-14,34-36}
<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

defineProps<{
  payment: {
    id: string
  }
}>()

defineEmits<{
  (e: 'expand'): void
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuItem @click="$emit('expand')">
        Expand
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Make rows expandable

Now we can update the action cell to add the expand control.

```vue:line-numbers {11}
<script setup lang="ts">
export const columns: ColumnDef<Payment>[] = [
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
        onExpand: row.toggleExpanded,
      }))
    },
  },
]
</script>

```

</Steps>

## Reusable Components

Here are some components you can use to build your data tables. This is from the [Tasks](/examples/tasks) demo.

### Column header

Make any column header sortable and hideable.

```vue:line-numbers
<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { type Task } from '../data/schema'
import ArrowDownIcon from '~icons/radix-icons/arrow-down'
import ArrowUpIcon from '~icons/radix-icons/arrow-up'
import CaretSortIcon from '~icons/radix-icons/caret-sort'
import EyeNoneIcon from '~icons/radix-icons/eye-none'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps {
  column: Column<Task, any>
  title: string
}

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{{ title }}</span>
          <ArrowDownIcon v-if="column.getIsSorted() === 'desc'" class="w-4 h-4 ml-2" />
          <ArrowUpIcon v-else-if=" column.getIsSorted() === 'asc'" class="w-4 h-4 ml-2" />
          <CaretSortIcon v-else class="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUpIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDownIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeNoneIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>

```

```ts:line-numbers
export const columns = [
  {
    accessorKey: "email",
    header: ({ column }) => (
        h(DataTableColumnHeader, {
            column: column,
            title: 'Email'
        })
    ),
  },
]
```

### Pagination

Add pagination controls to your table including page size and selection count.

```vue:line-numbers
<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'
import { type Task } from '../data/schema'
import ChevronLeftIcon from '~icons/radix-icons/chevron-left'
import ChevronRightIcon from '~icons/radix-icons/chevron-right'
import DoubleArrowLeftIcon from '~icons/radix-icons/double-arrow-left'
import DoubleArrowRightIcon from '~icons/radix-icons/double-arrow-right'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps {
  table: Table<Task>
}
defineProps<DataTablePaginationProps>()
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">
          Rows per page
        </p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRightIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <DoubleArrowRightIcon class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

```

```vue
<DataTablePagination :table="table" />
```

### Column toggle

A component to toggle column visibility.

```vue:line-numbers
<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { type Task } from '../data/schema'
import MixerHorizontalIcon from '~icons/radix-icons/mixer-horizontal'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps {
  table: Table<Task>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="hidden h-8 ml-auto lg:flex"
      >
        <MixerHorizontalIcon class="w-4 h-4 mr-2" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :checked="column.getIsVisible()"
        @update:checked="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

```vue
<DataTableViewOptions :table="table" />
```


# docs

## components

### date-picker.md

---
title: Date Picker
description: A date picker component with range and presets.
source: apps/www/src/lib/registry/default/example/DatePickerDemo.vue
primitive: https://www.radix-vue.com/components/calendar.html
---

<ComponentPreview name="DatePickerDemo" />

<Callout class="text-base mt-12">

If you're looking for **previous** Date Picker implementation, checkout to <span class="font-bold underline">[VCalendar Datepicker](/docs/components/v-date-picker)</span> component

</Callout>

## Installation

The Date Picker is built using a composition of the `<Popover />` and either the `<Calendar />` or `<RangeCalendar />` components.

See installations instructions for the [Popover](/docs/components/popover), [Calendar](/docs/components/calendar), and [Range Calendar](/docs/components/range-calendar) components.

## Examples

### Date Picker

<ComponentPreview name="DatePickerDemo" />

### Date Range Picker

<ComponentPreview name="DatePickerWithRange" />

### Date Range Picker with Independent Months

<ComponentPreview name="DatePickerWithIndependentMonths" />

### With Presets

<ComponentPreview name="DatePickerWithPresets" />

### Form

<ComponentPreview name="DatePickerForm" />


# docs

## components

### dialog.md

---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
source: apps/www/src/lib/registry/default/ui/dialog
primitive: https://www.radix-vue.com/components/dialog.html
---

<ComponentPreview name="DialogDemo" />

 ## Installation
```bash
npx shadcn-vue@latest add dialog
```

## Usage

```vue
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger>
      Edit Profile
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        Save changes
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

## Examples

### Custom close button

<ComponentPreview name="DialogCustomCloseButton" />

### Scroll body

<ComponentPreview name="DialogScrollBodyDemo" />

### Scroll overlay

<ComponentPreview name="DialogScrollOverlayDemo" />

## Notes

To activate the `Dialog` component from within a `Context Menu` or `Dropdown Menu`, you must encase the `Context Menu` or `Dropdown Menu` component in the `Dialog` component. For more information, refer to the linked issue [here](https://github.com/radix-ui/primitives/issues/1836).

```js:line-numbers showLineNumber{14-25}
<Dialog>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Open</ContextMenuItem>
      <ContextMenuItem>Download</ContextMenuItem>
      <DialogTrigger asChild>
        <ContextMenuItem>
          <span>Delete</span>
        </ContextMenuItem>
      </DialogTrigger>
    </ContextMenuContent>
  </ContextMenu>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Are you sure you want to permanently
        delete this file from our servers?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```


# docs

## components

### drawer.md

---
title: Drawer
description: A drawer component for vue.
source: apps/www/src/lib/registry/default/ui/drawer
primitive: https://github.com/radix-vue/vaul-vue
---

<ComponentPreview name="DrawerDemo" />

## About

Drawer is built on top of [Vaul Vue](https://github.com/radix-vue/vaul-vue).

## Installation

```bash
npx shadcn-vue@latest add drawer
```

## Usage

```vue showLineNumbers
<script setup lang="ts">
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
</script>

<template>
  <Drawer>
    <DrawerTrigger>Open</DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose>
          <Button variant="outline">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
```
### Scale Background

If you want the background to have a zoom effect, you need to add the `vaul-drawer-wrapper` attribute to the root component.

```html
<div vaul-drawer-wrapper id="app"></div>
```

## Examples

### Responsive Dialog

You can combine the `Dialog` and `Drawer` components to create a responsive dialog. This renders a `Dialog` component on desktop and a `Drawer` on mobile.

<ComponentPreview name="DrawerDialog" />


# docs

## components

### dropdown-menu.md

---
title: Dropdown Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
source: apps/www/src/lib/registry/default/ui/dropdown-menu
primitive: https://www.radix-vue.com/components/dropdown-menu.html
---

<ComponentPreview name="DropdownMenuDemo" />

## Installation

```bash
npx shadcn-vue@latest add dropdown-menu
```
## Usage

```vue
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

## Examples

### Checkboxes

<ComponentPreview name="DropdownMenuCheckboxes" />

### Radio Group

<ComponentPreview name="DropdownMenuRadioGroup" />


# docs

## components

### form.md

---
title: VeeValidate
description: Building forms with VeeValidate and Zod.
primitive: https://vee-validate.logaretm.com/v4/guide/overview/
---

Forms are tricky. They are one of the most common things you'll build in a web application, but also one of the most complex.

Well-designed HTML forms are:

- Well-structured and semantically correct.
- Easy to use and navigate (keyboard).
- Accessible with ARIA attributes and proper labels.
- Has support for client and server side validation.
- Well-styled and consistent with the rest of the application.

In this guide, we will take a look at building forms with [`vee-validate`](https://vee-validate.logaretm.com/v4/) and [`zod`](https://zod.dev). We're going to use a `<FormField>` component to compose accessible forms using Radix Vue components.

## Features

The `<Form />` component is a wrapper around the `vee-validate` library. It provides a few things:

- Composable components for building forms.
- A `<FormField />` component for building controlled form fields.
- Form validation using `zod`.
- Applies the correct `aria` attributes to form fields based on states, handle unique IDs
- Built to work with all Radix Vue components.
- Bring your own schema library. We use `zod` but you can use any other supported schema validation you want, like [`yup`](https://github.com/jquense/yup) or [`valibot`](https://valibot.dev/).
- **You have full control over the markup and styling.**

[`vee-validate`](https://vee-validate.logaretm.com/v4/) makes use of two flavors to add validation to your forms.
- Composition API
- Higher-order components (HOC)

## Anatomy

```vue
<Form>
  <FormField v-slot="{ ... }">
    <FormItem>
      <FormLabel />
      <FormControl>
        <!-- any Form Input component or native input elements -->
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</Form>
```

## Example

<TabPreview name="Component" :names="['Component', 'Native']">
<template #Component>

#### `Input` Component

```vue
<FormField v-slot="{ componentField }">
  <FormItem>
    <FormLabel>Username</FormLabel>
    <FormControl>
      <Input placeholder="shadcn" v-bind="componentField" />
    </FormControl>
    <FormDescription />
    <FormMessage />
  </FormItem>
</FormField>
```

</template>

<template #Native>

#### native `input` element

```vue
<FormField v-slot="{ field }">
  <FormItem>
    <FormLabel>Username</FormLabel>
    <FormControl>
      <input placeholder="shadcn" v-bind="field" />
    </FormControl>
    <FormDescription />
    <FormMessage />
  </FormItem>
</FormField>
```

</template>
</TabPreview>

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add form
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue vee-validate @vee-validate/zod zod
```

### Copy and paste the following codes into your project:

`index.ts`

<<< @/lib/registry/default/ui/form/index.ts

`FormItem.vue`

<<< @/lib/registry/default/ui/form/FormItem.vue

`FormLabel.vue`

<<< @/lib/registry/default/ui/form/FormLabel.vue

`FormControl.vue`

<<< @/lib/registry/default/ui/form/FormControl.vue

`FormMessage.vue`

<<< @/lib/registry/default/ui/form/FormMessage.vue

`FormDescription.vue`

<<< @/lib/registry/default/ui/form/FormDescription.vue

### Update the import paths to match your project setup.

</Steps>

</template>
</TabPreview>

## Usage

<Steps>

### Create a form schema

Define the shape of your form using a Zod schema. You can read more about using Zod in the [Zod documentation](https://zod.dev).

Use `@vee-validate/zod` to integrate Zod schema validation with `vee-validate`

`toTypedSchema` also makes the form values and submitted values typed automatically and caters for both input and output types of that schema.

```vue:line-numbers {2-3,5-7}
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))
</script>
```

### Define a form

Use the `useForm` composable from `vee-validate` or use `<Form />` component to create a form.

<TabPreview name="Composition" :names="['Composition', 'Component']">
<template #Composition>

```vue:line-numbers {2,19-21}
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form @submit="onSubmit">
    ...
  </form>
</template>
```

</template>

<template #Component>

```vue:line-numbers {5,24-26}
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

function onSubmit(values) {
  console.log('Form submitted!', values)
}
</script>

<template>
  <Form :validation-schema="formSchema" @submit="onSubmit">
    ...
  </Form>
</template>
```

</template>
</TabPreview>

### Build your form

Based on last step we can either use `<Form />` component or `useForm` composable
`useForm` is recommended because values are typed automatically

```vue:line-numbers {2}
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
```

### Done

That's it. You now have a fully accessible form that is type-safe with client-side validation.

<ComponentPreview
  name="InputForm"
  class="[&_[role=tablist]]:hidden [&>div>div:first-child]:hidden"
/>

</Steps>

## Examples

See the following links for more examples on how to use the `vee-validate` features with other components:

- [Checkbox](/docs/components/checkbox#form)
- [Date Picker](/docs/components/date-picker#form)
- [Input](/docs/components/input#form)
- [Radio Group](/docs/components/radio-group#form)
- [Select](/docs/components/select#form)
- [Slider](/docs/components/slider#form)
- [Switch](/docs/components/switch#form)
- [Textarea](/docs/components/textarea#form)
- [Combobox](/docs/components/combobox#form)

## Extras

This example shows how to add motion to your forms with [Formkit AutoAnimate](https://auto-animate.formkit.com/)

<ComponentPreview name="InputFormAutoAnimate" />


# docs

## components

### hover-card.md

---
title: Hover Card
description: For sighted users to preview content available behind a link.
source: apps/www/src/lib/registry/default/ui/hover-card
primitive: https://www.radix-vue.com/components/hover-card.html
---

<ComponentPreview name="HoverCardDemo" />

## Installation

```bash
npx shadcn-vue@latest add hover-card
```
## Usage

```vue
<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>Hover</HoverCardTrigger>
    <HoverCardContent>
      The Vue Framework – created and maintained by @vuejs.
    </HoverCardContent>
  </HoverCard>
</template>
```


# docs

## components

### input.md

---
title: Input
description: Displays a form input field or a component that looks like an input field.
---

<ComponentPreview name="InputDemo" class="max-w-xs" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add input
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project:

<<< @/lib/registry/default/ui/input/Input.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Input } from '@/components/ui/input'
</script>

<template>
  <Input />
</template>
```

## Examples

### Default

<ComponentPreview name="InputDemo" class="max-w-xs" />

### File

<ComponentPreview name="InputFile" class="max-w-xs" />

### Disabled

<ComponentPreview name="InputDisabled" class="max-w-xs" />

### With Label

<ComponentPreview name="InputWithLabel" class="max-w-xs" />

### With Button

<ComponentPreview name="InputWithButton" class="max-w-xs" />

### With Icon

<ComponentPreview name="InputWithIcon" class="max-w-xs" />

### Form

<ComponentPreview name="InputForm" />


# docs

## components

### label.md

---
title: Label
description: Renders an accessible label associated with controls.
source: apps/www/src/lib/registry/default/ui/label
primitive: https://www.radix-vue.com/components/label.html
---

<ComponentPreview name="LabelDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add label
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project:

<<< @/lib/registry/default/ui/label/Label.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Label } from '@/components/ui/label'
</script>

<template>
  <Label for="email">Your email address</Label>
</template>
```


# docs

## components

### menubar.md

---
title: Menubar
description: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
source: apps/www/src/lib/registry/default/ui/menubar
primitive: https://www.radix-vue.com/components/menubar.html
---

<ComponentPreview name="MenubarDemo" />

## Installation

```bash
npx shadcn-vue@latest add menubar
```

## Usage

```vue
<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>New Window</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Share</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Print</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```


# docs

## components

### navigation-menu.md

---
title: Navigation Menu
description: A collection of links for navigating websites.
source: apps/www/src/lib/registry/default/ui/navigation-menu
primitive: https://www.radix-vue.com/components/navigation-menu.html
---

<ComponentPreview name="NavigationMenuDemo" />

## Installation

```bash
npx shadcn-vue@latest add navigation-menu
```

## Usage

```vue
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

## Examples

### Link Component

When using the Nuxt `<NuxtLink />` component, you can use `navigationMenuTriggerStyle()` to apply the correct styles to the trigger.

```ts
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
```

```vue
<template>
  <NavigationMenuItem>
    <NuxtLink to="/docs">
      <NavigationMenuLink :class="navigationMenuTriggerStyle()">
        Documentation
      </NavigationMenuLink>
    </NuxtLink>
  </NavigationMenuItem>
</template>
```


# docs

## components

### number-field.md

---
title: Number Field
description: A number field allows a user to enter a number and increment or decrement the value using stepper buttons.
source: apps/www/src/lib/registry/default/ui/number-field
primitive: https://www.radix-vue.com/components/number-field.html
---

<ComponentPreview name="NumberFieldDemo" class="max-w-[180px]" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add number-field
```
</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/lib/registry/default/ui/number-field'
import { Label } from '@/lib/registry/default/ui/label'
</script>

<template>
  <NumberField>
    <Label>Age</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
```

## Examples

### Default

<ComponentPreview name="NumberFieldDemo" class="max-w-[180px]" />

### Disabled

<ComponentPreview name="NumberFieldDisabled" class="max-w-[180px]" />

### Decimal

<ComponentPreview name="NumberFieldDecimal" class="max-w-[180px]" />

### Percentage

<ComponentPreview name="NumberFieldPercentage" class="max-w-[180px]" />

### Currency

<ComponentPreview name="NumberFieldCurrency" class="max-w-[220px]" />

### Form

<ComponentPreview name="NumberFieldForm" class="max-w-xs" />


# docs

## components

### pagination.md

---
title: Pagination
description: Displays data in paged format and provides navigation between pages.
source: apps/www/src/lib/registry/default/ui/pagination
primitive: https://www.radix-vue.com/components/pagination.html
---

<ComponentPreview name="PaginationDemo" />

## Installation

```bash
npx shadcn-vue@latest add pagination
```

## Usage

```vue
<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

import {
  Button,
} from '@/components/ui/button'
</script>

<template>
  <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
```


# docs

## components

### pin-input.md

---
title: PIN Input
description: Allows users to input a sequence of one-character alphanumeric inputs.
source: apps/www/src/lib/registry/default/ui/pin-input
primitive: https://www.radix-vue.com/components/pin-input.html
---

<ComponentPreview name="PinInputDemo" />

## Installation

```bash
npx shadcn-vue@latest add pin-input
```

## Usage

### Controlled

<ComponentPreview name="PinInputControlled" />

### Disabled

<ComponentPreview name="PinInputDisabled" />

### Separator

<ComponentPreview name="PinInputSeparatorDemo" />

### Form

<ComponentPreview name="PinInputFormDemo" />


# docs

## components

### popover.md

---
title: Popover
description: Displays rich content in a portal, triggered by a button.
source: apps/www/src/lib/registry/default/ui/popover
primitive: https://www.radix-vue.com/components/popover.html
---

<ComponentPreview name="PopoverDemo" />

## Installation

```bash
npx shadcn-vue@latest add popover
```

## Usage

```vue
<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
</script>

<template>
  <Popover>
    <PopoverTrigger>
      Open popover
    </PopoverTrigger>
    <PopoverContent>
      Some popover content
    </PopoverContent>
  </Popover>
</template>
```


# docs

## components

### progress.md

---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
source: apps/www/src/lib/registry/default/ui/progress
primitive: https://www.radix-vue.com/components/progress.html
---

<ComponentPreview name="ProgressDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add progress
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project:

 <<< @/lib/registry/default/ui/progress/Progress.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
</script>

<template>
  <Progress :model-value="33" />
</template>
```


# docs

## components

### radio-group.md

---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
source: apps/www/src/lib/registry/default/ui/radio-group
primitive: https://www.radix-vue.com/components/radio-group.html
---

<ComponentPreview name="RadioGroupDemo" />

## Installation

```bash
npx shadcn-vue@latest add radio-group
```

## Usage

```vue
<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <RadioGroup default-value="option-one">
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="option-one" value="option-one" />
      <Label for="option-one">Option One</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="option-two" value="option-two" />
      <Label for="option-two">Option Two</Label>
    </div>
  </RadioGroup>
</template>
```

## Examples

### Form

Please first read `vee-validate` section for [Checkbox and Radio Inputs](https://vee-validate.logaretm.com/v4/examples/checkboxes-and-radio/)

<ComponentPreview name="RadioGroupForm" />


# docs

## components

### range-calendar.md

---
title: Range Calendar
description: A calendar component that allows users to select a range of dates.
source: apps/www/src/lib/registry/default/ui/range-calendar
primitive: https://www.radix-vue.com/components/range-calendar.html
---

<ComponentPreview name="RangeCalendarDemo" />

## About

The `<RangeCalendar />` component is built on top of the [RadixVue Range Calendar](https://www.radix-vue.com/components/date-range-picker.html) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

## Installation

```bash
npx shadcn-vue@latest add range-calendar
```


# docs

## components

### resizable.md

---
title: Resizable
description: Accessible resizable panel groups and layouts with keyboard support.
source: apps/www/src/lib/registry/default/ui/resizable
primitive: https://www.radix-vue.com/components/splitter.html
---

<ComponentPreview name="ResizableDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add resizable
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project:

`index.ts`

<<< @/lib/registry/default/ui/resizable/index.ts

`ResizablePanelGroup.vue`

<<< @/lib/registry/default/ui/resizable/ResizablePanelGroup.vue

`ResizableHandle.vue`

<<< @/lib/registry/default/ui/resizable/ResizableHandle.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```

## Examples

### Vertical

Use the direction prop to set the direction of the resizable panels.

<ComponentPreview name="ResizableVerticalDemo" />

```vue:line-numbers {10}
<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="vertical">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```

### Handle

You can set or hide the handle by using the withHandle prop on the ResizableHandle component.

<ComponentPreview name="ResizableHandleDemo" />

```vue:line-numbers {12}
<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```


# docs

## components

### scroll-area.md

---
title: Scroll-area
description: Augments native scroll functionality for custom, cross-browser styling.
source: apps/www/src/lib/registry/default/ui/scroll-area
primitive: https://www.radix-vue.com/components/scroll-area.html
---

<ComponentPreview name="ScrollAreaDemo" />

## Installation

```bash
npx shadcn-vue@latest add scroll-area
```
## Usage

```vue
<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
    Jokester began sneaking into the castle in the middle of the night and leaving
    jokes all over the place: under the king's pillow, in his soup, even in the
    royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
    then, one day, the people of the kingdom discovered that the jokes left by
    Jokester were so funny that they couldn't help but laugh. And once they
    started laughing, they couldn't stop.
  </ScrollArea>
</template>
```

## Examples

### Horizontal Scrolling

<ComponentPreview name="ScrollAreaHorizontalDemo" />


# docs

## components

### select.md

---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
source: apps/www/src/lib/registry/default/ui/select
primitive: https://www.radix-vue.com/components/select.html
---

<ComponentPreview name="SelectDemo" />

## Installation

```bash
npx shadcn-vue@latest add select
```

## Usage

```vue
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>

<template>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">
          Apple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
```

## Examples

### Scrollable

<ComponentPreview name="SelectScrollable" />

### Form

<ComponentPreview name="SelectForm" />


# docs

## components

### separator.md

---
title: Separator
description: Visually or semantically separates content.
source: apps/www/src/lib/registry/default/ui/separator
primitive: https://www.radix-vue.com/components/separator.html
---

<ComponentPreview name="SeparatorDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add separator
```
</template>

<template #Manual>

<Steps>

### Install the following dependency

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/separator/Separator.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <Separator label="Or" />
</template>
```


# docs

## components

### sheet.md

---
title: Sheet
description: Extends the Dialog component to display content that complements the main content of the screen.
source: apps/www/src/lib/registry/default/ui/sheet
primitive: https://www.radix-vue.com/components/dialog.html
---

<ComponentPreview name="SheetDemo" />

## Installation

```bash
npx shadcn-vue@latest add sheet
```

## Usage

```vue
<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
</script>

<template>
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
```

## Examples

### Side

Use the `side` property to `<SheetContent />` to indicate the edge of the screen where the component will appear. The values can be `top`, `right`, `bottom` or `left`.

<ComponentPreview name="SheetSideDemo" />

### Size

You can adjust the size of the sheet using CSS classes:

```vue:line-numbers {4}
<template>
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent class="w-[400px] sm:w-[540px]">
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
```


# docs

## components

### skeleton.md

---
title: Skeleton
description: Use to show a placeholder while content is loading.
---

<ComponentPreview name="SkeletonDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add skeleton
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/skeleton/Skeleton.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <Skeleton class="w-[100px] h-5 rounded-full" />
</template>
```

## Examples

### Card

<ComponentPreview name="SkeletonCard" />


# docs

## components

### slider.md

---
title: Slider
description: An input where the user selects a value from within a given range.
source: apps/www/src/lib/registry/default/ui/slider
primitive: https://www.radix-vue.com/components/slider.html
---

<ComponentPreview name="SliderDemo" />

## Installation

```bash
npx shadcn-vue@latest add slider
```

## Usage

```vue
<script setup lang="ts">
import { Slider } from '@/components/ui/slider'
</script>

<template>
  <Slider
    :default-value="[33]" :max="100" :step="1"
  />
</template>
```

## Examples

### Form

<ComponentPreview name="SliderForm" />


# docs

## components

### sonner.md

---
title: Sonner
description: An opinionated toast component for Vue.
docs: https://vue-sonner.vercel.app
source: apps/www/src/lib/registry/default/ui/sonner
---

<ComponentPreview name="SonnerDemo" />

## About

The Sonner component is provided by [vue-sonner](https://vue-sonner.vercel.app/), which is a Vue port of Sonner, originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

## Installation

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add sonner
```

### Add the Toaster component

Add the following `Toaster` component to your `App.vue` file:

```vue title="App.vue" {2,6}
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <Toaster />
</template>
```

</Steps>

## Usage

```vue
<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast('Event has been created', {
        description: 'Sunday, December 03, 2023 at 9:00 AM',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      })
    }"
  >
    Add to calendar
  </Button>
</template>
```

## Examples

### Sonner with Dialog

Related issue https://github.com/radix-vue/shadcn-vue/issues/462

Add `pointer-events-auto` class to Toaster component in your `App.vue` file:

```vue {6}
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <Toaster class="pointer-events-auto" />
</template>
```

<ComponentPreview name="SonnerWithDialog" />


# docs

## components

### switch.md

---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
source: apps/www/src/lib/registry/default/ui/switch
primitive: https://www.radix-vue.com/components/switch.html
---

<ComponentPreview name="SwitchDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add switch
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

 <<< @/lib/registry/default/ui/switch/Switch.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
</script>

<template>
  <Switch />
</template>
```

## Examples

### Form

<ComponentPreview name="SwitchForm" />


# docs

## components

### table.md

---
title: Table
description: A responsive table component.
---

<ComponentPreview name="TableDemo" />

## Installation

```bash
npx shadcn-vue@latest add table
```

## Usage

```vue
<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Invoice
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">
          Amount
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium">
          INV001
        </TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell class="text-right">
          $250.00
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

## Data Table

You can use the `<Table />` component to build more complex data tables. Combine it with [@tanstack/vue-table](https://tanstack.com/table/v8) to create tables with sorting, filtering and pagination.

See the [Data Table](/docs/components/data-table) documentation for more information.

You can also see an example of a data table in the [Tasks](/examples/tasks) demo.


# docs

## components

### tabs.md

---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
source: apps/www/src/lib/registry/default/ui/tabs
primitive: https://www.radix-vue.com/components/tabs.html
---

<ComponentPreview name="TabsDemo" />

## Installation

```bash
npx shadcn-vue@latest add tabs
```

## Usage

```vue
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<template>
  <Tabs default-value="account" class="w-[400px]">
    <TabsList>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">
      Change your password here.
    </TabsContent>
  </Tabs>
</template>
```


# docs

## components

### tags-input.md

---
title: Tags Input
description: Tag inputs render tags inside an input, followed by an actual text input.
source: apps/www/src/lib/registry/default/ui/tags-input
primitive: https://www.radix-vue.com/components/tags-input.html
---

<ComponentPreview name="TagsInputDemo" />

## Installation

```bash
npx shadcn-vue@latest add tags-input
```

## Usage

### Tags with Combobox

<ComponentPreview name="TagsInputComboboxDemo" />


# docs

## components

### textarea.md

---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
---

<ComponentPreview name="TextareaDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add textarea
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/textarea/Textarea.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <Textarea />
</template>
```

## Examples

### Default

<ComponentPreview name="TextareaDemo" />

### Disabled

<ComponentPreview name="TextareaDisabled" />

### With Label

<ComponentPreview name="TextareaWithLabel"   />

### With Text

<ComponentPreview name="TextareaWithText" />

### With Button

<ComponentPreview name="TextareaWithButton" />

### Form

<ComponentPreview name="TextareaForm" />


# docs

## components

### toast.md

---
title: Toast
description: A succinct message that is displayed temporarily.
source: apps/www/src/lib/registry/default/ui/toast
primitive: https://www.radix-vue.com/components/toast.html
---

<ComponentPreview name="ToastDemo" />

## Installation

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add toast
```

### Add the Toaster component

Add the following `Toaster` component to your `App.vue` file:

```vue title="App.vue" {2,6}
<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <Toaster />
</template>
```

</Steps>

## Usage

The `useToast` hook returns a `toast` function that you can use to display a toast.

```tsx
import { useToast } from '@/components/ui/toast/use-toast'
```

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const { toast } = useToast()
</script>

<template>
  <Toaster />
  <Button
    @click="() => {
      toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      });
    }"
  >
    Add to calendar
  </Button>
</template>
```

<Callout>

To display multiple toasts at the same time, you can update the `TOAST_LIMIT` in `use-toast.ts`.

</Callout>

## Examples

### Simple

<ComponentPreview name="ToastSimple" />

### With Title

<ComponentPreview name="ToastWithTitle" />

### With Action

<ComponentPreview name="ToastWithAction" />

### Destructive

Use `toast({ variant: "destructive" })` to display a destructive toast.

<ComponentPreview name="ToastDestructive" />


# docs

## components

### toggle-group.md

---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
source: apps/www/src/lib/registry/default/ui/toggle-group
primitive: https://www.radix-vue.com/components/toggle-group.html
---

<ComponentPreview name="ToggleGroupDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add toggle-group
```
</template>

<template #Manual>

<Steps>

### Install the following dependencies:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/toggle-group/ToggleGroup.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
</script>

<template>
  <ToggleGroup type="single">
    <ToggleGroupItem value="a">
      A
    </ToggleGroupItem>
    <ToggleGroupItem value="b">
      B
    </ToggleGroupItem>
    <ToggleGroupItem value="c">
      C
    </ToggleGroupItem>
  </ToggleGroup>
</template>
```

## Examples

### Default

<ComponentPreview name="ToggleGroupDemo" />

### Outline

<ComponentPreview name="ToggleGroupOutlineDemo" />

### Single

<ComponentPreview name="ToggleGroupSingleDemo" />

### Small

<ComponentPreview name="ToggleGroupSmallDemo" />

### Large

<ComponentPreview name="ToggleGroupLargeDemo" />

### Disabled

<ComponentPreview name="ToggleGroupDisabledDemo" />


# docs

## components

### toggle.md

---
title: Toggle
description: A two-state button that can be either on or off.
source: apps/www/src/lib/registry/default/ui/toggle
primitive: https://www.radix-vue.com/components/toggle.html
---

<ComponentPreview name="ToggleDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add toggle
```
</template>

<template #Manual>

<Steps>

### Install the following dependencies:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/toggle/Toggle.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle'
</script>

<template>
  <Toggle>Toggle</Toggle>
</template>
```

## Examples

### Default

<ComponentPreview name="ToggleDemo" />

### Outline

<ComponentPreview name="ToggleItalicDemo" />

### With Text

<ComponentPreview name="ToggleItalicWithTextDemo" />

### Small

<ComponentPreview name="ToggleSmallDemo" />

### Large

<ComponentPreview name="ToggleLargeDemo" />

### Disabled

<ComponentPreview name="ToggleDisabledDemo" />


# docs

## components

### tooltip.md

---
title: Tooltip
description: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
source: apps/www/src/lib/registry/default/ui/tooltip
primitive: https://www.radix-vue.com/components/tooltip.html
---

<ComponentPreview name="TooltipDemo" />

## Installation

```bash
npx shadcn-vue@latest add tooltip
```

## Usage

```vue
<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```


# docs

## components

### v-calendar.md

---
title: VCalendar
description: A date field component that allows users to enter and edit date.
source: apps/www/src/lib/registry/default/ui/calendar
primitive: https://vcalendar.io/
---

<ComponentPreview name="VCalendarDemo" />

## About

The `Calendar` component is built on top of [VCalendar](https://vcalendar.io/getting-started/installation.html).

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add v-calendar
```
</template>

<template #Manual>

<Steps>

### Install the following dependency

```bash
npm install v-calendar
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/v-calendar/Calendar.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Calendar } from '@/components/ui/v-calendar'
</script>

<template>
  <Calendar />
</template>
```

The API is essentially the same, i.e. props and slots. See the [VCalendar](https://vcalendar.io/getting-started/installation.html) documentation for more information.

### Slots

The slots available are [those currently supported](https://github.com/nathanreyes/v-calendar/blob/v3.1.2/src/components/Calendar/CalendarSlot.vue#L16-L28) by VCalendar, namely :

- `day-content`
- `day-popover`
- `dp-footer`
- `footer`
- `header-title-wrapper`
- `header-title`
- `header-prev-button`
- `header-next-button`
- `nav`
- `nav-prev-button`
- `nav-next-button`
- `page`
- `time-header`

Example using the `day-content` slot:

```vue
<script setup lang="ts">
import { Calendar } from '@/components/ui/v-calendar'
</script>

<template>
  <Calendar>
    <template #day-content="{ day, dayProps, dayEvents }">
      <div v-bind="dayProps" v-on="dayEvents">
        {{ day.label }}
      </div>
    </template>
  </Calendar>
</template>
```


# docs

## components

### v-date-picker.md

---
title: VCalendar Date Picker
description: A date picker component with range and presets.
---

<ComponentPreview name="VDatePickerDemo"  />

## Installation

The Date Picker is built using a composition of the `<Popover />` and the `<Calendar />` components.

See installation instructions for the [Popover](/docs/components/popover#installation) and the [Calendar](/docs/components/calendar#installation) components.

## Usage

```vue
<script setup lang="ts">
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/v-calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const date = ref<Date>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        :variant="'outline'"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !date && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ date ? format(date, "PPP") : "Pick a date" }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="date" />
    </PopoverContent>
  </Popover>
</template>
```

## Examples

### Date Picker

<ComponentPreview name="VDatePickerDemo"  />

### Date Range Picker

<ComponentPreview name="VDatePickerWithRange"  />

### Date Time Picker

<ComponentPreview name="VDateTimePickerDemo"  />

### With Presets

<ComponentPreview name="VDatePickerWithPresets"  />

### With Slot

<ComponentPreview name="VRangePickerWithSlot"  />

### Form

<ComponentPreview name="VDatePickerForm"  />


# docs

## contribution.md

---
title: Contribution
description: Learn on how to contribute to shadcn/vue.
---
<script setup lang="ts">
import { Button } from "@/lib/registry/new-york/ui/button"

const latestSyncCommitTag = "06cc0cdf3d080555d26abbe6639f2d7f6341ec73"

const latestSyncCommitUrl = `https://github.com/shadcn-ui/ui/commit/${latestSyncCommitTag}`
const diffUrl = `https://github.com/shadcn-ui/ui/compare/${latestSyncCommitTag}...main`
</script>

## Introduction

Thanks for your interest in contributing to shadcn-vue.com. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to the core team on [Discord](https://chat.radix-vue.com/).

This guide provides detailed information to help new contributors.

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.

## Project Structure

The GitHub repository consists of the several folders. here's a quick view.

<VPImage
    alt="folder-structure"
    class="block" :image="{
        dark: '/diagrams/structure-dark.svg',
        light: '/diagrams/structure-light.svg',
    }"
/>

1. **packages** -
Contains source code for supporting `nuxt` as a module and the `cli` to add new components.

2. **apps/www** -
The main folder that holds the source code for the website and every `shadcn/vue` component. This folder contains important sub-folders and is a subproject with its own `package.json`.

3. **.vitepress** -
Contains the configuration and source code for `vitepress` and the `shadcn/vue` website.

4. **src** -
Hosts the main source code for every `shadcn/vue` component or demo and their documentation on the website.

5. **\_\_registry\_\_** -
Holds the registry file generated by `scripts/build-registry.ts` to serve components for the `cli`. This folder's content is auto-generated and should not be edited manually.

6. **scripts** -
Contains various helper scripts, such as `build-registry.ts`, which automatically generates the `__registry__` folder.

7. **content** -
This folder holds all the documentation for the `/docs` route. Each component has one `.md` file documenting the installation and usage of the component.

8. **examples** -
Holds all examples not part of `/docs`, like the [main page](/).

9. **lib/registry** -
The main folder hosts the source code for different styles of every component. This is likely the main folder you'll be changing.

We support two different styles for every component in `shadcn/vue`:

1. Default
2. New York

Every component added to the repository must support both versions, including the main source code and associated demos.

When adding or modifying components, please ensure that:

1. You make the changes for every style.
2. You update the documentation.
3. You run `pnpm build:registry` to update the registry.

## Development

Start by cloning the repository:

```bash
git clone git@github.com:radix-vue/shadcn-vue.git
```

### Install dependencies

```bash
pnpm install
```

### Run a workspace

You can use the `pnpm --filter=[WORKSPACE]` command to start the development process for a workspace or some of the shortcut command that we have setup.

#### Examples

1. To run the `shadcn-vue.com` website:

```
pnpm dev
```

2. To run the `shadcn-vue` cli package:

```
pnpm dev:cli
```

## Documentation

The documentation for this project is located in the `www` workspace. You can run the documentation locally by running the following command:

```bash
pnpm dev
```

Documentation is written using [md](https://vitepress.dev/guide/markdown). You can find the documentation files in the `apps/www/src/content` directory.

## CLI

The `shadcn-vue` package is a CLI for adding components to your project. You can find the documentation for the CLI [here](https://shadcn-vue.com/docs/cli).

Any changes to the CLI should be made in the `packages/cli` directory. If you can, it would be great if you could add tests for your changes.

## Testing

Tests are written using [Vitest](https://vitest.dev). You can run all the tests from the root of the repository.

```bash
pnpm test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit [Conventional Commits](https://www.conventionalcommits.org/).

## SFC - Single File Components

Multiple components are integrated into one file in `shadcn/ui` - the React version of `shadcn` - while Vue only supports one component per file, hence the name Single File Component (SFC). In such cases, you need to create separate files for each component part and then export them all in an `index.ts` file.

See the [`Accordion`](https://github.com/radix-vue/shadcn-vue/tree/v0.10.2/apps/www/src/lib/registry/default/ui/accordion) source code as an example.

## Wrapping Radix-Vue Components

[Radix-Vue](https://www.radix-vue.com) hosts many low-level UI components that are used to build reusable components.
There are many cases that you need to wrap `Radix-Vue` components.

### Props & Events
All of the `Radix-Vue` compoennts expose their prop and emit types. We need to forward any props/events that are coming from outside to the `Radix-Vue` component.

To do so, we have a helper function named [`useForwardPropsEmits`](https://www.radix-vue.com/utilities/use-forward-props-emits.html) that combines props and events that must be binded to the child radix component.

To be more clear, the function `useForwardPropsEmits` takes in props and an optional emit function, and returns a
computed object that combines the parsed props and emits as props.

Here's an example from `Accordion` root component.

```vue
<script setup lang="ts">
import {
  AccordionRoot,
  type AccordionRootEmits,
  type AccordionRootProps,
  useForwardPropsEmits,
} from 'radix-vue'

const props = defineProps<AccordionRootProps>()
const emits = defineEmits<AccordionRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AccordionRoot v-bind="forwarded">
    <slot />
  </AccordionRoot>
</template>
```

As you can see, `AccordionRootEmits` and `AccordionRootProps` types are imported from radix, combined with `useForwardPropsEmits` and then are binded using `v-bind` syntax.

### CSS Classes
There are cases when we want to accept `class` as a prop in our `shadcn/vue` component and then combine it with a default tailwind class on our `radix-vue` component via `cn` utility function.

In these cases, we can not use `v-bind`, because this would lead in [double class binding](https://github.com/radix-vue/shadcn-vue/pull/241).

Take a look at `DrawerDescription.vue`.

```vue
<script lang="ts" setup>
import type { DrawerDescriptionProps } from 'vaul-vue'
import { DrawerDescription } from 'vaul-vue'
import { type HtmlHTMLAttributes, computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<DrawerDescriptionProps & { class?: HtmlHTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DrawerDescription v-bind="delegatedProps" :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </DrawerDescription>
</template>
```

As you can see, we have created a computed property named `delegatedProps` to remove `class` from props, and only then bind
the returned value to our radix component (`DrawerDescription` in this case).

As for our class, we first declared it as type of `HtmlHTMLAttributes['class']` and used `cn` to merge tailwind classes from `class` prop and our own classes.

This pattern only needs to be applied when the `cn` utility is required. For instances where there are no default Tailwind classes that need to be merged with user-provided classes, this pattern is not necessary. A good example of this is the `SelectValue.vue` component.

```vue
<script setup lang="ts">
import { SelectValue, type SelectValueProps } from 'radix-vue'

const props = defineProps<SelectValueProps>()
</script>

<template>
  <SelectValue v-bind="props">
    <slot />
  </SelectValue>
</template>
```

### Boolean Props
When you are building a wrapper for a component, in some cases you want to ignore Vue [Props Boolean Casting](https://vuejs.org/guide/components/props.html#boolean-casting).
You can either set default value as undefined for all the boolean field, or you can use [`useForwardProps`](https://www.radix-vue.com/utilities/use-forward-props.html) composable.

Take a look at `AccordionItem.vue`

```vue
<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AccordionItem, type AccordionItemProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AccordionItem
    v-bind="forwardedProps"
    :class="cn('border-b', props.class)"
  >
    <slot />
  </AccordionItem>
</template>
```

Since `AccordionItemProps` type has atleast one boolean property, we need to use `useForwardProps` on the entire props object.

Note that `useForwardPropsEmits` use `useForwardProps` under the hood.

### Component as Root
Whenever your root component is a `Component` Primitive from vue, it's easier to use [`Primitive`](https://www.radix-vue.com/utilities/primitive.html) instead.

Let's take a look at `Button.vue`

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
```

You'll need to extend `PrimitiveProps` in your props to support `Primitive` component. In most cases you would also need a default value for [`as`](https://www.radix-vue.com/utilities/primitive.html#changing-as-value) property.

## Updating with `shadcn/ui`

`shadcn/vue` is an unofficial, community-led Vue port of `shadcn/ui`, as time goes by, they might get out of sync.

As of today, we are in sync with this <a :href="latestSyncCommitUrl" target="_blank">commit</a> of `shadcn/ui`.

Click on the following link to check if there are newer commits that we should be synced with.

<div class="text-center">
  <a :href="diffUrl" target="_blank">
    <Button>
      Check Diff
    </Button>
  </a>
</div>

1. There are no changes - If you see "There isn’t anything to compare", nothing needs to be done as we are synced with latest version.
2. If there are changes, you should review thoese changes and try to apply them on `shadcn/vue` codebase and create a PR, remember to update the `latestSyncCommitTag` in [this file](https://github.com/radix-vue/shadcn-vue/blob/dev/apps/www/src/content/docs/contribution.md) too.

## Debugging
Here are some tools and techniques that can help you debug more effectively while contributing to `shadcn/vue` or developing your own projects.

### Install Vue Dev Tools
To easily inspect component props, attributes, events, and more, you can leverage the  [`Vue DevTools`](https://devtools.vuejs.org/)  extension for browsers. This extension provides a user-friendly interface for debugging Vue components and can improve your development experience.

### Enable Custom Formmaters
Vue wraps values stored in a `ref` in a way that, when logged, results in a nested object and requires manual inspection to access the value stored in the ref.

You can enable Custom Formatters in your browser to automate this process.

- [Firefox](https://firefox-source-docs.mozilla.org/devtools-user/custom_formatters/index.html)
- Chrome, Edge, Brave and other Chromium based [browsers](https://www.google.com/search?q=how+to+enable+custom++formatter+chrome)


# docs

## dark-mode.md

---
title: Dark Mode
description: Adding dark mode to your site.
---

<script setup>
  import { useData } from 'vitepress'
  const { isDark } = useData()
  import ViteIcon from '~icons/simple-icons/vite'
  import NuxtIcon from '~icons/simple-icons/nuxtdotjs'
  import AstroIcon from '~icons/simple-icons/astro'
</script>

<div class="grid gap-4 mt-8 sm:grid-cols-2 sm:gap-6 not-docs">
  <LinkedCard href="/docs/dark-mode/vite">
    <ViteIcon class="w-10 h-10" />
    <p class="mt-2 font-medium">Vite</p>
  </LinkedCard>

  <LinkedCard href="/docs/dark-mode/nuxt">
    <NuxtIcon class="w-10 h-10" />
    <p class="mt-2 font-medium">Nuxt</p>
  </LinkedCard>

  <LinkedCard href="/docs/dark-mode/vitepress">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.03628 7.87818C4.75336 5.83955 6.15592 3.95466 8.16899 3.66815L33.6838 0.0367403C35.6969 -0.24977 37.5581 1.1706 37.841 3.20923L42.9637 40.1218C43.2466 42.1604 41.8441 44.0453 39.831 44.3319L14.3162 47.9633C12.3031 48.2498 10.4419 46.8294 10.159 44.7908L5.03628 7.87818Z" />
      <path d="M6.85877 7.6188C6.71731 6.59948 7.41859 5.65703 8.42512 5.51378L33.9399 1.88237C34.9465 1.73911 35.8771 2.4493 36.0186 3.46861L41.1412 40.3812C41.2827 41.4005 40.5814 42.343 39.5749 42.4862L14.0601 46.1176C13.0535 46.2609 12.1229 45.5507 11.9814 44.5314L6.85877 7.6188Z" class="fill-background"/>
      <path d="M33.1857 14.9195L25.8505 34.1576C25.6991 34.5547 25.1763 34.63 24.9177 34.2919L12.3343 17.8339C12.0526 17.4655 12.3217 16.9339 12.7806 16.9524L22.9053 17.3607C22.9698 17.3633 23.0344 17.3541 23.0956 17.3337L32.5088 14.1992C32.9431 14.0546 33.3503 14.4878 33.1857 14.9195Z" />
      <path d="M27.0251 12.5756L19.9352 15.0427C19.8187 15.0832 19.7444 15.1986 19.7546 15.3231L20.3916 23.063C20.4066 23.2453 20.5904 23.3628 20.7588 23.2977L22.7226 22.5392C22.9064 22.4682 23.1021 22.6138 23.0905 22.8128L22.9102 25.8903C22.8982 26.0974 23.1093 26.2436 23.295 26.1567L24.4948 25.5953C24.6808 25.5084 24.892 25.6549 24.8795 25.8624L24.5855 30.6979C24.5671 31.0004 24.9759 31.1067 25.1013 30.8321L25.185 30.6487L29.4298 17.8014C29.5008 17.5863 29.2968 17.3809 29.0847 17.454L27.0519 18.1547C26.8609 18.2205 26.6675 18.0586 26.6954 17.8561L27.3823 12.8739C27.4103 12.6712 27.2163 12.5091 27.0251 12.5756Z" class="stroke-background"/>
    </svg>
    <p class="mt-2 font-medium">Vitepress</p>
  </LinkedCard>

  <LinkedCard href="/docs/dark-mode/astro">
    <AstroIcon class="w-10 h-10" />
    <p class="mt-2 font-medium">Astro</p>
  </LinkedCard>
</div>


# docs

## dark-mode

### astro.md

---
title: Astro
description: Adding dark mode to your astro app.
---

## Dark mode

<Steps>

### Create an inline theme script

```astro title="src/pages/index.astro"
---
import '../styles/globals.css'
---

<script is:inline>
	const getThemePreference = () => {
		if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
			return localStorage.getItem('theme');
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};
	const isDark = getThemePreference() === 'dark';
	document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

	if (typeof localStorage !== 'undefined') {
		const observer = new MutationObserver(() => {
			const isDark = document.documentElement.classList.contains('dark');
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
	}
</script>

<html lang="en">
	<body>
      <h1>Astro</h1>
	</body>
</html>
</script>
```

### Install Dependencies

```bash
npm install @vueuse/core
```

Optional, to include icons for theme button.
```bash
npm install -D @iconify/vue @iconify-json/radix-icons
```

### Add a mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

We're using [`useColorMode`](https://vueuse.org/core/usecolormode/) from [`@vueuse/core`](https://vueuse.org/core/).
> Reactive color mode (dark / light / customs) with auto data persistence.

```vue
<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const mode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Display the mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

```astro title="src/pages/index.astro"
---
import '../styles/globals.css'
import { ModeToggle } from '@/components/ModeToggle.vue';
---

<!-- Inline script -->

<html lang="en">
	<body>
      <h1>Astro</h1>
      <ModeToggle client:load />
	</body>
</html>
```

</Steps>


# docs

## dark-mode

### nuxt.md

---
title: Nuxt
description: Adding dark mode to your nuxt app.
---

## Dark mode

<Steps>

### Install Dependencies

```bash
npm install -D @nuxtjs/color-mode
```

Then, add `@nuxtjs/color-mode` to the modules section of your `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: ''
  }
})
```

Optional, to include icons for theme button.
```bash
npm install -D @iconify/vue @iconify-json/radix-icons
```

### Add a mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

We're using [`useColorMode`](https://color-mode.nuxtjs.org/#usage) from [`Nuxt Color Mode`](https://color-mode.nuxtjs.org/).

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const colorMode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="colorMode.preference = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'system'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

</Steps>


# docs

## dark-mode

### vite.md

---
title: Vite
description: Adding dark mode to your vite app.
---

## Dark mode

<Steps>

### Install Dependencies

```bash
npm install @vueuse/core
```

Optional, to include icons for theme button.
```bash
npm install -D @iconify/vue @iconify-json/radix-icons
```

### Add a mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

We're using [`useColorMode`](https://vueuse.org/core/usecolormode/) from [`@vueuse/core`](https://vueuse.org/core/).
> Reactive color mode (dark / light / customs) with auto data persistence.

```vue
<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const mode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

</Steps>


# docs

## dark-mode

### vitepress.md

---
title: Vitepress
description: Adding dark mode to your vitepress app.
---

## Dark mode

<Steps>

### Install Dependencies

```bash
npm install @vueuse/core
```

Optional, to include icons for theme button.
```bash
npm install -D @iconify/vue @iconify-json/radix-icons
```

### Add a mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

We're using [`useToggle`](https://vueuse.org/shared/useToggle/) from [`@vueuse/core`](https://vueuse.org/core/).
> A boolean switcher with utility functions.

```vue
<script setup lang="ts">
import { useData } from 'vitepress'
import { useToggle } from '@vueuse/core'
import { Button } from '@/lib/registry/default/ui/button'

const { frontmatter, isDark } = useData()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Button variant="outline">
    <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
```

</Steps>


# docs

## figma.md

---
title: Figma
description: Every component recreated in Figma. With customizable props, typography and icons.
---

<script setup>
import { AspectRatio } from '@/lib/registry/default/ui/aspect-ratio';
</script>

The Figma UI Kit is open sourced by [Pietro Schirano](https://twitter.com/skirano).

<AspectRatio :ratio="16 / 9" class="w-full mt-4">
  <iframe
    src="https://embed.figma.com/file/1203061493325953101/hf_embed?community_viewer=true&embed_host=shadcn&hub_file_id=1203061493325953101&kind=&viewer=1"
    class="h-full w-full overflow-hidden rounded-lg border bg-muted"
  />
</AspectRatio>

## Grab a copy

<div class="break-words">

https://www.figma.com/community/file/1203061493325953101

</div>


# docs

## installation.md

---
title: Installation
description: How to install dependencies and structure your app.
---

## Frameworks

<div class="grid gap-4 mt-8 sm:grid-cols-2 sm:gap-6 not-docs">
  <LinkedCard href="/docs/installation/vite">
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="w-10 h-10"
      fill="currentColor"
    >
      <title>Vite</title>
      <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z" />
    </svg>
    <p class="mt-2 font-medium">Vite</p>
  </LinkedCard>
  <LinkedCard href="/docs/installation/nuxt">
    <svg xmlns="http://www.w3.org/2000/svg"  class="w-12 h-12" viewBox="0 0 900 900" fill="none">
    <title>Nuxt</title>
    <path d="M504.908 750H839.476C850.103 750.001 860.542 747.229 869.745 741.963C878.948 736.696 886.589 729.121 891.9 719.999C897.211 710.876 900.005 700.529 900 689.997C899.995 679.465 897.193 669.12 891.873 660.002L667.187 274.289C661.876 265.169 654.237 257.595 645.036 252.329C635.835 247.064 625.398 244.291 614.773 244.291C604.149 244.291 593.711 247.064 584.511 252.329C575.31 257.595 567.67 265.169 562.36 274.289L504.908 372.979L392.581 179.993C387.266 170.874 379.623 163.301 370.42 158.036C361.216 152.772 350.777 150 340.151 150C329.525 150 319.086 152.772 309.883 158.036C300.679 163.301 293.036 170.874 287.721 179.993L8.12649 660.002C2.80743 669.12 0.00462935 679.465 5.72978e-06 689.997C-0.00461789 700.529 2.78909 710.876 8.10015 719.999C13.4112 729.121 21.0523 736.696 30.255 741.963C39.4576 747.229 49.8973 750.001 60.524 750H270.538C353.748 750 415.112 713.775 457.336 643.101L559.849 467.145L614.757 372.979L779.547 655.834H559.849L504.908 750ZM267.114 655.737L120.551 655.704L340.249 278.586L449.87 467.145L376.474 593.175C348.433 639.03 316.577 655.737 267.114 655.737Z" fill="currentColor"/>
    </svg>
    <p class="mt-2 font-medium">Nuxt</p>
  </LinkedCard>
  <LinkedCard href="/docs/installation/astro">
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="w-10 h-10"
      fill="currentColor"
    >
      <title>Astro</title>
      <path
        d="M16.074 16.86C15.354 17.476 13.917 17.895 12.262 17.895C10.23 17.895 8.527 17.263 8.075 16.412C7.914 16.9 7.877 17.458 7.877 17.814C7.877 17.814 7.771 19.564 8.988 20.782C8.988 20.15 9.501 19.637 10.133 19.637C11.216 19.637 11.215 20.582 11.214 21.349V21.418C11.214 22.582 11.925 23.579 12.937 24C12.7812 23.6794 12.7005 23.3275 12.701 22.971C12.701 21.861 13.353 21.448 14.111 20.968C14.713 20.585 15.383 20.161 15.844 19.308C16.0926 18.8493 16.2225 18.3357 16.222 17.814C16.2221 17.4903 16.1722 17.1685 16.074 16.86ZM15.551 0.6C15.747 0.844 15.847 1.172 16.047 1.829L20.415 16.176C18.7743 15.3246 17.0134 14.7284 15.193 14.408L12.35 4.8C12.3273 4.72337 12.2803 4.65616 12.2162 4.60844C12.152 4.56072 12.0742 4.53505 11.9943 4.53528C11.9143 4.5355 11.8366 4.56161 11.7727 4.60969C11.7089 4.65777 11.6623 4.72524 11.64 4.802L8.83 14.405C7.00149 14.724 5.23264 15.3213 3.585 16.176L7.974 1.827C8.174 1.171 8.274 0.843 8.471 0.6C8.64406 0.385433 8.86922 0.218799 9.125 0.116C9.415 0 9.757 0 10.443 0H13.578C14.264 0 14.608 0 14.898 0.117C15.1529 0.219851 15.3783 0.386105 15.551 0.6Z"
        fill="currentColor"
      />
    </svg>
    <p class="mt-2 font-medium">Astro</p>
  </LinkedCard>
  <LinkedCard href="/docs/installation/laravel">
    <svg
      role="img"
      viewBox="0 0 62 65"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      class="w-10 h-10"
    >
      <path d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z" />
    </svg>
    <p class="mt-2 font-medium">Laravel</p>
  </LinkedCard>
</div>

## TypeScript

This project and the components are written in TypeScript. We recommend using TypeScript for your project as well.

However we provide a JavaScript version of the components as well. The JavaScript version is available via the [cli](/docs/cli).

To opt-out of TypeScript, you can use the `typescript` flag in your `components.json` file.

```json {9} title="components.json"
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "typescript": false,
  "aliases": {
    "utils": "~/lib/utils",
    "components": "~/components"
  }
}
```

To configure import aliases, you can use the following `jsconfig.json`:

```json {4} title="jsconfig.json"
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## VSCode extension

Install the [shadcn-vue](https://marketplace.visualstudio.com/items?itemName=Selemondev.shadcn-vue) extension by [@selemondev](https://github.com/selemondev) in Visual Studio Code to easily add Shadcn Vue components to your project.

This extension offers a range of features:
- Ability to initialize the Shadcn Vue CLI
- Install components
- Open documentation
- Navigate to a specific component's documentation page directly from your IDE.
- Handy snippets for quick and straightforward component imports and markup.


# docs

## installation

### astro.md

---
title: Astro
description: Install and configure Astro.
---

<Steps>

### Create project

Start by creating a new Astro project:

```bash
npm create astro@latest
```

### Configure your Astro project

You will be asked a few questions to configure your project:

```txt:line-numbers
- Where should we create your new project?
./your-app-name
- How would you like to start your new project?
Choose a starter template (or Empty)
- Install dependencies?
Yes
- Do you plan to write TypeScript?
Yes
- How strict should TypeScript be?
Strict
- Initialize a new git repository? (optional)
Yes/No
```

### Add Vue to your project

Install Vue using the Astro CLI:

```bash
npx astro add vue
```

<Callout class="mt-4">

Answer `Yes` to all the question prompted by the CLI when installing Vue.

</Callout>

This will install `vue` and `@astrojs/vue` as dependencies and automatically set them up in the `astro.config.mjs` file.

### Install TypeScript

If you encounter the error `Cannot find module 'typescript'`, please proceed to install TypeScript as a dev dependency, as discussed [here](https://github.com/radix-vue/shadcn-vue/pull/118)

```bash
npm install -D typescript
```

### Add Tailwind CSS to your project

Install Tailwind CSS using the Astro CLI:

```bash
npx astro add tailwind
```

<Callout class="mt-4">

Answer `Yes` to all the question prompted by the CLI when installing Tailwind CSS.

</Callout>

This will install `tailwindcss` and `@astrojs/tailwind` as dependencies and set them up in your `astro.config.mjs` file. It will also create a `tailwind.config.mjs` file with the needed configurations.

### Edit tsconfig.json file

Add the code below to the tsconfig.json file to resolve paths:

```json:line-numbers {2-7}
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Run the CLI

Run the `shadcn-vue` init command to setup your project:

```bash
npx shadcn-vue@latest init
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt:line-numbers
Would you like to use TypeScript (recommended)? no / yes
Which framework are you using? Astro
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your tsconfig.json or jsconfig.json file? › ./tsconfig.json
Where is your global CSS file? › src/styles/globals.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config located? › tailwind.config.mjs
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Write configuration to components.json. Proceed? > Y/n
```

### Import the globals.css file

Import the `globals.css` file in the `src/index.astro` file:

```ts:line-numbers {2}
---
import '@/styles/globals.css'
---
```

### Update astro tailwind config

To prevent serving the Tailwind base styles twice, we need to tell Astro not to apply the base styles, since we already include them in our own `globals.css` file. To do this, set the `applyBaseStyles` config option for the tailwind plugin in `astro.config.mjs` to `false`.

```ts:line-numbers {3-5}
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
```

### That's it

You can now start adding components to your project.

```bash
npx shadcn-vue@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```astro:line-numbers {2,10}
---
import { Button } from "@/components/ui/button"
---

<html lang="en">
 <head>
  <title>Astro</title>
 </head>
 <body>
  <Button>Hello World</Button>
 </body>
</html>
```

</Steps>


# docs

## installation

### laravel.md

---
title: Laravel
description: Install and configure Laravel with Inertia
---

<Steps>

### Create project

Start by creating a new Laravel project with Inertia and Vue using the Laravel installer `laravel new my-app`:

```bash
laravel new my-app --typescript --breeze --stack=vue --git --no-interaction
```

### Run the CLI

Run the `shadcn-vue` init command to setup your project:

```bash
npx shadcn-vue@latest init
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt:line-numbers
Would you like to use TypeScript (recommended)? no / yes
Which framework are you using? Vite / Nuxt / Laravel
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your tsconfig.json or jsconfig.json file? › ./tsconfig.json
Where is your global CSS file? › resources/css/app.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/Components
Configure the import alias for utils: › @/lib/utils
Write configuration to components.json. Proceed? > Y/n
```

### Update tailwind.config.js

The `shadcn-vue` CLI will automatically overwrite your `tailwind.config.js`. Update it to look like this:

```js
import forms from '@tailwindcss/forms'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{ts,tsx,vue}',
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },

  plugins: [forms, require('tailwindcss-animate')],
}
```

### That's it

You can now start adding components to your project.

```bash
npx shadcn-vue@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```vue {2,7}
<script setup lang="ts">
import { Button } from '@/Components/ui/button'
</script>

<template>
  <div>
    <Button>Click me</Button>
  </div>
</template>
```

</Steps>


# docs

## installation

### nuxt.md

---
title: Nuxt
description: Install and configure Nuxt.
---

<Steps>

### Create project

Start by creating a new Nuxt project using `create-nuxt-app`:

```bash
npx nuxi@latest init my-app
```

### Install TypeScript

If you encounter the error `ERROR: Cannot read properties of undefined (reading 'sys') (x4)`, please proceed to install TypeScript as a dependency, as advised in this [issue](https://github.com/nuxt/nuxt/issues/20936)

```bash
npm install -D typescript
```

### Install TailwindCSS module

```bash
npx nuxi@latest module add @nuxtjs/tailwindcss
```

### Add `Nuxt` module

<br>

<TabsMarkdown>
  <TabMarkdown title="shadcn-nuxt">

  Install the package below.

  ```bash
 npx nuxi@latest module add shadcn-nuxt
  ```

  </TabMarkdown>

  <TabMarkdown title="manual">

  Add the following code to `modules/shadcn.ts`.

```bash
import {
  defineNuxtModule,
  addComponent,
  addComponentsDir,
  tryResolveModule,
} from 'nuxt/kit';

export interface ShadcnVueOptions {
  /**
   * Prefix for all the imported component
   */
  prefix: string;

  /**
   * Directory that the component lives in.
   * @default "~/components/ui"
   */
  componentDir: string;
}

export default defineNuxtModule<ShadcnVueOptions>({
  defaults: {
    prefix: 'Ui',
    componentDir: '~/components/ui',
  },
  meta: {
    name: 'ShadcnVue',
    configKey: 'shadcn',
    version: '0.0.1',
    compatibility: {
      nuxt: '>=3.9.0',
      bridge: false,
    },
  },
  async setup({ componentDir, prefix }) {
    const isVeeValidateExist = await tryResolveModule('vee-validate');

    addComponentsDir(
      {
        path: componentDir,
        extensions: ['.vue'],
        prefix,
        pathPrefix: false,
      },
      {
        prepend: true,
      }
    );

    if (isVeeValidateExist !== undefined) {
      addComponent({
        filePath: 'vee-validate',
        export: 'Form',
        name: `${prefix}Form`,
        priority: 999,
      });

      addComponent({
        filePath: 'vee-validate',
        export: 'Field',
        name: `${prefix}FormField`,
        priority: 999,
      });
    }

    addComponent({
      filePath: 'radix-vue',
      export: 'PaginationRoot',
      name: `${prefix}Pagination`,
      priority: 999,
    });

    addComponent({
      filePath: 'radix-vue',
      export: 'PaginationList',
      name: `${prefix}PaginationList`,
      priority: 999,
    });

    addComponent({
      filePath: 'radix-vue',
      export: 'PaginationListItem',
      name: `${prefix}PaginationListItem`,
      priority: 999,
    });
  },
});

declare module '@nuxt/schema' {
  interface NuxtConfig {
    shadcn?: ShadcnVueOptions;
  }
  interface NuxtOptions {
    shadcn?: ShadcnVueOptions;
  }
}
```

  </TabMarkdown>
</TabsMarkdown>

### Configure `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})
```

### Run the CLI

Run the `shadcn-vue` init command to setup your project:

```bash
npx shadcn-vue@latest init
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt:line-numbers
Would you like to use TypeScript (recommended)? no / yes
Which framework are you using? Vite / Nuxt / Laravel
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your tsconfig.json or jsconfig.json file? › ./tsconfig.json
Where is your global CSS file? › › src/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Write configuration to components.json. Proceed? > Y/n
```

### App structure

Here's the default structure of Nuxt app. You can use this as a reference:

```txt {6-16,20-21}
.
├── pages
│   ├── index.vue
│   └── dashboard.vue
├── components
│   ├── ui
│   │   ├── alert-dialog
│   │   │   ├── AlertDialog.vue
│   │   │   └── ...
│   │   ├── button
│   │   │   ├── Button.vue
│   │   │   └── ...
│   │   ├── dropdown-menu
│   │   │   ├── Dropdown.vue
│   │   │   └── ...
│   │   └── ...
│   ├── MainNav.vue
│   ├── PageHeader.vue
│   └── ...
├── lib
│   └── utils.ts
├── assets
│   ├── css
│   │   └── tailwind.css
├── app.vue
├── nuxt.config.ts
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

- I place the UI components in the `components/ui` folder.
- The rest of the components such as `<PageHeader />` and `<MainNav />` are placed in the `components` folder.
- The `lib` folder contains all the utility functions. I have a `utils.ts` where I define the `cn` helper.
- The `assets/css` folder contains the global CSS.

### That's it

You can now start adding components to your project.

```bash
npx shadcn-vue@latest add button
```

The command above will add the `Button` component to your project. Nuxt autoImport will handle importing the components, you can just use it as such:

```vue {3}
<template>
  <div>
    <Button>Click me</Button>
  </div>
</template>
```

</Steps>


# docs

## installation

### vite.md

---
title: Vite
description: Install and configure Vite.
---

<Steps>

### Create project

Start by creating a new Vue project using `vite`:

<Callout>

  If you're using the JS template, `jsconfig.json` must exist for the CLI to run without errors.

</Callout>

```bash
# npm 6.x
npm create vite@latest my-vue-app --template vue-ts

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue-ts
```

### Add Tailwind and its configuration

Install `tailwindcss` and its peer dependencies, then generate your `tailwind.config.js` and configure `postcss` plugins

<TabsMarkdown>
  <TabMarkdown title="vite.config">

  Vite already has [`postcss`](https://github.com/vitejs/vite/blob/main/packages/vite/package.json#89) dependency so you don't have to install it again in your package.json

  ```bash
  npm install -D tailwindcss autoprefixer
  ```

  <Callout>

  If you're utilizing `postcss.config.js`, these changes will be inconsequential.

  </Callout>

  #### `vite.config`

  ```typescript {5,6,9-13}
  import path from 'node:path'
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'

  import tailwind from 'tailwindcss'
  import autoprefixer from 'autoprefixer'

  export default defineConfig({
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
  ```

  </TabMarkdown>

  <TabMarkdown title="postcss.config.js">

  ```bash
  npm install -D tailwindcss autoprefixer postcss
  ```

#### `postcss.config.js`

  ```js
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  ```

  </TabMarkdown>
</TabsMarkdown>

### Edit tsconfig/jsconfig.json

Add the code below to the compilerOptions of your `tsconfig.json` or `jsconfig.json` so your app can resolve paths without error

```json {4-7}
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

### Update vite.config.ts

Add the code below to the vite.config.ts so your app can resolve paths without error

```bash
# (so you can import "path" without error)
npm i -D @types/node
```

```typescript {15-19}
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Delete default Vite styles

Delete the default Vite stylesheet `./src/style.css`

### Run the CLI

Run the `shadcn-vue` init command to setup your project:

```bash
npx shadcn-vue@latest init
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt:line-numbers
Would you like to use TypeScript (recommended)? no / yes
Which framework are you using? Vite / Nuxt / Laravel
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your tsconfig.json or jsconfig.json file? › ./tsconfig.json
Where is your global CSS file? › › src/assets/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Write configuration to components.json. Proceed? > Y/n
```

### Update main.ts

Remove import for style.css and add tailwind style import `import './assets/index.css'`

```diff typescript {2,4}
import { createApp } from 'vue'
- import './style.css'
import App from './App.vue'
+ import './assets/index.css'

createApp(App).mount('#app')
```

### That's it

You can now start adding components to your project.

```bash
npx shadcn-vue@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```vue {2,7}
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div>
    <Button>Click me</Button>
  </div>
</template>
```

</Steps>


# docs

## introduction.md

---
title: Introduction
description: Re-usable components built with Radix Vue, and Tailwind CSS.
---

<script setup >
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/registry/default/ui/accordion'
</script>

An unofficial, community-led [Vue](https://vuejs.org/) port of [shadcn/ui](https://ui.shadcn.com). We are not affiliated with [shadcn](https://twitter.com/shadcn), but we did get his blessing before creating a Vue version of his work. This project was born out of the need for a similar project for the Vue ecosystem.

This is **NOT** a component library. It's a collection of re-usable components that you can copy and paste or use the CLI to add to your apps.

**What do you mean not a component library?**

It means you do not install it as a dependency. It is not available or distributed via npm, with no plans to publish it.

Pick the components you need. Use the CLI to automatically add the components, or copy and paste the code into your project and customize to your needs. The code is yours.

_Use this as a reference to build your own component libraries._

## FAQ

<Accordion  type="multiple">

<AccordionItem value="faq-1">
<AccordionTrigger>
Why not packaged as a dependency?
</AccordionTrigger>
<AccordionContent>

The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled.

Start with some sensible defaults, then customize the components to your needs.

One of the drawback of packaging the components in an npm package is that the style is coupled with the implementation. _The design of your components should be separate from their implementation._

</AccordionContent>
</AccordionItem>
<AccordionItem value="faq-2">
<AccordionTrigger>
Which frameworks are supported?
</AccordionTrigger>
<AccordionContent>

This port is built to be used with Vue/Nuxt.

</AccordionContent>
</AccordionItem>
<AccordionItem value="faq-3">
<AccordionTrigger>
Can I use this in my project?
</AccordionTrigger>
<AccordionContent>
Yes. Free to use for personal and commercial projects. No attribution required.

But let us know if you do use it. We'd love to see what you build with it.
</AccordionContent>
</AccordionItem>
</Accordion>


# docs

## theming.md

---
title: Theming
description: Use CSS Variables to customize the look and feel of your application.
---

You can choose between using CSS variables or Tailwind CSS utility classes for theming.

## Utility classes

```html /bg-zinc-950/ /text-zinc-50/ /dark:bg-white/ /dark:text-zinc-950/
<div class="bg-zinc-950 dark:bg-white" />
```

To use utility classes for theming set `tailwind.cssVariables` to `false` in your `components.json` file.

```json {7} title="components.json"
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": false
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## CSS Variables

```html /bg-background/ /text-foreground/
<div class="bg-background text-foreground" />
```

To use CSS variables for theming set `tailwind.cssVariables` to `true` in your `components.json` file.

```json {7} title="components.json"
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Convention

We use a simple `background` and `foreground` convention for colors. The `background` variable is used for the background color of the component and the `foreground` variable is used for the text color.

<Callout class="mt-4">

The `background` suffix is omitted when the variable is used for the background color of the component.

</Callout>

Given the following CSS variables:

```css
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

The `background` color of the following component will be `hsl(var(--primary))` and the `foreground` color will be `hsl(var(--primary-foreground))`.

```html
<div class="bg-primary text-primary-foreground">Hello</div>
```

<Callout>

**CSS variables must be defined without color space function**. See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information.

</Callout>

### List of variables

Here's the list of variables available for customization:

<Steps>

```css
/* Default background color of <body />...etc */
--background: 0 0% 100%;
--foreground: 222.2 47.4% 11.2%;
```

```css
/* Muted backgrounds such as <TabsList />, <Skeleton /> and <Switch /> */
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
```

```css
/* Background color for <Card /> */
--card: 0 0% 100%;
--card-foreground: 222.2 47.4% 11.2%;
```

```css
/* Background color for popovers such as <DropdownMenu />, <HoverCard />, <Popover /> */
--popover: 0 0% 100%;
--popover-foreground: 222.2 47.4% 11.2%;
```

```css
/* Default border color */
--border: 214.3 31.8% 91.4%;
```

```css
/* Border color for inputs such as <Input />, <Select />, <Textarea /> */
--input: 214.3 31.8% 91.4%;
```

```css
/* Primary colors for <Button /> */
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

```css
/* Secondary colors for <Button /> */
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
```

```css
/* Used for accents such as hover effects on <DropdownMenuItem>, <SelectItem>...etc */
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
```

```css
/* Used for destructive actions such as <Button variant="destructive"> */
--destructive: 0 100% 50%;
--destructive-foreground: 210 40% 98%;
```

```css
/* Used for focus ring */
--ring: 215 20.2% 65.1%;
```

```css
/* Border radius for card, input and buttons */
--radius: 0.5rem;
```

</Steps>

### Adding new colors

To add new colors, you need to add them to your CSS file and to your `tailwind.config.js` file.

```css title="app/globals.css"
:root {
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
}

.dark {
  --warning: 48 96% 89%;
  --warning-foreground: 38 92% 50%;
}
```

```js {5-6} title="tailwind.config.js"
module.exports = {
  theme: {
    extend: {
      colors: {
        'warning': 'hsl(var(--warning))',
        'warning-foreground': 'hsl(var(--warning-foreground))',
      },
    },
  },
}
```

You can now use the `warning` utility class in your components.

```html /bg-warning/ /text-warning-foreground/
<div class="bg-warning text-warning-foreground" />
```

### Other color formats

I recommend using [HSL colors](https://www.smashingmagazine.com/2021/07/hsl-colors-css/) for theming but you can also use other color formats if you prefer.

See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information on using `rgb`, `rgba` or `hsl` colors.

## Hex -> Color Channel

You can use this tool to convert your HEX color to HSL without the color space function. Simply add your color in hex format, copy one of the generated values, then add them to the CSS variable.

<!-- <HexToChannels /> -->


# docs

## typography.md

---
title: Typography
description: Styles for headings, paragraphs, lists...etc
component: true
---

<ComponentPreview name="TypographyDemo" />

## h1

<ComponentPreview name="TypographyH1" />

## h2

<ComponentPreview name="TypographyH2" />

## h3

<ComponentPreview name="TypographyH3" />

## h4

<ComponentPreview name="TypographyH4" />

## p

<ComponentPreview name="TypographyP" />

## blockquote

<ComponentPreview name="TypographyBlockquote" />

## table

<ComponentPreview name="TypographyTable" />

## list

<ComponentPreview name="TypographyList" />

## Inline code

<ComponentPreview name="TypographyInlineCode" />

## Lead

<ComponentPreview name="TypographyLead" />

## Large

<ComponentPreview name="TypographyLarge" />

## Small

<ComponentPreview name="TypographySmall" />

## Muted

<ComponentPreview name="TypographyMuted" />


# examples

## authentication.md

<script setup>
import AuthenticationExample from "@/examples/authentication/Example.vue"
</script>

<AuthenticationExample />


# examples

## cards.md

<script setup>
import CardsExample from "@/examples/cards/Example.vue"
</script>

<CardsExample />


# examples

## dashboard.md

<script setup>
import DashboardExample from "@/examples/dashboard/Example.vue"
</script>

<DashboardExample />


# examples

## forms

### account.md

<script setup>
import AccountExample from "@/examples/forms/Account.vue"
</script>

<AccountExample />


# examples

## forms

### appearance.md

<script setup>
import AppearanceExample from "@/examples/forms/Appearance.vue"
</script>

<AppearanceExample />


# examples

## forms

### display.md

<script setup>
import DisplayExample from "@/examples/forms/Display.vue"
</script>

<DisplayExample />


# examples

## forms

### index.md

<script setup>
import FormsExample from "@/examples/forms/Example.vue"
</script>

<FormsExample />


# examples

## forms

### notifications.md

<script setup>
import NotificationsExample from "@/examples/forms/Notifications.vue"
</script>

<NotificationsExample />


# examples

## mail.md

<script setup>
import MailExample from "@/examples/mail/Example.vue"
</script>

<MailExample />


# examples

## music.md

<script setup>
import MusicExample from "@/examples/music/Example.vue"
</script>

<MusicExample />


# examples

## playground.md

<script setup>
import PlaygroundExample from "@/examples/playground/Example.vue"
</script>

<PlaygroundExample />


# examples

## tasks.md

<script setup>
import TasksExample from "@/examples/tasks/Example.vue"
</script>

<TasksExample />


# index.md

---
home: true
title: Shadcn for Vue
---

<script setup>
import LandingPage from "../../.vitepress/theme/components/LandingPage.vue"
</script>

<LandingPage />


# markdown-examples.md

# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).


# meta

## AreaChart.md

<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'data',
    'description': '<p>The source data, in which each entry is a dictionary.</p>\n',
    'type': 'Record<string, any>[]',
    'required': true
  },
  {
    'name': 'categories',
    'description': '<p>Select the categories from your data. Used to populate the legend and toolip.</p>\n',
    'type': 'string[]',
    'required': true
  },
  {
    'name': 'index',
    'description': '<p>Sets the key to map the data to the axis.</p>\n',
    'type': 'string',
    'required': true
  },
  {
    'name': 'colors',
    'description': '<p>Change the default colors.</p>\n',
    'type': 'string[]',
    'required': false
  },
  {
    'name': 'margin',
    'description': '<p>Margin of each the container</p>\n',
    'type': 'Spacing',
    'required': false,
    'default': '{ top: 0, bottom: 0, left: 0, right: 0 }'
  },
  {
    'name': 'filterOpacity',
    'description': '<p>Change the opacity of the non-selected field</p>\n',
    'type': 'number',
    'required': false,
    'default': '0.2'
  },
  {
    'name': 'xFormatter',
    'description': '<p>Function to format X label</p>\n',
    'type': '((tick: number | Date, i: number, ticks: number[] | Date[]) => string)',
    'required': false
  },
  {
    'name': 'yFormatter',
    'description': '<p>Function to format Y label</p>\n',
    'type': '((tick: number | Date, i: number, ticks: number[] | Date[]) => string)',
    'required': false
  },
  {
    'name': 'showXAxis',
    'description': '<p>Controls the visibility of the X axis.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showYAxis',
    'description': '<p>Controls the visibility of the Y axis.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showTooltip',
    'description': '<p>Controls the visibility of tooltip.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showLegend',
    'description': '<p>Controls the visibility of legend.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showGridLine',
    'description': '<p>Controls the visibility of gridline.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'customTooltip',
    'description': '<p>Render custom tooltip component.</p>\n',
    'type': 'Component',
    'required': false
  },
  {
    'name': 'curveType',
    'description': '<p>Type of curve</p>\n',
    'type': 'CurveType',
    'required': false,
    'default': 'CurveType.MonotoneX'
  },
  {
    'name': 'showGradiant',
    'description': '<p>Controls the visibility of gradient.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  }
]" />

<APITable :type="'emit'" :data="[
  {
    'name': 'legendItemClick',
    'type': '[d: BulletLegendItemInterface, i: number]'
  }
]" />


# meta

## BarChart.md

<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'data',
    'description': '<p>The source data, in which each entry is a dictionary.</p>\n',
    'type': 'Record<string, any>[]',
    'required': true
  },
  {
    'name': 'categories',
    'description': '<p>Select the categories from your data. Used to populate the legend and toolip.</p>\n',
    'type': 'string[]',
    'required': true
  },
  {
    'name': 'index',
    'description': '<p>Sets the key to map the data to the axis.</p>\n',
    'type': 'string',
    'required': true
  },
  {
    'name': 'colors',
    'description': '<p>Change the default colors.</p>\n',
    'type': 'string[]',
    'required': false
  },
  {
    'name': 'margin',
    'description': '<p>Margin of each the container</p>\n',
    'type': 'Spacing',
    'required': false,
    'default': '{ top: 0, bottom: 0, left: 0, right: 0 }'
  },
  {
    'name': 'filterOpacity',
    'description': '<p>Change the opacity of the non-selected field</p>\n',
    'type': 'number',
    'required': false,
    'default': '0.2'
  },
  {
    'name': 'xFormatter',
    'description': '<p>Function to format X label</p>\n',
    'type': '((tick: number | Date, i: number, ticks: number[] | Date[]) => string)',
    'required': false
  },
  {
    'name': 'yFormatter',
    'description': '<p>Function to format Y label</p>\n',
    'type': '((tick: number | Date, i: number, ticks: number[] | Date[]) => string)',
    'required': false
  },
  {
    'name': 'showXAxis',
    'description': '<p>Controls the visibility of the X axis.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showYAxis',
    'description': '<p>Controls the visibility of the Y axis.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showTooltip',
    'description': '<p>Controls the visibility of tooltip.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showLegend',
    'description': '<p>Controls the visibility of legend.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showGridLine',
    'description': '<p>Controls the visibility of gridline.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'customTooltip',
    'description': '<p>Render custom tooltip component.</p>\n',
    'type': 'Component',
    'required': false
  },
  {
    'name': 'type',
    'description': '<p>Change the type of the chart</p>\n',
    'type': '\'stacked\' | \'grouped\'',
    'required': false,
    'default': '\'grouped\''
  },
  {
    'name': 'roundedCorners',
    'description': '<p>Rounded bar corners</p>\n',
    'type': 'number',
    'required': false,
    'default': '0'
  }
]" />

<APITable :type="'emit'" :data="[
  {
    'name': 'legendItemClick',
    'type': '[d: BulletLegendItemInterface, i: number]'
  }
]" />


# meta

## ChartCrosshair.md

<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'colors',
    'description': '',
    'type': 'string[]',
    'required': false,
    'default': '[]'
  },
  {
    'name': 'index',
    'description': '',
    'type': 'string',
    'required': true
  },
  {
    'name': 'items',
    'description': '',
    'type': 'BulletLegendItemInterface[]',
    'required': true
  },
  {
    'name': 'customTooltip',
    'description': '',
    'type': 'Component',
    'required': false
  }
]" />


# meta

## ChartLegend.md

<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'items',
    'description': '',
    'type': 'BulletLegendItemInterface[]',
    'required': false,
    'default': '[]'
  }
]" />

<APITable :type="'emit'" :data="[
  {
    'name': 'legendItemClick',
    'type': '[d: BulletLegendItemInterface, i: number]'
  },
  {
    'name': 'update:items',
    'type': '[payload: BulletLegendItemInterface[]]'
  }
]" />


# meta

## ChartSingleTooltip.md

<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'valueFormatter',
    'description': '',
    'type': '((tick: number, i?: number, ticks?: number[]) => string)',
    'required': false,
    'default': '`${tick}`'
  },
  {
    'name': 'index',
    'description': '',
    'type': 'string',
    'required': true
  },
  {
    'name': 'items',
    'description': '',
    'type': 'BulletLegendItemInterface[]',
    'required': false
  },
  {
    'name': 'customTooltip',
    'description': '',
    'type': 'Component',
    'required': false
  },
  {
    'name': 'selector',
    'description': '',
    'type': 'string',
    'required': true
  }
]" />

<APITable :type="'method'" :data="[
  {
    'name': 'valueFormatter',
    'description': '',
    'type': '(tick: number, i?: number | undefined, ticks?: number[] | undefined) => string'
  }
]" />


# meta

## ChartTooltip.md

<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'title',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'data',
    'description': '',
    'type': '{ name: string; color: string; value: any; }[]',
    'required': true
  }
]" />


# meta

## DonutChart.md

<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'colors',
    'description': '<p>Change the default colors.</p>\n',
    'type': 'string[]',
    'required': false
  },
  {
    'name': 'index',
    'description': '<p>Sets the key to map the data to the axis.</p>\n',
    'type': 'string',
    'required': true
  },
  {
    'name': 'data',
    'description': '<p>The source data, in which each entry is a dictionary.</p>\n',
    'type': 'Record<string, any>[]',
    'required': true
  },
  {
    'name': 'margin',
    'description': '<p>Margin of each the container</p>\n',
    'type': 'Spacing',
    'required': false,
    'default': '{ top: 0, bottom: 0, left: 0, right: 0 }'
  },
  {
    'name': 'filterOpacity',
    'description': '<p>Change the opacity of the non-selected field</p>\n',
    'type': 'number',
    'required': false,
    'default': '0.2'
  },
  {
    'name': 'showTooltip',
    'description': '<p>Controls the visibility of tooltip.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showLegend',
    'description': '<p>Controls the visibility of legend.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'category',
    'description': '<p>Sets the name of the key containing the quantitative chart values.</p>\n',
    'type': 'string',
    'required': true
  },
  {
    'name': 'type',
    'description': '<p>Change the type of the chart</p>\n',
    'type': '\'donut\' | \'pie\'',
    'required': false,
    'default': '\'donut\''
  },
  {
    'name': 'sortFunction',
    'description': '<p>Function to sort the segment</p>\n',
    'type': '((a: any, b: any) => number)',
    'required': false
  },
  {
    'name': 'valueFormatter',
    'description': '<p>Controls the formatting for the label.</p>\n',
    'type': '((tick: number, i?: number, ticks?: number[]) => string)',
    'required': false,
    'default': '`${tick}`'
  },
  {
    'name': 'customTooltip',
    'description': '<p>Render custom tooltip component.</p>\n',
    'type': 'Component',
    'required': false
  }
]" />


# meta

## LineChart.md

<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'data',
    'description': '<p>The source data, in which each entry is a dictionary.</p>\n',
    'type': 'Record<string, any>[]',
    'required': true
  },
  {
    'name': 'categories',
    'description': '<p>Select the categories from your data. Used to populate the legend and toolip.</p>\n',
    'type': 'string[]',
    'required': true
  },
  {
    'name': 'index',
    'description': '<p>Sets the key to map the data to the axis.</p>\n',
    'type': 'string',
    'required': true
  },
  {
    'name': 'colors',
    'description': '<p>Change the default colors.</p>\n',
    'type': 'string[]',
    'required': false
  },
  {
    'name': 'margin',
    'description': '<p>Margin of each the container</p>\n',
    'type': 'Spacing',
    'required': false,
    'default': '{ top: 0, bottom: 0, left: 0, right: 0 }'
  },
  {
    'name': 'filterOpacity',
    'description': '<p>Change the opacity of the non-selected field</p>\n',
    'type': 'number',
    'required': false,
    'default': '0.2'
  },
  {
    'name': 'xFormatter',
    'description': '<p>Function to format X label</p>\n',
    'type': '((tick: number | Date, i: number, ticks: number[] | Date[]) => string)',
    'required': false
  },
  {
    'name': 'yFormatter',
    'description': '<p>Function to format Y label</p>\n',
    'type': '((tick: number | Date, i: number, ticks: number[] | Date[]) => string)',
    'required': false
  },
  {
    'name': 'showXAxis',
    'description': '<p>Controls the visibility of the X axis.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showYAxis',
    'description': '<p>Controls the visibility of the Y axis.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showTooltip',
    'description': '<p>Controls the visibility of tooltip.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showLegend',
    'description': '<p>Controls the visibility of legend.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showGridLine',
    'description': '<p>Controls the visibility of gridline.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'customTooltip',
    'description': '<p>Render custom tooltip component.</p>\n',
    'type': 'Component',
    'required': false
  },
  {
    'name': 'curveType',
    'description': '<p>Type of curve</p>\n',
    'type': 'CurveType',
    'required': false,
    'default': 'CurveType.MonotoneX'
  }
]" />

<APITable :type="'emit'" :data="[
  {
    'name': 'legendItemClick',
    'type': '[d: BulletLegendItemInterface, i: number]'
  }
]" />


# themes.md

---
title: Theming - shadcn-vue
---

<script setup>
import Theming from "../../.vitepress/theme/components/theming/Theming.vue"
</script>

<Theming />


