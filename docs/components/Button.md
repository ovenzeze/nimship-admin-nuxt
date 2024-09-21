# Button Component

## Overview
The `Button` component is...

## Props
| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| prop1 | String | '' | Description of prop1 |
| prop2 | Boolean | false | Description of prop2 |

## Events
| Event Name | Parameters | Description |
|------------|------------|-------------|
| click | event: Event | Emitted when the component is clicked |

## Usage Example
```vue
<template>
  <Button prop1="value" @click="handleClick">
    Button Text
  </Button>
</template>

<script setup>
const handleClick = () => {
  console.log('Button clicked')
}
</script>
```

## Notes
- Any additional notes or considerations when using this component.
